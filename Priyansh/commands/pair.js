module.exports.config = {
  name: "pair",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "D-Jukie (Xuyên get)",
  description: "Pairing",
  commandCategory: "Love", 
  usages: "pair", 
  cooldowns: 15
};
module.exports.run = async function({ api, event,Threads, Users }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];

        var { participantIDs } =(await Threads.getData(event.threadID)).threadInfo;
        var tle = Math.floor(Math.random() * 101);
        var namee = (await Users.getData(event.senderID)).name
        const botID = api.getCurrentUserID();
        const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
        var id = listUserID[Math.floor(Math.random() * listUserID.length)];
        var name = (await Users.getData(id)).name
        var arraytag = [];
                arraytag.push({id: event.senderID, tag: namee});
                arraytag.push({id: id, tag: name});

  
        let Avatar = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );

        let gifLove = (await axios.get( `https://i.ibb.co/wC2JJBb/trai-tim-lap-lanh.gif`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8") );

        let Avatar2 = (await axios.get( `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );

        var imglove = [];
              
              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

       var msg = {body: `𝐎𝐰𝐧𝐞𝐫 ➳     🦋 𝐂𝐇𝐔𝐙𝐈 𝐊𝐀 𝐂𝐀𝐑𝐓𝐎𝐎𝐍 \n\n[•°•♡•°•═══✧🌙✧═══•°•♡•°•]  /n 💫 𝐓𝐞𝐫𝐚 𝐧𝐚𝐦 𝐝𝐢𝐥 𝐩𝐞 𝐥𝐢𝐤𝐡 𝐥𝐢𝐲𝐚 𝐡𝐚𝐢...  /n 💞 𝐇𝐚𝐫 𝐝𝐡𝐚𝐝𝐤𝐧 𝐛𝐚𝐬 𝐭𝐞𝐫𝐢 𝐛𝐚𝐭 𝐤𝐚𝐫𝐭𝐢 𝐡𝐚𝐢... /n /n [•°•♡•°•═══✧🌸✧═══•°•♡•°•] \n\n◈━━━『💗』━━━◈\n[•°•☆•°•╬═🌷✨ 𝐄𝐤 𝐝𝐢𝐧 𝐚𝐢𝐬𝐚 𝐛𝐡𝐢 𝐚𝐲𝐞 𝐣𝐚𝐧𝐞𝐦𝐚𝐧...\n💖 𝐣𝐚𝐛 𝐡𝐮𝐦𝐞𝐢𝐧 𝐝𝐞𝐤𝐡𝐤𝐚𝐫 𝐭𝐞𝐫𝐚 𝐝𝐢𝐥 𝐝𝐡𝐚𝐝𝐤𝐞...\n💌 𝐀𝐮𝐫 𝐭𝐮 𝐛𝐨𝐥𝐞 — \"𝐇𝐚𝐧 𝐦𝐮𝐣𝐡𝐞 𝐛𝐡𝐢 𝐩𝐲𝐚𝐫 𝐡𝐚𝐢 𝐭𝐮𝐦𝐬𝐞...\" ✨\n•°•❀•°•╬═🌸]\n\n◈━━━『💗』━━━◈\n\n◈━━━『💗』━━━◈\n ➤ 𝓝𝓪𝓶𝓮 ✮ ${namee} \n➤ 𝓝𝓪𝓶𝓮 ✮${name} \n◈━━━『💗』━━━◈\n\n🌸🍁The odds are: ${tle}%\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
}
