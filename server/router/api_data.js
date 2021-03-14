const express = require("express");
const router = express.Router();
const mongoconnect = require('./../config/dbconnect');
const User = require('./../model/user')
const Chat = require('./../model/chat')
const Ket_ban = require('./../model/ket_ban')
const Room = require('../model/room')
mongoconnect();
const guimail = require('./../config/gui_mail')

router.post(('/gui_ket_ban'),  (req,res)=>{
    Ket_ban.create( req.body )
    .then( d=> res.send('ok') )
    .catch(e => res.send('lỗi server'))
})
router.post(('/serch_email'), async (req,res)=>{
    User.find({
        $and : [
          { email : req.body.value  } ,
          { email : { $ne : req.body.email } }
        ]
      })
        .select('avatar email name -_id')
        .then( async d=>{
// console.log(req.body);
console.log(d);
            if(d.length > 0){
              let a =  await Ket_ban.countDocuments({
                $and : [
                  { email_nguoi_gui : req.body.email  } ,
                  { email_nguoi_nhan : d[0].email }
                ]
              });


              res.send({
                    name : d[0].name,
                    avatar : d[0].avatar,
                    email : d[0].email,
                    ban : a > 0 ? 'da_gui' : 'chua_gui'
              })
console.log(a);
              

            }
            else{
              res.send('no_data')
            }
        })
  // let d =await  Ket_ban.countDocuments({
  //     $and : [
  //       { email_nguoi_gui : 'longsky45@gmail.com'  } ,
  //       { email_nguoi_nhan : 'dungtinai4869@gmai.com' }
  //     ]
  //   })
 
  //     console.log(d);
 
    
})
router.post(('/chap_nhan_ket_ban'),  (req,res)=>{
  Room.create({
    email : [ req.body.email_nguoi_nhan , req.body.email_nguoi_gui ],
    tuong_tac : 0,
    time_tin_nhan_cuoi : '',
    type : 'ban_be',
    //role : 'admin', // phần để room
    name : 'String',
    avatar : 'String'
  })
  .then(d1 => {
    Ket_ban.deleteOne( req.body )
    .then( d=> res.send('ok') )
    .catch(e => res.send('lỗi server'))
  })
  
})
router.post(('/noi_dung_chat'),  (req,res)=>{
    Chat.find({
      room : req.body.room
    })
    .select('-_id')
    .sort('-time')
    .limit(10)
    .then(d=>{
      res.send(d)
    })
})

module.exports = router