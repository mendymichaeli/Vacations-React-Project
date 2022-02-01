const con = require('../utils/database')
const users = require('../models/usersModel');
const Vacations = require('../models/vacationsModel');
const followingVacations = require('../models/followingVacationsModel');


exports.createUsers = async (req, res) => {
    //valitation for register
    console.log("result1:",req.body)
    await users.findOne({ where: { email: req.body.email}}).then(result => {
        console.log("findOne:",result);
        if(result!=null){
            res.send({message:"this email is already exist in system, please login!"})
            return
        }
        users.create(req.body).then(result => {
            res.send({result,message:'Registration Successful'})
        }).catch(err => {
            res.send("error createUsers1" + JSON.stringify(err))
        })           
    }).catch(err => {
        res.send("error createUsers2" + JSON.stringify(err))
    })
 
}
exports.getAllVacations = async (req, res) => {
    await Vacations.findAll({ include: [followingVacations]}).then(result => {
        console.log("include",result);
        res.send(result)        
    }).catch(err => {
        res.send("error getAllVacations")
    })
}

exports.getUserForLogin = async (req, res) => {
    await users.findOne({ where: { email: req.body.email, password: req.body.password }}).then(result => {
        result={...result.dataValues,isLogged:true}
        console.log(result);
        res.send(result)        
    }).catch(err => {
        res.send("error getUserForLogin")
    })
}

exports.checkFollow = async (req, res) => {
    let mycount= await followingVacations.findAndCountAll({where: {vacationId:req.body.v.id}})
    await Vacations.update({followers:mycount.count}, { where: { id: req.body.v.id } })
    await followingVacations.findOne({ where: { userId: req.body.userId, vacationId: req.body.v.id } }).then(result => {
        console.log("follow:",result);
        res.send(result)
    }).catch(err => {
        res.send("error checkFollow" + JSON.stringify(err))
    })   
}
exports.followingVacations = async (req, res) => {
    let followObj={userId: req.body.userId,vacationId:req.body.v.id}
    await followingVacations.create(followObj);
    let mycount= await followingVacations.findAndCountAll({where: {vacationId:req.body.v.id}})
    await Vacations.update({followers:mycount.count}, { where: { id: req.body.v.id } }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error followerPlus" + JSON.stringify(err))
    })   
}
exports.UnfollowVacation = async (req, res) => {    
     await followingVacations.destroy({ where:{ userId: req.body.userId, vacationId:req.body.v.id}});
     let mycount= await followingVacations.findAndCountAll({where: {vacationId:req.body.v.id}})
     await Vacations.update({followers:mycount.count}, { where: { id: req.body.v.id } }).then(result => {
         res.send(result)
     }).catch(err => {
         res.send("error followerMinus" + JSON.stringify(err))
     })
}
