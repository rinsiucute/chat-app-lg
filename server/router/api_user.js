const express = require("express");
const router = express.Router();
const mongoconnect = require('./../config/dbconnect');
const User = require('./../model/user')
mongoconnect();
const guimail = require('./../config/gui_mail')




router.post('/xac_minh_tai_khoan' , (req,res) =>{
    // console.log(req.body); 
    let ma_xac_minh = Math.floor(Math.random() * 999999);
    let { email , name } = req.body


    let noi_dung = `

    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title></title>
        <style>
          a{
            color: black;
            text-decoration: none;
            pointer-events: none;        
          }
 ss
        </style>
      </head>
      <body>
        <h3 style=" display: inline; " > Xin chào </h3>
        <h3 style=" display: inline; color: #66ccff " > <a> ${ name } </a> </h3>
        <h3 style=" display: inline; " > đến với trang web của mình </h3>
<br>
        <p style=" display: inline; " > Mã xác minh của </p>
        <b style=" display: inline; color: #66ccff  " >   <a> ${ name } </a></b>
        <p style=" display: inline; " > là : </p>
        <br> <br>
        <h1 style=" text-align: center; border: 2px solid blue; padding: 10px; display: inline; margin-left : 24px ; background: #e6f2ff; " > ${ma_xac_minh} </h1>
        <br> <br>
        <p> Thanh you very much :)) </p>
      </body>
    </html>
    
     ` 

    User.findOne({
        email : email
      })
      .then(data => {
        if(data){
            res.send('\n Email đã tồn tại')
        }
        else{
            
                guimail({
                    noi_dung : noi_dung,
                    email  :email,
                    tieu_de : "Xác minh tài khoản email ✔"
                })
                .then(e => {
                    res.send({ ma_xac_minh : ma_xac_minh })
                })

        }
      })

})

router.post('/tao_tai_khoan' , (req,res)=> {
    User.create(req.body)
    .then(d => {
        res.send('/n/n Tạo tài khoản thành công')
    })
})

router.post('/dang_nhap' , (req , res)=>{
  let { email , password } = req.body;
  User.findOne({
    email : email,
    password : password
  })
  .select('-password')
  .then( d =>{
    // 
    // console.log(d);
    if(d){
      res.send(d)
    }
    else{
      res.send('/n Tài khoản hoặc mật khẩu không chính xác !')
    }
  })



})

router.post('/xac_minh_cookie' , (req,res)=>{
  console.log(req.body.id);
  User.findOne({
    _id : req.body.id
  })
  .then(data => {
    res.send(data)
  })
})

router.post('/all' , (req,res) => {
  User.find()
  .then(d=> res.send(d))
})

router.put('/update' , (req,res)=>{
  User.updateOne( { _id : req.body._id } , req.body )
  .then(()=>{
    res.send('ok')
  })
  .catch( e => console.log(e) )
})

router.put('/update_pass',(req,res)=>{
  let data = req.body

  User.findOneAndUpdate( { 
    email : data.email,
    password : data.mat_khau_cu
   } , {
     password : data.mat_khau_moi
   } ).select('name -_id')
  .then((data)=>{
      if( data ){
        res.send('ok')
      }
      else{
        res.send('loi')
      }
  })
  .catch( e => console.log(e) ) 
})

// router.post( '/lay_lai_mat_khau' ,(req,res) => {
//     user.findOne({ email : req.body.email }).select('email password name -_id')
//     .then( data => {
//       console.log(data);
//           guimail2(data)
//     } )
// } )

router.post('/serch_text' , async (req,res)=>{
  
  let dt = req.body

//   res.json()
//   let a = await User.countDocuments({ name : { $regex : dt.value  } }, function (err, count) {
//    
//     return count
//   });
// console.log(a);

let dtt = await  User.find({
                    $and : [
                      { name : { $regex : dt.value}  } ,
                      { _id : { $ne : dt._id } }
                    ]
                  })
                  .select('avatar email name -_id')
console.log(dtt);
for( let i = 0 ; i < dtt.length ; i++  ){
  res.json( dtt[i] )
}




  // if(dt.email){
  //       User.find({
  //         $and : [
  //           { email : dt.value },
  //           { _id : { $ne : dt._id } }
  //         ]
  //       })
  //       .select('avatar email name -_id')
  //       .then( d => {
  //         res.send(d)
  //         // console.log(d);
  //       } )
  //       .catch(e=> console.log(e))
  // }
  // else{
  //       User.find({
  //         $and : [
  //           { name : { $regex : dt.value}  } ,
  //           { _id : { $ne : dt._id } }
  //         ]
  //       })
  //       .select('avatar email name -_id')
  //       .then( d => {
  //         res.send(d)
  //         // console.log(d);
  //       } )
  //       .catch(e=> console.log(e))
  // }


})



module.exports = router