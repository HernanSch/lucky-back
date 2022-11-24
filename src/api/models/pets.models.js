const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const petsSchema = new Schema ({
    species:{type:String,require:true},
    sex:{type:String,require:true},
    colour:{type:String,require:true},
    name:{type:String,require:true},
    age:{type:String,require:true},
    size:{type:String,require:true},
    city:{type:String,require:true},
    category:{type:String,require:true},
    birthday:{type:String,require:true},
    weigth:{type:String,require:true},
    size:{type:String,require:true},
    record:{type:String},
    vaccinated:{type:Boolean,require:true},
    dewormed:{type:Boolean,require:true},
    healthy:{type:Boolean,require:true},
    sterilized:{type:Boolean,require:true},
    identified:{type:Boolean,require:true},
    microchip:{type:Boolean,require:true},
    requirements:{type:String},
    adoptionCost:{type:String},
    delivery:{type:Boolean,require:true},
    photo:{type:String,require:true},
    condition:{type:String,require:true},
    animalProtectors:[{type:Schema.Types.ObjectId,ref:"animalProtector"}]      
})

const Pets = mongoose.model("pets",petsSchema);
module.exports = Pets;