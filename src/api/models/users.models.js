const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ("bcrypt");

const usersSchema = new Schema ({
    name:{type:String,require:true},
    mail:{type:String,require:false},
    password:{type:String,require:true},
    photo:{type:String,require:true},
    pets:[{type:Schema.Types.ObjectId,ref:"pets"}]

})

const Users = mongoose.model("users",usersSchema);
module.exports = Users;