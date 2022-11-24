const Pets = require("../models/pets.models");
const {deleteFile} = require('../../middlewares/delete.file');

const getAllPets = async (req,res)=> {
    try {
        const allPets = await Pets.find().populate("animalProtectors");
        return res.status(200).json(allPets);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const postNewPets = async (req,res)=> {
    try{
        const {species,sex, colour,name, image,
            age,size,city,category,birthday, weigth,record,vaccinated,dewormed,
            healthy,sterilized,identified,microchip,requirements,
            adoptionCost,delivery,photo,condition
        } = req.body
       
        const newPet = new Pets({species,sex, colour,name, image,
            age,size,city,category,birthday, weigth,record,vaccinated,dewormed,
            healthy,sterilized,identified,microchip,requirements,
            adoptionCost,delivery,photo,condition
        });
        if(req.files.photo){
            newPet.photo = req.files.photo[0].path
        }
        const createdPet = await newPet.save();
        return res.status(201).json(createdPet);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const putPets = async (req,res)=> {
    try{
    const{id} = req.params;
    console.log(req.body)
    const putPets = new Pets(req.body);
    putPets._id = id;
    
    if(req.file){
        putPets.photo = req.file.path
    }
    
    const PetsDb = await Pets.findByIdAndUpdate(id, putPets, {new: true});
    if(PetsDb){
        deleteFile(modeloDB.photo)
    }
    
    return res.status(200).json(PetsDb);
} catch (error){
    return res.status(500).json(error)
}
};


module.exports = {getAllPets, postNewPets, putPets};