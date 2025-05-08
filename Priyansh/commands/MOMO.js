module.exports.config = {
  name: "momo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Send a random momo image",
  commandCategory: "Image",
  usages: "momo",
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
  
  // Updated momo image links
  var link = [
    "https://i.imgur.com/6Egc0gc.jpeg",
    "https://i.imgur.com/3cYiWV9.jpeg",
    "https://i.imgur.com/Z8EI71F.jpeg",
    "https://i.imgur.com/D1R4TTu.jpeg",
    "https://i.imgur.com/tqMoGIW.jpeg",
    "https://i.imgur.com/pWRIXPl.jpeg"
  ];

  // React with 🥟 emoji
  api.setMessageReaction("🥟", event.messageID, (err) => {}, true);

  // Fun and engaging message
  api.sendMessage(
    "𝗟𝗔𝗛 𝗝𝗜! 🥟 𝗠𝗢𝗠𝗢 𝗞𝗔 𝗠𝗢𝗢𝗗 𝗛𝗢 𝗚𝗬𝗔 𝗟𝗔𝗚𝗧𝗔 𝗛𝗔𝗜! ✨\n𝗦𝗜𝗧𝗔𝗠 𝗛𝗜 𝗛𝗔𝗜, 𝗦𝗔𝗕 𝗞𝗘𝗛𝗡𝗔𝗬 𝗣𝗘 𝗟𝗔𝗔 𝗗𝗜𝗔 𝗠𝗢𝗠𝗢 𝗕𝗛𝗜. 😍",
    event.threadID,
    () => {
      // Send the image after the message
      var callback = () => api.sendMessage(
        { body: `𝗠𝗔𝗗𝗘 𝗕𝗬 𝗥𝗗𝗫: ${link.length} 𝗠𝗢𝗠𝗢 𝗜𝗠𝗔𝗚𝗘𝗦 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘!`, attachment: fs.createReadStream(__dirname + "/cache/1.jpeg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpeg"),
        event.messageID
      );

      // Randomly select a momo image and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpeg"))
        .on("close", () => callback());
    }
  );
};
