module.exports.config = {
	name: "autoUnsend",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Modified by ChatGPT",
	description: "React 👍 to bot message to auto-unsend it",
	commandCategory: "system",
	usages: "React 👍 to bot message",
	cooldowns: 0
};

module.exports.handleReaction = async function({ api, event }) {
	console.log("Reaction detected:", event.reaction); // Debug line
	try {
		if (event.reaction === "👍" && event.userID !== api.getCurrentUserID()) {
			const msgInfo = await api.getMessageInfo(event.messageID);
			if (msgInfo.senderID == api.getCurrentUserID()) {
				await api.unsendMessage(event.messageID);
			}
		}
	} catch (err) {
		console.error("Error in autoUnsend:", err);
	}
};
