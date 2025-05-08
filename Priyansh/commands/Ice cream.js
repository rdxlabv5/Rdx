module.exports.config = {
  name: "icecream", // Command for Ice Cream
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random Ice Cream GIFs", 
  commandCategory: "Image",
  usages: "icecream", 
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
    "https://i.imgur.com/FaUU8sc.gif",
    "https://i.imgur.com/8AXk76Q.gif",
    "https://i.imgur.com/MrdsGXq.gif"
  ];

  // React with 🍦 emoji
  api.setMessageReaction("🍦", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage(
    "𝗝𝗜 𝗝𝗜, 𝗜𝗦𝗞𝗘 𝗦𝗔𝗔𝗧𝗛 𝗔𝗧𝗛𝗘𝗟𝗜𝗧𝗘 𝗠𝗜𝗧𝗛𝗔𝗜 𝗮𝗵𝗮𝗵 𝗝𝗔𝗨𝗡𝗜𝗧𝗘 𝗠𝗜𝗦𝗛𝗧𝗜 𝗜𝗡 𝗜𝗖𝗘 𝗖𝗥𝗘𝗔𝗠! 🍦\n𝗜𝗖𝗘 𝗖𝗥𝗘𝗔𝗠 𝗦𝗘 𝗘𝗙𝗙𝗘𝗖𝗧𝗜𝗩𝗘 𝗛𝗔𝗜 𝗝𝗜𝗦𝗦𝗘 𝗠𝗢𝗛𝗔𝗕𝗕𝗔𝗧𝗜𝗡 𝗦𝗛𝗘𝗗 𝗛𝗢𝗧𝗜 𝗛𝗔𝗜! 🤤\n𝗖𝗛𝗔𝗟𝗢 𝗔𝗣𝗞𝗘 𝗟𝗜𝗘 𝗚𝗘𝗥𝗠𝗘𝗥𝗔 𝗜𝗦𝗖𝗥𝗘𝗔𝗠 𝗦𝗢𝗢𝗥𝗚𝗘 𝗜𝗡 𝗧𝗢𝗡𝗬𝗜𝗞𝗘! ❤️",
    event.threadID,
    () => {
      // Once the initial message is sent, proceed to send the GIF
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
