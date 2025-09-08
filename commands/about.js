const fs = require("fs")
const path = require("path")

module.exports = {
    name: "about",
    async execute(sock, jid, msg, args, config) {
        const senderName = msg.pushName || "Friend";

        const caption = `
👋 *Hello ${senderName}*  

🔮 *Welcome To ${config.botName}* 🔮

┌─「 *ABOUT BOT* 」
│ 🤖 Bot   : ${config.botName}
│ 👨‍💻 Owner No : ${config.ownerNumber.join(", ")}
│ 📌 Prefix : ${config.prefix}
│ 📊 Version: 1.0
│ 📅 Active : 24/7
└───────────────⭕
        `

        // ✅ Use file path directly
        await sock.sendMessage(jid, {
            // image: { url: "./images/banner.jpg" },
            // caption.trim();
            image: { url: "./images/banner.jpg" }, // use a nice welcome image
            caption: caption.trim()
        })
    }
}

