const Users = require("../models/users.models");
const bcrypt = require("bcrypt");
const { validationPassword, validationEmail } = require("../../validators/validation");
const {generateSign, verifyJwt} = require("../../jwt/jwt")

const getAllUsers = async (req,res)=> {
    try {
        const allUsers = await Users.find()
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const getUserByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userByID = await Users.findById(id);
      return res.json({
        status: 200,
        
        user: userByID,
      });
    } catch (error) {
      return next(error);
    }
};

const register = async (req, res, next) => {
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

const login = async (req, res, next) => {
    try {

        const userInfo = await Users.findOne({  mail: req.body.mail});
        console.log(req.body.mail);
        console.log(userInfo)
        if(userInfo == null){
            return res.status(400).json({message: "invalido user"});
        }
        if(bcrypt.compareSync(req.body.password, userInfo.password)){
            //userInfo.password = null;
            // console.log(userInfo)
            const token = generateSign(userInfo._id, userInfo.mail) //token
            
            return res.status(200).json({userInfo,token}); //token
            
        }else{
            return res.status(400).json({message: "invalid password"});
        }

    } catch (error) {
        return res.status(500).json(error) ;
    }
};

const logout = (req, res, next) => {
    try {
        return res.status(200).json({token: null})
    } catch (error) {
        return res.status(500).json(error) ;
    }
};
const addPets = async (req,res, next)=> {
    console.log(req.params)
    console.log(req.body)
    
    try{
    const{id} = req.params;
    const putUser = new Users(req.body);
    putUser._id = id;

    if(req.files && req.files.photo){
        putUser.photo = req.files.photo[0].path
    }
    const filter = { _id: req.params.id};     
    const animalDB = await Users.findOneAndUpdate(filter, {
        $addToSet: {
            pets: req.body.pets
        
        }
        
    });console.log(animalDB)
    if(animalDB){
        return res.status(404).json({"message": "Actualizado"});
    }
    return res.status(200).json(animalDB);
} catch (error){
    return res.status(500).json(error)
}
};
// const addPets = async (req,res, next)=> {
//     console.log(req.params)
//     console.log(req.body)
    
//     try{
//     const{id} = req.params;
//     const putUser = new Users(req.body);
//     putUser._id = id;

//     if(req.files.photo){
//         putUser.photo = req.files.photo[0].path
//         }

//     const animalDB = await Users.findByIdAndUpdate(id, putUser, {new: true});
//     if(animalDB){
//         return res.status(404).json({"message": "Actualizado"});
//     }
//     return res.status(200).json(animalDB);
// } catch (error){
//     return res.status(500).json(error)
// }
// };

module.exports = {register, login, logout, getAllUsers, addPets, getUserByID}