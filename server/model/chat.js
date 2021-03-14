const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 
const Chatschema = new Schema({
        email_nguoi_gui : String,
        room : String,
        type : String,
        msg : String,
        time : String,
        send : Boolean 

},{
    collection : 'Chat'
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', Chatschema);

module.exports = Chat