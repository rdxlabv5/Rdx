module.exports.config = {
	name: "autoUnsend",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Modified by ChatGPT",
	description: "React 👍 to auto-unsend bot's message",
	commandCategory: "system",
	usages: "",
	cooldowns: 0
};

module.exports.run = async function({ api, event }) {
	const message = {
		body: "React 👍 to delete this message",
	};
	const sent = await api.sendMessage(message, event.threadID);
	
	// Save this message ID for tracking reactions
	global.client.reactionMessages.set(sent.messageID, {
		name: this.config.name,
		author: event.senderID // optional: to allow only specific user
	});
};

module.exports.handleReaction = async function({ api, event }) {
	if (event.reaction !== "👍") return;
	const msgInfo = global.client.reactionMessages.get(event.messageID);
	if (!msgInfo) return;

	try {
		await api.unsendMessage(event.messageID);
		global.client.reactionMessages.delete(event.messageID); // clean up
	} catch (err) {
		console.error("Error unsending message:", err);
	}
};
