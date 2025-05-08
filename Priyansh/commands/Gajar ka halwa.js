module.exports.config = {
  name: "gajarkahalwa", // Command for Gajar ka Halwa
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random Gajar ka Halwa images", 
  commandCategory: "Image",
  usages: "gajarkahalwa", 
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
    "https://i.imgur.com/Btpdm2T.jpeg",
    "https://i.imgur.com/ZIMvJhX.jpeg",
    "https://i.imgur.com/sdQTbHk.jpeg",
    "https://i.imgur.com/hLqTtpi.jpeg"
  ];

  // React with 🥕 emoji
  api.setMessageReaction("🥕", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage(
    "𝗝𝗜 𝗝𝗜, 𝗔𝗔𝗣𝗞𝗜 𝗗𝗘𝗠𝗔𝗡𝗗 𝗣𝗘𝗦𝗛 𝗛𝗔𝗜! 🥕\n𝗚𝗔𝗝𝗔𝗥 𝗞𝗔 𝗛𝗔𝗟𝗪𝗔, 𝗝𝗢 𝗠𝗨𝗛 𝗠𝗘𝗜𝗡 𝗝𝗔𝗔𝗞𝗘 𝗠𝗜𝗧𝗛𝗔𝗦 𝗔𝗨𝗥 𝗔𝗥𝗢𝗠𝗔 𝗖𝗛𝗛𝗢𝗥 𝗗𝗘𝗬! 🤤\n𝗔𝗣𝗞𝗘 𝗟𝗜𝗘 𝗧𝗔𝗬𝗔𝗥 𝗛𝗔𝗜 𝗬𝗘 𝗞𝗛𝗔𝗔𝗦 𝗠𝗜𝗧𝗛𝗔𝗜! ❤️",
    event.threadID,
    () => {
      // Once the initial message is sent, proceed to send the image
      var callback = () => api.sendMessage(
        { body: `MADE BY RDX: ${link.length}`, attachment: fs.createReadStream(__dirname + "/cache/1.jpg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpg"),
        event.messageID
      );

      // Randomly select a link and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpg"))
        .on("close", () => callback());
    }
  );
};
