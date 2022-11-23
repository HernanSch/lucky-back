const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ("bcrypt");

const animalProtectorSchema = new Schema ({
    name:{type:String,require:true},
    mail:{type:String,require:true},
    password:{type:String,require:true},
    photo:{type:String,require:true},
    direcction:{type:String,require:true},
    pets:[{type:Schema.Types.ObjectId,ref:"pets"}]    
    
})

const AnimalProtector = mongoose.model("animalProtector",animalProtectorSchema);
module.exports = AnimalProtector;