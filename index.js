const express = require('./config/express');
const {logger} = require('./config/winston');
const http = require("http");
const app = express();
const path = require('path');
const server = http.createServer(app);
const cors = require("cors");
const socketIO = require("socket.io");
const moment = require("moment");
const io = socketIO(server, {
    cors: {
        //origin: "https://ojs201.github.io/"
        origin: "file:///C:/DYStudy/%EC%A2%85%ED%95%A9%EC%84%A4%EA%B3%842/Learning-Management-System"
    }
});
const port = 3000;

io.on("connect", (socket) => {
    socket.on("chatting", (data)=>{
        const { name, msg, rec } = data;
        console.log(name);
        console.log(rec);
        io.emit(name, {
            name,
            msg,
            time: moment(new Date()).format("h:mm A")
        })
        io.emit(rec, {
                    name,
                    msg,
                    time: moment(new Date()).format("h:mm A")
        })
    })
})

server.listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);