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

module.exports.run = function({ api, event, args }) {
    const threadID = args[0] ? args[0] : event.threadID;
    const botID = api.getCurrentUserID();

    api.sendMessage("Main apne owner ke kehne par group chhod raha hoon.", threadID, function(err) {
        if (err) return console.error("Message send error:", err);

        // Message successfully sent, now wait 2 seconds before leaving
        setTimeout(() => {
            api.removeUserFromGroup(botID, threadID);
        }, 2000); // 2 seconds delay
    });
};
