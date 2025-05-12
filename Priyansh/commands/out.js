module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "RDX_ZAIN",
    description: "",
    commandCategory: "Admin",
    usages: "out [id]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
    const threadID = args[0] ? args[0] : event.threadID;
    const botID = api.getCurrentUserID();

    api.sendMessage("Main apne owner ke kehne par group chhod raha hoon.", threadID, (err) => {
        if (err) return console.error("Message send error:", err);
        
        // After message is sent successfully, leave the group
        api.removeUserFromGroup(botID, threadID);
    });
};
