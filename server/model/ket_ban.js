const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 
const Ketbanschema = new Schema({
        email_nguoi_gui : String,
        email_nguoi_nhan : String,
        time : String

},{
    collection : 'Ket_ban'
});

const Ket_ban = mongoose.models.Ket_ban || mongoose.model('Ket_ban', Ketbanschema);

module.exports = Ket_ban