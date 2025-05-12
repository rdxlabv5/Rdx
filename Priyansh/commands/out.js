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

    try {
        await api.sendMessage("Main apne owner ke kehne par group chhod raha hoon.", threadID);
        await api.removeUserFromGroup(api.getCurrentUserID(), threadID);
    } catch (error) {
        console.error("Error while trying to leave the group:", error);
    }
}
