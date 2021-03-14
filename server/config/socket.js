const mongoconnect = require('./../config/dbconnect');

mongoconnect();


const User = require('./../model/user')
const Chat = require('./../model/chat')
const Ket_ban = require('./../model/ket_ban')
const Room = require('../model/room')





async function socket(socket) {
let my_email 
let room_da_join = []
    console.log(socket.id + '------------đã kết nối');
    //
    socket.on('serch_text' , async (data)=>{
      // console.log(data);

      let dtt = await  User.find({
        $and : [
          { name : { $regex : data.value}  } ,
          { email : { $ne : data.email } }
        ]
      })
        .select('avatar email name -_id')
      console.log(dtt);



      if(dtt.length > 0){

      let i = 0;
        while(i< dtt.length) {
              // let a = await Ket_ban.countDocuments({ $and : [{ email_nguoi_gui : data.email  } ,  { email_nguoi_nhan : dtt[i].email } ]})
              // let b = await Ket_ban.countDocuments({ $and : [{ email_nguoi_gui : dtt[i].email  } ,  { email_nguoi_nhan : data.email } ]})
              // let c = await Room.countDocuments({ email : [ data.email , dtt[i].email ] })
              // console.log(a ,b ,c);
              await socket.emit('ds' , {
                msg : {
                  email : dtt[i].email,
                  avatar : dtt[i].avatar,
                  name  : dtt[i].name,
                  // ban : a > 0 ? 'da_gui' : b > 0 ? 'ban_be' : 'chua_gui'
                  ban : await Ket_ban.countDocuments({ $and : [{ email_nguoi_gui : data.email  } ,  { email_nguoi_nhan : dtt[i].email } ]}) > 0 ? 'da_gui'
                        : await Ket_ban.countDocuments({ $and : [{ email_nguoi_gui : dtt[i].email  } ,  { email_nguoi_nhan : data.email } ]}) > 0 ? 'chap_nhan'
                        : await Room.countDocuments({ email : [ data.email , dtt[i].email ] }) > 0 ? 'ban_be'
                        : 'chua_gui'
                },
                off : i == dtt.length - 1 ? true : false
              } )
            i++;
        }

      }
      else{
        socket.emit('ds' , {
          msg : 'no_data',
          off : true
        } )
      }





    })


    socket.on('loi_moi_ket_ban' , async (data)=> {
      Ket_ban.find({
        email_nguoi_nhan : data
      })
      .select('email_nguoi_gui -_id')
      .limit(10)
      .then( async d=> {
        if(d.length > 0){
          let i = 0
          while( i < d.length ){
            let a = await User.findOne({ email : d[i].email_nguoi_gui }).select('email name avatar -_id')
            // console.log(a);
            await socket.emit( 'ds_loi_moi_ket_ban' ,{
              msg : a,
              off : i == d.length -1 ? true : false
            })
            i++
          }
        }
        else{
          socket.emit( 'ds_loi_moi_ket_ban' ,{
            msg : 'no_data',
            off : true
          })
        }
      })
      // .catch(e => res.send('lỗi server'))

    })



    socket.on('my_room' , async (data)=> {
      Room.find({
        email : data
      })
      // .select('email_nguoi_gui -_id')
      .limit(10)
      .then( async d=> {
        if(d.length > 0){
          let i = 0

          while( i < d.length ){
          
            if(d[i].type === 'ban_be'){
              let a = await User.findOne({ email : d[i].email[ d[i].email.findIndex(x => x !== data) ] }).select('email name avatar time online time_online -_id')
              await socket.emit( 'ds_my_room' ,{
                msg :  {
                  room : d[i]._id,
                  email : a.email,
                  avatar : a.avatar,
                  name : a.name,
                  time_tin_nhan_cuoi : d[i].time_tin_nhan_cuoi,
                  type : 'ban_be',
                  time : a.time,
                  online  : a.online,
                  time_online : a.time_online
                }  ,
                off : i == d.length -1 ? true : false
              })
              // console.log( d[i].email.findIndex(x => x !== data) );
            }


            i++
          }
        }
        else{
          await socket.emit( 'ds_my_room' ,{
            msg :  'no_data' ,
            off : true
          })
        }
      })
      

    })

    socket.on('join_room' , async data => {
      
        let room_da_join1 = await   Room.find({ email : data }).select('_id')
        if(room_da_join1.length > 0){
          await room_da_join1.forEach(e => {
              room_da_join.push(`${e._id}`)
          });

          socket.join(room_da_join)
        }

        if(room_da_join.length > 0){

          let i = 0 ;
          while( i < room_da_join.length ){
            // let r = await room_da_join[i]._id
            await socket.to(room_da_join[i]).emit('user_truy_cap' , room_da_join[i])
            i++
          }
        }
        User.updateOne({ email : data } , { 
          online : true,
          
        })
        .then(d=>console.log('ok'))
        .catch(e=>console.log('loi1'))
        my_email = await data

    })

    socket.on('phong' , async ()=>{
      console.log(socket.rooms);
      console.log(room_da_join);

    })
    socket.on('input_chat_van_ban' , async data =>{
      Chat.create({
        email_nguoi_gui : data.email_nguoi_gui,
        room : data.room,
        type : 'van_ban',
        msg : data.msg,
        time : data.time,
        send : false 
      })
      .then( d=>{
        socket.to(data.room).emit('output_chat_van_ban' ,  d  )
        console.log(d);
      } )
      .catch(e=>{
        console.log(e);
      })
      //await socket.to(data.room).emit('output_chat_van_ban' ,  data   )

    })
// đổi time thành socket id khi join room nếu time = nodata thì thôi
// else khi chấp nhận sẽ gửi đén id kia và thêm ds bạn vô redux
// khi một người join room sẽ truyền online đến tất cả trong room là đang online
// trong user lấy email bên trên so sánh với email của mình ddeer hiện ra có on hay không
// hhi dis cũng so sánh

    //
    socket.on('disconnect' ,async ()=> {
      console.log(  ' -------------------- đã ngắt kết nối-------' + socket.id)
      if(room_da_join.length > 0){

        let i = 0 ;
        while( i < room_da_join.length ){
          // let r = await room_da_join[i]._id
          await socket.to(room_da_join[i]).emit('user_ngat_truy_cap' , room_da_join[i])
          i++
        }
      }
      User.updateOne({ email : my_email } , { 
        online : false,
        time_online : Date.now()
       })
       .then(d=>console.log('ok'))
       .catch(e=>console.log('loi'))
    })

}

module.exports = socket;