const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema ({
    content: { type: String }
});
const messageModel = mongoose.model("Message", messageSchema);

console.log();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("chat message", (msg) => {
        // console.log("message: " + msg);
        console.log(msg);
        console.log(msg.message);
        console.log(msg["message"])
        const message = new messageModel();
        // message.content = message.message; output: { _id: new ObjectId('67dcdba24ae46cf021397c1c') }
        message.content = `${msg.message}`;
        console.log(message.content);
        message.save().then(m => {
            io.emit("chat message", msg);
            console.log(m.message);
        });
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

server.listen(3000, async function() {
    await mongoose.connect("mongodb+srv://litong:sepsu4-qyzhog-fibRim@cluster0.pqmhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("listening on *:3000");
    const findResult = await messageModel.find();
    console.log(findResult) 
    // console.log("Found documents =>", findResult);
});





// mongodb+srv://litong:sepsu4-qyzhog-fibRim@cluster0.pqmhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0