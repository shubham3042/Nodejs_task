const MongoClient = require('mongodb').MongoClient;
const uri="mongodb+srv://khakharshubham:123@devconnector.hf2eo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri,{useNewUrlParser: true,useUnifiedTopology:true});
client.connect();
module.exports=client