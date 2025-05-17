module.exports.config = {
	name: "autoUnsend",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Modified by ChatGPT",
	description: "Auto-unsend bot's message when someone reacts with 👍",
	commandCategory: "system",
	usages: "autoUnsend",
	cooldowns: 0
};

module.exports.handleReaction = async function({ api, event }) {
	try {
		// Check if reaction is 👍 and if the message was sent by the bot
		if (event.reaction === "👍" && event.userID !== api.getCurrentUserID()) {
			// Get the message info
			const messageInfo = await api.getMessageInfo(event.messageID);
			
			// Only unsend if bot sent the original message
			if (messageInfo.senderID === api.getCurrentUserID()) {
				await api.unsendMessage(event.messageID);
			}
		}
	} catch (err) {
		console.error("AutoUnsend Error:", err);
	}
};
