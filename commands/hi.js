const fs = require("fs");
const path = require("path");

module.exports = {
    name: "hi",
    async execute(sock, jid, msg, args, config) {
        const senderName = msg.pushName || "Friend";

        const caption = `
🌟 *Hello ${senderName}!* 🌟

✨ Welcome to *${config.botName}* ✨  
We’re glad to have you here!  

💡 To see all available commands, just type: *${config.prefix}help*

┌─「 *CONTACT* 」
│ 🤖 Bot   : ${config.botName}
│ 👨‍💻 Owner : GGRiviya
│ 📌 Owner No : ${config.ownerNumber}
└───────────────⭕
        `;

        await sock.sendMessage(jid, {
            image: { url: "./images/banner.jpg" }, // use a nice welcome image
            caption: caption.trim()
        });
    }
};
