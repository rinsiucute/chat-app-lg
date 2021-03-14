const mongoose = require('mongoose')
const Schema = mongoose.Schema;

 
const Roomschema = new Schema({
        email : Array,
        tuong_tac : Number,
        time_tin_nhan_cuoi : String,
        type : String,
        role : Object, // phần để room
        name : String,
        avatar : String

},{
    collection : 'Room'
});

const Room = mongoose.models.Room || mongoose.model('Room', Roomschema);

module.exports = Room