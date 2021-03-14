const mongoose = require( "mongoose"  ) ;
async function dbconnect() {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.gomvx.mongodb.net/chat_realtime?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
}

module.exports = dbconnect;