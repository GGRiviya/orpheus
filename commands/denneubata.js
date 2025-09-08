const fs = require("fs");
const path = require("path");

module.exports = {
    name: "denneubata",
    async execute(sock, jid, msg, args, config) {
        const senderName = msg.pushName || "Friend";

        const caption = `


ගේමනම් ගේම...
දෙන්නේ කන පැලෙන්න.....

මීට GGRiviya..


        `;

        await sock.sendMessage(jid, {
            image: { url: "./images/meme.jpeg" }, // optional: add a help banner image
            caption: caption.trim()
        });
    }
};
