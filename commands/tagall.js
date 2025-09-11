// commands/tagall.js
module.exports = {
  name: "tagall",
  description: "Mention all group members (with optional custom message)",
  async execute(sock, jid, msg, args) {
    try {
      // ✅ Check if the chat is a group
      if (!jid.endsWith("@g.us")) {
        return await sock.sendMessage(jid, {
          text: "❌ This command only works in *groups*.",
        });
      }

      // Get group metadata
      const groupMetadata = await sock.groupMetadata(jid);
      const participants = groupMetadata.participants;

      // Collect all member IDs
      const mentions = participants.map(p => p.id);

      // Custom message if provided
      const customMessage = args.length > 0 ? args.join(" ") : "📢 Everyone!";

      // Send message with mentions
      await sock.sendMessage(jid, {
        text: `*${customMessage}*\n\n` + mentions.map(u => `@${u.split("@")[0]}`).join(" "),
        mentions,
      });
    } catch (err) {
      console.error("Error in !tagall:", err);
      await sock.sendMessage(jid, { text: "❌ Failed to tag members." });
    }
  },
};
