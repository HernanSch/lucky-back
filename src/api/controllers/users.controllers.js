const Users = require("../models/users.models");
const Pets = require("../models/pets.models");
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
            return res.status(400).json({message: "invalid user"});
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


const addPets = async (req, res, next) => {
  
    try{
        const{id} = req.params;
       // console.log(req.body)
        const putPets = new Users(req.body);
      
        putPets._id = id;
        
        if(req.files.photo){
            putPets.photo = req.files.photo[0].path
        }
        const filter = {_id:req.params.id}

        
        const petsDB = await Users.findOneAndUpdate(filter,{
            $addToSet:{
                putPets:req.body.searchs }
         });
         console.log(putPets)
         
        
        if(petsDB.photo){
            deleteFile(petsDB.photo)
        }
        
        return res.status(200).json(petsDB);
    } catch (error){
        return res.status(500).json(error)
    }
};

module.exports = {register, login, logout,getAllUsers,addPets}