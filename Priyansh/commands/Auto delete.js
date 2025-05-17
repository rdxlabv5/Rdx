module.exports.config = {
	name: "autoUnsend",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Modified by ChatGPT (original: Priyansh Rajput)",
	description: "React 👍 to bot message to auto-unsend it",
	commandCategory: "system",
	usages: "React 👍 to bot message",
	cooldowns: 0
};

module.exports.handleReaction = async function({ api, event }) {
	try {
		// Check if the reaction is 👍 and if it's on a bot's message
		if (event.reaction === "👍" && event.userID !== api.getCurrentUserID()) {
			const messageInfo = await api.getMessageInfo(event.messageID);
			if (messageInfo.senderID == api.getCurrentUserID()) {
				// Bot unsends its own message
				await api.unsendMessage(event.messageID);
			}
		}
	} catch (err) {
		console.error("Error in autoUnsend:", err);
	}
};
