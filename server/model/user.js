const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 
const Userschema = new Schema({
    name : String,
    email : String,
    password : String,
    avatar : String,
    gioitinh : String,
    ngaysinh : String,
    time : Number,
    time_online : Number ,// thời giân cuối cùng == khi off thoát,
    online : Boolean

},{
    collection : 'User'
});

Userschema.index({name: 'text'});
const User = mongoose.models.User || mongoose.model('User', Userschema);

module.exports = User