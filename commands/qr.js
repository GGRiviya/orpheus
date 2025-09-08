const QRCode = require("qrcode");

module.exports = {
    name: "qr",
    async execute(sock, jid, msg, args, config) {
        const text = args.join(" "); // take text or URL from command

        if (!text) {
            return await sock.sendMessage(jid, {
                text: `❌ Please provide a URL or text to generate QR code.\nExample: ${config.prefix}qr https://example.com`
            });
        }

        try {
            // Generate QR code as Data URL
            const qrDataUrl = await QRCode.toDataURL(text);

            const caption = `
🤖 *QR Code Generator v1.1*

📲 Here is your QR code for:
${text}
            `;

            await sock.sendMessage(jid, {
                image: { url: qrDataUrl },
                caption: caption.trim()
            });
        } catch (err) {
            console.error(err);
            await sock.sendMessage(jid, { text: "❌ Failed to generate QR code." });
        }
    }
};
