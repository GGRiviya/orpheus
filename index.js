const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode"); // ✅ for web
const express = require("express");
const config = require("./config");

const app = express();
const PORT = 3000;

let qrDataUrl = ""; // Will hold the current QR code

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session");
    const sock = makeWASocket({ auth: state });

    // Handle QR code
    sock.ev.on("connection.update", async (update) => {
        const { qr, connection } = update;

        if (qr) {
            // Generate QR code as data URL for frontend
            qrDataUrl = await QRCode.toDataURL(qr);
            console.log("📲 New QR code generated, scan from frontend");
        }

        if (connection === "open") {
            console.log("✅ Bot connected to WhatsApp");
        }
    });

    sock.ev.on("creds.update", saveCreds);

    // Load commands
    const commands = new Map();
    const commandFiles = fs.readdirSync(path.join(__dirname, "commands"));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.set(command.name, command);
    }

    // Handle messages
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;
        const jid = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!text || !text.startsWith(config.prefix)) return;

        const args = text.trim().split(/ +/).slice(1);
        const commandName = text.trim().split(/ +/)[0].slice(config.prefix.length).toLowerCase();
        const command = commands.get(commandName);

        if (command) {
            try {
                await command.execute(sock, jid, msg, args, config);
            } catch (e) {
                console.error(e);
                await sock.sendMessage(jid, { text: "❌ Command Error" });
            }
        }
    });
}

// ✅ Express route to serve QR code page
app.get("/", (req, res) => {
    res.send(`
        <html>
        <head>
            <title>WhatsApp QR Login</title>
        </head>
        <body style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;">
            <h1>Scan QR to login</h1>
            ${qrDataUrl ? `<img src="${qrDataUrl}" />` : "<p>Waiting for QR...</p>"}
            <script>
                setInterval(() => location.reload(), 5000); // refresh every 5s to get new QR
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🌐 QR code page running at http://localhost:${PORT}`);
});

startBot();
