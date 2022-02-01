const express = require('express');
const app = express();
const cors = require('cors');
var path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('./utils/database');
const followingVacationsModel= require('./models/followingVacationsModel')
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = 5000

/* app.use(express.static(path.join(__dirname, 'uploads'))); */
/*  app.use('/uploads', express.static('uploads'));  */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))


const usersRoute = require('./routes/usersRoute');
app.use("/users", usersRoute);
const adminRoute = require('./routes/adminRoute');
app.use("/admin", adminRoute);
const FilesRoute = require('./routes/filesRoute');
const vacationsModel = require('./models/vacationsModel');
const usersModel = require('./models/usersModel');
app.use(FilesRoute);



vacationsModel.hasMany(followingVacationsModel, {
    foreignKey: 'vacationId'
  })
followingVacationsModel.belongsTo(vacationsModel);



io.on('connection', socket => {
    console.log('New client connected')

    socket.on('vacationsChanged', () => {
        console.log('vacationsChanged')
        io.sockets.emit('vacationsChanged')
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

sequelize.sync().then(result => {
    app.listen(8888);
}).catch(err => {
    // logger.log("error", "ERRR " + JSON.stringify(err))
})
server.listen(port, () => console.log(`Listening on port ${port}`))