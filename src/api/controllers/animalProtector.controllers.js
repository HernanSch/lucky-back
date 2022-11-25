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
        if(req.files.photo){
            newPet.photo = req.files.photo[0].path
        }
        return res.status(201).json(createdAnimalProtector);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const putAnimalProtector = async (req,res, next)=> {
    console.log(req.params)
    console.log(req.body)
    
    try{
    const{id} = req.params;
    const putAnimalProtector = new AnimalProtector(req.body);
    putAnimalProtector._id = id;

    if(req.files.photo){
        putAnimalProtector.photo = req.files.photo[0].path
        }

    const animalDB = await AnimalProtector.findByIdAndUpdate(id, putAnimalProtector, {new: true});
    if(animalDB){
        return res.status(404).json({"message": "Actualizado"});
    }
    return res.status(200).json(animalDB);
} catch (error){
    return res.status(500).json(error)
}
};

const registerProtector = async (req, res, next) => {
    try {
        console.log(req.body)
        const newUser = new Users(req.body);
        if(!validationEmail(req.body.mail)){
            console.log({code: 403, message: "Invalid email"})
            res.status(403).send({code: 403, message: "Invalid email"});
            return next();
        }
        if(!validationPassword(req.body.password)){
            res.status(403).send({code: 403, message: "Invalid password"});
            console.log({code: 403, message: "Invalid password"})
            return next();
        }
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const createdUser = await newUser.save();
        return res.status(201).json(createdUser);
    } catch (error) {
        return res.status(500).json(error) ;
    }
};
const loginProtector = async (req, res, next) => {
    try {

        const userInfo = await Users.findOne({email: req.body.email});
        console.log(userInfo);
        if(userInfo == null){
            return res.status(400).json({message: "invalid user"});
        }
        if(bcrypt.compareSync(req.body.password, userInfo.password)){
            //userInfo.password = null;
            // console.log(userInfo)
            const token = generateSign(userInfo._id, userInfo.email) //token
            return res.status(200).json(token); //token
        }else{
            return res.status(400).json({message: "invalid password"});
        }

    } catch (error) {
        return res.status(500).json(error) ;
    }
};

const logoutProtector = (req, res, next) => {
    try {
        return res.status(200).json({token: null})
    } catch (error) {
        return res.status(500).json(error) ;
    }
};




module.exports = {getAllAnimalProtector, postNewAnimalProtector, putAnimalProtector, registerProtector, loginProtector, logoutProtector};
