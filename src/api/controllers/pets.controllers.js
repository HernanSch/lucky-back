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
const getPetsByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const petsByID = await Pets.findById(id);
      return res.json({
        status: 200,
        
        pet: petsByID,
      });
    } catch (error) {
      return next(error);
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

const putPets = async (req, res, next) => {
    //console.log(req.body)
    //console.log(req.params)
    try{
        const{id} = req.params;
        //console.log(req.body)
        const putPets = new Pets(req.body);
        putPets._id = id;
        
        if(req.files.photo){
            putPets.photo = req.files.photo[0].path
        }
    
        const petsDB = await Pets.findByIdAndUpdate(id, putPets);
        if(petsDB.photo){
            deleteFile(petsDB.photo)
        }
        
        return res.status(200).json(petsDB);
    } catch (error){
        return res.status(500).json(error)
    }
};




module.exports = {getAllPets, postNewPets, putPets, getPetsByID};