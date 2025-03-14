const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
    socket.on("typingStart", () => {
        io.emit("typingStart", socket.userId);
        console.log("started typing...");
    });
    socket.on("typingStop", () => {
        io.emit("typingStop", socket.userId);
        console.log("stopped typing...");
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});