const AnimalProtector = require("../models/animalProtector.models");

const getAllAnimalProtector = async (req,res)=> {
    try {
        const allAnimalProtector = await AnimalProtector.find().populate("pets");
        return res.status(200).json(allAnimalProtector);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const postNewAnimalProtector = async (req,res)=> {
    try{
        const {name, mail, password, photo, pets} = req.body
        const newAnimalProtector = new AnimalProtector({name, mail, password, photo, pets});
        const createdAnimalProtector = await newAnimalProtector.save();
        return res.status(201).json(createdAnimalProtector);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const putAnimalProtector = async (req,res)=> {
    try{
    const{id} = req.params;
    const putAnimalProtector = new AnimalProtector(req.body);
    putAnimalProtector._id = id;

    const AnimalProtectorDb = await AnimalProtector.findByIdAndUpdate(id, putAnimalProtector, {new: true});
    if(AnimalProtectorDb){
        return res.status(404).json({"message": "AnimalProtector not found"});
    }
    return res.status(200).json(AnimalProtectorDb);
} catch (error){
    return res.status(500).json(error)
}
};




module.exports = {getAllAnimalProtector, postNewAnimalProtector,putAnimalProtector};
