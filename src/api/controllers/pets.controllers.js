const Pets = require("../models/pets.models");

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
            age,city,category,birthday, weigth,record,vaccinated,dewormed,
            healthy,sterilized,identified,microchip,requirements,
            adoptionCost,delivery,photo,condition
        } = req.body
        const newPet = new Pets({species,sex, colour,name, image,
            age,city,category,birthday, weigth,record,vaccinated,dewormed,
            healthy,sterilized,identified,microchip,requirements,
            adoptionCost,delivery,photo,condition
        });
        const createdPet = await newPet.save();
        return res.status(201).json(createdPet);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const putPets = async (req,res)=> {
    try{
    const{id} = req.params;
    const putPets = new Pets(req.body);
    putPets._id = id;

    const PetsDb = await Pets.findByIdAndUpdate(id, putPets, {new: true});
    if(PetsDb){
        return res.status(404).json({"message": "Pets not found"});
    }
    return res.status(200).json(PetsDb);
} catch (error){
    return res.status(500).json(error)
}
};


module.exports = {getAllPets, postNewPets,putPets};