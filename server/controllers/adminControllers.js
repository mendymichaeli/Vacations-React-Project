const con = require('../utils/database')
const Vacations = require('../models/vacationsModel');
const followingVacations = require('../models/followingVacationsModel');



exports.getAllVacations = async (req, res) => {
    await Vacations.findAll({ include: [followingVacations] }).then(result => {
        console.log("followingVacations:",result);
        res.send(result)        
    }).catch(err => {
        res.send("error getAllVacations")
    })
}

exports.deleteVacation = async (req, res) => {
    console.log(req.query.id)
    await Vacations.destroy({
        where : {id : req.query.id}
        }).then(result => {
        console.log(result);
        res.send({status:result})
    }).catch(err => {
        res.send("error deleteVacation")
    })
}

exports.createVacation = async (req, res) => {
    console.log(req.body)
    await Vacations.create(req.body).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error createVacation" + JSON.stringify(err))
    })
}
exports.updateVacation = async (req, res) => {
    let ob= req.body
    console.log(ob)
    await Vacations.update(ob, { where: { id: req.body.id } }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send("error updateVacation" + JSON.stringify(err))
    })
}

