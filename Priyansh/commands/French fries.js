module.exports.config = {
  name: "frenchfries", // Command for French Fries
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random French Fries GIFs", 
  commandCategory: "Image",
  usages: "frenchfries", 
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
    "https://i.imgur.com/Cy4d0lg.gif",
    "https://i.imgur.com/822wD5F.gif",
    "https://i.imgur.com/DD91mZX.gif"
  ];

  // React with 🍟 emoji
  api.setMessageReaction("🍟", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage(
    "𝗜𝗳 𝗳𝗿𝗲𝗻𝗰𝗵 𝗳𝗿𝗶𝗲𝘀 𝗰𝗼𝘂𝗹𝗱 𝗯𝗲 𝗵𝗮𝗽𝗽𝗶𝗻𝗲𝘀𝘀, 𝘁𝗵𝗲𝗻 𝘁𝗵𝗲𝘀𝗲 𝗳𝗿𝗶𝗲𝘀 𝗮𝗿𝗲 𝗽𝗲𝗿𝗳𝗲𝗰𝘁! 🍟\n𝗧𝗵𝗲𝘀𝗲 𝗳𝗿𝗲𝗻𝗰𝗵 𝗳𝗿𝗶𝗲𝘀 𝗮𝗿𝗲 𝗵𝗲𝗮𝗩𝗘𝗟𝗬 𝗰𝗿𝗶𝘀𝗽 𝗮𝗻𝗱 𝗵𝗮𝘃𝗲 𝗮 𝗰𝗼𝗼𝗹𝗶𝗻𝗴 𝗳𝗹𝗮𝗵𝗻𝗲𝘀𝘀! 𝗕𝗲𝗵𝗮𝗹𝗮 𝗯𝗮𝗿𝘂𝘀 𝗯𝗲𝗹𝗹𝗮!!! 😋",
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
