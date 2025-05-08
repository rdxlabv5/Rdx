module.exports.config = {
  name: "pizza", // Command for Pizza
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random Pizza image or GIF", // Updated description
  commandCategory: "Image",
  usages: "pizza", // Updated usage
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  
  var link = [
    "https://i.imgur.com/4Yc8XQt.gif",
    "https://i.imgur.com/1o2VYMy.gif",
    "https://i.imgur.com/WhsCanW.gif",
    "https://i.imgur.com/QGZvX80.jpeg",
    "https://i.imgur.com/o1YKGF9.gif"
  ];

  // React with 🍕 emoji
  api.setMessageReaction("🍕", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage(
    "𝗣𝗜𝗭𝗭𝗔 𝗟𝗢𝗩𝗘𝗥𝗦 𝗔𝗟𝗘𝗥𝗧! 🍕\n𝗬𝗘𝗛 𝗟𝗜𝗝𝗜𝗬𝗘 𝗔𝗔𝗣 𝗞𝗘 𝗣𝗔𝗦𝗔𝗡𝗗𝗘𝗗𝗔 𝗣𝗜𝗭𝗭𝗔 𝗞𝗘 𝗦𝗔𝗧𝗛 𝗞𝗨𝗖𝗛 𝗔𝗨𝗥 𝗠𝗔𝗭𝗘𝗗𝗔𝗥! 😍\n𝗜𝗡𝗝𝗢𝗬 𝗬𝗢𝗨𝗥 𝗩𝗜𝗥𝗧𝗨𝗔𝗟 𝗦𝗟𝗜𝗖𝗘! 🤤",
    event.threadID,
    () => {
      // Once the initial message is sent, proceed to send the image or GIF
      var callback = () => api.sendMessage(
        { body: `MADE BY RDX: ${link.length}`, attachment: fs.createReadStream(__dirname + "/cache/1.gif") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.gif"),
        event.messageID
      );

      // Randomly select a link and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.gif"))
        .on("close", () => callback());
    }
  );
};
