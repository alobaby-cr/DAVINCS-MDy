const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUNaQjZpWm5VVzRhVlU1NHN6YVRRS1VPVDM1WTkrN1Q0VFJVKzFrTzdGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1RTMFYvRy9jdTlxNk92UVQvL05qNVNTbFJJRXF4dkFaQy9YQ0FBMnRqMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TGZUaW5BSjl6azNTMFc5aHVTbWRUNEJCeGVrMWZ0enVnSktYQXR3czNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnZS9JNjhvakdVU2dGc3duUDgvSzhiS0Q5YmJlRTJOUlgyMFk2T0ZLMEY0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndHckl1ODdXNytrZnJaVGp2cHAxWW1XZVVmdnFSYlNKanpKTmJjQzdaV0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNzdG11dmxaTE92cUw0RzUwdjRMM0FIOXdBL0QzTmdVR2NTMzlNN0ZFRUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia01tMWFsYlUzSXJVcWpMYXFyRGtINlBDWFhSeGgvTy9adHJtc2dmK2JYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQjhJWkJUdnQxSzNMMjQvZlNlc3NMUTltbkZnbjdqVUVaT09xU1Q0NVQxST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlF0U2JuRCtwV1BEOXlJNE5URGhGNmplN0ZYTHIwa2VtL0xRWW50VkNtQlc4WDNNaFZmMG1FSVNyN2pRNEhRZTZ6TmtvTFBiZ3NNOUptbkNFQWF4TmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6IjR4Rm5HYTFqVDJ4bEJzbXRLMXBPWFFjMHpmNHR2MWR4Z0FzRWhDa0w2MUE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkFqcWVMY2d6UnUyTnBaT3RqZGpUM2ciLCJwaG9uZUlkIjoiZjViNzZhNzYtYjE4YS00NjkxLWFiZTItYmVlZjZiZDE1ZTAzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5hTnF4MW4ramtCdkhWcDF1cjRMdjAwWksxdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBZk43N0VxOVJqSnI1Z0lYcURMYmFVbTFlRnM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTDk0U05BQ1oiLCJtZSI6eyJpZCI6IjI1NTYxNjQ0MjAxMDozMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT2kwM04wSEVKYTEyc0FHR0JjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiclRvdjRsU3loSjRmRTNDT2o4SVdTc05UYjdOVjhCcm9BWjFoK25RLyt4Zz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibkxQMlhyaFNMTTVDdmtiS3BkWEo0aVBaa1F3NHhMOXJmRlJVK2x2TTJjcHZlK3ZZZVZYS003azRndlhYV0I1WDJBYmdBQlBneFJVeVhuUU5jNDlGRGc9PSIsImRldmljZVNpZ25hdHVyZSI6ImQwMEY0eElnekQ3MVVIMnBqb2dtcmdWM2xONUlreEJ4aitpMmZIZnZXd2tiN3FOZlNLTEw4eEVLeHJTT2dXTm81TXZTbVErUWdRRStUUW92a2JyM2hnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjE2NDQyMDEwOjMwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmEwNkwrSlVzb1NlSHhOd2pvL0NGa3JEVTIrelZmQWE2QUdkWWZwMFAvc1kifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDYzMTE4NDMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTDgzIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/9Wish882/DAVINCS-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Nathanael",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255616442010",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "yes",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/oc5rvp.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "on",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by davincs md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakSTEQGZNCk6CqE9E2P",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakSTEQGZNCk6CqE9E2P",
    CAPTION : process.env.CAPTION || "✧⁠DAVINCS_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠DAVINCS_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

