const axios = require("axios");

module.exports = {
    name: "mmumarks",
    async execute(sock, jid, msg, args, config) {
        try {
            // Fetch members data
            const membersRes = await axios.get("https://marks.vercel.app/api/members");
            const members = membersRes.data;

            // Fetch last update data
            const updateRes = await axios.get("https://marks.vercel.app/api/last-update");
            const lastUpdated = updateRes.data.lastUpdated || new Date();

            // Format date nicely
            const formattedDate = new Date(lastUpdated).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            });

            if (!members || members.length === 0) {
                return await sock.sendMessage(jid, {
                    text: "❌ No member data found."
                });
            }

            // Format message
            let message = `📊 *Media Unit Members Marks*\n`;
            message += `🕒 Last Update: *${formattedDate}*\n`;
            message += `─────────────────────────\n`;

            members.forEach((member, index) => {
                message += `*${index + 1}. ${member.name}*\n`;
                message += `📌 Marks: *${member.marks}*\n`;
                message += `─────────────────────────\n`;
            });

            message += `💡 Type ${config.prefix}help to see all commands.`;

            // Send image with caption
            await sock.sendMessage(jid, {
                image: { url: "./images/marksbanner.jpg" },
                caption: message.trim()
            });

        } catch (error) {
            console.error(error);
            await sock.sendMessage(jid, {
                text: "❌ Failed to fetch member marks. Please try again later."
            });
        }
    }
};
