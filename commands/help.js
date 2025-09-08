const fs = require("fs");
const path = require("path");

module.exports = {
    name: "help",
    async execute(sock, jid, msg, args, config) {
        const senderName = msg.pushName || "Friend";

        const caption = `
👋 *Hello ${senderName}!*  

🛠️ *Here are the available commands:* 🛠️

┌─「 *COMMANDS LIST* 」
│ 📌 *${config.prefix}about*  - See details about the bot
│ 📌 *${config.prefix}mmumarks*  - See MMU Members Marks
│ 📌 *${config.prefix}hi* - Get a warm welcome
│ 📌 *${config.prefix}denneubata*  - Threaten someone
│ 📌 *${config.prefix}qr <link>* - Generate QR code
└───────────────⭕  

💡 Type the command exactly as shown to use it.

        `;

        await sock.sendMessage(jid, {
            image: { url: "./images/banner.jpg" }, // optional: add a help banner image
            caption: caption.trim()
        });
    }
};
