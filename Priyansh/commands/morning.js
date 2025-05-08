const fs = require("fs");
module.exports.config = {
	name: "morning",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", 
	description: "Responds to good morning messages",
	commandCategory: "no prefix",
	usages: "good morning",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.toLowerCase().startsWith("good morning") || 
        event.body.toLowerCase().startsWith("gud morning") || 
        event.body.toLowerCase().includes("morning")) {
		var msg = {
			body: "🌞✨ Gᴏᴏᴅ Mᴏʀɴɪɴɢ! 💐 Hᴀᴠᴇ A Bʟᴇssᴇᴅ Dᴀʏ Aʜᴇᴀᴅ! 🌼 🌸 ☕\n\n✯ ✨ •.¸✯¸.• ✨ ✯ ✨ •.¸✯¸.• ✨",
			attachment: fs.createReadStream(__dirname + `/cache/morning.gif`)
		};
		api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🌞", event.messageID, (err) => {}, true);
	}
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
    // Run function can be used for testing or manual execution if needed
};
