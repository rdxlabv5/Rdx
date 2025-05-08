module.exports.config = {
  name: "pasta", // Command for Pasta
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random Pasta GIFs", 
  commandCategory: "Image",
  usages: "pasta", 
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
    "https://i.imgur.com/81Han18.gif",
    "https://i.imgur.com/B7WMjHF.gif",
    "https://i.imgur.com/Iwtd6el.gif",
    "https://i.imgur.com/bo45JVs.gif",
    "https://i.imgur.com/CAJu6vA.gif"
  ];

  // React with 🍝 emoji
  api.setMessageReaction("🍝", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage(
    "𝗝𝗜 𝗝𝗜, 𝗔𝗔𝗣𝗞𝗜 𝗗𝗘𝗠𝗔𝗡𝗗 𝗣𝗘𝗦𝗛 𝗛𝗔𝗜! 🍝\n𝗔𝗖𝗛𝗘𝗬 𝗦𝗘 𝗣𝗔𝗞𝗔 𝗛𝗨𝗔 𝗣𝗔𝗦𝗧𝗔 𝗔𝗨𝗥 𝗠𝗔𝗛𝗞𝗧𝗘 𝗛𝗨𝗘 𝗧𝗔𝗭𝗚𝗘𝗘𝗦𝗧𝗘 𝗦𝗔𝗨𝗥𝗦 𝗔𝗞𝗛𝗥𝗜𝗔𝗧 𝗞𝗘 𝗦𝗔𝗔𝗧𝗛! 🤤\n𝗔𝗣𝗞𝗜 𝗣𝗘𝗦𝗔𝗡𝗗 𝗞𝗔 𝗦𝗛𝗨𝗞𝗥𝗜𝗬𝗔! ❤️",
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
