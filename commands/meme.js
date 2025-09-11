const axios = require("axios");

module.exports = {
    name: "meme",
    async execute(sock, jid, msg, args, config) {
        try {
            // Fetch memes list from Imgflip
            const res = await axios.get("https://api.imgflip.com/get_memes");
            const memes = res.data.data.memes;

            if (!memes || memes.length === 0) {
                return await sock.sendMessage(jid, { text: "❌ No memes found." });
            }

            // Pick a single random meme
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];

            // Send meme (only one)
            await sock.sendMessage(jid, {
                image: { url: randomMeme.url },
                caption: `😂 *Random Meme Generator v1.0*\n🎭 ${randomMeme.name}`
            });

        } catch (err) {
            console.error(err);
            await sock.sendMessage(jid, { text: "❌ Failed to fetch meme." });
        }
    }
};
