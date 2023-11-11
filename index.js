const express = require('./config/express');
const {logger} = require('./config/winston');
const http = require("http");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const {instrument} = require("@socket.io/admin-ui")
const moment = require("moment");
const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
      }
  });

instrument(io, {
    auth: false,
    mode: "development",
});

const port = 3000;

function publicRooms() {
    const{
        sockets:{
            adapter: { sids, rooms },
        },
    } = io;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

function countRoom(roomName){
    return io.sockets.adapter.rooms.get(roomName)?.size;
}

io.on("connection", (socket) =>{
    socket["nickname"] = "Anon";
    socket.onAny((event) => console.log(`Socket Event: ${event}`));
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nicknamed, countRoom(roomName));
        io.sockets.emit("room_change", publicRooms());
    })
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1));
    });
    socket.on("disconnect", () => {
        io.sockets.emit("room_change", publicRooms());
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    })
    socket.on("nickname", (nickname) => socket["nickname"] = nickname);
});

server.listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);