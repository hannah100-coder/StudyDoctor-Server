const express = require('./config/express');
const {logger} = require('./config/winston');
const http = require("http");
const app = express();
const path = require('path');
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");
const io = socketIO(server, {
    cors: {
      origin: "https://ojs201.github.io",
      credentials: true,
      allowedHeaders: "https://ojs201.github.io",
      optionsSuccessStatus: 200,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
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