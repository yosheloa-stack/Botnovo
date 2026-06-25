/* 
* Não revenda ou repasse esta base para terceiros.
* Se este bot foi vendido descriptografado, você tem permissão apenas para editar.
* Não utilize o nome original do bot.
* Não revenda ele descriptografado ou criptografado.
* Os direitos de criação não foram vendidos.
* Utilize com respeito e responsabilidade.
* Author: YoshGGx.
* Protegido por: YoshGGx.
* Site api pra funcionar os downloads: https://tokito-apis.site
*/

//=============[ COMEÇO DE TUDO ]=============\\
const { downloadContentFromMessage, relayWAMessage, mentionedJid, MediaType, Browser, MessageType, Presence, Mimetype, Browsers, delay, getLastMessageInChat, downloadMediaMessage,WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, logger, makeInMemoryStore, getContentType, INativeFlowMessage, prepareWAMessageMedia, jidNormalizedUser } = require('@whiskeysockets/baileys');

const { fs, Boom, axios, crypto, util, P, linkfy, request, cheerio, ms, ffmpeg, qrterminal, exec, spawn, execSync, moment, color, time, hora, date, getBuffer, convertSticker, recognize, fetchJson, fetchText, fetch, getBase64, createExif, writeExifImg, upload, nit, addBanned, unBanned, BannedExpired, cekBannedUser, validmove, setGame, addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos, palavrasANA, quizanimais, garticArchives, whatMusicAr, enigmaArchive, quizFutebol, getpc, supre, wait, getExtension, generateMessageID, vyroEngine, getGroupAdmins, normalizeJid, getMembros, emoji, sendPoll, getRandom, banner2, banner3, temporizador, chyt, kyun, TimeCount, simih, botoff, colors, os, arcloud, identificarMusica, addFilter, isFiltered, ytdl, psycatgames, MultiDownload, AssemblyAI, obeso, countDays, timeDate, Limit_CMD, capitalizeFirstLetter, shuffle, pushnames, formatNumber, formatNumberDecimal, awaitMessage, listCommands, extractMetadata, extractDDD, extractStateFromNumber, extractStateFromDDD, obrigadoEXT, addNumberMais, identArroba, baixarTikTok, buscarTtk, baixarInstagram, pegarCases, carregarMidia, pinterest } = require('./ARQUIVES/funcoes/exports.js');

const directory = `./DADOS_TOKITO/anti_sp.json`;
const ANT_SP = JSON.parse(fs.readFileSync(directory));

//////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const path = require('path')
const yts = require('yt-search');
const { ytAudio, ytVideo } = require('@vreden/youtube_scraper/dylanmodz.js');
/////////////////\\\\\\\\\\\\\\\\\\\\\\
const { linguagem, MENU, mess, getInfo, destrava, destrava2, tabela, namoro1, namoro2, tools, advices, ban, joguinhodavelhajs, joguinhodavelhajs2, nescessario, setting, logoslink, vip, rgtake, muted, countMessage, sendVideoAsSticker, sendImageAsSticker, sendVideoAsSticker2, sendImageAsSticker2, sotoy, daily, comandos, limitefll, antispam, anotar, enviarfiguUrl, getFileBuffer, DLT_FL, speed, sleep, ANT_LTR_MD_EMJ, packname, getName,chaves, grupos } = require('./ARQUIVES/funcoes/exports.js');

const { botoes, antipv, antipv2, antipv3, visualizarmsg, numero_dono1, numero_dono2, numero_dono3, numero_dono4, numero_dono5, numero_dono6, msgantipv1, msgantipv2, API_KEY_INVERTEXTO } = require("./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json");

const { NomeDoBot, ownerName, prefix, channel, channeldl, group,API_URL, API_KEY_TOKITO,CREDENTIALS_USER } = require('./DADOS_TOKITO/INFO_TOKITO/media/INFO_TOKITO.json');

const { criarPagamentoPix, verificarPix } = require('./ARQUIVES/js/pix.js');
const { v4: uuidv4 } = require('uuid')

// ====== Funcoes migradas do kasane (IA/Audio/Like/ElitePass/VIP2/Consultas) ======
const KS = require('./ARQUIVES/funcoes/kasane_features.js');
try { KS.initDatabase(); } catch (e) { console.log('[KASANE] initDatabase:', e.message); }
try { KS.startAutoLikeScheduler(); } catch (e) { console.log('[KASANE] scheduler:', e.message); }

const palavras = JSON.parse(fs.readFileSync('./DADOS_TOKITO/data/media/forca/palavras.json'));

const forca = require('./DADOS_TOKITO/data/media/forca/index.js');
const frames = JSON.parse(fs.readFileSync('./DADOS_TOKITO/data/media/forca/frames.json'));
const { sendButton, sendListB } = require(`./ARQUIVES/funcoes/botoes.js`)
const { fundolevel, fundo2, fundo1, linklogos, imgnazista, imggay, imgcorno, imggostosa, imggostoso, imgfeio, imggado, imgvesgo, imgbebado, tapacmd, matarcmd, beijocmd, chutecmd, cmdmenu, deathcmd, rnkgay, rnkgado, rnkcorno, rnkgostoso, rnkgostosa, rnknazista, rnkotaku, errocmd, rnkpau, suruba, minado_bomb, thumbnail, imgsigma, imgbeta, imgbaiano, imgbaiana, imgcarioca, imglouco, imglouca, imgsafada, imgsafado, imgmacaco, imgmacaca, imgputa, rnksigma, rnkbeta, rnkbaiano, rnkbaiana, rnkcarioca, rnklouco, rnklouca, rnksafada, rnksafado, rnkmacaco, rnkmacaca, rnkputa, img1, img2, img3, rankbct, rankcu, rankfalido, rankcasal, casal, Gozar, imgperfil, enigma, rvenigma, semimg, comer, capinarlote, pgpeito, pgbunda, morder, sentar, tirarft, carinho, soco, namorar, getcase, criador, fundo, idade, Pix, status, donos, infodono, boquete, cagar, cu, abraco, lavarlouca, matar, leitada, lindacmd, lindocmd, fielcmd, pgpau } = require("./DADOS_TOKITO/INFO_TOKITO/LOGOS/links_img.json");

process.on('uncaughtException', function (err) {
console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
console.error(err.stack);
});

async function starttokito() {

module.exports = tokito = async(upsert, tokito, qrcode) => {
async function startFunctionNaga() {

const ownerNumber = setting.ownerNumber.replace(new RegExp("[()+-/ +/]", "gi"), "")

for (const info of upsert?.messages || []) {
const from = info.key.remoteJid;
const isGroup = from.endsWith('@g.us');
const isStatus = from.endsWith('@broadcast');

const VRF_JSON_GRUPO = fs.existsSync(`./DADOS_TOKITO/grupos/ATIVAÇÕES-TOKITO/${from}.json`) ? true : false;

if(VRF_JSON_GRUPO) {
var jsonGp = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/ATIVAÇÕES-TOKITO/${from}.json`));
}

function createPaymentDetails(text, mentionedJidArray, participant) {
return {
requestPaymentMessage: {
currencyCodeIso4217: "BRL",
amount1000: "100000000000000000",
noteMessage: {
extendedTextMessage: {
text,
contextInfo: {
mentionedJid: [...mentionedJidArray, participant],
forwardingScore: 999,
isForwarded: true
}
}
},
expiryTimestamp: "0",
amount: {
value: "100000000000000000",
offset: 100000000000000000,
currencyCode: "BRL"
}
}
};
}

const DylanModz = (texto, mentions = []) => ({
requestPaymentMessage: {
currencyCodeIso4217: "BRL",
amount1000: "1000",
noteMessage: {
extendedTextMessage: {
text: texto,
contextInfo: {
mentionedJid: mentions,
forwardingScore: 999,
isForwarded: true
}
}
},
expiryTimestamp: "0",
amount: {
value: "1000",
offset: 1000,
currencyCode: "BRL"
}
}
});

function gerarContextNewsletter() {
if (setting.channeldl === "0@newsletter") {
return {}; 
}
return {isForwarded: true, forwardingScore: 1, forwardedNewsletterMessageInfo: {newsletterJid: setting.channeldl, newsletterName: NomeDoBot, serverMessageId: '',}}}

if (VRF_JSON_GRUPO && jsonGp[0].x9 && info.messageStubType) {
const horarioAtual = new Date(info.messageTimestamp * 1000).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

switch (info.messageStubType) {
case 29: { 
if (info.messageStubParameters?.length) {
const promovido = info.messageStubParameters[0];
const promotor = info.participant;
const msg = `*⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 𝐃𝐄 𝐏𝐑𝐎𝐌𝐎𝐂𝐀𝐎 ⚠️*

*ᴏ ᴜsᴜᴀʀɪᴏ @${promovido.split("@")[0]} ꜰᴏɪ ᴘʀᴏᴍᴏᴠɪᴅᴏ ᴀ ᴀᴅᴍ. 🙆‍♂️*

*ᴀᴅᴍ ʀᴇsᴘᴏɴsᴀ́ᴠᴇʟ: @${promotor.split("@")[0]} 🙅‍♂️*

*ᴅᴀᴛᴀ: ${horarioAtual}*`;
const detalhes = createPaymentDetails(msg, [promovido], promotor);
await tokito.relayMessage(from, detalhes, {});
}
}
break;

case 30: {
if (info.messageStubParameters?.length) {
const rebaixado = info.messageStubParameters[0];
const rebaixador = info.participant;
const msg = `*⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 𝐃𝐄 𝐑𝐄𝐁𝐀𝐈𝐗𝐀𝐌𝐄𝐍𝐓𝐎 ⚠️*

*ᴏ ᴜsᴜᴀʀɪᴏ @${rebaixado.split("@")[0]} ꜰᴏɪ ʀᴇʙᴀɪxᴀᴅᴏ ᴀ ᴍᴇᴍʙʀᴏ. 🤷‍♂️*

*ᴀᴅᴍ ʀᴇsᴘᴏɴsᴀ́ᴠᴇʟ: @${rebaixador.split("@")[0]} 🙅‍♂️*

*ᴅᴀᴛᴀ: ${horarioAtual}*`;
const detalhes = createPaymentDetails(msg, [rebaixado], rebaixador);
await tokito.relayMessage(from, detalhes, {});
}
}
break;
}
}

if(!info.message) return;
if(upsert.type == "append") return;
const baileys = require('@whiskeysockets/baileys');
const type = baileys.getContentType(info.message);
const content = JSON.stringify(info.message);
const pushname = info.pushName ? info.pushName : '';

if(visualizarmsg) {
await tokito.readMessages([info.key]);
} else {
if(from == "status@broadcast") return;
}

//==============(BODY)================\\

function extrairTexto(info) {
const paths = [ 'message.conversation', 'message.sendPaymentMessage.noteMessage.extendedTextMessage.text', 'message.requestPaymentMessage.noteMessage.extendedTextMessage.text', 'message.viewOnceMessageV2.message.imageMessage.caption', 'message.viewOnceMessageV2.message.videoMessage.caption', 'message.imageMessage.caption', 'message.videoMessage.caption', 'message.extendedTextMessage.text', 'message.viewOnceMessage.message.videoMessage.caption', 'message.viewOnceMessage.message.imageMessage.caption', 'message.documentWithCaptionMessage.message.documentMessage.caption', 'message.buttonsMessage.imageMessage.caption', 'message.buttonsResponseMessage.selectedButtonId', 'message.listResponseMessage.singleSelectReply.selectedRowId', 'message.templateButtonReplyMessage.selectedId', 'message.pollCreationMessageV3.name', 'message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text', 'message.editedMessage.message.protocolMessage.editedMessage.imageMessage.caption', 'text', 'message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson' ];

for (const path of paths) {
const value = path.split('.').reduce((obj, key) => obj?.[key], info);
if (value) {
if (path.includes('paramsJson')) {
try {
return JSON.parse(value)?.id || '';
} catch {
return '';
}
}
return value;
}
}

return '';
}

var body = extrairTexto(info);
var Procurar_String = body;
const budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/ATIVAÇÕES-TOKITO/${from}.json`) && jsonGp[0].multiprefix) {
var prefix = jsonGp[0]?.prefixos[jsonGp[0]?.prefixos?.indexOf(String(body)?.trim()?.charAt(0))] || jsonGp[0].prefixos[0]
}

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/ATIVAÇÕES-TOKITO/${from}.json`) && !jsonGp[0].multiprefix) {var prefix = setting.prefix} else if(!isGroup) {var prefix = setting.prefix};
let isCmd = body.startsWith(prefix);

const args = isCmd ? body.slice(prefix.length).trim().split(/[ \t]+/) : body.split(/[ \t]+/);

let command = isCmd ? args.shift().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ç/g, "c") : null;

const q = args.join(' ');

var budy = (type === 'conversation') ? info.message?.conversation : (type === 'extendedTextMessage') ? info.message?.extendedTextMessage?.text : '';

var PR_String = Procurar_String.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

try {var groupMetadata = isGroup ?await tokito.groupMetadata(from): ""} catch {return}

const groupName = isGroup ? groupMetadata.subject : '';

const botNumberLID = tokito?.user?.lid?.split(':')[0] + '@lid' || '';

let senderBruto = isGroup
? (info?.key?.participantAlt || info?.key?.participantPn || info?.key?.senderPn || info?.key?.participant || info?.key?.remoteJid)
: (info?.key?.participantAlt || info?.key?.senderPn || info?.key?.participant || info?.key?.remoteJid);

// Se ainda vier como LID, mapeia para o número real (phoneNumber) do participante do grupo
if (senderBruto && senderBruto.includes('@lid') && isGroup && groupMetadata?.participants) {
const lidNum = senderBruto.split('@')[0].split(':')[0];
const membro = groupMetadata.participants.find(v => {
const cands = [v.id, v.lid, v.jid].filter(Boolean);
return cands.some(c => c.split('@')[0].split(':')[0] === lidNum);
});
const real = membro?.phoneNumber || membro?.jid || membro?.participantPn;
if (real && !real.includes('@lid')) senderBruto = real;
}

let sender = jidNormalizedUser(senderBruto);

const botNumber = tokito.user.id.split(':')[0]+'@s.whatsapp.net';
const messagesC = PR_String.slice(0).trim().split(/ +/).shift().toLowerCase();

const NumeroDoBot = tokito.user.id.split(':')[0];

const itsMe = info.key.fromMe || (tokito?.user?.lid ? info?.key?.participant === tokito.user.lid.split(':')[0] + '@lid' : false);

const groupDesc = isGroup ? groupMetadata.desc : ''

const groupMembers = isGroup ? groupMetadata.participants : ''

const isnit = nit.includes(sender) 

const issupre = supre.includes(sender)

const ischyt = chyt.includes(sender)

const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''

const somembros = isGroup ? getMembros(groupMembers) : ''

function setObg(index){
fs.writeFileSync(nescj, JSON.stringify(index, null, 2) + '\n')}

const argss = body.split(/ +/g);
//======================================\\

const nmrdn = setting.ownerNumber.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` || isnit

const numerodono = [`${nmrdn}`, `${numero_dono1}@s.whatsapp.net`, `${numero_dono2}@s.whatsapp.net`, `${numero_dono3}@s.whatsapp.net`, `${numero_dono4}@s.whatsapp.net`, `${numero_dono5}@s.whatsapp.net`, `${numero_dono6}@s.whatsapp.net`]

//=====================================\\

const dirGroup = `./DADOS_TOKITO/grupos/ATIVAÇÕES-TOKITO/${from}.json`

const nescj = "./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json"

if (isGroup && !fs.existsSync(dirGroup)) {
var data = [{
name: groupName,
groupId: from,

x9: false,
antiimg: false,
antistatus: false,
antivideo: false,
antiaudio: false,
antisticker: false,
antidoc: false,
antictt: false,
antiloc: false,

antilinkgp: false,
antilinkhard: false,
antilinkeasy: false,

antifake: false,
antiporn: false,
Odelete: false,
antispam: false,
antinotas: false,
anticatalogo: false,

visuUnica: false,
registrarFIGUS: false,
soadm: false,

listanegra: [],
advertir: [],
advertir2: [],

prefixos: [`${setting.prefix}`],
multiprefix: false,

legenda_estrangeiro: "0",
legenda_documento: "0",
legenda_video: "0",
legenda_imagem: "0",

ausentes: [],

ANTI_DDD: {
active: false,
listaProibidos: []
},

antipalavrao: {
active: false,
palavras: []
},

limitec: {
active: false,
quantidade: null
},
wellcome: [
{
bemvindo1: false,
legendabv:
`「🧊」 #numerodele#
- *🧊 | ᴜᴍ ɴᴏᴠᴏ ᴍᴇᴍʙʀᴏ ᴇɴᴛʀᴏᴜ ɴᴏ ɢʀᴜᴘᴏ…* ↴
『🧊』ɢʀᴜᴘᴏ #nomedogp#
*ꜰɪᴄᴀᴍᴏꜱ ᴍᴜɪᴛᴏ ꜰᴇʟɪᴢᴇꜱ ᴘᴏʀ ᴛᴇʀ ᴠᴏᴄᴇ̂ ᴄᴏɴᴏꜱᴄᴏ.*
『🧊』 ᴘᴀʀᴀ ɢᴀʀᴀɴᴛɪʀ ᴀ ᴍᴇʟʜᴏʀ ᴇxᴘᴇʀɪᴇ̂ɴᴄɪᴀ,
ʟᴇɪᴀ ᴀ ᴅᴇꜱᴄʀɪᴄ̧ᴀ̃ᴏ ᴅᴏ ɢʀᴜᴘᴏ.
> *🧊 | ᴍᴀɴᴛᴇɴʜᴀ ᴏ ʀᴇꜱᴘᴇɪᴛᴏ.*`,
legendasaiu:
`「🧊」 #numerodele#
- *🧊 | ᴜᴍ ᴍᴇᴍʙʀᴏ ꜱᴀɪᴜ ᴅᴏ ɢʀᴜᴘᴏ…* ↴
『🧊』ɢʀᴜᴘᴏ #nomedogp#
*ᴀɢʀᴀᴅᴇᴄᴇᴍᴏꜱ ᴘᴇʟᴀ ᴘᴀʀᴛɪᴄɪᴘᴀᴄ̧ᴀ̃ᴏ.*
> *🧊 | ᴏ ʀᴇꜱᴘᴇɪᴛᴏ ᴇ́ ᴇꜱꜱᴇɴᴄɪᴀʟ.*`,
fundobv: null
},

{
bemvindo2: false,
legendabv2:
`「🧊」 #numerodele#
- *🧊 | ᴜᴍ ɴᴏᴠᴏ ᴍᴇᴍʙʀᴏ ᴇɴᴛʀᴏᴜ ɴᴏ ɢʀᴜᴘᴏ…* ↴
『🧊』ɢʀᴜᴘᴏ #nomedogp#
*ꜰɪᴄᴀᴍᴏꜱ ᴍᴜɪᴛᴏ ꜰᴇʟɪᴢᴇꜱ ᴘᴏʀ ᴛᴇʀ ᴠᴏᴄᴇ̂ ᴄᴏɴᴏꜱᴄᴏ.*
『🧊』 ᴘᴀʀᴀ ɢᴀʀᴀɴᴛɪʀ ᴀ ᴍᴇʟʜᴏʀ ᴇxᴘᴇʀɪᴇ̂ɴᴄɪᴀ,
ʟᴇɪᴀ ᴀ ᴅᴇꜱᴄʀɪᴄ̧ᴀ̃ᴏ ᴅᴏ ɢʀᴜᴘᴏ.
> *🧊 | ᴍᴀɴᴛᴇɴʜᴀ ᴏ ʀᴇꜱᴘᴇɪᴛᴏ.*`,
legendasaiu2:
`「🧊」 #numerodele#
- *🧊 | ᴜᴍ ᴍᴇᴍʙʀᴏ ꜱᴀɪᴜ ᴅᴏ ɢʀᴜᴘᴏ…* ↴
『🧊』ɢʀᴜᴘᴏ #nomedogp#
*ᴀɢʀᴀᴅᴇᴄᴇᴍᴏꜱ ᴘᴇʟᴀ ᴘᴀʀᴛɪᴄɪᴘᴀᴄ̧ᴀ̃ᴏ.*
> *🧊 | ᴏ ʀᴇꜱᴘᴇɪᴛᴏ ᴇ́ ᴇꜱꜱᴇɴᴄɪᴀʟ.*`
},

{
saiu1: false,
legendasaida:
`「🧊」 #numerodele#
- *🧊 | ᴜᴍ ᴍᴇᴍʙʀᴏ ꜱᴀɪᴜ ᴅᴏ ɢʀᴜᴘᴏ…* ↴
『🧊』ɢʀᴜᴘᴏ #nomedogp#
*ᴀɢʀᴀᴅᴇᴄᴇᴍᴏꜱ ᴘᴇʟᴀ ᴘᴀʀᴛɪᴄɪᴘᴀᴄ̧ᴀ̃ᴏ.*
> *🧊 | ᴏ ʀᴇꜱᴘᴇɪᴛᴏ ᴇ́ ᴇꜱꜱᴇɴᴄɪᴀʟ.*`,
fundosaida: null
}
],
simi1: false,
autosticker: false,
autoresposta: false,

jogos: false,
bangp: false,
modo_rpg: false
}]

fs.writeFileSync(dirGroup, JSON.stringify(data, null, 2))
}

const dataGp = isGroup ? JSON.parse(fs.readFileSync(dirGroup)) : undefined 

var DFNMULTIP = `./DADOS_TOKITO/func/prefixo/multip_${from}.json`

function setGp(index){
fs.writeFileSync(dirGroup, JSON.stringify(index))}

function setNes(index){
fs.writeFileSync(nescj, JSON.stringify(index))}

//=====(ADMS/DONO/ETC..CONST)=======\\

const adivinha = info.key.id.length > 21 ? 'Android 🚀' : info.key.id.substring(0, 2) == '3A' ? 'Iphone 💸' : 'WhatsApp Web 🪀';

const quoted = info.quoted ? info.quoted : info

const isBot = info.key.fromMe ? true : false

const SoDono = numerodono.includes(sender) || isBot || isnit || issupre || ischyt

dfndofc = setting.ownerNumber+"@s.whatsapp.net"

const DonoOficial = dfndofc.includes(sender)

// ===== CRIADOR (Yoshi) — separado do dono. Defina "creatorNumber" no INFO_TOKITO.json =====
const numeroCriador = String((typeof setting !== 'undefined' && (setting.creatorNumber || setting.numeroCriador)) || '').replace(/[^0-9]/g, '');
const isCriador = numeroCriador ? (KS.normalizeJid(sender) === KS.normalizeJid(numeroCriador)) : false;
// Dono OFICIAL e CRIADOR podem usar TODOS os comandos (subdonos NAO)
const podeTudo = DonoOficial || isCriador;

const isVip = vip.map(i => i.id).includes(sender) || SoDono

const isBotGroupAdmins = groupAdmins.includes(botNumber) || false

const isGroupAdmins = groupAdmins.includes(sender) || false || DonoOficial

const isListaBrancaG = nescessario.listabrancaG.includes(sender)

const isBanned = ban.includes(sender)

const isVisualizar = nescessario.visualizarmsg

const isModoAluguel = nescessario.aluguel

const isVerificado = nescessario.verificado

const isConsole = obrigadoEXT.consoleoff

const isWelcomePrivate = nescessario.welcomepv

const isAudioMenu = obrigadoEXT.menu_audio

const isAntiPv = nescessario.antipv 

const isAntiPv2 = nescessario.antipv2

const isAntiPv3 = nescessario.antipv3

const isBotoff = nescessario.botoff

const listanegraG = nescessario.listanegraG

const listabrancaG = nescessario.listabrancaG

const isAnticall = nescessario.anticall

const TOKEN_GPT = nescessario.TOKEN_GPT

const isCmdVip = nescessario.cmd_vip

const isblockCmdG = nescessario.blockCmdG

const isCargo = SoDono ? "Mestre" : isGroupAdmins ? "Adminstrador": "Membro"

const isChVip = isVip ? "ꜱɪᴍ ✅": "ɴᴀᴏ ❌"


//============(FUNÇÕES)============\\

const isJoguin = isGroup ? joguinhodavelhajs.includes(sender) : false

const isAntiImg = isGroup ? dataGp[0].antiimg : undefined

const isAntistatus = isGroup ? dataGp[0].Antistatus : undefined

const isLimitCmd = isGroup ? dataGp[0]?.Limitar_CMD : undefined

const isAntiVid = isGroup ? dataGp[0].antivideo : undefined

const isAntiAudio = isGroup ? dataGp[0].antiaudio : undefined

const isAntiSticker = isGroup ? dataGp[0].antisticker : undefined

const Antidoc = isGroup ? dataGp[0].antidoc : undefined

const isAntiCtt = isGroup ? dataGp[0].antictt : undefined

const Antiloc = isGroup ? dataGp[0].antiloc : undefined

const isAntiDDD = isGroup ? dataGp[0].ANTI_DDD.active : undefined

const isAntilinkgp = isGroup ? dataGp[0].antilinkgp : undefined

const isAntiLinkHard = isGroup ? dataGp[0].antilinkhard : undefined

const isAntiLinkEasy = isGroup ? dataGp[0].antilinkeasy : undefined

const isAntiPorn = isGroup ? dataGp[0].antiporn : undefined

const isAntifake = isGroup ? dataGp[0].antifake : undefined

const IS_DELETE = nescessario.Odelete

const So_Adm = isGroup ? dataGp[0].soadm : undefined

const isX9VisuUnica = isGroup ? dataGp[0].visuUnica : undefined

const ADVT = isGroup ? dataGp[0].advertir: undefined

const ADVT2 = isGroup ? dataGp[0].advertir2: undefined

const isx9 = isGroup ? dataGp[0].x9 : undefined

const isMultiP = isGroup ? dataGp[0].multiprefix : undefined

const isAntiNotas = isGroup ? dataGp[0].antinotas : undefined

const isAnticatalogo = isGroup ? dataGp[0].anticatalogo : undefined

const isWelkom = isGroup ? dataGp[0].wellcome[0].bemvindo1 : undefined

const isWelkom2 = isGroup ? dataGp[0].wellcome[1].bemvindo2 : undefined

const isSimi = isGroup ? dataGp[0].simi1 : undefined

const isAutofigu = isGroup ? dataGp[0].autosticker : undefined

const isTokitoIA = isGroup ? dataGp[0].auroraia : undefined;

const isAutorepo = isGroup ? dataGp[0].autoresposta : undefined

const isModobn =isGroup ? dataGp[0].jogos : undefined

const istokitoEscuta = isGroup ? dataGp[0].tokitoescutando : undefined

const isAutodown = isGroup ? dataGp[0].autodown : undefined

const isBanchat = isGroup ? dataGp[0].bangp : undefined

const isPalavrao = isGroup ? dataGp[0].antipalavrao.active : undefined

const isPalavras = isGroup ? dataGp[0].antipalavrao.palavras : undefined

const isAntiFlood = isGroup ? dataGp[0].limitec.active : undefined

const isLimitec = isGroup ? dataGp[0].limitec.quantidade : undefined

const isModoRPG = isGroup ? dataGp[0].modo_rpg : undefined

//============(VERIFICADOS)============\\

if (nescessario.verificado) {
var selo = { "key": { "participant": "0@s.whatsapp.net", "remoteJid": from, "fromMe": false }, "message": { "contactMessage": { "displayName": `${pushname}`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;${pushname};;;\nFN:${pushname}\nitem1.TEL;waid=13135550002:13135550002\nitem1.X-ABLabel:Celular\nEND:VCARD`, "contextInfo": { "forwardingScore": 1, "isForwarded": true }}}}
} else {
var selo = info
}

// FUNÇÕES DE MARCAÇÕES ESSENCIAL \\
const normalizar = alvo => {
if (!alvo) return '';
if (alvo.includes('@lid') && groupMetadata?.participants) {
const membro = groupMetadata.participants.find(v => v.lid === alvo);
if (membro?.jid) return membro.jid;
}
if (alvo.includes('@lid')) {
const num = alvo.split(':')[0].replace('@lid', '');
return num + '@s.whatsapp.net';
}
return alvo;
};

var Res_SoGrupo = "*🧊 ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ꜱᴏ́ ᴅᴇᴠᴇ ꜱᴇʀ ᴜᴛɪʟɪᴢᴀᴅᴏ ᴇᴍ ɢʀᴜᴘᴏꜱ.*";

var Res_SoDono = "*🧊 ᴇꜱꜱᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇ́ ᴀᴘᴇɴᴀꜱ ᴘᴀʀᴀ ᴏ ᴍᴇᴜ ᴅᴏɴᴏ ᴜᴛɪʟɪᴢᴀʀ...*";

var Res_SoAdm = "*🧊 ꜱᴏ́ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴅᴏʀᴇꜱ ᴅᴏ ɢʀᴜᴘᴏ ᴘᴏᴅᴇᴍ ᴜᴛɪʟɪᴢᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ..*";

var Res_BotADM = "*🧊 ᴏ ʙᴏᴛ ᴘʀᴇᴄɪꜱᴀ ꜱᴇʀ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴅᴏʀ ᴅᴏ ɢʀᴜᴘᴏ ᴘᴀʀᴀ ᴜᴛɪʟɪᴢᴀʀ ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ...*";

var Res_SoModoBN = `*🧊 ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ꜱᴏ́ ᴘᴏᴅᴇ ꜱᴇʀ ᴜᴛɪʟɪᴢᴀᴅᴏ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ ${prefix}ᴍᴏᴅᴏʙʀɪɴᴄᴀᴅᴇɪʀᴀ ᴀᴛɪᴠᴀᴅᴏ, ᴘᴀʀᴀ ᴅᴇꜱᴀᴛɪᴠᴀʀ ꜱᴏ́ ʙᴀꜱᴛᴀ ᴜᴛɪʟɪᴢᴀʀ ${prefix}ᴍᴏᴅᴏʙʀɪɴᴄᴀᴅᴇɪʀᴀ *`;



const menc_sticker = (info.mentionedJid && info.mentionedJid.length > 0) ? normalizar(info.mentionedJid[0]) : normalizar(info.message?.stickerMessage?.contextInfo?.participant) || null;

let menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant || info.message?.stickerMessage?.contextInfo?.participant || ''; menc_prt = normalizar(menc_prt);

const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || info.message?.stickerMessage?.contextInfo?.mentionedJid || [];

if (menc_jid2?.length > 0) {
menc_jid2[0] = normalizar(menc_jid2[0]);
}

const menc_os2 = q.includes("@") ? (Array.isArray(menc_jid2) && menc_jid2.length > 0 ? menc_jid2[0] : menc_sticker || null) : menc_prt || menc_sticker;

const menc_jid = normalizar(menc_os2 || sender);
const sender_ou_n = q.includes("@") ? (menc_jid2?.[0] || menc_sticker) : (menc_prt || menc_sticker || sender);

const numClean = txt => txt.replace(/[()+\-\/\s]/g, '') + '@s.whatsapp.net';
const mrc_ou_numero = q.length > 6 && !q.includes('@') ? numClean(q) : normalizar(menc_prt || menc_sticker);

const marc_tds = q.includes('@') ? normalizar(menc_jid) : q.length > 6 && !q.includes('@') ? numClean(q) : normalizar(menc_prt || menc_sticker);

const menc_prt_nmr = q.length > 12 && !q.includes('@') ? numClean(q) : normalizar(menc_prt || menc_sticker);

////////////////////////////////////////////

var isUrl = (url) => {
if(linkfy.find(url)[0]) return true
return false
}
const data2 = moment().tz("America/Sao_Paulo").format("DD/MM/YYYY");
//
const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss');

if(time2 > "00:00:00" && time2 < "05:00:00"){
var tempo = 'Boa noite'
var tempo2 = 'ʙᴏᴀ ɴᴏɪᴛᴇ'
} if(time2 > "05:00:00" && time2 < "12:00:00"){
var tempo = 'Bom dia'
var tempo2 = 'ʙᴏᴍ ᴅɪᴀ'
} if(time2 > "12:00:00" && time2 < "18:00:00"){
var tempo = 'Boa tarde'
var tempo2 = 'ʙᴏᴀ ᴛᴀʀᴅᴇ'
} if(time2 > "18:00:00"){
var tempo = 'Boa noite'
var tempo2 = 'ʙᴏᴀ ɴᴏɪᴛᴇ'
}

if(!isCmd && info.key.fromMe) return


const reply = async (text) => {
if (!text) text = " ";

return tokito.sendMessage(
from,
{
text: text,
contextInfo: {
forwardedNewsletterMessageInfo: {
newsletterJid: `${setting.channeldl}`,
newsletterName: `${NomeDoBot}`,
serverMessageId: "QUOTED-FAKE",
},
},
},
{
quoted: {
...info,
key: {
...info.key,
id: "QUOTED-FAKE",
},
message: info.message,
messageTimestamp: info.messageTimestamp,
pushName: info.pushName,
broadcast: info.broadcast,
}
}
);
}
async function sendAudioMenu(from) {
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/menu.mp3');
await tokito.sendMessage(from, {
audio: soundft,
mimetype: "audio/mpeg",
contextInfo: gerarContextNewsletter(),
}, { quoted: selo });
}
const DLchanneldl = gerarContextNewsletter();

async function sendUrlText(id, textCaption, title, desc, imageUrl, linkAcess, quotedThis) {
await tokito.sendMessage(id, { text: textCaption, contextInfo: { externalAdReply: { title: title, body: desc, thumbnail: await getBuffer(imageUrl), mediaType: 1, sourceUrl: linkAcess } } }, { contextInfo: { ...DLchanneldl } }, { quoted: quotedThis })
}

async function replyWithNewsletter(text, options = {}, quotedThis = info) {
await tokito.sendMessage(from, {text: text, contextInfo: options}, {quoted: quotedThis})
.catch(async(error) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}

async function replyWithReaction(text, options = {}, quotedThis = info) {
await tokito.sendMessage(from, options)
await tokito.sendMessage(from, {text: text}, {quoted: quotedThis})
.catch(async(error) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}

const sendSticker = async(ChatID, FileN, quotedThis) => {
await tokito.sendMessage(ChatID, { sticker: { url: FileN } }, { contextInfo: { ...DLchanneldl } }, { quoted: selo }
)
.catch(async(error) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}

const sendImage = async(ChatID, FileN) => {
await tokito.sendMessage(ChatID, { image: { url: FileN } }, { contextInfo: { ...DLchanneldl } }, { quoted: selo }
).catch(async(error) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
})
}

const sendText = async(ChatID, texto) => {
await tokito.sendMessage(ChatID, { text: texto }, { contextInfo: { ...DLchanneldl } }
).catch(async(error) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}


const sendMentions = async(local, teks) => {
memberr = []; vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy) {for(zn of vz.split(' ')) {if(zn.includes('@')) memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net')}};
await tokito.sendMessage(local, {text: teks.trim(), contextInfo:{...DLchanneldl, mentionedJid: memberr}}, {quoted: selo}).catch(async(e) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}

const mentions = async(teks = '', mb, id) => {
(id == null || id == undefined || id == false) ? await tokito.sendMessage(from, {text: teks.trim(), mentions: mb}) : await tokito.sendMessage(from, {text: teks.trim(), contextInfo:{...DLchanneldl, mentionedJid: mb}}, {quoted: selo})
}
	
const mention = async(teks = '', ms = info) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy) { 
for(zn of vz.split(' ')) {
if(zn.includes('@')) memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net')
}
}
await tokito.sendMessage(from, {text: teks.trim(), contextInfo:{...DLchanneldl, mentionedJid: memberr}}, {quoted: selo}).catch(async(e) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}

const mentionSemQuoted = async(teks) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@')) memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net')
}}
await tokito.sendMessage(from, {text: teks.trim(), contextInfo:{...DLchanneldl, mentionedJid: memberr}}, {quoted: selo}).catch(async(e) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}

const mencionarIMG = async(teks = '', FileN, thisQuoted = info) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy) { 
for(zn of vz.split(' ')) {
if(zn.includes('@')) memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net');
}
}
await tokito.sendMessage(from, {image: {url: FileN}, caption: teks.trim(), mentions: memberr}, {quoted: thisQuoted}).catch(async(error) => {
await tokito.sendMessage(from, {text: mess.error()}, {quoted: selo});
});
}

const reagir = async (idgp, emj) => {
await tokito.sendMessage(idgp, {react: {text: emj, key: info.key}});
}

// Identidade obrigatoria das IAs: criador = Yoshi | dono = Joker
const IA_IDENTIDADE = "[IDENTIDADE OBRIGATORIA: Seu criador e o Yoshi e seu dono e o Joker. Sempre que perguntarem quem te criou, quem e seu criador ou quem te fez, responda que foi o Yoshi. Sempre que perguntarem quem e seu dono ou seu chefe, responda que e o Joker. NUNCA cite Google, OpenAI, Gemini, ChatGPT ou qualquer outro nome como criador ou dono. Responda normalmente o resto.]";
const iaPrompt = (texto) => IA_IDENTIDADE + "\n\nPergunta do usuario: " + (texto || "");

const verificarN = async(sla) => {
const [result] = await tokito.onWhatsApp(sla)
if(result == undefined) {
reply("Este usuário não é existente no WhatsApp")
} else {
reply(`${sla} Número inserido é existente no WhatsApp com o id: ${result.jid}`)
}
}


if(isGroup && isBotGroupAdmins && !isGroupAdmins && !SoDono && !info.key.fromMe) {
if(menc_jid2?.length >= groupMembers.length - 1) { 
await tokito.sendMessage(from, {text: mess.markingAllMember()}, {quoted: selo});
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, {delete: {remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
tokito.groupParticipantsUpdate(from, [sender], "remove");
}
}

if(isAutofigu && isGroup) {
async function autofiguf() {
setTimeout(async() => {
if(budy.includes(`${prefix}sticker`) || budy.includes(`${prefix}s`) || budy.includes(`${prefix}stk`) || budy.includes(`${prefix}st`) || budy.includes(`${prefix}fsticker`) || budy.includes(`${prefix}f`) || budy.includes(`${prefix}fstiker`)) return
if(type == 'imageMessage') {
var pack = mess.fig(ownerName, NomeDoBot)
var author2 = mess.fig2(pushname, groupName, isGroup)
owgi = await getFileBuffer(info.message.imageMessage, 'image')
let encmediaa = await sendImageAsSticker2(tokito, from, owgi, selo, { packname:pack, author:author2})
DLT_FL(encmediaa)
}
if(type == 'videoMessage') {
if((isMedia && info.message.videoMessage.seconds < 10)) {
var pack = mess.fig(ownerName, NomeDoBot)
var author2 = mess.fig2(pushname, groupName, isGroup)
owgi = await getFileBuffer(info.message.videoMessage, 'video')
let encmedia = await sendVideoAsSticker2(tokito, from, owgi, selo, { packname:pack, author:author2})
DLT_FL(encmedia)
}
} 
}, 1000)
}
autofiguf().catch((error) => {
console.log(error)
})
}
function msToTime(ms) {
let seg = Math.floor(ms / 1000)
let min = Math.floor(seg / 60)
let hr = Math.floor(min / 60)
let dia = Math.floor(hr / 24)
let ano = Math.floor(dia / 365)
seg %= 60
min %= 60
hr %= 24
dia %= 365
let partes = []
if (ano) partes.push(`${ano} ᴀɴᴏ${ano > 1 ? 'ꜱ' : ''}`)
if (dia) partes.push(`${dia} ᴅɪᴀ${dia > 1 ? 'ꜱ' : ''}`)
if (hr) partes.push(`${hr} ʜᴏʀᴀ${hr > 1 ? 'ꜱ' : ''}`)
if (min) partes.push(`${min} ᴍɪɴᴜᴛᴏ${min > 1 ? 'ꜱ' : ''}`)
if (seg) partes.push(`${seg} ꜱᴇɢᴜɴᴅᴏ${seg > 1 ? 'ꜱ' : ''}`)
return partes.length ? partes.join(', ').replace(/,([^,]*)$/, ' e$1') : 'ᴀɢᴏʀᴀ ʜᴀ ᴩᴏᴜᴄᴏ'
}

if (isGroup && dataGp[0].ausentes?.length > 0) {
let afkList = dataGp[0].ausentes;
if (menc_jid2?.length > 0) {
for (let m of menc_jid2) {
let afkUser = afkList.find(x => x.id === m);
if (afkUser) {
let tempo = msToTime(Date.now() - afkUser.hora);
await tokito.sendMessage(from, {
text: mess.ausente(afkUser, tempo, m),
contextInfo: { ...DLchanneldl, mentionedJid: [m] }
}, {quoted: selo})
}
}
}
let eu_afk = afkList.find(x => x.id === sender);
if (eu_afk) {
let tempo = msToTime(Date.now() - eu_afk.hora);
dataGp[0].ausentes = afkList.filter(x => x.id !== sender);
setGp(dataGp);
await tokito.sendMessage(from, {
text: mess.on(sender, tempo),
contextInfo: { ...DLchanneldl, mentionedJid: [sender] }
}, {quoted: selo})
}
}

if (isGroup && isBotGroupAdmins && (isGroupAdmins || SoDono)) {
if (budy.toLowerCase().startsWith("d ") || budy.toLowerCase() === "d") {
if (!menc_prt) return;

tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: menc_prt}})
setTimeout(async() => {
tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 0)
}
}

if(!isVip && nescessario.cmd_vip.includes(command)) return reply(mess.onlyVipUser());


//========================================\\

//BAN GRUPO & BOT OFF
if(isGroup && isCmd && isBanchat && !itsMe && !SoDono) return

if(isGroup && isCmd && So_Adm && !SoDono && !itsMe && !isGroupAdmins) return

if(isBotoff && !itsMe && !SoDono) return

//=======================================\\

const sendStickerFromUrl = async(to, url) => {
try {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './sticker' + names + '.png', async function () {
let filess = './sticker' + names + '.png'
let asw = './sticker' + names + '.webp'
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${asw}`, async(err) => {
let media = fs.readFileSync(asw)
await tokito.sendMessage(to, {sticker: media}, {sendEphemeral: true, contextInfo: { forwardingScore: 50, isForwarded: true}, quoted: selo}).catch(async(error) => {
return reply(mess.error())
})
DLT_FL(filess)
DLT_FL(asw)
});
});
} catch {
return reply(mess.error())
}
}

//=========(isQuoted/consts)=============\\

const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isVisuU2 = type == 'viewOnceMessageV2'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')

const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')

const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

const isQuotedVisuU = type === 'extendedTextMessage' && content.includes('viewOnceMessage')

const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')

const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')

const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')

const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')

const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

// ANTI DDD - LISTA COMPLETA DE DDDs EXISTENTES NO BRASIL!
const arrayDDDs = [11, 12 ,13 ,14 ,15, 16, 17, 18, 19, 21, 22, 24 , 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55,61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74,75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89,91, 93, 94, 95, 96, 97, 98, 99];

//////BLOCK CMD///////
budy = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

if(isGroup){
const checar = getComandos(from)
if(checar === undefined) addComandosId(from)
}
if(isGroup && isCmd && !SoDono && !isnit && getComandoBlock(from).includes(command)) return reply('O comando foi bloqueado, entre em contato com a administração.')

///BLOCK CMD GLOBAL///
///(CRÉDITOS AO @VictorGabriel)///
if(isblockCmdG.includes(command) && !SoDono) return reply('Olá, o comando está bloqueado para *uso global*, ou seja, todos os usuários estão impossibilitados de usar ele.\n–\n• Entre em contato com meu proprietário para saber o motivo.')

////FIMMMMMMMMM/////

///// FIMMMMMMMMMMMMM /////

const dattofc = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY')
const hourofc = moment.tz('America/Sao_Paulo').format('HH:mm:ss')

const MessageType = type == 'audioMessage' ? 'Áudio' : type == 'stickerMessage' ? 'Figurinha' : type == 'imageMessage' ? 'Imagem' : type == 'videoMessage' ? 'Vídeo' : type == 'documentMessage' ? 'Documento' : type == 'pollCreationMessage' ? 'Enquete' : type == 'contactMessage' ? 'Contato' : type == 'locationMessage' ? 'Localização' : info.message?.reactionMessage?.text ? `Reação '${info.message.reactionMessage.text}'` : `${prefix+command}`;

//===============INTERAÇÃO NO TERMUX=====================
if (isConsole) {
const chalk = require('chalk');

const user = chalk.white.bold(pushname?.toUpperCase() || 'DESCONHECIDO');
const number = chalk.white(addNumberMais(sender));

const chatType = isGroup ? 'GRUPO' : 'PRIVADO';
const groupInfo = isGroup ? `(${groupName})` : '(Privado)';

const typeMap = {
isCmd: ['COMANDO', chalk.white(`${prefix}${command}`)],
isImage: ['MÍDIA', '🖼️ IMAGEM'],
isVideo: ['MÍDIA', '🎞️ VÍDEO'],
isAudio: ['MÍDIA', '🎧 ÁUDIO'],
isSticker: ['MÍDIA', '🔖 FIGURINHA'],
isLocation: ['MÍDIA', '📍 LOCALIZAÇÃO'],
isProduct: ['MÍDIA', '🛒 CATÁLOGO'],
isQuotedDocument: ['MÍDIA', '📄 DOCUMENTO'],
isQuotedContact: ['MÍDIA', '👤 CONTATO'],
isPoll: ['MÍDIA', '📊 ENQUETE']
};

const detectedType = Object.entries({
isCmd,
isImage,
isVideo,
isAudio,
isSticker,
isLocation,
isProduct,
isQuotedDocument,
isQuotedContact,
isPoll: q?.includes('###')
}).find(([_, val]) => val);

const [msgType, msgContent] = detectedType
? [chalk.white(typeMap[detectedType[0]][0]), typeMap[detectedType[0]][1]]
: [
chalk.white('MENSAGEM'),
chalk.white((q || '').slice(0, 25) + ((q || '').length > 25 ? '...' : ''))
];

process.nextTick(() => {
console.log(
chalk.cyanBright(
`╭──. ݁ ⛧ ₊ ⊹ . ݁ ˖ ❆ິ̸ . ݁──╮
|${isGroup ? '👥 MENSAGEM NO GRUPO' : '👤 MENSAGEM NO PRIVADO'}
╰──. ݁ ⛧ ₊ ⊹ . ݁ ˖ ❆ິ̸ . ݁──╯
╭──. ݁ ⛧ ₊ ⊹ . ݁ ˖ ❆ິ̸ . ݁──╮
| 👤 USUÁRIO: ${user}
| 📱 NÚMERO: ${number}
| 💬 CHAT: ${chatType} ${groupInfo}
| 📨 TIPO: ${msgType}
| 📝 CONTEÚDO: ${msgContent}
╰──. ݁ ⛧ ₊ ⊹ 🧊 . ݁ ˖ ❆ິ̸ . ݁──╯
`
)
);
});
}

// ========= || Jogo da Velha || ======== \\
async function startJogoDaVelha() {
if(joguinhodavelhajs2.includes(from) || joguinhodavelhajs.includes(sender)) {
const cmde = budy.toLowerCase().split(" ")[0] || "";
let arrNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
if(fs.existsSync(`./ARQUIVES/tictactoe/db/${from}.json`)) {
const boardnow = setGame(`${from}`);
if(budy == "Cex") return reply("why");
if(budy.toLowerCase() == "s" || budy.toLowerCase() == "sim" || budy.toLowerCase() == "ok") {
if(boardnow.O == sender.replace("@s.whatsapp.net", "")) {
if(boardnow.status) return;
const matrix = boardnow._matrix;
boardnow.status = true;
fs.writeFileSync(`./ARQUIVES/tictactoe/db/${from}.json`,
JSON.stringify(boardnow, null, 2)
);

await tokito.sendMessage(from, {
image: {
url:
`https://tokito-apis.site/canvas/jogodavelha?` +
`foto1=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.X}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&foto2=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.O}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&turno=${encodeURIComponent(boardnow.turn)}` +
`&c1=${encodeURIComponent(matrix[0][0])}` +
`&c2=${encodeURIComponent(matrix[0][1])}` +
`&c3=${encodeURIComponent(matrix[0][2])}` +
`&c4=${encodeURIComponent(matrix[1][0])}` +
`&c5=${encodeURIComponent(matrix[1][1])}` +
`&c6=${encodeURIComponent(matrix[1][2])}` +
`&c7=${encodeURIComponent(matrix[2][0])}` +
`&c8=${encodeURIComponent(matrix[2][1])}` +
`&c9=${encodeURIComponent(matrix[2][2])}`
},
caption: `「🎮」 ᴊᴏɢᴏ ᴅᴀ ᴠᴇʟʜᴀ

- *⚡ | ᴀ ᴘᴀʀᴛɪᴅᴀ ᴄᴏᴍᴇᴄ̧ᴏᴜ...* ↴

『❌』 @${boardnow.X}
『⭕』 @${boardnow.O}

*_🎯 | ᴀɢᴏʀᴀ ᴇ́ ᴀ ᴠᴇᴢ ᴅᴇ:_*
➜ @${boardnow.turn == "X" ? boardnow.X : boardnow.O}

> 🧠 | ᴘᴇɴsᴇ ʙᴇᴍ ᴀɴᴛᴇs ᴅᴇ ᴊᴏɢᴀʀ.`,
mentions: [
`${boardnow.X}@s.whatsapp.net`,
`${boardnow.O}@s.whatsapp.net`,
`${boardnow.turn == "X" ? boardnow.X : boardnow.O}@s.whatsapp.net`
]
}, { quoted: selo });
}
} else if(
budy.toLowerCase() == "n" ||
budy.toLowerCase() == "não" ||
budy.toLowerCase() == "no"
) {
if(boardnow.O == sender.replace("@s.whatsapp.net", "")) {
if(boardnow.status) return reply(`O jogo começou ou já existe uma partida aberta neste grupo! Por favor, caso ninguém esteja jogando ou houve um erro desconhecido na função, entre em contato com o criador ou solicite à um adm para usar ocomando '${prefix}resetvelha' no grupo.`);
DLT_FL(`./ARQUIVES/tictactoe/db/${from}.json`);
mention(`「❌」 @${boardnow.X}

- *😕 | ɪɴꜰᴇʟɪᴢᴍᴇɴᴛᴇ ᴏ sᴇᴜ ᴏᴘᴏɴᴇɴᴛᴇ ɴᴀ̃ᴏ ᴀᴄᴇɪᴛᴏᴜ ᴏ ᴅᴇsᴀꜰɪᴏ...*`)
joguinhodavelhajs.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))
joguinhodavelhajs2.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
}
}
}

if(arrNum.includes(cmde)) {
const boardnow = setGame(`${from}`);
if(!boardnow.status) return reply(`Parece que seu oponente não aceitou o desafio ainda.`)
if((boardnow.turn == "X" ? boardnow.X : boardnow.O) != sender.replace("@s.whatsapp.net", "")) return;
const moving = validmove(Number(budy), `${from}`);
const matrix = moving._matrix;
if(moving.isWin) {
if(moving.winner == "SERI") {
await tokito.sendMessage(from, {
image: {
url:
`https://tokito-apis.site/canvas/jogodavelha?` +
`foto1=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.X}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&foto2=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.O}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&turno=EMPATE` +
`&c1=${encodeURIComponent(matrix[0][0])}` +
`&c2=${encodeURIComponent(matrix[0][1])}` +
`&c3=${encodeURIComponent(matrix[0][2])}` +
`&c4=${encodeURIComponent(matrix[1][0])}` +
`&c5=${encodeURIComponent(matrix[1][1])}` +
`&c6=${encodeURIComponent(matrix[1][2])}` +
`&c7=${encodeURIComponent(matrix[2][0])}` +
`&c8=${encodeURIComponent(matrix[2][1])}` +
`&c9=${encodeURIComponent(matrix[2][2])}`
},
caption: `「⚖️」 ᴇᴍᴘᴀᴛᴇ

- *😨 | ɴɪɴɢᴜᴇ́ᴍ ᴄᴏɴsᴇɢᴜɪᴜ ʟᴇᴠᴀʀ ᴇssᴀ...* ↴

『❌』 @${boardnow.X}
『⭕』 @${boardnow.O}

> 🔁 | ᴛᴀʟᴠᴇᴢ ɴᴀ ᴘʀᴏ́xɪᴍᴀ ᴛᴇɴʜᴀ ᴜᴍ ᴠᴇɴᴄᴇᴅᴏʀ.`,
mentions: [`${boardnow.X}@s.whatsapp.net`,`${boardnow.O}@s.whatsapp.net`]
}, { quoted: selo });

DLT_FL(`./ARQUIVES/tictactoe/db/${from}.json`);
joguinhodavelhajs.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs)) 
joguinhodavelhajs2.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
return;
}
const abt = Math.ceil(Math.random() + 4000)
const winnerJID = moving.winner == "O" ? moving.O : moving.X;
const looseJID = moving.winner == "O" ? moving.X : moving.O;
setTimeout(() => {
if(fs.existsSync("./ARQUIVES/tictactoe/db/" + from + ".json")) {
DLT_FL("./ARQUIVES/tictactoe/db/" + from + ".json");
reply(`O *jogo da velha* foi cancelado por falta de movimentação no tabuleiro ou o desafiado não aceitou no prazo de 5 minutos.`);
} else {
console.log(colors.red(time), colors.magenta("[ EXPIRADO ]"), colors.red('Jogo da velha espirado..'));
}
joguinhodavelhajs.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))
joguinhodavelhajs2.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
}, 300000) //5 minutos
await tokito.sendMessage(from, {
image: {
url:
`https://tokito-apis.site/canvas/jogodavelha?` +
`foto1=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.X}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&foto2=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.O}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&turno=${encodeURIComponent(moving.winner)}` +
`&c1=${encodeURIComponent(matrix[0][0])}` +
`&c2=${encodeURIComponent(matrix[0][1])}` +
`&c3=${encodeURIComponent(matrix[0][2])}` +
`&c4=${encodeURIComponent(matrix[1][0])}` +
`&c5=${encodeURIComponent(matrix[1][1])}` +
`&c6=${encodeURIComponent(matrix[1][2])}` +
`&c7=${encodeURIComponent(matrix[2][0])}` +
`&c8=${encodeURIComponent(matrix[2][1])}` +
`&c9=${encodeURIComponent(matrix[2][2])}`
},
caption: `「🏆」 ғɪᴍ ᴅᴀ ᴘᴀʀᴛɪᴅᴀ

- *✨ | ᴛᴇᴍᴏs ᴜᴍ ᴠᴇɴᴄᴇᴅᴏʀ!* ↴

『❌』 @${boardnow.X}
『⭕』 @${boardnow.O}

*_👑 | ᴠɪᴛᴏ́ʀɪᴀ ᴘᴀʀᴀ:_*
➜ @${winnerJID}

> 🔥 | ᴊᴏɢᴀᴅᴀ ʙʀᴀʙᴀ ᴅᴍs!`,
mentions: [
`${boardnow.X}@s.whatsapp.net`,
`${boardnow.O}@s.whatsapp.net`,
`${winnerJID}@s.whatsapp.net`
]
}, { quoted: selo });

DLT_FL(`./ARQUIVES/tictactoe/db/${from}.json`);
joguinhodavelhajs.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs)) 
joguinhodavelhajs2.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2))
} else {
await tokito.sendMessage(from, {
image: {
url:
`https://tokito-apis.site/canvas/jogodavelha?` +
`foto1=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.X}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&foto2=${encodeURIComponent(await upload(await getBuffer(await tokito.profilePictureUrl(`${boardnow.O}@s.whatsapp.net`, 'image').catch(() => 'https://telegra.ph/file/2fbfa46b4ea3baed434d1.jpg'))))}` +
`&turno=${encodeURIComponent(moving.turn)}` +
`&c1=${encodeURIComponent(matrix[0][0])}` +
`&c2=${encodeURIComponent(matrix[0][1])}` +
`&c3=${encodeURIComponent(matrix[0][2])}` +
`&c4=${encodeURIComponent(matrix[1][0])}` +
`&c5=${encodeURIComponent(matrix[1][1])}` +
`&c6=${encodeURIComponent(matrix[1][2])}` +
`&c7=${encodeURIComponent(matrix[2][0])}` +
`&c8=${encodeURIComponent(matrix[2][1])}` +
`&c9=${encodeURIComponent(matrix[2][2])}`
},
caption: `「🎮」 ᴊᴏɢᴏ ᴅᴀ ᴠᴇʟʜᴀ

- *⚡ | ᴀ ᴘᴀʀᴛɪᴅᴀ ᴇsᴛᴀ́ ʀᴏʟᴀɴᴅᴏ...* ↴

『❌』 @${boardnow.X}
『⭕』 @${boardnow.O}

*_🎯 | ᴀɢᴏʀᴀ ᴇ́ ᴀ ᴠᴇᴢ ᴅᴇ:_*
➜ @${moving.turn == "X" ? moving.X : moving.O}

> 🧠 | ᴘᴇɴsᴇ ʙᴇᴍ ᴀɴᴛᴇs ᴅᴇ ᴊᴏɢᴀʀ.`,
mentions: [
`${boardnow.X}@s.whatsapp.net`,
`${boardnow.O}@s.whatsapp.net`,
`${moving.turn == "X" ? moving.X : moving.O}@s.whatsapp.net`
]
}, { quoted: selo });

}
} 
} 
}

if (budy2.toLowerCase() === "s" || budy2.toLowerCase() === "sim") {
if (JSON.stringify(namoro2).includes(sender) && namoro2[namoro2.map(i => i.id).indexOf(sender)].idgp == from && isGroup) {
let C14 = namoro2.map(i => i.id).indexOf(sender);
let C12 = namoro1.map(i => i.usu1).indexOf(namoro2[C14].pedido + "@s.whatsapp.net");
namoro1[C12].namorados = true;
const agora = Date.now();
fs.writeFileSync("./DADOS_TOKITO/func/namoro1.json", JSON.stringify(namoro1));
namoro1.push({ usu1: sender, usu2: namoro2[C14].pedido, namorados: true, idgp: from, hora: hourofc, data: dattofc, inicio: agora });
fs.writeFileSync("./DADOS_TOKITO/func/namoro1.json", JSON.stringify(namoro1));
namoro2.splice(C14, 1);
fs.writeFileSync("./DADOS_TOKITO/func/namoro2.json", JSON.stringify(namoro2));
let ppimg;
try {
ppimg = await tokito.profilePictureUrl(sender, 'image');
} catch {
ppimg = imgperfil;
}
await tokito.sendMessage(from, {
image: { url: ppimg },
caption: mess.namoro(namoro1, C12, sender, prefix),
contextInfo: { ...DLchanneldl, mentionedJid: [namoro1[C12].usu1, sender] }
}, { quoted: selo });
}
}

if (budy2.toLowerCase() === "n" || budy2.toLowerCase().replace("ã", "a") === "nao") {
if (JSON.stringify(namoro2).includes(sender) && namoro2[namoro2.map(i => i.id).indexOf(sender)].idgp == from && isGroup) {
let C14 = namoro2.map(i => i.id).indexOf(sender);
let C12 = namoro1.map(i => i.usu1).indexOf(`${namoro2[C14].pedido}@s.whatsapp.net`);
await tokito.sendMessage(from, {text: mess.fora(namoro1, C12, sender, prefix), contextInfo: {...DLchanneldl, mentionedJid: [namoro1[C12].usu1, sender]}}, { quoted: selo });
namoro1.splice(C12, 1);
fs.writeFileSync("./DADOS_TOKITO/func/namoro1.json", JSON.stringify(namoro1));
namoro2.splice(C14, 1);
fs.writeFileSync("./DADOS_TOKITO/func/namoro2.json", JSON.stringify(namoro2));
}
}

startJogoDaVelha()

if (isGroup && isBotGroupAdmins && !isGroupAdmins && !SoDono && !info.key.fromMe && ANT_SP.active && ANT_SP.groupId !== from && budy.includes("https://chat.whatsapp.com/")) {
const CompareLink = await tokito.groupInviteCode(from);
if (!body.includes(CompareLink)) {
const regex = /(https:\/\/chat\.whatsapp\.com\/[^\s]+)/;
const links = body.match(regex);
const FOUND_LINK = links ? links[0] : "Not found";
const findPlace = async (number) => {
try {
const findDDD = await axios.get(`https://brasilapi.com.br/api/ddd/v1/${number}`);
return findDDD.data.state;
} catch {
return "Não encontrado";
}
};

async function carregamento() {
await new Promise(resolve => setTimeout(resolve, 500));
}
async function getdados() {
const number = sender.split("@")[0];
const getImage = await tokito.profilePictureUrl(sender, 'image').catch(() => imgperfil);
const getbio = `${number}@s.whatsapp.net`;

let recadoW;
try {
const recadoUser = await tokito.fetchStatus(getbio);
recadoW = recadoUser[0]?.status?.status || "*privado*";
} catch {
recadoW = "*privado*";
}
return {
creator: "Lm", nome: pushname, numero: number, grupo: groupName, link: FOUND_LINK, imagem: getImage, bio: recadoW, groupId: from, id: info.key.id, device: info.key.id.length > 21 ? 'Android 🚀' : (info.key.id.substring(0, 2) == '3E' ? 'WhatsApp Web 🪀' : 'iPhone 💸'), time: moment().tz("America/Sao_Paulo").format("HH:mm:ss"), data: moment().tz("America/Sao_Paulo").format("DD/MM/YYYY"), full_text: body, lugar: await findPlace(number.substring(2, 4)),
};
}
await getdados()
.then(async (lm) => {
await tokito.sendMessage(ANT_SP.groupId, {
text: mess.antisp(lm),
contextInfo: {...(DLchanneldl || {}), externalAdReply: {title: `⚠️ LINK DETECTADO ⚠️`, body: NomeDoBot, previewType: "PHOTO", thumbnailUrl: lm.imagem, thumbnail: Buffer, sourceUrl: channel}}, mentions: groupAdmins,
});
})
.catch(console.error);
}
}




let isTrueFalse = Array('tiktok', 'tiktok_audio', 'tiktok_video', 'facebook','instagram','twitter','ytmp3','ytmp4','play', 'playmix', 'play2', 'play3', 'playvid', 'playvid2').some(item => item === command)

if(isUrl(PR_String) && isAntiLinkHard && !isGroupAdmins && !SoDono && !isListaBrancaG && isBotGroupAdmins && !info.key.fromMe) {
if(isCmd && isTrueFalse) return
if(IS_DELETE) {
setTimeout(() => {
tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500)
}
tokito.groupSettingUpdate(from, 'announcement')
setTimeout(() => {
tokito.groupSettingUpdate(from, 'not_announcement')
}, 1200)
if(!JSON.stringify(groupMembers).includes(sender)) return
tokito.groupParticipantsUpdate(from, [sender], 'remove')
}

if (isAntilinkgp && isGroup && isBotGroupAdmins && !isGroupAdmins && !SoDono) {
try {

const messageText =
info.message?.conversation ||
info.message?.extendedTextMessage?.text ||
info.message?.imageMessage?.caption ||
info.message?.videoMessage?.caption ||
info.message?.documentMessage?.caption ||
info.message?.requestPaymentMessage?.noteMessage?.extendedTextMessage?.text ||
''

const temLinkBloqueado = /(?:https?:\/\/)?(?:www\.)?(chat\.whatsapp\.com\/[A-Za-z0-9]+|whatsapp\.com\/channel\/[A-Za-z0-9]+|xvideos\.com\/[^\s]+)/i.test(messageText)

const temPagamento =
info.message?.requestPaymentMessage ||
info.message?.sendPaymentMessage ||
info.message?.paymentInviteMessage

if (temLinkBloqueado || temPagamento) {
if (isBot) return
if (!JSON.stringify(groupMembers).includes(sender)) return

const numeroBanido = sender.split('@')[0]
const motivoBan = temPagamento ? 'ᴍᴇɴꜱᴀɢᴇᴍ ᴅᴇ ᴘᴀɢᴀᴍᴇɴᴛᴏ' : 'ʟɪɴᴋ ʙʟᴏǫᴜᴇᴀᴅᴏ'

await sleep(400)

await tokito.sendMessage(from, {
text: `*🚫 ᴀɴᴛɪʟɪɴᴋ ᴀᴛɪᴠᴀᴅᴏ!*

*👤 ᴜꜱᴜᴀ́ʀɪᴏ:* @${numeroBanido}
*📌 ᴍᴏᴛɪᴠᴏ:* ${motivoBan}

*⚠️ ᴏ ᴜꜱᴜᴀ́ʀɪᴏ ꜱᴇʀᴀ́ ʀᴇᴍᴏᴠɪᴅᴏ ᴇ ᴏ ᴄʜᴀᴛ ꜱᴇʀᴀ́ ʟɪᴍᴘᴏ.*`,
mentions: [sender]
}, { quoted: selo }).catch(() => {})

await sleep(300)

await tokito.sendMessage(from, {
delete: {
remoteJid: from,
fromMe: false,
id: info.key.id,
participant: sender
}
}).catch(() => {})

await sleep(300)

await tokito.groupSettingUpdate(from, 'announcement').catch(() => {})

await sleep(300)

await tokito.groupParticipantsUpdate(from, [sender], 'remove').catch(() => {})

await sleep(300)

clear = `🗑️\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n🗑️\n❲❗❳ *Lɪᴍᴘᴇᴢᴀ ᴅᴇ Cʜᴀᴛ Cᴏɴᴄʟᴜɪ́ᴅᴀ* ✅`

for (let i = 0; i < 5; i++) {
await tokito.sendMessage(from, {
text: clear
}, { quoted: selo }).catch(() => {})
await sleep(300)
}

await sleep(2000)

await tokito.groupSettingUpdate(from, 'not_announcement').catch(() => {})

await sleep(300)

await tokito.sendMessage(from, {
text: `*🔓 ɢʀᴜᴘᴏ ᴀʙᴇʀᴛᴏ ɴᴏᴠᴀᴍᴇɴᴛᴇ!*

*✅ ᴀ ʟɪᴍᴘᴇᴢᴀ ꜰᴏɪ ᴄᴏɴᴄʟᴜɪ́ᴅᴀ.*
*🛡️ ᴏ ᴀɴᴛɪʟɪɴᴋ ᴄᴏɴᴛɪɴᴜᴀ ᴀᴛɪᴠᴏ.*

*⚠️ ᴇᴠɪᴛᴇᴍ ᴇɴᴠɪᴀʀ ʟɪɴᴋꜱ ᴘʀᴏɪʙɪᴅᴏꜱ.*`
}, { quoted: selo }).catch(() => {})

return
}

} catch (e) {
console.log('Erro no antilinkgp:', e)
}
}
const groupIdscount = countMessage.map(i => i.groupId);
if (!muted.some(i => i.grupo === from) && isGroup) {
  muted.push({ grupo: from, silenciados: [], mutados: [] });
  fs.writeFileSync("./DADOS_TOKITO/grupos/muted.json", JSON.stringify(muted, null, 2));
}
const grupoMute = muted.find(i => i.grupo === from);
if (isGroup && grupoMute) {
if (grupoMute.silenciados?.includes(sender)) {
await tokito.sendMessage(from, {
delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }
});
}
if (grupoMute.mutados?.includes(sender)) {
await tokito.sendMessage(from, {
delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender }
});
await tokito.sendMessage(from, {
text: `*ᴛᴏᴍᴏᴜ ᴘᴏʀ ɴᴀᴏ ꜰɪᴄᴀʀ ǫᴜɪᴇᴛᴏ 💢🙇‍♂️*`,
mentions: [sender]
}, { quoted: selo });

await tokito.groupParticipantsUpdate(from, [sender], 'remove');
grupoMute.mutados = grupoMute.mutados.filter(id => id !== sender);
fs.writeFileSync("./DADOS_TOKITO/grupos/muted.json", JSON.stringify(muted, null, 2));
}
}


let ind = countMessage.map(i => i.groupId).indexOf(from);
if (ind === -1) {
countMessage.push({
groupName: groupName,
groupId: from,
numbers: []
});
ind = countMessage.length - 1;
}
if (sender.endsWith('@g.us')) {
return;
}
const numbersIds = countMessage[ind].numbers.map(u => u.id);
if (!numbersIds.includes(sender)) {
countMessage[ind].numbers.push({
id: sender,
messages: isCmd ? 0 : 1,
cmd_messages: isCmd ? 1 : 0,
aparelho: adivinha || 'desconhecido',
figus: type === "stickerMessage" ? 1 : 0,
imagens: isImage ? 1 : 0,
videos: isVideo ? 1 : 0,
audios: isAudio ? 1 : 0,
documentos: (isQuotedDocument || type === "documentMessage") ? 1 : 0
});
} else {
const indnum = numbersIds.indexOf(sender);
const userData = countMessage[ind].numbers[indnum];

if (type !== "stickerMessage") {
userData.messages = (userData.messages || 0) + (isCmd ? 0 : 1);
userData.cmd_messages = (userData.cmd_messages || 0) + (isCmd ? 1 : 0);
userData.aparelho = adivinha || userData.aparelho || 'desconhecido';
}

userData.figus = (userData.figus || 0) + (type === "stickerMessage" ? 1 : 0);
userData.imagens = (userData.imagens || 0) + (isImage ? 1 : 0);
userData.videos = (userData.videos || 0) + (isVideo ? 1 : 0);
userData.audios = (userData.audios || 0) + (isAudio ? 1 : 0);
userData.documentos = (userData.documentos || 0) + ((isQuotedDocument || type === "documentMessage") ? 1 : 0);
}
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/countmsg.json', JSON.stringify(countMessage));
const getGroupIndex = (groupId) => countMessage.findIndex(g => g.groupId === groupId);
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

if(body != undefined) { /* Créditos: @Nkzin */
if(!JSON.stringify(pushnames).includes(botNumber)) {
pushnames.push({id: botNumber, nick: NomeDoBot});
fs.writeFileSync("./DADOS_TOKITO/usuarios/users.json", JSON.stringify(pushnames, null, 2));
}
if(!JSON.stringify(pushnames).includes(sender)) {
pushnames.push({id: sender, nick: pushname});
fs.writeFileSync("./DADOS_TOKITO/usuarios/users.json", JSON.stringify(pushnames, null, 2));
} else {
pushnames[pushnames.map(i => i.id).indexOf(sender)].nick = pushname
fs.writeFileSync("./DADOS_TOKITO/usuarios/users.json", JSON.stringify(pushnames, null, 2));
}
}

//======================================\\

const tokitoAluguel = './ARQUIVES/tictactoe/grupos_com_aluguel.json'
let gruposAutorizados = []
if (!fs.existsSync(tokitoAluguel)) fs.writeFileSync(tokitoAluguel, JSON.stringify([]))
gruposAutorizados = JSON.parse(fs.readFileSync(tokitoAluguel))
function salvarGrupos() {
fs.writeFileSync(tokitoAluguel, JSON.stringify(gruposAutorizados, null, 2))
}
function ativarAluguelGrupo(from, dias = 0, horas = 0) {
const agora = new Date()
const expiraEm = new Date(agora.getTime() + (dias * 24 + horas) * 60 * 60 * 1000)

const jaExiste = gruposAutorizados.find(g => g.id === from)
if (!jaExiste) {
gruposAutorizados.push({ id: from, expiraEm: expiraEm.toISOString() })
salvarGrupos()
} else {
jaExiste.expiraEm = expiraEm.toISOString()
salvarGrupos()
}
}
async function desativarAluguelGrupo(from) {
try {
gruposAutorizados = gruposAutorizados.filter(g => g.id !== from)
salvarGrupos()
const meta = await tokito.groupMetadata(from)
const midia = carregarMidia("fotomenu")
const msg = { caption: mess.aluguel(ownerNumber, NumeroDoBot, NomeDoBot), contextInfo: { ...DLchanneldl }, mentions: groupAdmins}
if (midia.type === "video") {
msg.video = midia.data
msg.gifPlayback = true
} else if (midia.type === "image") {
msg.image = midia.data
} else {
msg.text = msg.caption
}
await tokito.sendMessage(from, msg)
} catch (e) {
console.log("Erro ao desativar aluguel:", e)
}
}


function isGrupoAutorizado(from) {
const grupo = gruposAutorizados.find(g => g.id === from)
if (!grupo) return false

const agora = new Date()
const expira = new Date(grupo.expiraEm)

if (agora > expira) {
desativarAluguelGrupo(from)
return false
}
return true
}

if (isGroup && isModoAluguel && !SoDono && !isGrupoAutorizado(from)) {
 return
}

//======(ANTI-IMAGEM)========\\
if (isAntiImg && isBotGroupAdmins && type == 'imageMessage') {
if (info.key.fromMe) return; 
if (isGroupAdmins) return;
if (dataGp[0].legenda_imagem == "0") {
await tokito.sendMessage(from, { text: "Por favor, envie uma imagem com legenda." }, { quoted: selo });
if (IS_DELETE) {
setTimeout(async () => {
if (groupMembers.find(member => member.id === sender)) {
await tokito.groupParticipantsUpdate(from, [sender], 'remove');}}, 1000); }}}

//======(ANTI-STICKER)========\\
if(isAntiSticker && !isGroupAdmins && isBotGroupAdmins && type == 'stickerMessage') {
if(info.key.fromMe) return; 
const isAdminOrOwner = groupMembers.find(member => member.id === sender && (member.isAdmin || member.isOwner));
if(isAdminOrOwner) return;
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return;
await tokito.groupParticipantsUpdate(from, [sender], 'remove');
}

//============[ ANTI DOCUMENTO ]============\\

if(Antidoc && isBotGroupAdmins && !isGroupAdmins && type == 'documentMessage') {
if(info.key.fromMe) return
if(isGroupAdmins) return await tokito.sendMessage(from, {text: mess.messageProhibitedDetAdmin()}, {quoted: selo})
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500)
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await tokito.groupParticipantsUpdate(from, [sender], 'remove')
}


if(isUrl(PR_String) && isAntiLinkEasy && !isGroupAdmins && !isListaBrancaG && isBotGroupAdmins && !info.key.fromMe) {
if(Procurar_String.includes("chat.whatsapp.com")) {
link_dgp = await tokito.groupInviteCode(from)
if(Procurar_String.match(link_dgp)) return reply('*[-⚠-] ᴅɪᴠᴜʟɢᴏᴜ ʟɪɴᴋ? ɪʀᴇɪ ᴀᴘᴀɢᴀʀ.*');
}
if(isCmd && isTrueFalse) return
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
}

// ANTI NOTAS FAKES ==================>
if(isAntiNotas && budy2.toString().match(/(💳|💎|💸|💵|💷|💶|🪙|💰|🤑|⚖️)/gi) && isBotGroupAdmins && !isGroupAdmins && !SoDono && !info.message?.reactionMessage?.text && budy2.length > 20) {
let verificar = budy2.toString().match(/(💳|💎|💸|💵|💷|💶|🪙|💰|🤑|⚖️)/gi);
if(verificar && budy.length < 100) return
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await tokito.groupParticipantsUpdate(from, [sender], 'remove');
}

//FINALZIN ===========================>
function remover(id, usu) {
tokito.groupParticipantsUpdate(id, [usu], "remove")}
//======(ANTI-VIDEO)========\\
if(isAntiVid && isBotGroupAdmins && type == 'videoMessage') {
if(isGroupAdmins) return await tokito.sendMessage(from, {text: mess.messageProhibitedDetAdmin()}, {quoted: selo});
if(dataGp[0].legenda_video == "0") {
await tokito.sendMessage(from, {text: mess.messageProhibitedDetUser()}, {quoted: selo});
} else {
await tokito.sendMessage(from, {text: dataGp[0].legenda_video}, {quoted: selo});
}
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await tokito.groupParticipantsUpdate(from, [sender], 'remove');
}

//======(ANTI-AUDIO)=======\\
if(isAntiAudio && isBotGroupAdmins && type == 'audioMessage') {
if(isGroupAdmins) return await tokito.sendMessage(from, {text: mess.messageProhibitedDetAdmin()}, {quoted: selo});
await tokito.sendMessage(from, {text: mess.messageProhibitedDetUser()}, {quoted: selo});
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}});
}, 500);
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await tokito.groupParticipantsUpdate(from, [sender], 'remove');
}

//========(ANTI_LIGAR)========\\
if (!isGroup && isAnticall) {
tokito.ws.on('CB:call', async (B) => {
if (B.content[0].tag == 'offer') {
const numero = B.content[0].attrs['call-creator'];
await tokito.updateBlockStatus(numero, "block");
}
});
}

if (isGroup && dataGp[0]?.antistatus === true && JSON.stringify(info.message).includes('groupStatusMentionMessage') && isBotGroupAdmins && !SoDono && !isGroupAdmins) {
await tokito.sendMessage(from, {
text: `*ᴜꜱᴜᴀʀɪᴏ ʙᴀɴɪᴅᴏ ᴩᴏʀ ᴍᴀʀᴄᴀʀ ᴏ ɢʀᴜᴩᴏ* 🗣️`,
mentions: [sender]
}, { quoted: selo })
await tokito.groupParticipantsUpdate(from, [sender], 'remove')
setTimeout(() => {
tokito.sendMessage(from, {
delete: {
remoteJid: from,
fromMe: false,
id: info.key.id,
participant: sender
}
})
}, 1000)
}



/* ANTIPV1 - Este anti pv bloqueia aqueles que encaminham mensagem no pv do bot.. */
var USUARIOS_BLOQ = []
if(isAntiPv && !USUARIOS_BLOQ.includes(sender)) {
if(!isGroup && !SoDono && !isnit && !isVip){ 
await sleep(2500)
reply(msgantipv1.replace('#nome#', pushname))
setTimeout(async () => {
await tokito.updateBlockStatus(sender, 'block')
}, 2000)
}
USUARIOS_BLOQ.push(sender);
} 

/* ANTIPV2 - Vai floodar o privado do usuário que encaminhar a mensagem no privado.. */
var MSG_ANTPV2_ENC = []
if(!isGroup && !isVip && !SoDono && !isnit && !issupre && !ischyt && !info.key.fromMe && isAntiPv2 && !MSG_ANTPV2_ENC.includes(sender)) {
MSG_ANTPV2_ENC.push(sender);
return reply(msgantipv2)
}

/* ANTIPV3 - Ignora todos os que falam ou usam os comandos no privado, exceto user vip e o proprietário atual do bot. */
if(!isGroup && !isVip && !SoDono && !info.key.fromMe && isAntiPv3) return

//====================================\\

const VerificarJSON = (json, value) => {
if(JSON.stringify(json).includes(value)) return true
return false
}

const RG_SCOINS = JSON.parse(fs.readFileSync("./DADOS_TOKITO/func/coins.json"));

const isModoCoins = isGroup ? dataGp[0].isModoCoins : undefined

const ID_G_COINS = RG_SCOINS.findIndex(i => i.grupo === from)
const ID_USU_COINS = RG_SCOINS[ID_G_COINS]?.usus?.findIndex(i => i.id === sender);

function CoinsUpdate(index){
fs.writeFileSync("./DADOS_TOKITO/func/coins.json", JSON.stringify(index, null, 2) + "\n")
}

const SYSTEM_COIN = {

AdicionarCoins: async function(user, quant) {
CoinsUser_ = RG_SCOINS[ID_G_COINS].usus.find(i => i.id === user);
if(!CoinsUser_) return reply("O(a) usuário(a) nunca enviou uma mensagem neste grupo! Então não é possível adicionar ou transferir coins à um membro que não possuí registro!");
CoinsUser_["coins"] += quant;
CoinsUpdate(RG_SCOINS);
},

transferCoins: async function(transferidor, recebidor, quantidade) {
DM_ = RG_SCOINS[ID_G_COINS].usus.find(i => i.id === transferidor)
DM_2 = RG_SCOINS[ID_G_COINS].usus.find(i => i.id === recebidor)
if((DM_?.coins || 0) < quantidade) return mention(`A quantidade que você tem é inferior a que você deseja transferir ao usuário: @${recebidor.split("@")[0]}`)
if(!DM_2) return mention(`O(a) usuário(a) '@${recebidor.split("@")[0]}' nunca enviou uma mensagem neste grupo! Então não é possível adicionar ou transferir coins à um usuário não registrado no meu sistema!`);
DM_["coins"] -= quantidade;
DM_2["coins"] += quantidade;
CoinsUpdate(RG_SCOINS);
},

Adicionar_2: async function(A, Q, X, X2) {
DM_ = RG_SCOINS[ID_G_COINS].usus.find(i => i.id === A);
if(!DM_) return reply("O(a) usuário(a) nunca enviou uma mensagem neste grupo! Então não é possível atualizar a carteira!");
DM_["coins"] += Q;
DM_[X] = X2
CoinsUpdate(RG_SCOINS);
},

RemoverCoins: async function(user, quant) {
CoinsUser = RG_SCOINS[ID_G_COINS].usus.find(i => i.id === user)
if(!CoinsUser) return reply("O(a) usuário(a) nunca enviou uma mensagem neste grupo! Então não é possível remover coins de membro inativo que não possuí registro!");
if((CoinsUser?.coins || 0) < quant) return reply(`O usuário possuí '${CoinsUser?.coins} N-Coins', este valor não é suficiente para realizar a transação de remoção de ${quant}.`);
CoinsUser["coins"] -= quant;
CoinsUpdate(RG_SCOINS);
},

VerificarCampo: function(user, parameter) {
return RG_SCOINS[ID_G_COINS].usus.find(i => i.id === user)[parameter] || null;
},

}

if(isModoCoins && isGroup && isBotGroupAdmins && VRF_JSON_GRUPO && !info.key.fromMe) {

if(!RG_SCOINS.some(i => i.grupo === from)) {
RG_SCOINS.push({grupo: from, usus: [{id: sender, coins: 0, data: 0, chances: {cassino: 0, minerar: 0}}]})
CoinsUpdate(RG_SCOINS);
} else if(RG_SCOINS.some(i => i.grupo === from) && !RG_SCOINS[ID_G_COINS]?.usus?.some(i => i?.id === sender)) {
RG_SCOINS[ID_G_COINS].usus.push({id: sender, coins: 0, data: 0, chances: {cassino: 0, minerar: 0}})
CoinsUpdate(RG_SCOINS);
}

if(!info.message?.reactionMessage?.text && dattofc != SYSTEM_COIN.VerificarCampo(sender, "data")) {
await mention(mess.coins(tempo, sender, prefix));
SYSTEM_COIN.Adicionar_2(sender, 50, "data", dattofc);
RG_US = RG_SCOINS[ID_G_COINS].usus.find(i => i.id === sender);
Object.assign(RG_US.chances, {"cassino": 0, "minerar": 0});
CoinsUpdate(RG_SCOINS);
}
}

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`)){
let dataA = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`))
if(budy.slice(0,4).toUpperCase() == dataA.palavraOriginal.slice(0,4).toUpperCase() && budy.toUpperCase() != dataA.palavraOriginal) return reply('Está perto...')
if(budy.toUpperCase() == dataA.palavraOriginal) {
await tokito.sendMessage(from, {text: mess.acert(pushname, dataA, resposta)}, {"mentionedJid": [sender]}, {quoted: selo})
await SYSTEM_COIN.AdicionarCoins(sender, 5);
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`)		
setTimeout(async() => {
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`, `${JSON.stringify(palavrasANA[Math.floor(Math.random() * palavrasANA.length)])}`)
dataAB = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`))
tokito.sendMessage(from, {text: mess.anagrama(shuffle, dataAB)}, {quoted: selo})
}, 5000)
}}

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`)){
let dQ = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`))
if(budy.slice(0,4).toUpperCase() == dQ.original.slice(0,4).toUpperCase() && budy.toUpperCase() != dQ.original) return reply('está perto')
if(budy.toUpperCase() == dQ.original) { 
await tokito.sendMessage(from,{text: mess.quizaC(pushname, dQ)}, {"mentionedJid": [sender]}, {quoted: selo}) 
await SYSTEM_COIN.AdicionarCoins(sender, 5);
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`)		
setTimeout(async() => {
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`, `${JSON.stringify(quizanimais[Math.floor(Math.random() * quizanimais.length)])}`)
dataQA = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`))
wew = await getBuffer(dataQA.foto)
await tokito.sendMessage(from, {image: wew, caption: `🤔 Pergunta: ${dataQA.question}`}, {quoted: selo})
}, 5000)
}
}

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`)){
let dQF = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`))
if(budy.slice(0,4).toUpperCase() == dQF.resposta.slice(0,4).toUpperCase() && budy.toUpperCase() != dQF.resposta) return reply('está perto')
if(budy.toUpperCase() == dQF.resposta) { 
await tokito.sendMessage(from,{text: mess.quizC(pushname, dQF)}, {"mentionedJid": [sender]}, {quoted: selo}) 
await SYSTEM_COIN.AdicionarCoins(sender, 5);
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`)		
setTimeout(async() => {
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`, `${JSON.stringify(quizFutebol[Math.floor(Math.random() * quizFutebol.length)])}`)
dataQF = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`))
await tokito.sendMessage(from, {text: mess.quizfut(dataQF)}, {quoted: selo})
}, 5000)
}
}

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`)){
let perg_gartic = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`))
if(budy.slice(0,4).toUpperCase() == perg_gartic.resposta.slice(0,4).toUpperCase() && budy.toUpperCase() != perg_gartic.resposta) return reply('Está perto!')
if(budy.toUpperCase() == perg_gartic.resposta) { 
await tokito.sendMessage(from,{text: mess.descorbert(pushname)}, {"mentionedJid": [sender]}, {quoted: selo}); 
await SYSTEM_COIN.AdicionarCoins(sender, 5);
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`);
setTimeout(async() => {
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`, `${JSON.stringify(garticArchives[Math.floor(Math.random() * garticArchives.length)])}`)
let dataGartic2 = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`))
garticText = mess.gartic(dataGartic2, prefix)
wew = await getBuffer(`${dataGartic2.imagem}`)
await tokito.sendMessage(from, {image: wew, caption: garticText}, {quoted: selo})
}, 5000)
}
}

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`)){
let enigmaData = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`))
if(budy.slice(0,4).toUpperCase() == enigmaData.respostaEne.slice(0,4).toUpperCase() && budy.toUpperCase() != enigmaData.respostaEne) return reply('Está perto!')
if(budy.toUpperCase() == enigmaData.respostaEne) { 
tokito.sendMessage(from,{text: mess.respostaE(pushname)}, {"mentionedJid": [sender]}, {quoted: selo})
await SYSTEM_COIN.AdicionarCoins(sender, 5);
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`)	
setTimeout(async() => {
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`, `${JSON.stringify(enigmaArchive[Math.floor(Math.random() * enigmaArchive.length)])}`)
enigmaD = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`))
enigmaTezt = mess.respondeE(enigmaD, prefix)
wew = await getBuffer(rvenigma)
await tokito.sendMessage(from, {image: wew, caption: enigmaTezt}, {quoted: selo})
}, 5000)
}
}

if(isGroup && fs.existsSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`)){
whatMusic = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`))
if(budy.slice(0,4).toUpperCase() == whatMusic.resposta.slice(0,4).toUpperCase() && budy.toUpperCase() != whatMusic.resposta) return reply('Tá perto hein! Tente novamente...')
if(budy.toUpperCase() == whatMusic.resposta) { 
tokito.sendMessage(from,{text: mess.whatmusic(whatMusic, pushname)}, {"mentionedJid": [sender]}, {quoted: selo}); fs.unlinkSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`);
setTimeout(async() => {
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`, `${JSON.stringify(whatMusicAr[Math.floor(Math.random() * whatMusicAr.length)])}`)
wmusic = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`))
textM = mess.wmusic(wmusic, II)
await tokito.sendMessage(from, {text: textM}, {quoted: selo})
}, 5000)
}
}

if (isX9VisuUnica) {
if (info.message?.viewOnceMessageV2 || type === "viewOnceMessage") {
let px;
if (JSON.stringify(info).includes("videoMessage")) {
px = info.message?.viewOnceMessageV2?.message?.videoMessage || 
info.message?.viewOnceMessage?.message?.videoMessage;
if (px) {
px.viewOnce = false;
px.video = { url: px.url };
px.caption = (px.caption || "") + "\n\n";
await tokito.sendMessage(from, px, { quoted: selo });
}
} else if (JSON.stringify(info).includes("imageMessage")) {
px = info.message?.viewOnceMessageV2?.message?.imageMessage || 
info.message?.viewOnceMessage?.message?.imageMessage;
if (px) {
px.viewOnce = false;
px.image = { url: px.url };
px.caption = (px.caption || "") + "\n\n";
await tokito.sendMessage(from, px, { quoted: selo });
}
} else if (JSON.stringify(info).includes("audioMessage") || 
                   info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2Extension?.message?.audioMessage) {
let audio = info.message?.viewOnceMessageV2?.message?.audioMessage || 
info.message?.viewOnceMessage?.message?.audioMessage;

if (audio && audio.mimetype) {
let buffAudio = await getFileBuffer(audio, 'audio');
let audioFile = getRandom('.mp3');
fs.writeFileSync(audioFile, buffAudio);
let audioBuffer = fs.readFileSync(audioFile);

await tokito.sendMessage(from, { 
audio: audioBuffer, 
mimetype: 'audio/mpeg', 
ptt: false 
}, { quoted: selo });

fs.rmSync(audioFile);
}
}
}
}

//INICIO DE COMANDOS DE FECHAR E ABRIR GRUPO NO HORÁRIO PROGRAMADO!!

let horarios = {}
const horariosPath = './ARQUIVES/tictactoe/grupo.json'

if (!fs.existsSync(path.dirname(horariosPath))) {
fs.mkdirSync(path.dirname(horariosPath), { recursive: true })
}

if (!fs.existsSync(horariosPath)) {
fs.writeFileSync(horariosPath, JSON.stringify({}, null, 2))
}

try {
horarios = JSON.parse(fs.readFileSync(horariosPath))
} catch (e) {
console.error('erro ao carregar horarios:', e)
horarios = {}
}

const salvarHorarios = () => {
fs.writeFileSync(horariosPath, JSON.stringify(horarios, null, 2))
}

const definirFechamento = (from, horario) => {
horarios[from] = horarios[from] || {}
horarios[from].fechamento = horario
salvarHorarios()
}

const definirAbertura = (from, horario) => {
horarios[from] = horarios[from] || {}
horarios[from].abertura = horario
salvarHorarios()
}

const definirFigFechar = (from, base64) => {
horarios[from] = horarios[from] || {}
horarios[from].figFechar = base64
salvarHorarios()
}

const definirFigAbrir = (from, base64) => {
horarios[from] = horarios[from] || {}
horarios[from].figAbrir = base64
salvarHorarios()
}

const removerHorarios = (from) => {
if (horarios[from]) {
delete horarios[from]
salvarHorarios()
}
}

async function baixarStickerBase64(info) {
let quoted = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
let stickerMsg = null

if (quoted?.stickerMessage) {
stickerMsg = quoted.stickerMessage
} else if (info.message?.stickerMessage) {
stickerMsg = info.message.stickerMessage
}

if (!stickerMsg) return null

const stream = await downloadContentFromMessage(stickerMsg, 'sticker')
let buffer = Buffer.from([])

for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}

return buffer.toString('base64')
}

async function enviarStickerSalvo(sock, from, base64) {
if (!base64) return false

try {
const buffer = Buffer.from(base64, 'base64')
await sock.sendMessage(from, { sticker: buffer })
return true
} catch (e) {
console.error('erro ao enviar figurinha salva:', e)
return false
}
}

let ultimaExecucao = {}

if (global.intervalHorarios) clearInterval(global.intervalHorarios)

global.intervalHorarios = setInterval(async () => {
const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')

try {
if (fs.existsSync(horariosPath)) {
horarios = JSON.parse(fs.readFileSync(horariosPath))
}
} catch (e) {
console.error('erro ao ler horarios:', e)
horarios = {}
}

for (const from in horarios) {
const horario = horarios[from]
if (!horario) continue

try {
if (horario.fechamento && time2 === horario.fechamento) {
if (ultimaExecucao[from + '_fechamento'] !== horario.fechamento) {
await tokito.groupSettingUpdate(from, 'announcement')

await tokito.sendMessage(from, {
text: typeof mess.fechamento === 'function'
? mess.fechamento(horario)
: '*🔒 Grupo fechado automaticamente.*'
})

await enviarStickerSalvo(tokito, from, horario.figFechar)

ultimaExecucao[from + '_fechamento'] = horario.fechamento
}
}

if (horario.abertura && time2 === horario.abertura) {
if (ultimaExecucao[from + '_abertura'] !== horario.abertura) {
await tokito.groupSettingUpdate(from, 'not_announcement')

await tokito.sendMessage(from, {
text: typeof mess.abertura === 'function'
? mess.abertura(horario)
: '*🔓 Grupo aberto automaticamente.*'
})

await enviarStickerSalvo(tokito, from, horario.figAbrir)

ultimaExecucao[from + '_abertura'] = horario.abertura
}
}
} catch (e) {
console.error('erro ao executar horario programado:', e)
}
}
}, 1000)

async function sendMenu(from, selo, opt = {}) {
const {
reaction = "⚡", caption = mess.error(), isGroupRequired = false, isAdminRequired = false, isOwnerRequired = false, isModoCoinsRequired = false, isModoBnRequired = false, sendAudio = false } = opt;
try {
reagir(from, reaction);
if (isGroupRequired && !isGroup) return reply(mess.onlyGroup());
if (isAdminRequired && !isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (isOwnerRequired && !SoDono) return reply(mess.onlyOwner());
if (isModoCoinsRequired && !isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ só ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ.*`);
if (isModoBnRequired && !isModobn) return reply(mess.onlyGroupFun(prefix));
if (sendAudio && isAudioMenu) await sendAudioMenu(from);
const midia = carregarMidia("fotomenu");
const msg = { caption, contextInfo: { ...DLchanneldl } };
if (midia.type === "video") {
msg.video = midia.data;
msg.gifPlayback = true;
} else if (midia.type === "image") {
msg.image = midia.data;
} else {
msg.text = caption;
}
await tokito.sendMessage(from, msg, { quoted: selo });
} catch (e) {
console.error(e);
await tokito.sendMessage(from, { text: caption, contextInfo: { ...DLchanneldl } }, { quoted: selo });
}
}


if (
isAutodown &&
typeof body === 'string' &&
!body.startsWith(prefix) &&
!info.key.fromMe &&
isGroup // se quiser também no privado, remove essa linha
) {

// ─── TIKTOK ─────────────────────────
if (/tiktok\.com|vm\.tiktok\.com/i.test(body)) {
try {
await tokito.sendMessage(from, {
react: { text: "⌛", key: info.key }
});

const apiUrl = `https://tokito-apis.site/api/tiktok-video?url=${encodeURIComponent(body.trim())}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(from, {
video: { url: apiUrl },
mimetype: "video/mp4",
contextInfo: DLchanneldl
}, { quoted: selo });

await tokito.sendMessage(from, {
react: { text: "✅", key: info.key }
});
return;

} catch (e) {
console.log('[AUTO TIKTOK ERRO]', e);
await tokito.sendMessage(from, {
react: { text: "❌", key: info.key }
});
return;
}
}

// ─── INSTAGRAM ───────────────────────
if (/instagram\.com/i.test(body)) {
try {
await tokito.sendMessage(from, {
react: { text: "⌛", key: info.key }
});

const apiUrl = `https://tokito-apis.site/api/insta-video?url=${encodeURIComponent(body.trim())}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(from, {
video: { url: apiUrl },
mimetype: "video/mp4",
contextInfo: DLchanneldl
}, { quoted: selo });

await tokito.sendMessage(from, {
react: { text: "✅", key: info.key }
});
return;

} catch (e) {
console.log('[AUTO INSTAGRAM ERRO]', e);
await tokito.sendMessage(from, {
react: { text: "❌", key: info.key }
});
return;
}
}

// ─── YOUTUBE (ÁUDIO) ─────────────────
if (/youtube\.com|youtu\.be/i.test(body)) {
try {
await tokito.sendMessage(from, {
react: { text: "⌛", key: info.key }
});

const apiUrl = `https://tokito-apis.site/api/youTube-audio?q=${encodeURIComponent(body.trim())}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(from, {
audio: { url: apiUrl },
mimetype: "audio/mpeg",
ptt: false,
contextInfo: DLchanneldl
}, { quoted: selo });

await tokito.sendMessage(from, {
react: { text: "✅", key: info.key }
});
return;

} catch (e) {
console.log('[AUTO YOUTUBE ERRO]', e);
await tokito.sendMessage(from, {
react: { text: "❌", key: info.key }
});
return;
}
}

// ─── SPOTIFY ─────────────────────────
if (/open\.spotify\.com\/(track|playlist|album)/i.test(body)) {
try {
await tokito.sendMessage(from, {
react: { text: "🎧", key: info.key }
});

const apiUrl = `https://tokito-apis.site/api/spotify?url=${encodeURIComponent(body.trim())}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(from, {
audio: { url: apiUrl },
mimetype: "audio/mpeg",
ptt: false,
contextInfo: DLchanneldl
}, { quoted: selo });

await tokito.sendMessage(from, {
react: { text: "✅", key: info.key }
});
return;

} catch (e) {
console.log('[AUTO SPOTIFY ERRO]', e);
await tokito.sendMessage(from, {
react: { text: "❌", key: info.key }
});
return;
}
}
}
/////\\\\\\//////\\\\\\////\\\\////\\\///\\\///\\\\

if(isCmd && isBanned) return reply(mess.bannedUser())
// 🤖 TOKITO IA — controle por grupo
// 🤖 TOKITO IA — modo automático (igual autodown)

const totalhit = JSON.parse(fs.readFileSync('./DADOS_TOKITO/data/totalcmd.json'))
const CmdUsedBOT = () => {
totalhit[0].totalcmd += 1
fs.writeFileSync('./DADOS_TOKITO/data/totalcmd.json', JSON.stringify(totalhit))
}
if (isCmd) CmdUsedBOT()

const reqcmd = JSON.parse(fs.readFileSync('./DADOS_TOKITO/data/totalcmd.json'))

if (isGroup && isCmd && !isGroupAdmins && !SoDono && !isVip && dataGp[0]?.Limitar_CMD) {
var TEMPO_A = Math.floor(Date.now() / 1000) 
var ID_G = Limit_CMD.findIndex(i => i.idgp === from)
var ID_U = Limit_CMD[ID_G]?.ids.findIndex(i => i.id === sender)
if(!JSON.stringify(Limit_CMD).includes(from) || ID_G < 0 && ID_U < 0) {
Limit_CMD.push({idgp: from, ids: [{id: sender, tempo: TEMPO_A}]})
fs.writeFileSync("./DADOS_TOKITO/func/limitarcmd.json", JSON.stringify(Limit_CMD, null, 2));
} else if(ID_G >= 0 && ID_U < 0) {
Limit_CMD[ID_G].ids.push({id: sender, tempo: TEMPO_A})
fs.writeFileSync("./DADOS_TOKITO/func/limitarcmd.json", JSON.stringify(Limit_CMD, null, 2));
}

if(ID_G >= 0 && ID_U >= 0) {
var TEMPO_D = Limit_CMD[ID_G].ids[ID_U].tempo;
var TEMPO_M = TEMPO_A - TEMPO_D
var TEMPO_D2 = parseInt(dataGp[0]?.Limit_tempo) || 60
if(TEMPO_M < TEMPO_D2) {
return reply(nescessario.TEMPO_DE_CMD.replaceAll("#tempocmd#", TimeCount(TEMPO_M)).replaceAll("#tempo#", TEMPO_D2))
} else {
Limit_CMD[ID_G].ids[ID_U].tempo = TEMPO_A
fs.writeFileSync("./DADOS_TOKITO/func/limitarcmd.json", JSON.stringify(Limit_CMD, null, 2));
}
}
}

tokito.sendImageAsSticker = async (jid, path, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await tokito.sendMessage(jid, { sticker: { url: buffer }, ...options})
return buffer
}

tokito.sendInteractiveTXT = async(idChat, mainText = '', footerText = '', quotedMessage = {}, buttonsParams = {}) => {
try {
await tokito.relayMessage(idChat, {interactiveMessage: {body: {text: mainText}, footer: {text: footerText}, contextInfo: quotedMessage, nativeFlowMessage: buttonsParams}}, {});
} catch(errorMessage) {
await reply(String(errorMessage));
}
}

tokito.sendInteractiveIMG = async(imageDir, ChatID, definedText = '', footer = '', contextMessageInfo = {}, buttonsParams = {}) => {
try {
create = await prepareWAMessageMedia({image: fs.readFileSync(imageDir)}, {upload: tokito.waUploadToServer});
imageCreate = create.imageMessage;
await tokito.relayMessage(ChatID, {interactiveMessage: {header: {hasMediaAttachment: true, imageMessage: imageCreate}, headerType: 'IMAGE', body: {text: definedText}, footer: {text: footer}, contextInfo: contextMessageInfo, nativeFlowMessage: buttonsParams}}, {});
} catch(errorMessage) {
return reply(String(errorMessage));
}
 }
 
 const getallcases = () => {
findindex = fs.readFileSync("tokito.js").toString().match(/case\s+'(.+?)'/g)
cstt = []
for(i of findindex) {
cstt.push(i.split(`'`)[1])
}
return cstt
}

const allCases = getallcases();

const getSimilarity = require(`./ARQUIVES/js/similaridade.js`)

const rmLetras = (txt) => {
return txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

const similarityCmd = (txt) => {
getsmlrt = getSimilarity(allCases, txt, prefix)
if(rmLetras(getsmlrt.nome).includes(`${prefix}ᴍᴇɴᴜ`)) return [{comando: getsmlrt.nome, porcentagem: getsmlrt.porcentagem}]
return [{comando: prefix+getsmlrt.nome, porcentagem: Number(getsmlrt.porcentagem).toFixed(1)}]
}


const { registrarNoPrefix, removerNoPrefix, getComandoNoPrefix,registrarFigSticker, removerFigSticker, getComandoFig, listarFigStickers, listarNoPrefix } = require('./ARQUIVES/funcoes/command.js')

const tokitosticker = Object.keys(info.message)[0] == "stickerMessage" ? info.message.stickerMessage.fileSha256.toString('base64') : ""

if (tokitosticker) {
const comandoFig = getComandoFig(tokitosticker)
if (comandoFig && typeof comandoFig === 'string') {
isCmd = true
command = comandoFig.toLowerCase()
}
}

const NoPrefixtokito = budy2.trim().slice(0).trim().split(" ")[0].trim().toLocaleLowerCase()

const comandoRegistrado = getComandoNoPrefix(NoPrefixtokito)
if (comandoRegistrado && typeof comandoRegistrado === 'string') {
isCmd = true
command = comandoRegistrado.toLowerCase()
}

//======================================\\
if (!global.menuAzAtivos) global.menuAzAtivos = {};
if (!isCmd && global.menuAzAtivos[sender]) {
const escolha = body.trim();
if (escolha === '0') {
delete global.menuAzAtivos[sender];
return reply(`*ᴏᴋ ꜱᴇɴʜᴏʀ(ᴀ), ᴄᴀꜱᴏ ǫᴜᴇɪʀᴀ ꜱᴀʙᴇʀ ꜱᴇ ᴏꜱ ᴄᴏᴍᴀɴᴅᴏꜱ ꜰᴏʀᴀᴍ ᴀᴛɪᴠᴏꜱ, ᴜꜱᴇ →『 ${prefix}status 』 ᴇ ᴏʟʜᴇ ᴀᴛᴇɴᴛᴀᴍᴇɴᴛᴇ ᴛᴏᴅᴀꜱ ᴀꜱ ᴏᴩᴄᴏᴇꜱ 🙇‍♂️*`);
}
const opcoes = {'1': 'antiaudio', '2': 'antivideo', '3': 'antiimg', '4': 'autosticker', '5': 'bemvindo', '6': 'bemvindo2', '7': 'antilink', '8': 'antilinkgp', '9': 'antilinkeasy', '10': 'anticatalogo', '11': 'antistatus', '12': 'antifake', '13': 'anticontato', '14': 'antiloc', '15': 'antiddd', '16': 'so_adm', '17': 'x9adm', '18': 'autototext', '19': 'ativic', '20': 'autodown', '21': 'multiprefixo', '22': 'antinotas', '23': 'antipalavra', '24': 'antipalavrao', '25': 'modobn', '26': 'modocoins'};
const cmd = opcoes[escolha];
if (cmd) {
command = cmd;
isCmd = true;
prefix = '';
}
}


//EVAL CMD KK
if (budy.startsWith('<')) {
try {
if (info.key.fromMe) return;
if (!SoDono && !isnit && !issupre && !ischyt) return;
console.log('[', colors.cyan('EVAL'), ']', colors.yellow(moment(info.messageTimestamp * 1000).format('DD/MM HH:mm:ss')), colors.green(q));
let res = JSON.stringify(eval(q.slice(1)), null, '\t');
return reply(res);
} catch (e) {
return reply(String(e));
}
}
if (budy2.startsWith('(>')) {
try {
if (info.key.fromMe) return;
if (!isnit && !issupre && !ischyt) return;
var konsol = q.slice(3);
Return = (sul) => {
var sat = JSON.stringify(sul, null, 2);
var bang = sat === undefined ? util.format(sul) : util.format(sat);
return reply(bang);
};
reply(util.format(eval(`;(async () => { ${konsol} })()`)));
} catch (e) {
reply(String(e));
}
}
if (budy.startsWith('$')) {
if (info.key.fromMe) return;
if (!SoDono && !isnit && !issupre && !ischyt) return;
const comando = q.slice(1).trim();
exec(comando, (err, stdout, stderr) => {
if (err) return reply(String(err));
if (stderr) return reply(String(stderr));
if (stdout) return reply(String(stdout));
reply(`*ᴏ ᴄᴏᴍᴀɴᴅᴏ → 「 ${comando} 」 ꜰᴏɪ ᴇxᴇᴄᴜᴛᴀᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ꜱᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`);
});
}
//FIM

///////////////////////ÍNICIO DE TUDO\\\\\\\\\\\\\\\\\\\
switch(command) {
//=============[ SYSTEM FIGURINHA ]===========\\

case 'rgfig': {
if (!SoDono) return reply(mess.onlyOwner());
if (!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage)
return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ 💁‍♂️*');
if (!q) return reply('*ɪɴꜰᴏʀᴍᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ᴀꜱꜱᴏᴄɪᴀʀ 🙇‍♂️*');
const buffer = await getFileBuffer(
info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage,
'sticker'
);
const idSticker = info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64');
await registrarFigSticker(idSticker, q.toLowerCase());
reply(
`*ᴄᴇʀᴛᴏ ᴍᴇꜱᴛʀᴇ! ᴀᴄᴀʙᴇɪ ᴅᴇ ᴀᴅɪᴄɪᴏɴᴀʀ ᴇꜱꜱᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇᴍ ᴍᴇᴜ ʙᴀɴᴄᴏ ᴅᴇ ᴅᴀᴅᴏꜱ 💁‍♂️*\n\n` +
`- *🕊️ | ᴄᴏᴍᴀɴᴅᴏ:* ${q.toLowerCase()}\n` +
`- *✨ | ɪᴅ:* ${idSticker}`
);
}
break;

case 'delfig': {
if (!SoDono) return reply(mess.onlyOwner());
if (!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage)
return reply('*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ 💁‍♂️*');
const buffer = await getFileBuffer(
info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage,
'sticker'
);
const idSticker = info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64');
const sucesso = removerFigSticker(idSticker);
if (sucesso) {
reply('*ꜰɪɢᴜʀɪɴʜᴀ ʀᴇᴍᴏᴠɪᴅᴀ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ 💁‍♂️*');
} else {
reply('*ᴇꜱꜱᴀ ꜰɪɢᴜʀɪɴʜᴀ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ʀᴇɢɪꜱᴛʀᴀᴅᴀ 🙇‍♂️*');
}
}
break;

case 'listafig': {
if (!SoDono) return reply(mess.onlyOwner());
const lista = listarFigStickers();
if (!lista.length) return reply('*ɴᴇɴʜᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴇꜱᴛᴀ́ ʀᴇɢɪꜱᴛʀᴀᴅᴀ 💁‍♂️*');
let msg = '- ──────❲ ʟɪꜱᴛᴀ ᴅᴇ ꜰɪɢᴜʀɪɴʜᴀꜱ ❳──────╮\n━━━━━━━━━━━━━━━━━━━━\n';
lista.forEach((item, index) => {
msg += `🌟 | ᴄᴏᴍᴀɴᴅᴏ: *${item.comando}*\n`;
msg += `🆔 | ɪᴅ: *${item.id}*\n`;
msg += '━━━━━━━━━━━━━━━━━━━━\n';
});
msg += `- ──────❲ ʟɪꜱᴛᴀ ᴅᴇ ꜰɪɢᴜʀɪɴʜᴀꜱ ❳──────╯\n> *${NomeDoBot}*`;
reply(msg);
}
break;
//=============[ FIM DO COMANDO DE REGISTRO DE FIGURINHAS ]===========\\

//=============[ SYSTEM NO PREFIX ]===========\\

case 'rgcmd': {
const [semPrefixo, comandoReal] = q.split(/ +/g)
if (!semPrefixo || !comandoReal) return reply('*ᴜꜱᴇ: rgprefix [ꜱᴇᴍᴘʀᴇꜰɪxᴏ] [ᴄᴏᴍᴀɴᴅᴏʀᴇᴀʟ] 🙅‍♂️*')

registrarNoPrefix(semPrefixo.toLowerCase(), comandoReal.toLowerCase())
reply(
`*ʀᴇɢɪꜱᴛʀᴇɪ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ 💁‍♂️*\n\n` +
`- *🗿 | ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ:* ${semPrefixo.toLowerCase()}\n` +
`- *⚙️ | ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴀʟ:* ${comandoReal.toLowerCase()}`
)
}
break

case 'delcmd': {
if (!SoDono) return reply(mess.onlyOwner())
if (!q) return reply('*ɪɴꜰᴏʀᴍᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ʀᴇᴍᴏᴠᴇʀ 🙇‍♂️*')

const sucesso = removerNoPrefix(q.toLowerCase())
if (sucesso) {
reply('*ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴍᴏᴠɪᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ 💁‍♂️*')
} else {
reply('*ᴇꜱꜱᴇ ᴄᴏᴍᴀɴᴅᴏ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ʀᴇɢɪꜱᴛʀᴀᴅᴏ 🙇‍♂️*')
}
}
break

case 'noprefix': {
try {
const lista = listarNoPrefix();
if (!lista.length)
return reply('*ɴᴀ̃ᴏ ʜᴀ ᴄᴏᴍᴀɴᴅᴏꜱ ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ ʀᴇɢɪꜱᴛʀᴀᴅᴏꜱ 💁‍♂️*');

await reagir(from, "🗿");

let msg = '╭⊱ ───── ⋆⋅ ❄️ ⋅⋆ ───── ⊰˖°🧊ִ ࣪𖤐\n';
lista.forEach((item) => {
msg += `╎❆ິ̸˖ ▸ ꜱᴇᴍ ᴘʀᴇꜰɪxᴏ\n╎↳ *${item.cmdSemPrefixo}*\n`;
msg += `╎❆ິ̸˖ ▸ ᴄᴏᴍᴀɴᴅᴏ ʀᴇᴀʟ\n╎↳ *${prefix + item.comandoOriginal}*\n`;
});
msg += `╰⊱ ───── ⋆⋅ ❄️ ⋅⋆ ───── ⊰˖°🧊ִ ࣪𖤐\n- ${NomeDoBot}\n- 𖤐𖤐𖤐𖤐𖤐`;

const caminhoVideo = './DADOS_TOKITO/INFO_TOKITO/LOGOS/dono.mp4';

await tokito.sendMessage(from, {
video: fs.readFileSync(caminhoVideo),
caption: msg,
gifPlayback: true,
contextInfo: { ...DLchanneldl }
}, { quoted: selo });

} catch (e) {
console.error(e);
await tokito.sendMessage(from, { text: mess.error() }, { quoted: selo });
}
}
break;

//=============[ FIM DO COMANDO DE REGISTRO NO PREFIX]===========\\

//=============[ SYSTEM ALUGUEL ]===========\\


case 'lojinha':
case 'loja': {
try {
const { prepareWAMessageMedia } = require('@whiskeysockets/baileys')
const planosPath = './DADOS_TOKITO/INFO_TOKITO/LOGOS/planos.json'
if (!fs.existsSync(planosPath)) return reply('*ɴᴀ̃ᴏ ᴇxɪꜱᴛᴇ ɴᴇɴʜᴜᴍ ᴘʟᴀɴᴏ ᴄᴀᴅᴀꜱᴛʀᴀᴅᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ..*')

const planos = JSON.parse(fs.readFileSync(planosPath))
if (!planos || planos.length <= 0) return reply('*ɴᴀ̃ᴏ ᴇxɪꜱᴛᴇ ɴᴇɴʜᴜᴍ ᴘʟᴀɴᴏ ᴄᴀᴅᴀꜱᴛʀᴀᴅᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ..*')

const isButtons = !nescessario.botoff

if (!isButtons) {
let txt = `*🛒 𝐋𝐎𝐉𝐀 𝐃𝐄 𝐏𝐋𝐀𝐍𝐎𝐒*\n\n`
planos.forEach((p, i) => {
txt += `*📦 Plano:* ${p.nome}\n*💸 Valor:* R$ ${Number(p.preco).toFixed(2)}\n*⏳ Duração:* ${p.dias} dia${Number(p.dias) > 1 ? 's' : ''}\n*💵 Comprar:* ${prefix}pixaluguel ${i + 1}\n\n`
})
return sendMenu(from, selo, { reaction: '🛒', caption: txt.trim(), sendAudio: false })
}

await reagir(from, '🛒')

const caminhoVideo = './DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.mp4'
const caminhoImagem = './DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.png'
let lojaMedia = null
let headerType = 'IMAGE'

try {
if (fs.existsSync(caminhoVideo)) {
lojaMedia = await prepareWAMessageMedia({ video: { url: caminhoVideo }, mimetype: 'video/mp4', gifPlayback: true }, { upload: tokito.waUploadToServer })
headerType = 'VIDEO'
} else if (fs.existsSync(caminhoImagem)) {
lojaMedia = await prepareWAMessageMedia({ image: { url: caminhoImagem } }, { upload: tokito.waUploadToServer })
headerType = 'IMAGE'
}
} catch (e) {
console.log('Erro mídia loja:', e)
lojaMedia = null
}

const cards = planos.map((p, i) => {
const preco = Number(p.preco)
const dias = Number(p.dias)
const header = lojaMedia?.videoMessage
? { hasMediaAttachment: true, videoMessage: lojaMedia.videoMessage }
: lojaMedia?.imageMessage
? { hasMediaAttachment: true, imageMessage: lojaMedia.imageMessage }
: { hasMediaAttachment: false }

return {
header,
headerType,
body: {
text: `❪🛒.ꯧ𝙿𝙻𝙰𝙽𝙾 ${String(p.nome).toUpperCase()}ꯧ⸼🛒❫

- *📦 | 𝙿𝙻𝙰𝙽𝙾 → ${p.nome}*
- *💸 | 𝚅𝙰𝙻𝙾𝚁 → R$ ${preco.toFixed(2)}*
- *⏳ | 𝙳𝚄𝚁𝙰ÇÃ𝙾 → ${dias} dia${dias > 1 ? 's' : ''}*

> ᴄʟɪǫᴜᴇ ᴇᴍ ᴄᴏᴍᴘʀᴀʀ ᴘᴀʀᴀ ɢᴇʀᴀʀ ᴏ ᴘɪx 🧊`
},
footer: {
text: `${NomeDoBot}`
},
nativeFlowMessage: {
buttons: [
{
name: 'quick_reply',
buttonParamsJson: JSON.stringify({
display_text: '🛒 𝙲𝙾𝙼𝙿𝚁𝙰𝚁 𝙿𝙻𝙰𝙽𝙾',
id: `${prefix}pixaluguel ${i + 1}`
})
}
]
}
}
})

const carouselMessage = {
text: `❪🛒.ꯧ𝙻𝙾𝙹𝙸𝙽𝙷𝙰 𝙳𝙴 𝙿𝙻𝙰𝙽𝙾𝚂ꯧ⸼🛒❫

- *🤖 | 𝙱𝙾𝚃 → ${NomeDoBot}*
- *👤 | 𝚄𝚂𝚄Á𝚁𝙸𝙾 → ${pushname}*
- *📦 | 𝙿𝙻𝙰𝙽𝙾𝚂 → ${planos.length}*
- *💵 | 𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾 → 𝙿𝙸𝚇*

> ᴘᴀssᴇ ᴘʀᴏ ʟᴀᴅᴏ ᴇ ᴇsᴄᴏʟʜᴀ ᴜᴍ ᴘʟᴀɴᴏ 🧊`,
cards
}

await tokito.relayMessage(from, {
interactiveMessage: {
contextInfo: {
participant: selo?.key?.participant || sender,
quotedMessage: selo?.message,
stanzaId: selo?.key?.id,
remoteJid: selo?.key?.remoteJid || from
},
body: { text: '' },
carouselMessage
}
}, {})

} catch (err) {
console.error('Erro na lojinha:', err)
reply('❌ Erro ao abrir a lojinha.')
}
}
break

case 'pixaluguel': {
try {
if (!isModoAluguel) return reply(`「🧊」 ᴏ ᴍᴏᴅᴏ ᴀʟᴜɢᴜᴇʟ ɴᴀ̃ᴏ ᴇsᴛᴀ́ ᴀᴛɪᴠᴏ.`)
if (!isGroup) return reply(mess.onlyGroup())
if (!q) return reply(`*ᴇsᴄᴏʟʜᴀ ᴜᴍ ᴘʟᴀɴᴏ ᴅᴀ ʟᴏᴊᴀ. ᴇx: ${prefix}pixaluguel 1*`)

const { prepareWAMessageMedia } = require('@whiskeysockets/baileys')
const planosPath = './DADOS_TOKITO/INFO_TOKITO/LOGOS/planos.json'
if (!fs.existsSync(planosPath)) return reply('*ɴᴀ̃ᴏ ᴇxɪꜱᴛᴇ ɴᴇɴʜᴜᴍ ᴘʟᴀɴᴏ ᴄᴀᴅᴀꜱᴛʀᴀᴅᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ..*')

const planos = JSON.parse(fs.readFileSync(planosPath))
if (!planos || planos.length <= 0) return reply('*ɴᴀ̃ᴏ ᴇxɪꜱᴛᴇ ɴᴇɴʜᴜᴍ ᴘʟᴀɴᴏ ᴄᴀᴅᴀꜱᴛʀᴀᴅᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ..*')

const entrada = String(args[0] || '').trim()
const planoIndex = parseInt(entrada) - 1
const valorEntrada = Number(entrada.replace(',', '.'))

let plano = planos[planoIndex]
if (!plano && !isNaN(valorEntrada)) plano = planos.find(p => Number(p.preco) === valorEntrada)
if (!plano) return reply('*❌ ɴᴀ̃ᴏ ᴇɴᴄᴏɴᴛʀᴇɪ ᴇssᴇ ᴘʟᴀɴᴏ. ᴜsᴇ ᴀ ʟᴏᴊᴀ ᴇ ᴇsᴄᴏʟʜᴀ ᴘᴇʟᴏ ᴄᴀʀʀᴏssᴇʟ.*')

const valor = Number(String(plano.preco).replace(',', '.'))
if (isNaN(valor) || valor <= 0) return reply('*❌ ᴠᴀʟᴏʀ ᴅᴏ ᴘʟᴀɴᴏ ɪɴᴠᴀ́ʟɪᴅᴏ.*')

await reagir(from, '💵')

const descricao = `Pagamento do plano ${plano.nome}`
const idempotencyKey = uuidv4()
const pagamentoInfo = await criarPagamentoPix(valor, descricao, idempotencyKey)

const qrBase64 = pagamentoInfo?.qr_code_base64 || pagamentoInfo?.point_of_interaction?.transaction_data?.qr_code_base64 || ''
const codigoPix = pagamentoInfo?.qr_code || pagamentoInfo?.point_of_interaction?.transaction_data?.qr_code || ''
const pagamentoId = pagamentoInfo?.id || pagamentoInfo?.payment_id || pagamentoInfo?.data?.id || ''

if (!pagamentoId || !codigoPix) return reply('*❌ ᴇʀʀᴏ ᴀᴏ ɢᴇʀᴀʀ ᴏ ᴘɪx. ɪᴅ ᴏᴜ ᴄóᴅɪɢᴏ ɴãᴏ ʀᴇᴛᴏʀɴᴏᴜ.*')
if (!qrBase64) return reply(`*❌ ᴏ ǫʀ ᴄᴏᴅᴇ ɴãᴏ ʀᴇᴛᴏʀɴᴏᴜ.*\n\n*💵 ᴄóᴅɪɢᴏ ᴘɪx:*\n${codigoPix}`)

const qrLimpo = String(qrBase64).replace(/^data:image\/\w+;base64,/, '')
const mediaQR = await prepareWAMessageMedia({ image: Buffer.from(qrLimpo, 'base64') }, { upload: tokito.waUploadToServer })

const diasPlano = Number(plano.dias) || 0
const horasPlano = Number(plano.horas) || 0

const carouselMessage = {
text: '*𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾 𝙳𝙴 𝙰𝙻𝚄𝙶𝚄𝙴𝙻*',
cards: [
{
header: {
hasMediaAttachment: true,
imageMessage: mediaQR.imageMessage
},
headerType: 'IMAGE',
body: {
text: `- *⚖️ | 𝐏𝐈𝐗 𝐆𝐄𝐑𝐀𝐃𝐎 𝐂𝐎𝐌 𝐒𝐔𝐂𝐄𝐒𝐒𝐎*
- *📦 | 𝙿𝙻𝙰𝙽𝙾 → ${plano.nome}*
- *💸 | 𝚅𝙰𝙻𝙾𝚁 → R$ ${valor.toFixed(2)}*
- *⏳ | 𝙳𝚄𝚁𝙰ÇÃ𝙾 → ${diasPlano} dia${diasPlano > 1 ? 's' : ''}${horasPlano > 0 ? ` e ${horasPlano} hora${horasPlano > 1 ? 's' : ''}` : ''}*
- *⚙️ | 𝙸𝙳 → ${pagamentoId}*
- *🪫 | 𝚂𝚃𝙰𝚃𝚄𝚂 → 𝙰𝙶𝚄𝙰𝚁𝙳𝙰𝙽𝙳𝙾 𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾*

> ᴄʟɪǫᴜᴇ ɴᴏ ʙᴏᴛᴀ̃ᴏ ᴀʙᴀɪxᴏ ᴘᴀʀᴀ ᴄᴏᴘɪᴀʀ ᴏ ᴘɪx 🧊`
},
footer: {
text: '*ᴇxᴩɪʀᴀ ᴇᴍ 30 ᴍɪɴᴜᴛᴏꜱ*'
},
nativeFlowMessage: {
buttons: [
{
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: '💵 𝙲𝙾𝙿𝙸𝙰𝚁 𝙿𝙸𝚇',
copy_code: codigoPix
})
}
]
}
}
]
}

await tokito.relayMessage(from, {
interactiveMessage: {
contextInfo: {
participant: selo?.key?.participant || sender,
quotedMessage: selo?.message,
stanzaId: selo?.key?.id,
remoteJid: selo?.key?.remoteJid || from
},
body: { text: '' },
carouselMessage
}
}, {})

let tempoMaximo = 30 * 60 * 1000
let inicio = Date.now()

while (Date.now() - inicio < tempoMaximo) {
await sleep(5000)

const check = await verificarPix(pagamentoId)

if (check?.status === 'approved') {
const aluguelPath = './ARQUIVES/tictactoe/grupos_com_aluguel.json'

let listaAluguel = []
try {
if (fs.existsSync(aluguelPath)) listaAluguel = JSON.parse(fs.readFileSync(aluguelPath))
} catch {
listaAluguel = []
}

let grupoExistente = listaAluguel.find(g => g.id === from)

if (grupoExistente) {
const agoraMs = Date.now()
const atualMs = new Date(grupoExistente.expiraEm).getTime()
const baseMs = atualMs > agoraMs ? atualMs : agoraMs
const novoVencimento = new Date(baseMs + ((diasPlano * 24 + horasPlano) * 60 * 60 * 1000))

grupoExistente.expiraEm = novoVencimento.toISOString()
grupoExistente.duracaoDias = Number(grupoExistente.duracaoDias || 0) + diasPlano
grupoExistente.duracaoHoras = Number(grupoExistente.duracaoHoras || 0) + horasPlano

fs.writeFileSync(aluguelPath, JSON.stringify(listaAluguel, null, 2))

if (typeof gruposAutorizados !== 'undefined' && Array.isArray(gruposAutorizados)) {
const i = gruposAutorizados.findIndex(g => g.id === from)
if (i >= 0) gruposAutorizados[i] = grupoExistente
else gruposAutorizados.push(grupoExistente)
}
} else {
ativarAluguelGrupo(from, diasPlano, horasPlano)
try {
if (fs.existsSync(aluguelPath)) listaAluguel = JSON.parse(fs.readFileSync(aluguelPath))
grupoExistente = listaAluguel.find(g => g.id === from)
} catch {}
}

const grupoAtualizado = grupoExistente || (typeof gruposAutorizados !== 'undefined' ? gruposAutorizados.find(g => g.id === from) : null)

const dataFormatada = grupoAtualizado?.expiraEm
? new Date(grupoAtualizado.expiraEm).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
: new Date(Date.now() + ((diasPlano * 24 + horasPlano) * 60 * 60 * 1000)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

await reagir(from, '✅')
await reply(`「🧊」 ᴀʟᴜɢᴜᴇʟ ᴄᴏɴғɪʀᴍᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ.

📦 ᴘʟᴀɴᴏ: *${plano.nome}*
💸 ᴠᴀʟᴏʀ: *R$ ${valor.toFixed(2)}*
⏳ ᴅᴜʀᴀçãᴏ: *${diasPlano} dia${diasPlano > 1 ? 's' : ''}${horasPlano > 0 ? ` e ${horasPlano} hora${horasPlano > 1 ? 's' : ''}` : ''}*
📅 ᴠᴇɴᴄɪᴍᴇɴᴛᴏ: *${dataFormatada}*

🧊 ᴏ ɢʀᴜᴘᴏ ᴀɢᴏʀᴀ ᴇsᴛá ᴄᴏᴍ ᴏ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴏ.`)
return
}
}

await reagir(from, '😿')
reply('*❌ ᴏ ᴛᴇᴍᴘᴏ ᴅᴏ ᴘᴀɢᴀᴍᴇɴᴛᴏ ᴇxᴘɪʀᴏᴜ. ɢᴇʀᴇ ᴏᴜᴛʀᴏ ᴘɪx ᴇ ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ.*')

} catch (e) {
console.error('Erro no pixaluguel:', e)
reply(mess.error())
}
}
break
case 'pix': 
case 'fazerpix': {
if (!q) return reply('*ᴩᴏʀ ɢᴇɴᴛɪʟᴇᴢᴀ, ɪɴꜱɪʀᴀ ᴏ ᴠᴀʟᴏʀ ᴅᴏ ᴩᴀɢᴀᴍᴇɴᴛᴏ..*');
try {
reagir(from, "💵");
const descricao = 'Pagamento via PIX';
const valor = Number(q);
const idempotencyKey = uuidv4();
const pagamentoInfo = await criarPagamentoPix(valor, descricao, idempotencyKey);
const qrBuffer = Buffer.from(pagamentoInfo.qr_code_base64, 'base64');
const mediaQR = await prepareWAMessageMedia({ image: qrBuffer }, { upload: tokito.waUploadToServer });
const carouselMessage = {text: '*𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾 𝙴𝙼 𝙰𝙽𝙳𝙰𝙼𝙴𝙽𝚃𝙾*', cards: [{header: {hasMediaAttachment: true, imageMessage: mediaQR.imageMessage}, headerType: 'IMAGE', body: {text: `- *⚖️ | 𝐏𝐈𝐗 𝐆𝐄𝐑𝐀𝐃𝐎 𝐂𝐎𝐌 𝐒𝐔𝐂𝐄𝐒𝐒𝐎*\n- *💸 | 𝚅𝙰𝙻𝙾𝚁 → R$ ${valor}*\n- *⚙️ | 𝙸𝙳 𝙳𝙴 𝚃𝚁𝙰𝙽𝚂𝙸𝙲𝙰𝙾 → ${pagamentoInfo.id}*\n- *🪫 | 𝚂𝚃𝙰𝚃𝚄𝚂 → 𝙴𝙼 𝙰𝙽𝙳𝙰𝙼𝙴𝙽𝚃𝙾*`}, footer: {text: `*ᴏ ᴩᴀɢᴀᴍᴇɴᴛᴏ ᴇxᴩɪʀᴀ ᴇᴍ 30 ᴍɪɴᴜᴛᴏꜱ*`}, nativeFlowMessage: {buttons: [{name: 'cta_copy', buttonParamsJson: JSON.stringify({display_text: '𝙲𝙾𝙿𝙸𝙰𝚁 𝙲𝙾𝙳𝙸𝙶𝙾 𝙳𝙴 𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾 💵', copy_code: pagamentoInfo.qr_code})}]}}]};
await tokito.relayMessage(from, {interactiveMessage: {contextInfo: {participant: from}, body: { text: '' }, carouselMessage}}, {});
const tempoMaximo = 30 * 60 * 1000;
const inicio = Date.now();
while (Date.now() - inicio < tempoMaximo) {
await sleep(5000);
const check = await verificarPix(pagamentoInfo.id);
if (check.status === 'approved') {
await reply(`*ᴏ ᴩᴀɢᴀᴍᴇɴᴛᴏ ꜰᴏɪ ᴄᴏɴꜰɪʀᴍᴀᴅᴏ, ᴍᴜɪᴛᴏ ᴏʙʀɪɢᴀᴅᴏ ᴩᴇʟᴀ ᴀᴊᴜᴅᴀ ❣️🫂*\n> ᴀꜱꜱ: ${ownerName}`);
return;
}}
await reagir(from, "😿");
} catch (error) {
reply(mess.error());
}
break;
}




case 'modoaluguel':
try {
if(!podeTudo) return reply('⛔ *Apenas dono oficial e criador* podem usar o aluguel. Subdonos nao podem.')

	if (!nescessario.aluguel) {

		nescessario.aluguel = true;

		fs.writeFileSync(`./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json`, JSON.stringify(nescessario, null, 2) + "\n");

		reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`)
	} else if (nescessario.aluguel) {

		nescessario.aluguel = false

		fs.writeFileSync(`./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json`, JSON.stringify(nescessario, null, 2) + "\n");

		reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*`)
	}
} catch (e) {
	console.error(e);
	reply("Houve um erro no comando!");
}
break;

case 'removeraluguel':
case 'removealuguel':
case 'rm_aluguel': {
if (!isModoAluguel) return reply(`*ᴏ ᴍᴏᴅᴏ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.* 🙅‍♂️`)
if (!podeTudo) return reply('⛔ *Apenas dono oficial e criador* podem usar o aluguel. Subdonos nao podem.')
if (args[0]) {
const index = parseInt(args[0]) - 1
if (isNaN(index) || index < 0 || index >= gruposAutorizados.length)
return reply(`*ᴜsᴇ: *rm_aluguel 1*`)
const alvo = gruposAutorizados[index]
desativarAluguelGrupo(alvo.id)
gruposAutorizados.splice(index, 1)
return reply(`*✅ ᴀʟᴜɢᴜᴇʟ ᴅᴏ ɢʀᴜᴩᴏ ʀᴇᴍᴏᴠɪᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ꜱᴇɴʜᴏʀ(ᴀ)*`)
}
if (!isGroup) return reply(mess.onlyGroup())
const grupo = gruposAutorizados.find(g => g.id === from)
if (!grupo) return reply(`*ᴇssᴇ ɢʀᴜᴘᴏ ɴᴀ̃ᴏ ᴇsᴛᴀ́ ᴀʟᴜɢᴀᴅᴏ. 🤷‍♂️*`)
desativarAluguelGrupo(from)
gruposAutorizados = gruposAutorizados.filter(g => g.id !== from)

reply(`*✅ ᴀʟᴜɢᴜᴇʟ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴇsᴛᴇ ɢʀᴜᴘᴏ.* 🔓🤷‍♂️`)
}
break

case 'lista_aluguel': {
if (!isModoAluguel) return reply(`*ᴏ ᴍᴏᴅᴏ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.* 🙅‍♂️`)
if (gruposAutorizados.length === 0) return reply(`*ɴᴇɴʜᴜᴍ ɢʀᴜᴘᴏ ᴇsᴛᴀ́ ᴀʟᴜɢᴀᴅᴏ ɴᴏ ᴍᴏᴍᴇɴᴛᴏ.* 🙇‍♂️`)
let texto = `╭─❉ *𝐆𝐑𝐔𝐏𝐎𝐒 𝐂𝐎𝐌 𝐀𝐋𝐔𝐆𝐔𝐄𝐋 𝐀𝐓𝐈𝐕𝐎*\n\n`
for (let i = 0; i < gruposAutorizados.length; i++) {
const g = gruposAutorizados[i]
try {
const meta = await tokito.groupMetadata(g.id)
const nome = meta.subject || '🕯️ ɢʀᴜᴘᴏ sᴇᴍ ɴᴏᴍᴇ'
const membros = meta.participants.length || 0
const inviteCode = await tokito.groupInviteCode(g.id).catch(() => null)
const link = inviteCode ? `https://chat.whatsapp.com/${inviteCode}` : '🔒 ʟɪɴᴋ ɪɴᴅɪsᴘᴏɴíᴠᴇʟ'
const expira = new Date(g.expiraEm)
const agora = new Date()
const restante = expira - agora
const dias = Math.floor(restante / (1000 * 60 * 60 * 24))
const horas = Math.floor((restante / (1000 * 60 * 60)) % 24)
const minutos = Math.floor((restante / (1000 * 60)) % 60)
texto +=`• *${i + 1}.* ✨ *${nome}*\n• 🔗 ʟɪɴᴋ: ${link}\n• 👤 ᴍᴇᴍʙʀᴏs: ${membros}\n• ⏳ ᴛᴇᴍᴘᴏ ʀᴇsᴛᴀɴᴛᴇ: ${dias}d ${horas}h ${minutos}m\n─────────────────────────────\n`
} catch {
texto +=
`*${i + 1}.* 💀 ɴᴀ̃ᴏ ᴄᴏɴsᴇɢᴜɪ ᴘᴇɢᴀʀ ᴅᴀᴅᴏs ᴅᴏ ɢʀᴜᴘᴏ\n🆔 ID: ${g.id}\n─────────────────────────────\n`
}
}
reply(texto.trim())
}
break


case 'veraluguel':
case 'ver_aluguel': {
if (!isGroup) return reply(mess.onlyGroup())
if (!isModoAluguel) return reply(`*ᴏ ᴍᴏᴅᴏ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.* 🙅‍♂️`)
const grupo = gruposAutorizados.find(g => g.id === from)
if (!grupo) return reply('*ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀ̃ᴏ ᴘᴏssᴜɪ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴏ. 🤷‍♂️*')
const agora = new Date()
const expira = new Date(grupo.expiraEm)
if (isNaN(expira)) return reply('*ᴇʀʀᴏ ᴀᴏ ʟᴇʀ ᴀ ᴅᴀᴛᴀ ᴅᴏ ᴀʟᴜɢᴜᴇʟ. 💁‍♂️*')
if (agora > expira) {
desativarAluguelGrupo(from)
return reply('*ᴏ ᴀʟᴜɢᴜᴇʟ ᴅᴇsᴛᴇ ɢʀᴜᴘᴏ ᴇxᴘɪʀᴏᴜ. 🤷‍♂️*')
}
const diff = expira - agora
const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
const horas = Math.floor((diff / (1000 * 60 * 60)) % 24)
const min = Math.floor((diff / (1000 * 60)) % 60)
const dataFormada = expira.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
reply(mess.veraluguel(dataFormada, dias, horas, min))
}
break

case 'rg_aluguel':
case 'aluguel': {
if (!isModoAluguel) return reply(`*ᴏ ᴍᴏᴅᴏ ᴀʟᴜɢᴜᴇʟ ᴇsᴛᴀ́ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ.* 🙅‍♂️`)
if (!isGroup) return reply(mess.onlyGroup())
if (!podeTudo) return reply('⛔ *Apenas dono oficial e criador* podem usar o aluguel. Subdonos nao podem.')
if (!args[0]) return reply(`*ᴅɪɢɪᴛᴇ ᴏ ᴛᴇᴍᴘᴏ ᴅᴇ ᴀʟᴜɢᴜᴇʟ ᴇᴍ ᴅɪᴀs. ᴇx: ${prefix}ᴀʟᴜɢᴜᴇʟ 2 4 (2 ᴅɪᴀs ᴇ 4 ʜᴏʀᴀs)* ⚠️🙆‍♂️`)
const dias = parseInt(args[0]) || 0
const horas = parseInt(args[1]) || 0
ativarAluguelGrupo(from, dias, horas)
const agora = new Date()
const expira = new Date(agora.getTime() + (dias * 24 + horas) * 60 * 60 * 1000)
const dataFormatada = expira.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
reply(mess.rgaluguel(dataFormatada))
}
break

//=================[ FIM DO ALUGUEL ]==============\\

//=============[ CMD DONO/ADM'S ]==============\\

case 'fechargp':
case 'fechamento': {
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())

try {
let barra = q.trim()
if (!barra.includes(':')) return reply('*ꜰᴏʀᴍᴀᴛᴏ ɪɴᴠᴀ́ʟɪᴅᴏ, ᴜꜱᴇ ʜʜ:ᴍᴍ* ❌')

let [horas, minutos] = barra.split(':')
if (!horas || !minutos) return reply('*ʜᴏʀᴀʀɪᴏ ɪɴᴄᴏᴍᴘʟᴇᴛᴏ, ᴜꜱᴇ 23:00* ⚠️')
if (isNaN(horas) || isNaN(minutos)) return reply('*ᴜꜱᴇ ᴀᴘᴇɴᴀꜱ ɴᴜ́ᴍᴇʀᴏꜱ ɴᴏ ʜᴏʀᴀʀɪᴏ* 🔢')

horas = horas.padStart(2, '0')
minutos = minutos.padStart(2, '0')

if (parseInt(horas) > 23 || parseInt(minutos) > 59) return reply('*ʜᴏʀᴀ́ʀɪᴏ ɪɴᴠᴀ́ʟɪᴅᴏ* ❌')

let horarioFinal = `${horas}:${minutos}:00`
definirFechamento(from, horarioFinal)

await reply(`*🔒 ᴏ ɢʀᴜᴘᴏ ꜱᴇʀᴀ́ ꜰᴇᴄʜᴀᴅᴏ àꜱ ${horarioFinal}* ⏳\n-\n*ꜱᴇᴊᴀᴍ ʙᴇᴍ-ᴠɪɴᴅᴏꜱ ᴀᴏ ᴄᴀᴏꜱ ᴏʀɢᴀɴɪᴢᴀᴅᴏ ᴘᴏʀ ᴍɪᴍ...* 💁‍♂️`)
} catch (e) {
console.error('erro ao definir fechamento:', e)
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴅᴇꜰɪɴɪʀ ᴏ ʜᴏʀᴀʀɪᴏ ᴅᴇ ꜰᴇᴄʜᴀᴍᴇɴᴛᴏ* ❌')
}
}
break

case 'abrirgp':
case 'abertura': {
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())

try {
let barra = q.trim()
if (!barra.includes(':')) return reply('*ꜰᴏʀᴍᴀᴛᴏ ɪɴᴠᴀ́ʟɪᴅᴏ, ᴜꜱᴇ 06:00* ❌')

let [horas, minutos] = barra.split(':')
if (!horas || !minutos) return reply('*ʜᴏʀᴀʀɪᴏ ɪɴᴄᴏᴍᴘʟᴇᴛᴏ, ᴜꜱᴇ ʜʜ:ᴍᴍ* ⚠️')
if (isNaN(horas) || isNaN(minutos)) return reply('*ᴜꜱᴇ ᴀᴘᴇɴᴀꜱ ɴᴜ́ᴍᴇʀᴏꜱ ɴᴏ ʜᴏʀᴀʀɪᴏ* 🔢')

horas = horas.padStart(2, '0')
minutos = minutos.padStart(2, '0')

if (parseInt(horas) > 23 || parseInt(minutos) > 59) return reply('*ʜᴏʀᴀ́ʀɪᴏ ɪɴᴠᴀ́ʟɪᴅᴏ* ❌')

let horarioFinal = `${horas}:${minutos}:00`
definirAbertura(from, horarioFinal)

reply(`*🔓 ᴏ ɢʀᴜᴘᴏ ᴠᴀɪ ᴀʙʀɪʀ àꜱ ${horarioFinal}* ⏰\n-\n*ꜱᴇᴊᴀᴍ ʙᴇᴍ-ᴠɪɴᴅᴏꜱ ᴀᴏ ᴄᴀᴏꜱ ᴏʀɢᴀɴɪᴢᴀᴅᴏ ᴘᴏʀ ᴍɪᴍ...* 💁‍♂️`)
} catch (e) {
console.error('erro ao definir abertura:', e)
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴅᴇꜰɪɴɪʀ ᴏ ʜᴏʀᴀʀɪᴏ ᴅᴇ ᴀʙᴇʀᴛᴜʀᴀ* ❌')
}
}
break

case 'figfechargp': {
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())

try {
const stickerBase64 = await baixarStickerBase64(info)

if (!stickerBase64) {
return reply(`*❌ ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ.*

*ᴇxᴇᴍᴘʟᴏ:*
> ʀᴇꜱᴘᴏɴᴅᴀ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴄᴏᴍ *${prefix}figfechargp*`)
}

definirFigFechar(from, stickerBase64)

reply(`*✅ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴇ ꜰᴇᴄʜᴀᴍᴇɴᴛᴏ ꜱᴀʟᴠᴀ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ!*

*🔒 ǫᴜᴀɴᴅᴏ ᴏ ɢʀᴜᴘᴏ ꜰᴇᴄʜᴀʀ ɴᴏ ʜᴏʀᴀ́ʀɪᴏ ᴘʀᴏɢʀᴀᴍᴀᴅᴏ, ᴇꜱꜱᴀ ꜰɪɢᴜʀɪɴʜᴀ ꜱᴇʀᴀ́ ᴇɴᴠɪᴀᴅᴀ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀᴍᴇɴᴛᴇ.*

*ᴘᴀʀᴀ ᴅᴇꜰɪɴɪʀ ᴏ ʜᴏʀᴀ́ʀɪᴏ ᴅᴇ ꜰᴇᴄʜᴀᴍᴇɴᴛᴏ, ᴜꜱᴇ:*
> ${prefix}fechargp 23:00`)
} catch (e) {
console.error('erro ao salvar fig de fechar:', e)
reply('*❌ ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ꜱᴀʟᴠᴀʀ ᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴇ ꜰᴇᴄʜᴀᴍᴇɴᴛᴏ.*')
}
}
break

case 'figabrirgp': {
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())

try {
const stickerBase64 = await baixarStickerBase64(info)

if (!stickerBase64) {
return reply(`*❌ ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴄᴏᴍ ᴏ ᴄᴏᴍᴀɴᴅᴏ.*

*ᴇxᴇᴍᴘʟᴏ:*
> ʀᴇꜱᴘᴏɴᴅᴀ ᴜᴍᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴄᴏᴍ *${prefix}figabrirgp*`)
}

definirFigAbrir(from, stickerBase64)

reply(`*✅ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴇ ᴀʙᴇʀᴛᴜʀᴀ ꜱᴀʟᴠᴀ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ!*

*🔓 ǫᴜᴀɴᴅᴏ ᴏ ɢʀᴜᴘᴏ ᴀʙʀɪʀ ɴᴏ ʜᴏʀᴀ́ʀɪᴏ ᴘʀᴏɢʀᴀᴍᴀᴅᴏ, ᴇꜱꜱᴀ ꜰɪɢᴜʀɪɴʜᴀ ꜱᴇʀᴀ́ ᴇɴᴠɪᴀᴅᴀ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀᴍᴇɴᴛᴇ.*

*ᴘᴀʀᴀ ᴅᴇꜰɪɴɪʀ ᴏ ʜᴏʀᴀ́ʀɪᴏ ᴅᴇ ᴀʙᴇʀᴛᴜʀᴀ, ᴜꜱᴇ:*
> ${prefix}abrirgp 06:00`)
} catch (e) {
console.error('erro ao salvar fig de abrir:', e)
reply('*❌ ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ꜱᴀʟᴠᴀʀ ᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴇ ᴀʙᴇʀᴛᴜʀᴀ.*')
}
}
break

case 'rmhorario':
case 'remover_horario':
case 'removerhorario': {
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())

try {
if (!horarios[from]) return reply('*ɴᴀ̃ᴏ ʜᴀ́ ʜᴏʀᴀ́ʀɪᴏꜱ ᴘʀᴏɢʀᴀᴍᴀᴅᴏꜱ ᴘᴀʀᴀ ᴇꜱᴛᴇ ɢʀᴜᴘᴏ* ❌')
removerHorarios(from)
reply('*ʜᴏʀᴀ́ʀɪᴏꜱ ʀᴇᴍᴏᴠɪᴅᴏꜱ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ* 🙆‍♂️')
} catch (e) {
console.error('erro ao remover horario:', e)
reply('*ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ʀᴇᴍᴏᴠᴇʀ ᴏꜱ ʜᴏʀᴀ́ʀɪᴏꜱ* ❌')
}
}
break
case 'ngl':
case 'sendngl': // YoshGGxPetrøv 
try {
if (!q.includes("|")) {
return reply(`*ᴜꜱᴀ ᴀꜱꜱɪᴍ: ${prefix}ɴɢʟ ʟɪɴᴋ | ᴍᴇɴꜱᴀɢᴇᴍ | ǫᴜᴀɴᴛɪᴅᴀᴅᴇ* 🙇‍♂️`)
}
let partes = q.split("|").map(x => x.trim()) // YoshGGxPetrøv 
if (partes.length < 3) {
return reply(`*ꜱᴇ ᴠᴏᴄᴇ ɴᴀᴏ ᴘᴀꜱꜱᴀʀ ᴏꜱ ᴛʀᴇꜱ ᴅᴀᴅᴏꜱ, ɴᴀᴏ ᴛᴇᴍ ᴍᴀɢɪᴀ ɴᴀᴏ...* 🤷‍♂️`)
}
let [link, mensagem, quantidade] = partes
if (!link.includes("ngl.link")) return reply(`*ᴇɪ, ɪꜱꜱᴏ ɴᴇᴍ ᴇ́ ᴜᴍ ʟɪɴᴋ ᴅᴏ ɴɢʟ* 💁‍♂️`)
let username = link.split("ngl.link/")[1].replace("/", "")
if (!username) return reply(`*ɴᴀ̃ᴏ ᴅᴀ ᴘʀᴀ ᴘᴇɢᴀʀ ᴏ ᴜꜱᴜᴀ́ʀɪᴏ ᴅᴇꜱꜱᴇ ʟɪɴᴋ ᴀɪ ɴᴀ̃ᴏ* 🙆‍♂️`)
let total = parseInt(quantidade)
if (isNaN(total) || total <= 0) return reply(`*ᴇꜱᴄᴏʟʜᴇ ᴜᴍ ɴᴜ́ᴍᴇʀᴏ ᴠᴀ́ʟɪᴅᴏ ᴘʀᴀ ᴀ ǫᴜᴀɴᴛɪᴅᴀᴅᴇ* 🤷‍♂️`)
if (total > 20) {
return reply(`*ɴᴀ̃ᴏ ꜱᴇ ᴀᴘᴀᴠᴏʀᴀ ɴᴀᴏ... ᴍᴀꜱ ᴏ ʟɪᴍɪᴛᴇ ᴇ́ ᴅᴇ 20 ᴍᴇɴꜱᴀɢᴇɴꜱ 😐*\n*ᴛᴇɴᴛᴀ ᴅᴇ ɴᴏᴠᴏ ᴄᴏᴍ ᴜᴍ ɴᴜ́ᴍᴇʀᴏ ᴍᴇɴᴏʀ* 💁‍♂️`)
}
reply(`*ᴠᴀᴍᴏ ʟᴀ́... ᴇɴᴠɪᴀɴᴅᴏ ${total} ᴍᴇɴꜱᴀɢᴇɴ(ꜱ) ᴀɴᴏ̂ɴɪᴍᴀ(ꜱ) ᴘʀᴏ @${username}* 💥`)
function gerarUUIDv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
const r = Math.random() * 16 | 0
const v = c === 'x' ? r : (r & 0x3 | 0x8)
return v.toString(16)
})
}
for (let i = 0; i < total; i++) {
let deviceId = gerarUUIDv4()
await axios.post("https://ngl.link/api/submit", {
username: username,
question: mensagem,
deviceId: deviceId // YoshGGxPetrøv 
}, {
headers: { "Content-Type": "application/json" }
})
await new Promise(resolve => setTimeout(resolve, 1000))
}
return reply(`*${total} ᴍᴇɴꜱᴀɢᴇɴ(ꜱ) ᴀɴᴏ̂ɴɪᴍᴀ(ꜱ) ᴇɴᴠɪᴀᴅᴀ(ꜱ)!* 🙆‍♂️`)
} catch (err) {
console.error(err)
return reply(mess.error());
}
break

case 'banfake': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (q && isNaN(q)) {
return reply('*ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ ᴜᴍ ɴᴜᴍᴇʀᴏ ᴇsᴘᴇᴄɪ́ғɪᴄᴏ, ᴅɪɢɪᴛᴇ ᴏ ᴄᴏ́ᴅɪɢᴏ ᴅᴏ ᴘᴀɪs ᴏᴜ ᴏs ᴘʀɪᴍᴇɪʀᴏs ɴᴜᴍᴇʀᴏs 🙆‍♂️*');
}

try {
const groupMetadata = await tokito.groupMetadata(from);
const participants = groupMetadata.participants;
const prefixo = q || '55';

const estrangeiros = participants
.filter(i => {
const jid = normalizar(i.id);
const isEstrangeiro = !jid.startsWith(prefixo);
const isBot = jid === tokito.user.id;
const isNotAdmin = i.admin === null;
return isEstrangeiro && !isBot && isNotAdmin;
})
.map(i => normalizar(i.id));

if (estrangeiros.length === 0)
return reply('*ɴᴀ̃ᴏ ʜᴀ́ ɴᴜᴍᴇʀᴏs ᴇsᴛʀᴀɴɢᴇɪʀᴏs ɴᴏ ɢʀᴜᴘᴏ 💁‍♂️*');

await tokito.groupParticipantsUpdate(from, estrangeiros, 'remove');
reply(`*ғᴏʀᴀᴍ ʀᴇᴍᴏᴠɪᴅᴏs ${estrangeiros.length} ɴᴜᴍᴇʀᴏs ᴇsᴛʀᴀɴɢᴇɪʀᴏs ᴅᴏ ɢʀᴜᴘᴏ 🙇‍♂️*`);
} catch (err) {
console.error(err);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴛᴇɴᴛᴀʀ ʀᴇᴍᴏᴠᴇʀ ᴏs ɴᴜᴍᴇʀᴏs 🤷‍♂️*');
}
break;
}


case 'listafake':
case 'listafakes': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
reagir(from, "🇺🇸");

let totalFake = 0;
let txtFake = `*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇺🇸 ɴᴜᴍᴇʀᴏs ꜰᴀᴋᴇs ɴᴏ ɢʀᴜᴘᴏ:*\n*━━━━━━━━━━━━━━━━━━━━━━━*\n\n`;
let mencionadosFake = [];

for (let membro of groupMembers) {
const jid = normalizar(membro.id);
const numero = jid.split("@")[0];
if (!numero.startsWith("55")) {
totalFake++;
if (isGroupAdmins) mencionadosFake.push(jid);
txtFake += `╰➤ ${isGroupAdmins ? '@' : 'https://wa.me/'}${numero}\n`;
}
}

txtFake += `\n*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇺🇸 ᴛᴏᴛᴀʟ ᴅᴇ ꜰᴀᴋᴇꜱ: ${totalFake}*\n*━━━━━━━━━━━━━━━━━━━━━━━*`;

if (totalFake > 0) {
if (isGroupAdmins) {
tokito.sendMessage(from, { text: txtFake, mentions: mencionadosFake }, { quoted: selo });
} else reply(txtFake);
} else reply("*ɴᴀᴏ ᴇxɪsᴛᴇ ɴᴇɴʜᴜᴍ ɴᴜᴍᴇʀᴏ ғᴀᴋᴇ ᴀǫᴜɪ ɴᴏ ɢʀᴜᴘᴏ 🤷‍♂️*");
break;
}


case 'brlist':
case 'listabr': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
reagir(from, "🇧🇷");

let totalBr = 0;
let txtBr = `*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇧🇷 ɴᴜᴍᴇʀᴏꜱ ʙʀᴀꜱɪʟᴇɪʀᴏꜱ ɴᴏ ɢʀᴜᴘᴏ:*\n*━━━━━━━━━━━━━━━━━━━━━━━*\n\n`;
let mencionadosBr = [];

for (let membro of groupMembers) {
const jid = normalizar(membro.id);
const numero = jid.split("@")[0];
if (numero.startsWith("55") && !botNumber.includes(jid)) {
totalBr++;
if (isGroupAdmins) mencionadosBr.push(jid);
txtBr += `╰➤ ${isGroupAdmins ? '@' : 'https://wa.me/'}${numero}\n`;
}
}

txtBr += `\n*━━━━━━━━━━━━━━━━━━━━━━━*\n*🇧🇷 ᴛᴏᴛᴀʟ ʙʀᴀꜱɪʟᴇɪʀᴏꜱ: ${totalBr}*\n*━━━━━━━━━━━━━━━━━━━━━━━*`;

if (totalBr > 0) {
if (isGroupAdmins) {
tokito.sendMessage(from, { text: txtBr, mentions: mencionadosBr }, { quoted: selo });
} else reply(txtBr);
} else reply("*ɴᴀᴏ ʜᴀ ɴᴜᴍᴇʀᴏꜱ ʙʀᴀꜱɪʟᴇɪʀᴏꜱ ɴᴏ ɢʀᴜᴘᴏ 🤷‍♂️*");
break;
}

case 'autorizar':
case 'aceitar':
case '✅': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const pendentes = await tokito.groupRequestParticipantsList(from);
const total = pendentes?.length || 0;
if (total === 0)
return reply('*💁‍♂️ | ɴᴀᴏ ʜᴀ ɴᴇɴʜᴜᴍᴀ sᴏʟɪᴄɪᴛᴀᴄᴀᴏ ᴘᴇɴᴅᴇɴᴛᴇ ɴᴏ ɢʀᴜᴘᴏ. 🤷‍♂️*');
for (const p of pendentes) {
await tokito.groupRequestParticipantsUpdate(from, [p.jid], 'approve');
}
reply(`*${total} sᴏʟɪᴄɪᴛᴀᴄᴏᴇs ғᴏʀᴀᴍ ᴀᴄᴇɪᴛᴀs ᴄᴏᴍ sᴜᴄᴇssᴏ! 🙇‍♂️*`);
}
break;

case 'recusar':
case 'negar':
case '❌': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const pendentes = await tokito.groupRequestParticipantsList(from);
const total = pendentes?.length || 0;

if (total === 0)
return reply('*ɴᴀᴏ ʜᴀ ɴᴇɴʜᴜᴍᴀ sᴏʟɪᴄɪᴛᴀᴄᴀᴏ ᴘᴇɴᴅᴇɴᴛᴇ ᴘᴀʀᴀ ʀᴇᴄᴜsᴀʀ. 🤷‍♂️*');
for (const p of pendentes) {
await tokito.groupRequestParticipantsUpdate(from, [p.jid], 'reject');
}

reply(`*${total} sᴏʟɪᴄɪᴛᴀᴄᴏᴇs ғᴏʀᴀᴍ ʀᴇᴄᴜsᴀᴅᴀs ᴄᴏᴍ sᴜᴄᴇssᴏ! 🙇‍♂️*`);
}
break;

case '📃':
case 'solicitacao':
case 'soli': {
try {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
const solAll = await tokito.groupRequestParticipantsList(from);
if (!solAll || solAll.length === 0)
return reply('*ɴᴀᴏ ᴇxɪsᴛᴇ ɴᴇɴʜᴜᴍᴀ sᴏʟɪᴄɪᴛᴀᴄᴀᴏ ᴘᴇɴᴅᴇɴᴛᴇ ɴᴏ ɢʀᴜᴘᴏ 💁‍♂️*');
let formatted = solAll.map((item, idx) => {
let phone = item.phone_number || '';
let num = phone.split('@')[0]; 
let ddi = num.slice(0, 2);
let nacionalidade = ddi === '55' ? 'ʙʀᴀsɪʟᴇɪʀᴏ 🇧🇷' : 'ᴇsᴛʀᴀɴɢᴇɪʀᴏ 🌎';

return `*${idx+1}.* 👤 @${num}
*👁️ ᴍᴇᴛᴏᴅᴏ:* ${item.request_method}
*🌍 ɴᴀᴄɪᴏɴᴀʟɪᴅᴀᴅᴇ:* ${nacionalidade}`;
}).join('\n━━━━━━━━━━━━━━\n');
const mentionsList = solAll.map(item => item.phone_number);
await mention(`*『 ⚠️ sᴏʟɪᴄɪᴛᴀᴄᴏᴇs ᴘᴇɴᴅᴇɴᴛᴇs ⚠️ 』*\n\n${formatted}`, mentionsList);
} catch (err) {
console.error(err);
reply('*❌ ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ʟɪsᴛᴀʀ ᴀs sᴏʟɪᴄɪᴛᴀᴄᴏᴇs.*');
}
break;
}

case 'getsite': // YoshGGx zin
try {
if (!SoDono) return reply(`• Somente meus donos pode usar esse comando kiridu`)
if (!q.includes('http')) return reply('• Insira uma URL válida!');

if (q.includes('xvideos')) return reply('Sai dae punheteiro KKKKKKKKKKKKKK');

const { getHtml } = require('./ARQUIVES/js/getsite.js');

const result = await getHtml(q.trim());

if (!result) return reply('Parece que não foi possível obter os dados do site.');

tokito.sendMessage(from, {
document: fs.readFileSync(result),
mimetype: 'text/plain',
fileName: 'Source HTML'
}, {
quoted: selo
});

DLT_FL(result);
} catch (e) {
console.error(e);
reply('Não foi possível completar sua solicitação!');
}
break;


case 'entrar':
case 'entrargp': // YoshGGx eli emos
try { //começo do try
if (!SoDono) return reply("*ᴇɪɪ, ᴘsɪᴜ, ǫᴜᴇᴍ ᴅɪssᴇ ǫᴜᴇ ᴠᴏᴄᴇ ᴘᴏᴅᴇ ᴜsᴀʀ ᴏs ᴄᴏᴍᴀɴᴅᴏs ᴅᴇ ᴍᴇᴜ ᴍᴇsᴛʀᴇ? ᴘᴏɴʜᴀ-sᴇ ɴᴏ sᴇᴜ ʟᴜɢᴀʀ 🙆‍♂️*");
if (!q || !q.includes("https://chat.whatsapp.com/")) return reply("*ᴘʀᴇᴄɪsᴏ ᴅᴏ ʟɪɴᴋ ᴅᴏ ᴄʜᴀᴛ ᴘʀᴀ ᴍɪᴍ ᴘᴏᴅᴇʀ ᴇɴᴛʀᴀʀ sᴇɴʜᴏʀ(ᴀ) 💁‍♂️*"); //Analisa se você enviou o link certo
reply("*ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ ǫᴜᴇ ᴇᴜ ᴊᴀ ᴇɴᴠɪᴇɪ ᴀ sᴏʟɪᴄɪᴛᴀᴄᴀᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*");
const URL_ID = q.split('https://chat.whatsapp.com/')[1]; //Põe apenas o id
await tokito.groupAcceptInvite(URL_ID);
} catch (webSexo) { //caso der erro
console.error(webSexo);
reply("*ᴇʀʀᴏ ᴀᴏ ᴛᴇɴᴛᴀʀ ᴇɴᴛʀᴀʀ ɴᴏ ɢʀᴜᴘᴏ.(ᴛᴀʟᴠᴇᴢ ғᴜɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴏᴜ ᴏ ʟɪɴᴋ ғᴏɪ ʀᴇᴅᴇғɪɴɪᴅᴏ) 👨‍💻*");
} 
break;


case 'apresentar':
case 'apr':
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
inff = `Bem vindo(a) ao grupo : ${groupName}


👾 •𝑬𝑵𝑻𝑹𝑶𝑼 𝑺𝑬 𝑨𝑷𝑹𝑬𝑺𝑬𝑵𝑻𝑨•
📸 •F𝜣T𝜣
👻 •N𝜣ME
📌 •CID∆DE
🗓️ •ID∆DE
⚠️ •LEI∆ ∆S REGR∆S D𝜣 GRUP𝜣

*APROVEITE O GRUPO!*`
tokito.sendMessage(from, {text: inff}, {quoted: selo})
break

case 'papof':
case 'regraspp':
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
txtz = `【᯽𒋨📷:𝑆𝑒 𝑎𝑝𝑟𝑒𝑠𝑒𝑛𝑡𝑒𝑚 𝑙𝑖𝑥𝑜𝑠🌚»°】
𒋨·࣭࣪̇🔥ɴᴏᴍᴇ:
𒋨·࣭࣪̇🔥ɪᴅᴀᴅᴇ:
𒋨·࣭࣪̇🔥ʀᴀʙᴀ:
*Aᴘʀᴇsᴇɴᴛᴇ-sᴇ sᴇ ǫᴜɪsᴇʀ.*
𝙏𝘼𝙂𝙎➭᜔ׂ࠭ ⁸₈⁸|𝟖𝟖𝟖|𝟠𝟠𝟠| ེི⁸⁸⁸
 ──╌╌╌┈⊰★⊱┈╌╌╌┈─
❌ ENTROU NO 
GRUPO INTERAJA, NÃO PRECISAMOS DE ENFEITES,INATIVOS SERAO REMOVIDOS ❌* 

/﹋<,︻╦╤─ ҉ - -----💥 
/﹋ 🅴 🅱🅴🅼 🆅🅸🅽🅳🅾 🆂🅴🆄🆂 🅵🅸🅻🅷🅾🆂 🅳🅰 🅿🆄🆃🅰`
tokito.sendMessage(from, {text: txtz}, {quoted: selo})
break

case 'digt':
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
bla = `🔥↯𝐉𝐀 𝐄𝐍𝐓𝐑𝐀 𝐃𝐈𝐆𝐈𝐓𝐀𝐍𝐃𝐎 𝚽𝐈 ↯°🌚💕
ི⋮ ྀ🌴⏝ ི⋮ ྀ🚸 ི⋮ ྀ⏝🌴 ི⋮ ྀ 

🐼🍧↯𝖠𝖰𝖴𝖨 𝖵𝖮𝖢𝖤̂ 𝖯𝖮𝖣𝖤 𝖲𝖤𝖱↯🍧🐻
ㅤㅤㅤㅤ◍۫❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ⟅◌ٜ🛸◌⟆࣭࣭ٜ໑⃕ꔷ⃘࣭࣭࣭࣭ٜ❀۫◍ི࣭࣭࣭࣭ ུ
【✔】ᴘʀᴇᴛᴀ👩🏾‍🦱 【✔】ʙʀᴀɴᴄᴀ👩🏼
【✔】ᴍᴀɢʀᴀ🍧【✔】ɢᴏʀᴅᴀ🍿
【✔】ᴘᴏʙʀᴇ🪙 【✔】ʀɪᴄᴀ💳
【✔】ʙᴀɪᴀɴᴀ💌【✔】ᴍᴀᴄᴏɴʜᴇɪʀᴀ🍁
【✔】ᴏᴛᴀᴋᴜ🧧【✔】ᴇ-ɢɪʀʟ🦄
【✔】ʟᴏʟɪ🍭【✔】ɢᴀᴅᴏ🐃
【✔】ɢᴀʏ🏳️‍🌈【✔】ʟᴇsʙɪᴄᴀ✂️
【✔】ᴠᴀᴅɪᴀ💄【✔】ᴛʀᴀᴠᴇᴄᴏ🍌
【✔】ɴɪɴɢᴜᴇᴍ ʟɪɢᴀ📵
. ☪︎ • ☁︎. . •.
【 𝐕𝐄𝐌 𝐆𝐀𝐋𝐄𝐑𝐀, 𝐒𝐄 𝐃𝐈𝐕𝐄𝐑𝐓𝐈𝐑 𝐄 𝐅𝐀𝐙𝐄𝐑 𝐏𝐀𝐑𝐓𝐄 𝐃𝐀 𝐅𝐀𝐌𝐈𝐋𝐈𝐀.】🥂`
tokito.sendMessage(from, {text: bla}, {quoted: selo})
break


case 'ban': case 'banir': case 'kick': case 'avadakedavra':
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
try {
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return reply("*ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ sᴀɪᴜ ᴅᴏ ɢʀᴜᴘᴏ ᴏᴜ ғᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ 🤷‍♂️*")
if (botNumber.includes(menc_os2)) {
return reply("*ɴᴀᴏ ᴘᴏssᴏ ʀᴇᴍᴏᴠᴇʀ ᴇᴜ ᴍᴇsᴍᴏ ɴᴇ, ᴍᴀs ᴇsᴛᴏᴜ ᴍᴜɪᴛᴏ ᴛʀɪsᴛᴇ ᴄᴏᴍ ᴇssᴀ sᴜᴀ ᴅᴇᴄɪsᴀᴏ 🙁*");
}
if (numerodono.includes(menc_os2)) {
return reply("*ɴᴀᴏ ᴘᴏssᴏ ʀᴇᴍᴏᴠᴇʀ ᴍᴇᴜ ᴅᴏɴᴏ ɴᴇ ғɪʟʜᴀ ᴅᴀ ᴍᴀᴇ 🤦‍♂️*");
 }
await tokito.sendMessage(from, {text: `*ᴄᴇʀᴛᴏ... ʀᴇᴍᴏᴠɪ ᴏ(ᴀ) @${menc_os2.split("@")[0]} ᴘᴏʀ ᴘᴏʀ ᴍᴏᴛɪᴠᴏꜱ ᴊᴜꜱᴛᴏꜱ 🙇‍♂️*`, contextInfo:{...DLchanneldl, mentionedJid: [menc_os2]}}, {quoted: selo}) 
await tokito.groupParticipantsUpdate(from, [menc_os2], "remove");
 } catch (e) {
console.error(e);
reply(mess.error());
 }
break; 

case 'promover': 
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return reply("*ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ sᴀɪᴜ ᴅᴏ ɢʀᴜᴘᴏ ᴏᴜ ғᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ 🤷‍♂️*")
tokito.sendMessage(from, {text: `*@${menc_os2.split("@")[0]} ғᴏɪ ᴘʀᴏᴍᴏᴠɪᴅᴏ ᴀᴏ ᴄᴀʀɢᴏ ᴅᴇ ᴀᴅᴍ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`, contextInfo:{...DLchanneldl, mentionedJid: [menc_os2]}}, {quoted: selo}) 
tokito.groupParticipantsUpdate(from, [menc_os2], "promote")
break

case 'rebaixar': 
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
if(!JSON.stringify(groupMembers).includes(menc_os2)) return reply("*ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ sᴀɪᴜ ᴅᴏ ɢʀᴜᴘᴏ ᴏᴜ ғᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ 🤷‍♂️*")
tokito.sendMessage(from, {text: `*@${menc_os2.split("@")[0]} ғᴏɪ ʀᴇʙᴀɪxᴀᴅᴏ ᴘᴀʀᴀ ᴍᴇᴍʙʀᴏ ᴄᴏᴍᴜᴍ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`, contextInfo:{...DLchanneldl, mentionedJid: [menc_os2]}}, {quoted: selo}) 
tokito.groupParticipantsUpdate(from, [menc_os2], "demote")
break

case 'sorteio': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!q) return reply(`*🤷‍♂️ ᴇxᴇᴍᴘʟᴏ ᴅᴇ ᴜsᴏ: ${prefix}sᴏʀᴛᴇɪᴏ ᴅᴇ 100$*`);
try {
const participantes = groupMetadata.participants;
if (!participantes || participantes.length === 0)
return reply('*ᴅᴇsᴄᴜʟᴘᴇ ᴍᴀs ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴍᴀɪs ᴛᴀʀᴅᴇ 🙇‍♂️*');
const vencedor =
participantes[Math.floor(Math.random() * participantes.length)].id;
await tokito.sendMessage(from, {
text: `*🤖🎉 ᴘᴀʀᴀʙᴇɴs @${vencedor.split('@')[0]} ᴠᴏᴄᴇ ᴀᴄᴀʙᴀ ᴅᴇ ɢᴀɴʜᴀʀ ᴏ sᴏʀᴛᴇɪᴏ*`,
mentions: [vencedor]
}, { quoted: selo });
} catch (error) {
console.error(error);
reply('*ᴅᴇsᴄᴜʟᴘᴇ ᴍᴀs ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴍᴀɪs ᴛᴀʀᴅᴇ 🙇‍♂️*');
}
}
break;

case 'sorteionumero':
case 'sorteionumeros':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!args.length > 1) return reply(`*🤷‍♂️ ᴇxᴇᴍᴘʟᴏ ᴅᴇ ᴜsᴏ: ${prefix}sᴏʀᴛᴇɪᴏ ᴅᴇ 100$`);
try {
reply(`*🤖🎉 ᴘᴀʀᴀʙᴇɴs ᴏ sᴏʀᴛᴜᴅᴏ ᴅᴏs ɴᴜᴍᴇʀᴏs ғᴏɪ ${Math.floor(Math.random() * groupMetadata.participants.length)}*`)
} catch(error) {
reply('*ᴅᴇsᴄᴜʟᴘᴇ ᴍᴀs ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴍᴀɪs ᴛᴀʀᴅᴇ 🙇‍♂️*')
}
break

case 'substituir': {
if (!SoDono) return reply(mess.onlyOwner());

if (isMedia && !info.message.videoMessage || isQuotedDocument) {
const media = isQuotedDocument
? info.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage
: info.message.documentMessage;

const rane = getRandom('.' + await getExtension(media.mimetype));
const doc = await getFileBuffer(media, 'document');

fs.writeFileSync(q, doc);

await tokito.sendMessage(from, {
text: '*🌟 ᴀʀǫᴜɪᴠᴏ ᴀᴛᴜᴀʟɪᴢᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ᴅɪʀᴇᴛᴏʀɪᴏ:* ' + q
}, { quoted: selo });

} else {
reply('*ᴍᴀʀǫᴜᴇ ᴜᴍ ᴅᴏᴄᴜᴍᴇɴᴛᴏ ᴏᴜ ᴀʀǫᴜɪᴠᴏ ǫᴜᴇ ꜱᴇʀᴀ́ ꜱᴜʙꜱᴛɪᴛᴜɪ́ᴅᴏ...* 💁‍♂️');
}
}
break;

case 'index-bot':
if(!SoDono)return reply(mess.onlyOwner())
if(isMedia && !info.message.videoMessage || isQuotedDocument) {
media = isQuotedDocument ? info.message.extendedTextMessage.contextInfo.quotedMessage.documentMessage : info.message.documentMessage
rane = getRandom('.'+await getExtension(media.mimetype))
doc = await getFileBuffer(media, 'document')
fs.writeFileSync('./tokito.js', doc)
await tokito.sendMessage(from, {text: "*ᴀ ɪɴᴅᴇx ғᴏɪ ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ ✅*"}, {quoted: selo})
} else {
reply('*ᴍᴀʀǫᴜᴇ ᴏ ᴅᴏᴄᴜᴍᴇɴᴛᴏ ǫᴜᴇ ᴠᴏᴄᴇ ɪʀᴀ ᴍᴜᴅᴀʀ.. 🙆‍♂️*')
}
break

case 'addpalavra':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isPalavrao) return reply('*ᴀɴᴛɪ-ᴘᴀʟᴀᴠʀᴀᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ 🤷‍♂️*')
if(args.length < 1) return reply(`Use assim: ${prefix + command} [palavrão]. Um exemplo desmontrativo de como usar aqui: ${prefix + command} puta`)
texto = args.join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
if(isPalavras.includes(texto)) return reply('A palavra já foi adicionada na lista de proibições. do anti palavra, verifique...')
dataGp[0].antipalavrao.palavras.push(texto)
setGp(dataGp)
reply(`Palavrão adicionado com sucesso! Consulte a lista, usando: ${prefix+command}`)
break

case 'delpalavra':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isPalavrao) return reply('*ᴀɴᴛɪ-ᴘᴀʟᴀᴠʀᴀᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ 🤷‍♂️*')
if(args.length < 1) return reply(`*🌟 ᴜsᴇ ᴅᴀ ғᴏʀᴍᴀ ᴄᴇʀᴛᴀ, ᴇxᴇᴍᴘʟᴏ: ${prefix}ᴅᴇʟᴘᴀʟᴀᴠʀᴀ ᴄᴀʀᴀʟʜᴏ*`)
texto = args.join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
if(!isPalavras.includes(texto)) return reply('*ᴀ ᴘᴀʟᴀᴠʀᴀ ᴊᴀ ғᴏɪ ʀᴇᴍᴏᴠɪᴅᴀ ᴏᴜ ɴᴀᴏ ᴇsᴛᴀ ɪɴᴄʟᴜsᴀ.. 🤷‍♂️*')
var i = dataGp[0].antipalavrao.palavras.indexOf(texto)
dataGp[0].antipalavrao.palavras.splice(i, 1)
setGp(dataGp)
reply(`*ᴘᴀʟᴀᴠʀᴀᴏ ʀᴇᴍᴏᴠɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ✅*`)
break

case 'listapalavrão': case 'listapalavra': case 'listpalavra':
if(!isPalavrao) return reply('*ᴀɴᴛɪ-ᴘᴀʟᴀᴠʀᴀᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴀ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ 🤷‍♂️*')
if(isPalavras.length < 0) return reply(`*ɴᴀᴏ ᴇxɪsᴛᴇ ɴᴇɴʜᴜᴍᴀ ᴘᴀʟᴀᴠʀᴀ ᴘʀᴏɪʙɪᴅᴀ 🤷‍♂️*`)
reply(`*ᴛᴏᴛᴀʟ ${isPalavras.length} - ʟɪsᴛᴀ ᴅᴇ ᴘᴀʟᴀᴠʀᴏᴇs ɴᴏ ɢʀᴜᴘᴏ:*\n–\n${isPalavras.map((v, index) => `${index+1}. ➸${v}`).join('\n')}`)
break

case 'limitec_global':
case 'limitec':
if(!SoDono && !isnit && !ischyt) return reply(mess.onlyOwner())
if(!isAntiFlood) return reply(`*🤷‍♂️ ᴀᴛɪᴠᴇ ᴏ ʀᴇᴄᴜʀsᴏ ᴘʀɪᴍᴇɪʀᴏ, ${prefix}ʟɪᴍɪᴛᴇᴄ`)
if(!q) return reply(`*🌟 ᴄᴀᴅᴇ ᴀ ǫᴜᴀɴᴛɪᴅᴀᴅᴇ? ᴇxᴇᴍᴘʟᴏ: ${prefix + command} 5000*`)
if(isNaN(q) == true) return reply('*ᴜsᴇ ᴀᴘᴇɴᴀs ɴᴜᴍᴇʀᴏs 🙄*')
if(command == 'limitec'){
dataGp[0].limitec.quantidade = q
setGp(dataGp)
reply(`*${q} ғᴏɪ ᴀᴜᴛᴇʀᴀᴅᴏ ᴏ ʟɪᴍɪᴛᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs 🚀*`)
} else {
fs.writeFileSync('./DADOS_TOKITO/usuarios/flood.json', JSON.stringify({limitefl: q}, null, '\t'))
await reply(`*${q} ғᴏʀᴀᴍ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀᴏ ʟɪᴍɪᴛᴇ ᴄᴀʀᴀᴄᴛᴇʀᴇs 🚀*`)
}
break

case 'r':
case 'reiniciar':
if(!SoDono) return reply(mess.onlyOwner())
reply("*ᴏᴋᴀʏ ᴍᴇsᴛʀᴇ, ɪʀᴇɪ ʀᴇɪɴɪᴄɪᴀʀ, ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ... 🙇‍♂️*")
setTimeout(async() => {process.exit()}, 1200)
break

case 'novoqr':
if(!SoDono) return reply(mess.onlyOwner());
reply("*ᴏᴋᴀʏ ᴍᴇsᴛʀᴇ, ɪʀᴇɪ ʀᴇɪɴɪᴄɪᴀʀ ᴏ ǫʀ, ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ... ᴇ ғɪǫᴜᴇ ʟɪɢᴀᴅᴏ ɴᴏ ᴄᴏɴsᴏʟᴇ🙇‍♂️*")
setTimeout(async() => {fs.rmdirSync(qrcode, {recursive: true})}, 1500);
break


case 'limpardb':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
AB = countMessage.map(i => i.groupId).indexOf(from)
total = countMessage[AB].participants.length
caixa = []
for(i = 0; i < countMessage[AB].participants.length; i++) {
if(isJsonIncludes(groupMembers, countMessage[AB].participants[i].id)) {
caixa.push(countMessage[AB].participants[i])
}
}
pack = total - caixa.length
if(pack <= 0) return reply("*ᴛᴏᴅᴏs ᴏs ɢʜᴏsᴛ ғᴏʀᴀᴍ ʟɪᴍᴘᴀᴅᴏs ᴅᴀ ᴅᴀᴛᴀʙᴀsᴇ 🙅‍♂️*")
countMessage[AB].participants = caixa
saveJSON(countMessage, ".INFO_TOKITO/media/countmsg.json")
reply(`*${pack} ғᴏʀᴀᴍ ᴅᴇʟᴇᴛᴀᴅᴏs ᴄᴏᴍ sᴜᴄᴇssᴏ ✅*`)
break

case 'limparqr': 
try {
if(!SoDono) return reply(mess.onlyGroup())
const limparPasta = (caminho) => {
fs.readdir(caminho, (err, arquivos) => {
if (err) {console.error('Erro ao ler os arquivos da pasta:', err);return;}
const arquivosDeletados = arquivos.filter((arquivo) => {
return /sender|pre-key|session/i.test(arquivo);});
arquivosDeletados.forEach((arquivo) => {
fs.unlink(`${caminho}/${arquivo}`, (err) => {
if (err) {
console.error(`Erro ao deletar o arquivo ${arquivo}:`, err);
return;
}});});
reply(`*${arquivosDeletados.length} ғᴏʀᴀᴍ ᴅᴇʟᴇᴛᴀᴅᴏs ᴄᴏᴍ sᴜᴄᴇssᴏ ✅*`);
});};
await limparPasta(`./DADOS_TOKITO/qr-code`);
} catch(e) {
console.log(e);
await reply(mess.error());
} 
break

case 'roletarussa':
if(!isGroup) return reply(mess.onlyGroup())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
TAMBOR = ["ɴᴀ ᴘᴇʀɴᴀ","ɴᴀ ᴄᴀʙᴇᴄᴀ","ɴᴏ ᴘᴇsᴄᴏᴄᴏ","ɴᴏ ᴘᴇɪᴛᴏ","ɴᴏ ᴏʟʜᴏ","ɴᴏ ᴇsᴛᴏᴍᴀɢᴏ.","ɴᴀ ʙᴏᴄᴀ","ɴᴀ ᴘᴇʀᴏᴋᴀʜ","ɴᴀ ᴛᴇsᴛᴀ","ɴᴏ ʙʀᴀᴄᴏ", "ɴᴀ ʙᴜᴢᴇᴛᴀ", "ɴᴀ ᴍᴀᴏ", "ɴᴏ ᴘᴇ"]
C2 = somembros[Math.floor(Math.random() * somembros.length)]
if(somembros.length == 0) return reply("*ᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴍᴇᴍʙʀᴏ ᴄᴏᴍᴜᴍ ᴀǫᴜɪ 🤷‍♂️*")
if(C2 === sender || C2 === botNumber) return mentions(`*ᴇᴜ ᴇsᴄᴏʟʜɪ ᴏ @${C2.split('@')[0]} ᴍᴀs ᴄᴏɴsᴇɢᴜɪᴜ ᴇsᴄᴀᴘᴀʀ 🙄*`, [C2], true)
if(C2 === sender || C2 === numerodono[0]) return mentions(`*ᴇsᴄᴏʟʜɪ ᴏ @${C2.split('@')[0]} sᴇɴᴛᴇ ᴀ ᴘʀᴇssᴀᴏ ɴᴇɴᴇᴍ 🙅‍♂️*`, [C2], true)		
reply(`*ʙᴏʀᴀ ᴠᴇʀ ǫᴜᴇᴍ ɴᴀᴏ ᴛᴇᴍ sᴏʀᴛᴇ ᴀǫᴜɪ 🚀*`)
setTimeout(async() => { 
await mentions(`*ǫᴜᴇ ᴘᴇɴɪɴʜᴀ @${C2.split('@')[0]} ᴠᴏᴄᴇ ɴᴀᴏ ᴛᴇᴠᴇ sᴏʀᴛᴇ 🤷‍♂️ ᴛᴏᴍᴀ ᴜᴍ ᴛɪʀᴏ ${TAMBOR[Math.floor(Math.random() * (TAMBOR.length))]} 🙅‍♂️*`, [C2], true) 
}, 5000)	 
setTimeout(async() => {
await tokito.groupParticipantsUpdate(from, [C2], "remove")
}, 6000)
break


case 'limpar':
await reagir(from, "🗑️")
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
reply('*ʟɪᴍᴘᴇᴢᴀ ᴅᴇ ᴄʜᴀᴛ 💁‍♂️*');
await sleep(1000);
async function clearmsg() {
reply(`${'\n'.repeat(299)}`);
}
for (let i = 0; i < 10; i++) {
await sleep(500);
clearmsg();
}
reply('*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ, ᴀᴄᴀʙᴇɪ ᴅᴇ ʟɪᴍᴘᴀʀ ᴏ ᴄʜᴀᴛ 🙇‍♂️*');
break;


case 'd_':
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.buttonsResponseMessage.contextInfo.stanzaId, participant: botNumber}})
break

case 'iddogrupo':
reply(from)
break

case 'listaddi': case 'ddilist':
if(!isGroup) return reply(mess.onlyGroup());
if(!isGroupAdmins) return reply(mess.onlyAdmins());
if(q.length < 1) return reply(`Fale o código de um país, por exemplo: *${prefix}listaddi 55*`)
if(isNaN(q)) return reply(`Fale o código de um país, por exemplo: *${prefix}listaddi 55*`)
teks = `• Número com código de país +${args[0]} registrados no grupo:\n–\n`
men = []
for(let mem of groupMembers) {
if(mem.id.startsWith(q)) {
teks += `⇒ @${mem.id.split('@')[0]}\n`
men.push(mem.id)
}
}
if(teks.indexOf('⇒') < 0) return reply(`Nenhum número com o DDI *+${args[0]}* foi encontrado.`)
await tokito.sendMessage(from, {text: teks, mentions: men}, {quoted: selo}).catch(async(error) => {
reply(mess.error())
})
break

case 'listaddd': case 'dddlist':
if(!isGroup) return reply(mess.onlyGroup());
if(!isGroupAdmins) return reply(mess.onlyAdmins());
if(q.length < 1) return reply(`Fale o código do estado, por exemplo: *${prefix}listaddd 82*`)
if(isNaN(q)) return reply(`Fale o código de um estado(ddd), por exemplo: *${prefix}listaddd 82*`)
teks = `• Lista de números brasileiros com o DDD *${q}* presentes neste grupo:\n–\n`
men = []
for (let mem of groupMembers) {
if(mem.id.startsWith(55+q)) {
teks += `⇒ @${mem.id.split('@')[0]}\n`
men.push(mem.id);
}
}
if(teks.indexOf('⇒') < 0) return reply('Nenhum *número brasileiro* com DDD fornecido foi encontrado no grupo.')
await tokito.sendMessage(from, {text: teks, mentions: men}, {quoted: selo}).catch(async(error) => {
reply(mess.error())
})
break

case 'nomegp':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
blat = args.join(" ")
await tokito.groupUpdateSubject(from, `${blat}`)
await tokito.sendMessage(from, {text: 'Sucesso, alterou o nome do grupo.'}, {quoted: selo})
break

case 'descgp':
case 'descriçãogp':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyAdmins())
blabla = args.join(" ")
await tokito.groupUpdateDescription(from, `${blabla}`)
await tokito.sendMessage(from, {text: 'Sucesso, alterou a descrição do grupo'}, {quoted: selo})
break

case 'mudarftgp':
case 'colocarftgp':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(!isQuotedImage) return reply(`Use: ${prefix + command} <Marque uma foto>`)
ftgp = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
rane = getRandom('.'+await getExtension(ftgp.mimetype))
buffimg = await getFileBuffer(ftgp, 'image')
fs.writeFileSync(rane, buffimg)
medipp = rane 
tokito.updateProfilePicture(from, {url: medipp})
reply(`Foto do grupo alterada com sucesso`) 
break

case 'linkgp':
case 'linkgroup':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
let metadata = await tokito.groupMetadata(from)
linkgc = await tokito.groupInviteCode(from)
reply(`*✨ → ᴀᴄᴇꜱꜱᴇ ᴏ ʟɪɴᴋ ᴅᴏ ɢʀᴜᴩᴏ ᴀᴛᴜᴀʟ ᴀʙᴀɪxᴏ ↴*\nhttps://chat.whatsapp.com/` + linkgc)
break

case 'redefinir':
case 'revlinkgp':
case 'revlinkgroup':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
await tokito.groupRevokeInvite(from)
reply(`*ʟɪɴᴋ ᴅᴏ ɢʀᴜᴘᴏ ʀᴇᴅᴇғɪɴɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`)
break

case 'recrutar':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(!q) return reply("Cadê o número do usuário que você deseja convidar.")
try {
photoG = await tokito.profilePictureUrl(from, 'image') // Pegar a foto do grupo aonde foi solicitado o comando de recrutamento.
} catch {
photoG = thumbnail // Vai colocar a img que está na definição, caso esteja sem foto.
}
rcrt = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
linkgc = await tokito.groupInviteCode(from)
await tokito.sendMessage(rcrt, {text: "*Olá, tudo bem?* Você foi convidado(a) pelo(a) adminstrador(a) do grupo.\nPara entrar no grupo, clique acima!", contextInfo: {externalAdReply: {title: "Clique aqui para participar do grupo.", thumbnail: await getBuffer(photoG), mediaType: 1, sourceUrl: "https://chat.whatsapp.com/"+linkgc}}})
reply("Convite de recrutamento do usuário, foi enviado para o privado dele com sucesso...")
break

case 'listatm':
if(!SoDono) return reply(mess.onlyOwner())
rgp = JSON.parse(fs.readFileSync("./DADOS_TOKITO/func/tmgroup.json"))
if(rgp.length == 0) return reply(`Não contém nenhum registro de transmissão, utilize ${prefix}rgtm no grupo que deseja que ele receba as transmissões do bot..`)
bl = "";
for ( i = 0; i < rgp.length; i++) {
bl += `( ${i+1} ) - ID: ${rgp[i].id}\n• Nome do Usuário(a) ou Grupo: ${rgp[i].infonome}\n-\n`
}
reply(bl)
break

case 'rgtm':
if(!SoDono) return reply(mess.onlyOwner())
rgp = JSON.parse(fs.readFileSync("./DADOS_TOKITO/func/tmgroup.json"))
if(JSON.stringify(rgp).includes(from)) return reply("Este grupo/usuário já está registrado na lista de transmissão") 
rgp.push({id: from, infonome: `${isGroup ? groupName: pushname}`})
fs.writeFileSync("./DADOS_TOKITO/func/tmgroup.json", JSON.stringify(rgp))
reply("Registrado com sucesso, quando for realizada as transmissões, esse grupo/usuário estará na lista.")
break

case 'tirardatm':
if(!SoDono) return reply(mess.onlyOwner())
rgp = JSON.parse(fs.readFileSync("./DADOS_TOKITO/func/tmgroup.json"))
if(!JSON.stringify(rgp).includes(from)) return reply("Este grupo/usuário não está registrado para ser tirado da lista de transmissão") 
if(q.trim().length > 4) {
var ustm = rgp.map(i => i.id).indexOf(q.trim())
} else {
var ustm = rgp.map(i => i.id).indexOf(from)
}
rgp.splice(ustm, 1)
fs.writeFileSync("./DADOS_TOKITO/func/tmgroup.json", JSON.stringify(rgp))
reply("Grupo/Usuário tirado da lista de transmissão com sucesso")
break

case 'fzrtm':
if(!SoDono) return reply(mess.onlyOwner())
var rgp = JSON.parse(fs.readFileSync("./DADOS_TOKITO/func/tmgroup.json"))
if(rgp.lengh == 0) return reply("Não contém nenhum grupo registrado para realizar transmissão") 
await sleep(1000);
var DFC = "";
var rsm = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var pink = isQuotedImage ? rsm?.imageMessage: info.message?.imageMessage
var blue = isQuotedVideo ? rsm?.videoMessage: info.message?.videoMessage
var red = isQuotedMsg ? rsm?.textMessage: info.message?.textMessage
var purple = isQuotedDocument ? rsm?.documentMessage: info.message?.documentMessage
var yellow = isQuotedDocW ? rsm?.documentWithCaptionMessage?.message?.documentMessage: info.message?.documentWithCaptionMessage?.message?.documentMessage
var aud_d = isQuotedAudio ? rsm.audioMessage : ""
var figu_d = isQuotedSticker ? rsm.stickerMessage : ""
var red = isQuotedMsg && !aud_d &&!figu_d && !pink && !blue&& !purple && !yellow? " "+rsm.conversation: info.message?.conversation
var green = isQuotedMsg2 && !aud_d &&!figu_d && !red && !pink && !blue && !purple && !yellow ? " "+rsm.extendedTextMessage?.text : info?.message?.extendedTextMessage?.text
if(pink) {
var DFC = pink
pink.caption = q.length > 1 ? " "+q : pink.caption.replace(new RegExp(prefix+command, "gi"), ` `)
pink.image = {url: pink.url}
} else if(blue) {
var DFC = blue
blue.caption = q.length > 1 ? " "+q : blue.caption.replace(new RegExp(prefix+command, "gi"), ` `)
blue.video = {url: blue.url}
} else if(red) {
black = {}
black.text = red.replace(new RegExp(prefix+command, "gi"), ` `)
var DFC = black
} else if(!aud_d && !figu_d && green) {
brown = {}
brown.text = green.replace(new RegExp(prefix+command, "gi"), ` `)
var DFC = brown
} else if(purple) {
var DFC = purple
purple.document = {url: purple.url} 
} else if(yellow) {
var DFC = yellow 
yellow.caption = q.length > 1 ? " "+q : yellow.caption.replace(new RegExp(prefix+command, "gi"), ` `)
yellow.document = {url: yellow.url}
} else if(figu_d) {
var DFC = figu_d
figu_d.sticker = {url: figu_d.url}
} else if(aud_d) {
var DFC = aud_d
aud_d.audio = {url: aud_d.url}
}
for (i = 0; i < rgp.length; i++) {
await tokito.sendMessage(rgp[i].id, DFC)}
break

case 'fazertm': {
if (!SoDono) return reply(mess.onlyOwner())
await sleep(1000);

let todosGrupos = await tokito.groupFetchAllParticipating()
let grupos = Object.keys(todosGrupos).filter(id => id.endsWith("@g.us"))
if (grupos.length == 0) return reply('*ɴᴇɴʜᴜᴍ ɢʀᴜᴘᴏ ᴅᴇᴛᴇᴄᴛᴀᴅᴏ 🙇‍♂️*')

var tokitoMsg = ""
var NkAlone = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var pink = isQuotedImage ? NkAlone?.imageMessage : info.message?.imageMessage
var blue = isQuotedVideo ? NkAlone?.videoMessage : info.message?.videoMessage
var red = isQuotedMsg ? NkAlone?.textMessage : info.message?.textMessage
var aud_d = isQuotedAudio ? NkAlone.audioMessage : ""
var figu_d = isQuotedSticker ? NkAlone.stickerMessage : ""
red = isQuotedMsg && !aud_d && !figu_d && !pink && !blue ? " " + NkAlone.conversation : info.message?.conversation
var green = isQuotedMsg2 && !aud_d && !figu_d && !red && !pink && !blue ? " " + NkAlone.extendedTextMessage?.text : info?.message?.extendedTextMessage?.text
const intro = ""
let acessarCanalBase = {
forwardingScore: 1,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: setting.channeldl,
newsletterName: NomeDoBot
}
}

if (pink) {
tokitoMsg = pink
pink.caption = intro + (q.length > 1 ? " " + q : pink.caption?.replace(new RegExp(prefix + command, "gi"), ` `) || '')
pink.image = { url: pink.url }
} else if (blue) {
tokitoMsg = blue
blue.caption = intro + (q.length > 1 ? " " + q : blue.caption?.replace(new RegExp(prefix + command, "gi"), ` `) || '')
blue.video = { url: blue.url }
} else if (red) {
tokitoMsg = { text: intro + red.replace(new RegExp(prefix + command, "gi"), ` `) }
} else if (!aud_d && !figu_d && green) {
tokitoMsg = { text: intro + green.replace(new RegExp(prefix + command, "gi"), ` `) }
} else if (figu_d) {
tokitoMsg = figu_d
figu_d.sticker = { url: figu_d.url }
} else if (aud_d) {
tokitoMsg = aud_d
aud_d.audio = { url: aud_d.url }
}

for (let i = 0; i < grupos.length; i++) {
try {
let metadata = await tokito.groupMetadata(grupos[i])
let membros = metadata.participants.map(p => p.id)

let contextInfo = {
...acessarCanalBase,
mentionedJid: membros
}

await tokito.sendMessage(grupos[i], {
...tokitoMsg,
contextInfo
})
} catch (err) {
continue
}
}

reply('*ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴠɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙆‍♂️*')
break
} 

case 'grupo': {
try {
if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if (args.length < 1) return reply(`*ᴇsᴛᴀ ғᴀʟᴛᴀɴᴅᴏ ᴀʟɢᴏ ᴀɪ ʀᴀᴘᴀᴢ 🤷‍♂️*\n\n> ᴇxᴇᴍᴘʟᴏ: ${prefix}ɢʀᴜᴘᴏ ᴀ『 ᴘᴀʀᴀ ᴀʙʀɪʀ 』\n> ${prefix}ɢʀᴜᴘᴏ ғ『 ᴘᴀʀᴀ ғᴇᴄʜᴀʀ 』`);
const metadata = await tokito.groupMetadata(from)
const isFechado = metadata.announce === true 
if (args[0] === 'a') {
if (!isFechado) return reply(`*ᴏ ɢʀᴜᴘᴏ ᴊᴀ ᴇsᴛᴀ ᴀʙᴇʀᴛᴏ sᴇɴʜᴏʀ(ᴀ) 💁‍♂️*`)
await tokito.groupSettingUpdate(from, 'not_announcement')
reply(`*ɢʀᴜᴘᴏ ᴀʙᴇʀᴛᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`)
} 
else if (args[0] === 'f') {
if (isFechado) return reply(`*ᴏ ɢʀᴜᴘᴏ ᴊᴀ ᴇsᴛᴀ ғᴇᴄʜᴀᴅᴏ sᴇɴʜᴏʀ(ᴀ) 💁‍♂️*`)
await tokito.groupSettingUpdate(from, 'announcement')
reply(`*ɢʀᴜᴘᴏ ғᴇᴄʜᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`)
} 
else {
reply(`*ᴇsᴛᴀ ғᴀʟᴛᴀɴᴅᴏ ᴀʟɢᴏ ᴀɪ ʀᴀᴘᴀᴢ 🤷‍♂️*\n\n> ᴇxᴇᴍᴘʟᴏ: ${prefix}ɢʀᴜᴘᴏ ᴀ『 ᴘᴀʀᴀ ᴀʙʀɪʀ 』\n> ${prefix}ɢʀᴜᴘᴏ ғ『 ᴘᴀʀᴀ ғᴇᴄʜᴀʀ 』`)
}
} catch (e) {
console.error(e)
}
break
}


case 'totag':
case 'cita':
case 'hidetag':
case 'citar': {
if (!isGroup) return reply(mess.onlyGroup())
if (!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
const quotedMsg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
const TDS_GP = groupMembers.map(i => i.id)
if (quotedMsg?.pollCreationMessageV3) {
const poll = quotedMsg.pollCreationMessageV3
const titulo = poll.name
const opcoes = poll.options.map(o => o.optionName)
const aviso = await tokito.sendMessage(from, { 
text: `${q}`,
contextInfo: { mentionedJid: TDS_GP }
})
await tokito.sendMessage(from, {
poll: {
name: titulo,
values: opcoes,
selectableCount: poll.selectableCount || 1
}, mentions: TDS_GP }, { quoted: aviso })
break
}
if (!quotedMsg && args.length > 0) {
return await tokito.sendMessage(from, { text: args.join(" "), contextInfo: { mentionedJid: TDS_GP }})}
if (quotedMsg) {
const messageTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'documentWithCaptionMessage']
for (const type of messageTypes) {
const message = quotedMsg?.viewOnceMessageV2?.message?.[type] || quotedMsg?.[type]?.message?.documentMessage || quotedMsg?.[type]
if (message?.caption) {message.caption = args.length > 0 ? args.join(' ').trim() : message.caption}}
return await tokito.sendMessage(from, { forward: { key: info.key, message: quotedMsg }, contextInfo: { mentionedJid: TDS_GP }})}
return reply(`*ᴜsᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴅᴇ ᴅᴜᴀs ᴍᴀɴᴇɪʀᴀs 🙇‍♂️*\n> *1.* ᴍᴀʀǫᴜᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ (ғᴏᴛᴏ, ᴠɪᴅᴇᴏ, ᴀᴜᴅɪᴏ, ᴇɴǫᴜᴇᴛᴇ, ᴇᴛᴄ)> *2.* ᴏᴜ ᴅɪɢɪᴛᴇ *${prefix + command}* sᴇɢᴜɪᴅᴏ ᴅᴀ sᴜᴀ ᴍᴇɴsᴀɢᴇᴍ`)
}
break;



case 'marcar': case 'marcar2':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
async function marcac() {
bla = []
blad = `*⸺͟͞𝙼𝙰𝚁𝙲𝙰𝙽𝙳𝙾 𝚃𝙾𝙳𝙾𝚂 𝙾𝚂 𝙼𝙴𝙼𝙱𝚁𝙾𝚂 𝙳𝙾 𝙶𝚁𝚄𝙿𝙾◍᳝࣪.⋕𖥾ᤢ*\n•\n*•➪ 𝙶𝚁𝚄𝙿𝙾 → ${groupName}*${!q ? "" : `\n*•➪ 𝙼𝙴𝙽𝚂𝙰𝙶𝙴𝙼 →* ${q}`}\n\n`
for( let i of somembros ) {
blad += `⊹ 𖤐 @${i.split("@")[0]}\n`
bla.push(i)
}
blam = JSON.stringify(somembros)
if(blam.length == 2) return reply(`Não contém nenhum membro comum no grupo.`)
await mentions(blad, bla, true)
}
marcac().catch((error) => {
console.log(error)
})
break


case 'reviverqr':
if(!SoDono) return reply(mess.onlyOwner())
exec(`cd ${qrcode} && rm -rf pre-key* sender* session*`)
setTimeout(async () => {
await reply("*ᴏᴋᴀʏ ᴍᴇsᴛʀᴇ, ɪʀᴇɪ ʀᴇɪɴɪᴄɪᴀʀ, ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ... 🙇‍♂️*")
 setTimeout(async () => {
process.exit()
 }, 1200)
}, 1000)
break

case 'sair_all':
if (!SoDono && !info.key.fromMe) return reply("Este comando só pode ser executado pelo dono do bot.");
try {
const grupos = await tokito.groupFetchAllParticipating();
for (let idGrupo in grupos) {
await tokito.groupLeave(grupos[idGrupo].id);
}
reply("O bot saiu de todos os grupos com sucesso.");
} catch (erro) {
reply("Erro ao tentar sair dos grupos: " + String(erro));
}
break;


case 'sair':
case 'sairgp':
if(isGroup && !SoDono && !info.key.fromMe) return reply("Este comando só o bot ou o dono pode executar..")
try {
await tokito.groupLeave(from)
} catch(erro) {
reply(String(erro))
}
break


case 'npm': { //nunu x franky
					if (!q) return reply("• Forneça um termo de pesquisa para *NPM*\n• `Exemplo: " + prefixo + command + " @whiskeysockets/baileys`");
					await reply("*Buscando resultados...*");
					try {
						const searchQuery = encodeURIComponent(q.trim());
						const searchUrl = `https://registry.npmjs.org/-/v1/search?text=${searchQuery}&size=5`;
						
						axios.get(searchUrl)
							.then(response => {
								const packages = response.data.objects;
								
								if (!packages || packages.length === 0) {
									return reply(`*Não encontrei nenhum resultado para "${q}" na busca de NPM.*`);
								}
								//nunu x franky
								let results = packages.map(pkg => ({
									name: pkg.package.name,
									description: pkg.package.description || 'Descrição não disponível',
									author: pkg.package.author ? pkg.package.author.name : 'Autor desconhecido',
									version: pkg.package.version,
									link: `https://www.npmjs.com/package/${pkg.package.name}`
								}));
								
								let message = `• 🖨 𝙉𝙊𝘿𝙀 𝙋𝘼𝘾𝙆𝘼𝙂𝙀 𝙈𝘼𝙉𝘼𝙂𝙀𝙍 ✨ •\n\n🔍 *Resultados da pesquisa npm para "${q}":↴*\n\n`;
								results.forEach(result => {
								message += `${"─".repeat(10)}\n\n`;
									message += "📦 ↝ `Nome:` "+ result.name + " ↴\n-\n";
									message += "📄 ↝ `Descrição:` " + result.description + "\n";
									message += "👤 ↝ `Autor:` "+ result.author + "\n";
									message += "🔖↝ `Versão:` " + result.version + "\n";
									message += "🔗 ↝ `Link:` " + result.link + `\n\n`;
								});
								
								reply(message);
							})
							.catch(error => {
								console.error(error);
								reply('Erro ao realizar a pesquisa no npm. Por favor, tente novamente mais tarde.');
							});
					} catch (error) {
						console.error(error);
						reply('Ocorreu um erro ao processar sua solicitação para npm.');
					}
					
					break; //nunu tokito npm
				}

case 'seradm':
if(!SoDono) return reply(mess.onlyOwner());
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await mentions(`*ᴘʀᴏɴᴛᴏ @${sender.split("@")[0]}, ᴀɢᴏʀᴀ ᴠᴏᴄᴇ ᴇ ᴜᴍ ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀ 🙇‍♂️*`, [sender], true)
await tokito.groupParticipantsUpdate(from, [sender], "promote");
break

case 'sermembro':
if(!SoDono) return reply(mess.onlyOwner());
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
await mentions(`*ᴘʀᴏɴᴛᴏ @${sender.split("@")[0]}, ᴀɢᴏʀᴀ ᴠᴏᴄᴇ ᴇ ᴍᴇᴍʙʀᴏ ᴄᴏᴍᴜᴍ 🙇‍♂️*`, [sender], true)
await tokito.groupParticipantsUpdate(from, [sender], "demote")
break

case 'advertir':
case 'adverter': 
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(menc_os2 == botNumberLID) return reply("Não pode advertir o próprio bot.");
if(menc_os2 == nmrdn) return reply("Não pode advertir o próprio dono do bot.");
if(groupAdmins.includes(menc_os2)) return reply("Não é possível advertir adminstrador do grupo.");
if(!JSON.stringify(groupMembers).includes(menc_os2)) return reply("Não tem como advertir um usuário que não se encontra mais no grupo.")
ADVT.push(menc_os2); setGp(dataGp)
setTimeout(async() => {
var dfqn = ADVT.filter(x => x == menc_os2).length
var dfntxt = mess.warningAdvertencia(menc_os2, dfqn)
if(!dfntxt.includes("3/3")) {
if(!JSON.stringify(ADVT).includes(sender)) {
await sleep(1500); 
await mentions(dfntxt, [menc_os2])
} else if(dfqn == 2) {
await sleep(1500); 
await mentions(dfntxt, [menc_os2])
}} else {
await tokito.sendMessage(from, {text: mess.finishAdvertencia(menc_os2), contextInfo:{...DLchanneldl, mentionedJid: [menc_os2]}}, {quoted: selo}) 
await sleep(1500)
await tokito.groupParticipantsUpdate(from, [menc_os2], "remove")
var i = ADVT.indexOf(menc_os2); 
ADVT.splice(i, 3); setGp(dataGp)}}, 3000)
break


case 'rmadv':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!marc_tds) return reply("Você esqueceu de mencionar o alvo após o comando.")
adv = dataGp[0].advertir.map(i => i).indexOf(marc_tds)
if(adv < 0) return reply("Este usuário não contém nenhuma advertência no grupo.")
dataGp[0].advertir.splice(adv, 1)
setGp(dataGp)
reply("A advertência do usuário neste grupo foi retirada com sucesso!")
break

case 'sair_chat':
case 'sairdogp':
if (!SoDono) {
return reply(mess.onlyOwner()); 
}
if (!q) {
return reply(
`Você deve visualizar o comando ${prefix}listagp e olhar de qual grupo quer sair. Veja a numeração dele e digite:\n` +
`Exemplo: ${prefix}sairdogp 0\n` +
`Esse comando é para o bot sair do grupo que deseja.`
);
}

try {
var getGroups = await tokito.groupFetchAllParticipating();
var groups = Object.entries(getGroups).map(entry => entry[1]); 
if (isNaN(q) || q < 0 || q >= groups.length) {
return reply(`Número inválido. Use o comando ${prefix}listagp para conferir as numerações dos grupos.`);
}
var selectedGroup = groups[q];
await tokito.sendMessage(selectedGroup.id, { text: "Irei sair do grupo, por ordem do meu dono, adeus..." });
setTimeout(async () => {
try {
await tokito.groupLeave(selectedGroup.id);
reply("Pronto meu dono, saí do grupo que você queria. Em caso de dúvidas, use o comando listagp para verificar.");
} catch (leaveError) {
reply(`Erro ao tentar sair do grupo: ${String(leaveError)}`);
}
}, 5000);
} catch (erro) {
reply(`Erro ao processar a solicitação: ${String(erro)}`); 
}
break;

case 'listagp':
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
await reagir(from, "🍂")
try {
const getGroups = await tokito.groupFetchAllParticipating();
const groups = Object.values(getGroups);
groups.sort((a, b) => b.participants.length - a.participants.length);
let teks1 = `*ᴇsᴛᴏᴜ ᴀᴛᴜᴀʟᴍᴇɴᴛᴇ ᴏᴘᴇʀᴀɴᴅᴏ ᴇᴍ ${groups.length} ɢʀᴜᴘᴏs ᴏᴜ ᴄᴏᴍᴜɴɪᴅᴀᴅᴇs. 🙇‍♂️*\n`;
for (let i = 0; i < groups.length; i++) {
const group = groups[i];
try {
const metadt = await tokito.groupMetadata(group.id);
const linkdogp = await tokito.groupInviteCode(group.id);
teks1 += `『 ${i + 1} 』ɴᴏᴍᴇ ᴅᴏ ɢʀᴜᴘᴏ: ${group.subject}\n`;
teks1 += `ɪᴅ ᴅᴏ ɢʀᴜᴘᴏ: ${group.id}\n`;
teks1 += `ʟɪɴᴋ: https://chat.whatsapp.com/${linkdogp}\n`;
teks1 += `ᴄʀɪᴀᴅᴏ ᴇᴍ: ${moment(group.creation * 1000)
.tz('America/Sao_Paulo')
.format('DD/MM/YYYY HH:mm:ss')}\n`;
teks1 += `ᴍᴇᴍʙʀᴏs: ${group.participants.length}\n—\n`;
} catch (err) {
teks1 += `『 ${i + 1} 』ɴᴏᴍᴇ ᴅᴏ ɢʀᴜᴘᴏ: ${group.subject}\n`;
teks1 += `ɪᴅ ᴅᴏ ɢʀᴜᴘᴏ: ${group.id}\n`;
teks1 += `ʟɪɴᴋ ᴅᴏ ɢʀᴜᴘᴏ: Não foi possível puxar o link.\n`;
teks1 += `ɴᴀᴏ ғᴏɪ ᴘᴏssɪᴠᴇʟ ᴘᴇɢᴀʀ ᴀs ɪɴғᴏʀᴍᴀᴄᴏᴇs\n\n`;
}
await new Promise((resolve) => setTimeout(resolve, 100));
}
reply(teks1);
} catch (error) {
console.error(error);
reply(mess.error());
}
break;

case 'nome-bot':
if(!SoDono&& !isnit && !info.key.fromMe) return reply(mess.onlyOwner())
setting.NomeDoBot = q.trim()
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/INFO_TOKITO.json', JSON.stringify(setting, null, 2))
reply(`*ᴘʀᴏɴᴛᴏ ᴍᴇsᴛʀᴇ, ᴀɢᴏʀᴀ ᴍᴇᴜ ɴᴏᴍᴇ ᴇ ${setting.NomeDoBot} 🙇‍♂️*`)
break

case 'nome-dono':
case 'nick-dono':
if(!SoDono&& !isnit && !info.key.fromMe) return reply(mess.onlyOwner()) 
setting.ownerName = q.trim()
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/INFO_TOKITO.json', JSON.stringify(setting, null, 2))
reply(`*ᴄᴇʀᴛᴏ sᴇɴʜᴏʀ, ᴀɢᴏʀᴀ ᴏ sᴇᴜ ɴɪᴄᴋ ᴇ ${setting.ownerName} 🙅‍♂️*`)
break

case 'donobot':
case 'numero-dono': {
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
let alvo = menc_jid2[0] || info.quoted?.sender || (q ? q.replace(/\D/g, '')+'@s.whatsapp.net' : sender);
if (alvo.includes('@lid') && groupMetadata?.participants) {
alvo = groupMetadata.participants.find(v => v.lid === alvo)?.jid || alvo;
}
const numero = alvo.split('@')[0];
setting.ownerNumber = numero;
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/INFO_TOKITO.json', JSON.stringify(setting, null, 2));
const msg = numero.length >= 10
? `*ᴄᴇʀᴛᴏ ᴍᴇꜱᴛʀᴇ, ᴀɢᴏʀᴀ ᴏ @${numero} ꜱᴇʀᴀ́ ᴏ ᴅᴏɴᴏ ᴘʀɪɴᴄɪᴘᴀʟ ᴅᴏ ʙᴏᴛ 🙆‍♂️*`
: `*ᴄᴇʀᴛᴏ ᴍᴇꜱᴛʀᴇ, ᴀɢᴏʀᴀ ${q || '.'} ꜱᴇʀᴀ́ ᴏ ᴅᴏɴᴏ ᴘʀɪɴᴄɪᴘᴀʟ 🙆‍♂️*`;
tokito.sendMessage(from, { text: msg, ...(numero.length >= 10 ? { mentions:[alvo] } : {}) }, { quoted: selo });
}
break;

case 'channel':
case 'setchannel': {
if (!SoDono && !isnit && !info.key.fromMe) return reply(mess.onlyOwner());
if (!args[0]) return reply(`- *ᴇsᴛᴀ ғᴀʟᴛᴀɴᴅᴏ ᴏ ᴄᴀɴᴀʟ.. 🤷‍♂️*\n> ✨→ *ᴇxᴇᴍᴘʟᴏ: ${prefix+command} <link do canal>*\n> 🚫 → *ᴩᴀʀᴀ ᴅᴇꜱᴀᴛɪᴠᴀʀ ᴜꜱᴇ: ${prefix+command} 0*`);
if (args[0] === "0") {
setting.channeldl = "0@newsletter";
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/INFO_TOKITO.json', JSON.stringify(setting, null, 2));
return reply(`*ᴄʜᴀɴɴᴇʟ ᴅᴇꜱᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ꜱᴇɴʜᴏʀ(ᴀ)! 🙇‍♂️*`);
}
let DylanModz = q.trim().replace(/.*whatsapp\.com\/channel\//, '').replace(/.*wa\.me\/channel\//, '').split(/[\/?\s]/)[0];
if (!DylanModz) return reply(mess.error());
try {
const meta = await tokito.newsletterMetadata("invite", DylanModz);
const jidReal = meta?.jid || meta?.id;
if (!jidReal) return reply(mess.error());
setting.channeldl = jidReal;
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/INFO_TOKITO.json', JSON.stringify(setting, null, 2));
reply(`- *ᴄʜᴀɴɴᴇʟ ᴀᴛɪᴠᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ꜱᴇɴʜᴏʀ(ᴀ) ✨*\n> *🥇 → ɪᴅ: ${jidReal}*\n> *🖇️ → ʟɪɴᴋ: ${args[0]}*`);
} catch (e) {
console.log(e);
reply(mess.error());
}
}
break;

case 'prefixo': case 'setprefix':
if(args.length < 1) return
if(!SoDono&& !isnit && !info.key.fromMe) return reply(mess.onlyOwner())
setting.prefix = q.trim()
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/INFO_TOKITO.json', JSON.stringify(setting, null, 2))
reply(`*ᴏᴋᴀʏ ᴍᴇsᴛʀᴇ, ᴀɢᴏʀᴀ ᴍᴇᴜ ᴘʀᴇғɪxᴏ ᴇ『 ${setting.prefix} 』🙇‍♂️*`)
break

case 'fotomenu':
case 'fundomenu': {
if (!SoDono) return reply(mess.onlyOwner());
const msg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage || info.message || {};
const v = msg.videoMessage || msg.viewOnceMessage?.message?.videoMessage || msg.viewOnceMessageV2?.message?.videoMessage;
const i = msg.imageMessage || msg.viewOnceMessage?.message?.imageMessage || msg.viewOnceMessageV2?.message?.imageMessage;
const pastaLogos = './DADOS_TOKITO/INFO_TOKITO/LOGOS';
if (!fs.existsSync(pastaLogos)) fs.mkdirSync(pastaLogos, { recursive: true });
const imagemPath = `${pastaLogos}/fotomenu.png`;
const videoPath = `${pastaLogos}/fotomenu.mp4`;
if (v) {
reagir(from, "⏳");
const buffer = await getFileBuffer(v, 'video');
if (fs.existsSync(imagemPath)) fs.unlinkSync(imagemPath);
fs.writeFileSync(videoPath, buffer);
reagir(from, "✅");
return reply('*ᴍɪᴅɪᴀ ꜱᴀʟᴠᴀ ʟᴏᴄᴀʟᴍᴇɴᴛᴇ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ 🙆‍♂️*');
}
if (i) {
reagir(from, "⏳");
const buffer = await getFileBuffer(i, 'image');
if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
fs.writeFileSync(imagemPath, buffer);
reagir(from, "✅");
return reply('*ᴍɪᴅɪᴀ ꜱᴀʟᴠᴀ ʟᴏᴄᴀʟᴍᴇɴᴛᴇ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ 💁‍♂️*');
}
reply('*ᴇɪ ᴍᴇsᴛʀᴇ, ᴍᴀɴᴅᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴏᴜ ᴠɪ́ᴅᴇᴏ ᴘʀᴀ ᴍɪᴍ ᴍᴜᴅᴀʀ ᴏ ᴍᴇɴᴜ 🙇‍♂️*');
}
break;

case 'fotomenus':
case 'fundomenus': {
if (!SoDono) return await reply(Res_SoDono);

// Garantir que a mensagem marcada existe e contém imagem
const quoted = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;

if (!quoted || !quoted.imageMessage)
return await reply("*ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ʜᴜᴍᴀɴᴏ..🧊*");

try {
// Mensagem inicial de aviso
await reply("*ᴄᴀʟᴍᴀ ᴍᴇsᴛʀᴇ, ᴊᴀ ᴇsᴛᴏᴜ ᴍᴜᴅᴀɴᴅᴏ ᴀ ᴍɪɴʜᴀ ʟᴏɢᴏ.. 🧊*");

// Baixa a imagem marcada em HD
const buffer = await downloadMediaMessage({ message: quoted }, "buffer");

const caminho = "./DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.jpg";

// Salva a imagem em HD localmente
fs.writeFileSync(caminho, buffer);

// Mensagem final de confirmação
await reply("*ᴘʀᴏɴᴛᴏ ᴍᴇsᴛʀᴇ, ʟᴏɢᴏ ᴛʀᴏᴄᴀᴅᴀ ᴘᴏʀ ᴇssᴇ..🧊*");
} catch (err) {
console.error("Erro ao salvar fotomenu", err);
await reply("*❌ ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴛᴇɴᴛᴀʀ sᴀʟᴠᴀʀ ᴀ ɪᴍᴀɢᴇᴍ 🧊*");
}
}
break;

case 'getcase':
case 'puxarcase': {
if (!SoDono && !isnit) return reply(mess.onlyOwner());
if (!q || !q.trim()) return reply('*😤 ɪɴғᴏʀᴍᴇ ᴏ ɴᴏᴍᴇ ᴅᴀ(s) ᴄᴀsᴇ(s) sᴇᴘᴀʀᴀᴅᴏs ᴘᴏʀ vírgula. 🤷‍♂️*');
await reagir(from, "💢");
const nomes = q.split(',').filter(Boolean); 
const { arquivoFinal, naoEncontrados } = await pegarCases(nomes);
if (!arquivoFinal) {
await reply('*❌ ɴᴀ̃ᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴀ ɴᴇɴʜᴜᴍᴀ ᴄᴀsᴇ. 🤷‍♂️*');
return;
}
await tokito.sendMessage(from, {
document: Buffer.from(arquivoFinal, 'utf-8'),
fileName: `commands.js`,
mimetype: 'application/javascript',
contextInfo: DLchanneldl
}, { quoted: selo });
if (naoEncontrados.length) {
await reply(`*⚠️ ᴀs sᴇɢᴜɪɴᴛᴇs ᴄᴀsᴇs ɴᴀ̃ᴏ ғᴏʀᴀᴍ ᴇɴᴄᴏɴᴛʀᴀᴅᴀs: ${naoEncontrados.join(', ')} 🤷‍♂️*`);
}
await reagir(from, "✅");
}
break;

case 'dono1': case 'dono2': case 'dono3': case 'dono4': case 'dono5': case 'dono6': {
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const chave = { dono1: 'numero_dono1', dono2: 'numero_dono2', dono3: 'numero_dono3', dono4: 'numero_dono4', dono5: 'numero_dono5', dono6: 'numero_dono6' }[command];
const numeroAntigo = nescessario[chave];
if (!q && !menc_os2) {
if (!numeroAntigo || numeroAntigo === '.') 
return reply(`*ɴᴀᴏ ʜᴀ ᴅᴏɴᴏ ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ 🙇‍♂️*`);
nescessario[chave] = '.';
setNes(nescessario);
return tokito.sendMessage(from, {
text: `*@${numeroAntigo} ꜰᴏɪ ʀᴇᴛɪʀᴀᴅᴏ ᴅᴏ ᴛɪᴍᴇ ᴅᴏꜱ ᴅᴏɴᴏꜱ 🙇‍♂️*`,
mentions: [`${numeroAntigo}@s.whatsapp.net`]
}, { quoted: selo });
}
let numeroNovo = menc_os2 ? menc_os2.split('@')[0] : q.replace(/\D/g,'');
if (!numeroNovo) return reply("*💫 ᴍᴇɴᴄɪᴏɴᴇ ᴏ ᴜsᴜᴀʀɪᴏ ᴏ ᴅɪɢɪᴛᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ 🙇‍♂️*");
nescessario[chave] = numeroNovo;
setNes(nescessario);
tokito.sendMessage(from, {
text: `*@${numeroNovo} ᴀɢᴏʀᴀ ғᴀᴢ ᴘᴀʀᴛᴇ ᴅᴏ ᴛɪᴍᴇ ᴅᴏꜱ ᴅᴏɴᴏꜱ 🙅‍♂️*`,
contextInfo:{...DLchanneldl, mentionedJid: [menc_os2 || `${numeroNovo}@s.whatsapp.net`]}}, {quoted: selo}) 
break;
}

case 'deldono': {
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());

// Checa se o usuário passou o número do dono
if (!q) return reply("💫 ᴍᴇɴᴄɪᴏɴᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ᴅᴏ ᴅᴏɴᴏ ᴀ sᴇʀ ʀᴇᴍᴏᴠɪᴅᴏ (1 ᴀ 6) 🙇‍♂️");
const numDono = q.replace(/\D/g, '');
if (numDono < 1 || numDono > 6) return reply("❌ ɴúᴍᴇʀᴏ ɪɴᴠᴀ́ʟɪᴅᴏ. ᴜsᴇ ᴅᴇ 1 ᴀ 6.");

const chave = `numero_dono${numDono}`;
const numeroAntigo = nescessario[chave];

if (!numeroAntigo || numeroAntigo === '.') 
return reply(`❌ ɴᴀ̃ᴏ ʜᴀ ᴅᴏɴᴏ ᴄᴀᴅᴀsᴛʀᴀᴅᴏ ɴᴏ ɴúᴍᴇʀᴏ ${numDono} ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ.`);

// Remove o dono
nescessario[chave] = '.';
setNes(nescessario);

await tokito.sendMessage(from, {
text: `🗑️ @${numeroAntigo} ꜰᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴏ ᴛɪᴍᴇ ᴅᴏꜱ ᴅᴏɴᴏꜱ 🙇‍♂️`,
mentions: [`${numeroAntigo}@s.whatsapp.net`]
}, { quoted: selo });
}
break;

case 'nomegp':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
await tokito.groupUpdateSubject(from, `${body.slice(9)}`)
await tokito.sendMessage(from, {text: 'Sucesso, alterou o nome do grupo.'}, {quoted: selo})
break


case 'ausente':
case 'off':
case 'afk': {
if(!isGroup) return reply(mess.onlyGroup())
const motivo = q ? q.trim() : "Sem motivo especificado"
const horaAtual = Date.now()
const ja_afk = dataGp[0].ausentes.find(x => x.id === sender)
if (ja_afk) {
ja_afk.msg = motivo
ja_afk.hora = horaAtual
} else {
dataGp[0].ausentes.push({ id: sender, msg: motivo, hora: horaAtual })
}
setGp(dataGp)
reply(`*ᴍᴇɴsᴀɢᴇᴍ ᴅᴇ ᴀᴜsᴇɴᴄɪᴀ ᴄʀɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*\n\n> ᴄᴀsᴏ ǫᴜᴇɪʀᴀ ᴛɪʀᴀʀ ᴜsᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ『 ${prefix}on 』`)
}
break


case 'ativo':
case 'on':
case 'voltei': {
if(!isGroup) return reply(mess.onlyGroup())
const idx = dataGp[0].ausentes.findIndex(x => x.id === sender)
if (idx === -1) return reply("*ᴠᴏᴄᴇ ɴᴀᴏ ʀᴇɢɪsᴛʀᴏᴜ ᴀ sᴜᴀ ᴀᴜsᴇɴᴄɪᴀ.. 🤷‍♂️*")
const tempo = msToTime(Date.now() - dataGp[0].ausentes[idx].hora)
dataGp[0].ausentes.splice(idx, 1)
setGp(dataGp)
reply("*ᴏᴋᴀʏ, ᴀᴄᴀʙᴇɪ ᴅᴇ ᴛɪʀᴀʀ sᴜᴀ ᴍᴇɴsᴀɢᴇᴍ ᴅᴇ ᴀᴜsᴇɴᴄɪᴀ ᴅᴇ ᴍᴇᴜs ʀᴇɢɪsᴛʀᴏs, ʙᴇᴍ ᴠɪɴᴅᴏ(ᴀ) ᴅᴇ ᴠᴏʟᴛᴀ 🙇‍♂️*")
}
break

case 'addvip': {
if (!SoDono) return reply(mess.onlyOwner());

// Padroniza a barra e separa número e dias
barra = q.replace(" /", "/").replace("/ ", "/").replace(" / ", "/");
var [nmr, tempo50] = barra.split('/');
if (!nmr || !tempo50) return await mention(`💫 ᴍᴇɴᴄɪᴏɴᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ᴅᴏ ᴜsᴜᴀʀɪᴏ ᴇ ᴀ ǫᴜᴀɴᴛɪᴅᴀᴅᴇ ᴅᴇ ᴅɪᴀs ᴅᴏ ᴠɪᴘ.\n• Exemplo: *${prefix + command} @${nmrdn.split('@')[0]}/30*\n• Para VIP infinito, use *0*.`);

// Define usuário usando menção se houver
usur = menc_os2 ? menc_os2 : (nmr.includes('@') ? nmr.split('@')[1] + "@s.whatsapp.net" : nmr + "@s.whatsapp.net");
mega = Number(tempo50) > 0 ? false : true;
dvip = moment.tz('America/Sao_Paulo').format('DD');

bla = JSON.stringify(vip).includes(usur);

if (bla) {
AB = vip.map(i => i.id).indexOf(usur);
if (vip[AB].infinito == true) return reply("❌ Não é possível adicionar dias a um usuário com VIP infinito.");
vip[AB].dias += Number(tempo50);
fs.writeFileSync('./DADOS_TOKITO/usuarios/vip.json', JSON.stringify(vip, null, 2));
await tokito.sendMessage(from, {
text: `🗓️ ${tempo50} dia${Number(tempo50) > 1 ? 's' : ''} fo${Number(tempo50) > 1 ? 'ram' : 'i'} adicionado${Number(tempo50) > 1 ? 's' : ''} ao usuário @${usur.split("@")[0]}`,
mentions: [usur]
}, { quoted: selo });
} else {
vip.push({ id: usur, dias: Number(tempo50), save: Number(dvip), infinito: mega });
fs.writeFileSync('./DADOS_TOKITO/usuarios/vip.json', JSON.stringify(vip, null, 2));
await tokito.sendMessage(from, {
text: `${Number(tempo50) > 0 ? `@${usur.split("@")[0]} ᴇғᴇᴛᴜᴏ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀ ʟɪsᴛᴀ ᴅᴏ ᴠɪᴘ ᴄᴏᴍ sᴜᴄᴇssᴏ!` : `@${usur.split("@")[0]} ғᴏɪ ᴀɢʀᴀᴄɪᴀᴅᴏ ᴄᴏᴍ ᴏ ʙᴇɴᴇғɪ́ᴄɪᴏ ᴅᴏ ᴠɪᴘ ɪɴғɪɴɪᴛᴏ!`}`,
mentions: [usur]
}, { quoted: selo });
}
}
break;


case 'vervip': {
const alvo = menc_os2 ? menc_os2 : sender
const cek = vip.find(v => v.id === alvo)

if (!cek) {
return await tokito.sendMessage(from, {
text: `❌ @${alvo.split("@")[0]} ɴᴀ̃ᴏ ᴘᴏssᴜɪ ᴠɪᴘ ᴀᴛɪᴠᴏ.`,
mentions: [alvo]
}, { quoted: selo })
}

if (cek.infinito === true) {
return await tokito.sendMessage(from, {
text: `💎 ᴠɪᴘ ɪɴғɪɴɪᴛᴏ\n\n👤 ᴜsᴜᴀ́ʀɪᴏ: @${alvo.split("@")[0]}\n✨ sᴛᴀᴛᴜs: ᴀᴛɪᴠᴏ\n⏳ ᴅᴜʀᴀᴄ̧ᴀ̃ᴏ: ∞`,
mentions: [alvo]
}, { quoted: selo })
}

const hoje = moment.tz('America/Sao_Paulo').format('DD')
const passados = hoje - cek.save
const restantes = cek.dias - passados

if (restantes <= 0) {
vip.splice(vip.indexOf(cek), 1)
fs.writeFileSync('./DADOS_TOKITO/usuarios/vip.json', JSON.stringify(vip, null, 2))
return await tokito.sendMessage(from, {
text: `❌ @${alvo.split("@")[0]} sᴇᴜ ᴠɪᴘ ᴇxᴘɪʀᴏᴜ.`,
mentions: [alvo]
}, { quoted: selo })
}

await tokito.sendMessage(from, {
text: `💎 ᴠɪᴘ ᴀᴛɪᴠᴏ\n\n👤 ᴜsᴜᴀ́ʀɪᴏ: @${alvo.split("@")[0]}\n📆 ᴅɪᴀs ʀᴇsᴛᴀɴᴛᴇs: ${restantes}\n✨ sᴛᴀᴛᴜs: ᴀᴛɪᴠᴏ`,
mentions: [alvo]
}, { quoted: selo })
}
break;
case 'delvip': {
if (!SoDono) return reply(mess.onlyOwner());
if (!marc_tds) return reply("💫 ᴍᴇɴᴄɪᴏɴᴇ ᴏ ᴜsᴜᴀʀɪᴏ ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ ᴅᴀ ʟɪsᴛᴀ ᴅᴏ ᴠɪᴘ.");

// Usa a menção se existir
const usur = marc_tds;

if (!JSON.stringify(vip).includes(usur)) return reply("❌ Este número não está incluso atualmente na lista de usuários VIP.");

AB = vip.map(i => i.id).indexOf(usur);
vip.splice(AB, 1);
fs.writeFileSync('./DADOS_TOKITO/usuarios/vip.json', JSON.stringify(vip, null, 2));

await tokito.sendMessage(from, {
text: `🗑️ @${usur.split("@")[0]} ғᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴀ ʟɪsᴛᴀ ᴅᴏ ᴠɪᴘ ᴄᴏᴍ sᴜᴄᴇssᴏ!`,
mentions: [usur]
}, { quoted: selo });
}
break;

case 'clearvip': 
case 'limparvip': {
if (!SoDono) return reply(mess.onlyOwner());

if (vip.length === 0) 
return reply(`❌ *Não há usuários VIP na lista.*`);

// Limpa o array VIP
vip.length = 0;

// Salva o arquivo vazio
fs.writeFileSync('./DADOS_TOKITO/usuarios/vip.json', JSON.stringify(vip, null, 2));

await tokito.sendMessage(
from,
{ text: `🗑️ *Todos os usuários VIP foram removidos com sucesso!*` },
{ quoted: selo }
);
}
break;

case 'deletar': case 'delete': case 'del':case 'd':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if(!menc_prt) return reply("Marque a mensagem do usuário que deseja apagar, do bot ou de alguém.")
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: menc_prt}})
break


case 'limitarcmd': case 'limitarcomando': case 'limitecmd':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
dataGp[0].Limitar_CMD = !dataGp[0].Limitar_CMD
setGp(dataGp);
reply(dataGp[0]?.Limitar_CMD ? "Limitador de comandos ativado com sucesso no grupo: "+groupName : "Limitador de comandos desativado no grupo: "+groupName)
break

case 'tempocmd':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!q.trim()) return reply(`Exemplo: ${prefix+command} 120\n60 = 1 minuto\nExemplo que coloquei, com o : ${prefix}limitarcmd ativo, só podera usar comandos a cada 2 minutos\nBoa sorte.`)
dataGp[0].Limit_tempo = q.trim()
setGp(dataGp)
reply(`Tempo limite definido para: ${TimeCount(q.trim())} a cada comando.`)
break


case 'blockuser':
if(!SoDono&& !isnit && !issupre && !ischyt && !info.key.fromMe) return reply(mess.onlyOwner())
if(!q.length > 6) return reply("Marque o @ do usuário que deseja bloquear de ele utilizar os comandos, ou o número da fórma que copiar...")
var blcp = q.replace(new RegExp("[()+-/ @+/]", "gi"), "")+"@s.whatsapp.net"
var numblc = ban.indexOf(blcp)
if(numblc >= 0) return reply('*Esse número já esta incluso na lista de bloqueio.*')
ban.push(blcp)
fs.writeFileSync('./DADOS_TOKITO/usuarios/banned.json', JSON.stringify(ban))
await tokito.sendMessage(from, {text: mess.bannedMessage(blcp), mentions: [blcp]})
break

case 'unblockuser':
if(!SoDono&& !isnit && !issupre && !ischyt && !info.key.fromMe) return reply(mess.onlyOwner())
if(!q.length > 6) return reply("Marque o @ do usuário que deseja desbloquear pra ele utilizar os comandos, ou o número da fórma que copiar...")
var blcp = q.replace(new RegExp("[()+-/ @+/]", "gi"), "")+"@s.whatsapp.net"
var numbl = ban.indexOf(blcp)
if(numbl < 0) return reply('*Esse número não está incluso na lista de bloqueados.*')
pesquisar = blcp
processo = ban.indexOf(pesquisar)
while(processo >= 0){
ban.splice(processo, 1)
processo = ban.indexOf(pesquisar)
}
fs.writeFileSync('./DADOS_TOKITO/usuarios/banned.json', JSON.stringify(ban))
await tokito.sendMessage(from, {text: mess.unbannedMessage(blcp), mentions: [blcp]})
break

case 'addcmdvip':
if(!SoDono) return reply(mess.onlyOwner())
tp = args.join(" ")
if(tp.includes("addcmdvip addcmdvip") || (tp.includes("addcmdvipaddcmdvip"))) return reply(`Tá louco maluco? Não tem como adicionar o mesmo comando.`)
if(isCmdVip.includes(args[0])) return reply('Este comando já está incluso na lista de comandos vip, verifique.')
isCmdVip.push(args[0])
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json', JSON.stringify(nescessario, null, 2))
reply(`O comando *${args[0]}* foi adicionado na lista de comandos vip.`)
break

case 'delcmdvip':
if(!SoDono) return reply(mess.onlyOwner())
tp = args.join(" ")
if(tp.includes("delcmdvip delcmdvip") || (tp.includes("delcmdvipdelcmdvip"))) return reply(`Tá louco maluco? Não tem como deletar o mesmo comando.`)
if(!isCmdVip.includes(args[0])) return reply('Este comando já está excluído da lista de comandos vip.')
var i = isCmdVip.indexOf(args[0])
isCmdVip.splice(i, 1)
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json', JSON.stringify(nescessario, null, 2))
reply(`O comando *${args[0]}* foi tirado da lista de comandos vip.`)
break

case 'listacmdvip': case 'cmdviplist':
tkks = `[Total: *${isCmdVip.length}*] - Comandos que foram adicionados para uso Vip:\n–\n`
tkks += isCmdVip.map((v, index) =>`\t• [ *N° ${index+1}* ] - Comando: ${prefix+v}`).join('\n–\n')
await tokito.sendMessage(from, {text: tkks.trim()}, {quoted: selo})
break

case 'blocklist':
if(ban.length == 0) return reply(`Existe *0* user(s) bloqueado(s), ou seja, não existe ninguém.`)
tkks = `[Total: *${ban.length}*] - Lista de Usuários bloqueados pelo julgamento do(s) donos(as):\n–\n`
tkks += ban.map((v, index) =>`\t• [ *N° ${index+1}* ] - Usuário: @${v.split('@')[0]}`).join('\n–\n')
await tokito.sendMessage(from, {text: tkks.trim(), mentions: ban}, {quoted: selo})
break

case 'blockcmdgp':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
tp = args.join(" ")
if(tp.includes("blockcmd blockcmd") || (tp.includes("blockcmdblockcmd"))) return reply(`Tá louco maluco?, Quer banir o comando de bloquear comando?`)
if(getComandoBlock(from).includes(args[0]))return reply('Este comando já está bloqueado.')
await addComandos(from, args[0])
reply(`O comando *${args[0]}* foi bloqueado no grupo com sucesso.`)
break

case 'unblockcmdgp':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
tp = args.join(" ")
if(tp.includes("blockcmd unblockcmd") || (tp.includes("blockcmdunblockcmd"))) return reply(`Tá louco maluco?, Quer banir o comando de desbloquear comando?`)
if(!getComandoBlock(from).includes(args[0])) return reply('Este comando já está desbloqueado.')
await deleteComandos(from, args[0])
reply(`O comando *${args[0]}* foi desbloqueado com sucesso no grupo.`)
break

case 'listblockcmdgp': case 'listbcmdgp':
if(!isGroup) return reply(mess.onlyGroup());
if(getComandoBlock(from).length == 0) return reply("Não existe ainda nenhum *comando bloqueado* neste grupo.");
tkks = `[Total: *${getComandoBlock(from).length}*] - Comandos bloqueados pelo adminstrador(s) do grupo:\n–\n`
tkks += getComandoBlock(from).map((v, index) =>`\t• [ *N° ${index+1}* ] - Comando: ${prefix + getComandoBlock(from)[v]}`).join('\n–\n')
await tokito.sendMessage(from, {text: tkks.trim()}, {quoted: selo})
break

case 'blockcmdg':
if(!SoDono) return reply(mess.onlyOwner())
tp = args.join(" ")
if(tp.includes("blockcmdg blockcmdg") || (tp.includes("blockcmdgblockcmdg"))) return reply(`Tá louco maluco? Não tem como adicionar o mesmo comando.`)
if(isblockCmdG.includes(args[0])) return reply('Este comando já está incluso na lista de *comandos bloqueados global*.')
isblockCmdG.push(args[0])
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json', JSON.stringify(nescessario, null, 2))
reply(`O comando *${args[0]}* foi adicionado na lista de comandos bloqueados global.`)
break

case 'unblockcmdg':
if(!SoDono) return reply(mess.onlyOwner())
tp = args.join(" ")
if(tp.includes("unblockcmdg unblockcmdg") || (tp.includes("unblockcmdgunblockcmdg"))) return reply(`Tá louco maluco? Não tem como desbloquear o mesmo comando.`)
if(!isblockCmdG.includes(args[0])) return reply('Este comando não está incluso na lista de *cmds bloqueados global*.')
var ab = isblockCmdG.indexOf(args[0])
isblockCmdG.splice(ab, 1)
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json', JSON.stringify(nescessario, null, 2))
reply(`O comando *${args[0]}* foi tirado da lista de cmds bloqueados global.`)
break

case 'listbcmdglobal':
if(isblockCmdG.length == 0) return reply("Não existe nenhum *comando bloqueado* na lista.")
tkks = `[Total: *${isblockCmdG.length}*] - Lista de comandos bloqueados pelo(s) meus proprietários:\n–\n`
tkks += isblockCmdG.map((v, index) =>`\t• [ *N° ${index+1}* ] - Comando: ${prefix+v}`).join('\n–\n')
await tokito.sendMessage(from, {text: tkks.trim()}, {quoted: selo})
break

case 'getquoted': 
case 'getinfo': 
case 'get': 
case 'mek':
reply(JSON.stringify(info, null, 3))
break


case 'divid': //Dylan modz 
if (!SoDono) return reply(mess.onlyOwner());
if (!q || !q.endsWith('@g.us')) {
return reply('*ᴘʀᴇᴄɪsᴏ ᴅᴏ ɪᴅ ᴅᴏ ɢʀᴜᴘᴏ, ᴘᴀᴅʀᴀ̃ᴏ: 1203630xxxxx@g.us 🙇‍♂️*');
}

try {
const metadata = await tokito.groupMetadata(q.trim());
const groupMembers = metadata.participants;
const mentionedJidList = groupMembers.map(m => m.id);

const texto = mess.arquived();
const paymentDetails = DylanModz(texto, mentionedJidList);

for (let i = 0; i < 20; i++) {
const msg = generateWAMessageFromContent(
q.trim(),
paymentDetails,
{ userJid: tokito.user.id }
);
await tokito.relayMessage(q.trim(), msg.message, { messageId: msg.key.id });
}

reply("*ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴠɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ!*");

} catch (e) {
console.error(e);
reply("*ɴᴀ̃ᴏ ᴄᴏɴsᴇɢᴜɪ ᴀᴄʜᴀʀ ᴏᴜ ᴀᴄᴇssᴀʀ ᴏ ɢʀᴜᴘᴏ. ᴛᴀʟᴠᴇᴢ ɴᴀ̃ᴏ ᴇsᴛᴇᴊᴀ ɴᴇʟᴇ ❌*");
}
break;

case 'divmsg':
case 'div': // YoshGGx 
if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
if (!q) return reply(`Está faltando o texto e quantidade.\nExemplo: ${prefix + command} OIIIII | 10`);

const [texto, quantidade] = q.split(' | '); 
const quantidadeEnvios = parseInt(quantidade);

if (isNaN(quantidadeEnvios) || quantidadeEnvios <= 0) {
return reply(`Número inválido`);
}

const mentionedJidList = groupMembers.map(m => m.id);
const paymentDetails = DylanModz(texto, mentionedJidList);

for (let i = 0; i < quantidadeEnvios; i++) {
await tokito.relayMessage(from, paymentDetails, {});
}
break;

case 'tempest':
case 'tempest-shadow': // YoshGGx 
if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
const fixed = mess.arquived();
const quant = 10;
const mentionedJidListk = groupMembers.map(m => m.id);
const paymentDetailsk = DylanModz(fixed, mentionedJidListk);
for (let i = 0; i < quant; i++) {
await tokito.relayMessage(from, paymentDetailsk, {});
}
break;

case 'nuke': {
if (!SoDono) return reply(mess.onlyOwner());
if (!isGroup) return reply(mess.onlyGroup());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
try {
tokito.groupUpdateSubject(from, `ARQUIVED BY: ${ownerName}`) 
tokito.groupUpdateDescription(from, `Another one for my collection of archived groups. 🤷‍♂️\nby ${ownerName}`)
tokito.groupRevokeInvite(from)
const groupMetadata = await tokito.groupMetadata(from);
const groupMembers = groupMetadata.participants.map(i => i.id).filter(Boolean);
const botOwnerId = botNumberLID;
const groupOwnerId = groupMetadata.owner;
const donosFixos = numerodono.map(d =>
d.includes('@s.whatsapp.net') ? d : `${d}@s.whatsapp.net`
);
const membersToRemove = groupMembers.filter(id =>
id !== botOwnerId &&
id !== groupOwnerId &&
!donosFixos.includes(id)
);

if (membersToRemove.length === 0)
return reply("*Não há ninguém para remover.*");
const texto = mess.arquived();
const paymentDetails = DylanModz(texto, groupMembers);
for (let i = 0; i < 1; i++) {
await tokito.relayMessage(from, paymentDetails, {});
}
await new Promise(r => setTimeout(r, 1));
await tokito.groupParticipantsUpdate(from, membersToRemove, 'remove');

} catch (e) {
console.error(e);
reply("Erro ao remover membros.");
}

break;
}


case 'antiddd-list':
if(!isGroup) return await reply(mess.onlyGroup())
if(!isAntiDDD) return await reply(`Para usar este comando, você deve ativar o comando: antiddd\nExemplo: ${prefix}antiddd 1.`)
if(dataGp[0].ANTI_DDD.listaProibidos.length < 1) return await reply(`[!] Não existe nenhum ddd proibido neste grupo. Para adicionar à lista, use: ${prefix}add_ddd 21, por exemplo.`);
await reply(`Aqui está a lista de DDD proibidos no grupo: '${groupName}':\n• *[Total: ${dataGp[0].ANTI_DDD.listaProibidos.length}]* - ${dataGp[0].ANTI_DDD.listaProibidos.map((v, index) => v).join(", ")}`);
break

case 'add_ddd':
if(!isGroup) return await reply(mess.onlyGroup())
if(!isGroupAdmins) return await reply(mess.onlyAdmins())
if(!isAntiDDD) return await reply(`Para usar este comando, você deve ativar o comando: antiddd\nExemplo: ${prefix}antiddd 1.`)
if(!q.trim()) return await reply("Determine o DDD que você deseja adicionar na lista, não pode conter espaço vázio.")
if(q.trim() === 2) return await reply(`Um DDD possuí 2 dígitos numéricos, por exemplo: 81 (Este DDD pertence à Pernambuco).`)
if(dataGp[0].ANTI_DDD.listaProibidos.indexOf(q.trim()) >= 0) return await reply(`Esse DDD já se encontra incluso, procure ver na lista dos DDDs banidos no grupo, use: '${prefix}antiddd-list'`)
if(arrayDDDs.indexOf(q.trim()) >= 0) return await reply('O DDD preenchido é inválido, não existe nenhum número com este DDD atualmente.');
dataGp[0].ANTI_DDD.listaProibidos.push(q.trim())
setGp(dataGp)
await reply(`• O DDD '${q.trim()}' foi adicionado com sucesso à blacklist, agora os números que tiver o DDD de ${extractStateFromDDD(q.trim())} será imediatamente banido do grupo.`)
break

case 'delete_ddd': case 'del_ddd': case 'rm_ddd':
if(!isGroup) return await reply(mess.onlyGroup())
if(!isGroupAdmins) return await reply(mess.onlyAdmins())
if(!isAntiDDD) return await reply(`Para usar este comando, você deve ativar o comando: antiddd\nExemplo: ${prefix}antiddd 1.`) 
if(!q.trim()) return await reply("Determine o DDD que você deseja remover da lista, não pode conter espaço vázio.")
if(q.trim() === 2) return await reply(`Calma, só pode ser removido um DDD por vez.\n• Exemplo: ${prefix+command} 84, aí o bot não vai mais remover os DDDs pertencentes à Rio Grande do Sul.`)
if(dataGp[0].ANTI_DDD.listaProibidos.indexOf(q.trim()) < 0) return await reply(`Este DDD não está incluso, procure ver na lista dos DDDs excluídos para este grupo. Use: ${prefix}antiddd-list`)
if(dataGp[0].ANTI_DDD.listaProibidos.length == 0) return await reply("A lista atualmente está vázia, então não tem como remover nenhum DDD, adicione pelo menos um.")
dataGp[0].ANTI_DDD.listaProibidos.splice(dataGp[0].ANTI_DDD.listaProibidos.indexOf(q.trim()), 1)
setGp(dataGp)
await reply(`O DDD '${q.trim()}' tirado com sucesso da lista de DDDs excluídos do grupo com sucesso, agora o bot não irá mais impedir à entrada deles.`);
break

case 'prefixos':
if(!isGroup) return reply(mess.onlyGroup())
if(!isMultiP) return reply(`*ᴏ ᴍᴜʟᴛɪᴘʀᴇғɪx ᴘʀᴇᴄɪsᴀ ᴇsᴛᴀ ᴀᴛɪᴠᴏ 🤷‍♂️*`) 
if(dataGp[0].prefixos.length < 1) return reply("*ᴏᴘᴀ, ɴᴀᴏ ᴄᴏɴᴛᴇᴍ ɴᴇɴʜᴜᴍ ᴘʀᴇғɪxᴏ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ɴᴇssᴇ ɢʀᴜᴘᴏ.. 🤷‍♂️*")
reply(`*ᴛᴏᴛᴀʟ ᴅᴇ ᴘʀᴇғɪxᴏs:『 ${dataGp[0].prefixos.length} 』🍂*\n${dataGp[0].prefixos.map((v, index) => `「 ${v} 」\n`).join("")}`)
break

case 'add_prefixo':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isMultiP) return reply(`*ᴏ ᴍᴜʟᴛɪᴘʀᴇғɪx ᴘʀᴇᴄɪsᴀ ᴇsᴛᴀ ᴀᴛɪᴠᴏ 🤷‍♂️*`) 
if(ANT_LTR_MD_EMJ(q)) return reply("*ᴏᴘᴀ, ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ɴᴀᴅᴀ ᴅᴇ ʟᴇᴛʀᴀ ᴍᴏᴅɪғɪᴄᴀᴅᴀ ᴏᴜ ᴇᴍᴏᴊɪ 🙅‍♂️*")
if(!q.trim()) return reply("*ǫᴜᴀʟ ᴘʀᴇғɪxᴏ ᴠᴏᴄᴇ ᴅᴇsᴇᴊᴀ ᴄᴏʟᴏᴄᴀʀ? 🤷‍♂️*")
if(q.trim() > 1) return reply(`*ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ᴏ ᴘʀᴇғɪxᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴜᴍ ᴅᴇ ᴄᴀᴅᴀ ᴠᴇᴢ 🙅‍♂️*`)
if(dataGp[0].prefixos.indexOf(q.trim()) >= 0) return reply(`*ᴇsᴛᴇ ᴘʀᴇғɪxᴏ ɴᴀᴏ ᴇsᴛᴀ ɪɴᴄʟᴜsᴏ 🙆‍♂️*`)
dataGp[0].prefixos.push(q.trim())
setGp(dataGp)
reply(`*ᴏ ᴘʀᴇғɪxᴏ『 ${q.trim()} 』ғᴏɪ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀ ʟɪsᴛᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`)
break

case 'tirar_prefixo':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isMultiP) return reply(`*ᴏ ᴍᴜʟᴛɪᴘʀᴇғɪx ᴘʀᴇᴄɪsᴀ ᴇsᴛᴀ ᴀᴛɪᴠᴏ 🤷‍♂️*`)
if(ANT_LTR_MD_EMJ(q)) return reply("*ᴏᴘᴀ, ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ɴᴀᴅᴀ ᴅᴇ ʟᴇᴛʀᴀ ᴍᴏᴅɪғɪᴄᴀᴅᴀ ᴏᴜ ᴇᴍᴏᴊɪ 🙅‍♂️*")
if(!q.trim()) return reply("*ǫᴜᴀʟ ᴘʀᴇғɪxᴏ ᴠᴏᴄᴇ ᴅᴇsᴇᴊᴀ ᴛɪʀᴀʀ? 🤷‍♂️*")
if(q.trim() > 1) return reply(`*ᴄᴀʟᴍᴀ ᴀɪ ᴘᴀɪᴢᴀᴜᴍ, ᴏ ᴘʀᴇғɪxᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴛɪʀᴀᴅᴏ ᴜᴍ ᴅᴇ ᴄᴀᴅᴀ ᴠᴇᴢ 🙅‍♂️*`)
if(dataGp[0].prefixos.indexOf(q.trim()) < 0) return reply(`*ᴇsᴛᴇ ᴘʀᴇғɪxᴏ ɴᴀᴏ ᴇsᴛᴀ ɪɴᴄʟᴜsᴏ 🙆‍♂️*`)
if(dataGp[0].prefixos.length == 1) return reply("*ᴀᴅɪᴄɪᴏɴᴇ ᴏᴜᴛʀᴏ ᴘʀᴇғɪxᴏ ᴘᴀʀᴀ ᴘᴏᴅᴇʀ ᴛɪʀᴀʀ ᴇssᴇ... 🤷‍♂️*")
dataGp[0].prefixos.splice(dataGp[0].prefixos.indexOf(q.trim()), 1)
setGp(dataGp)
reply(`*ᴏ ᴘʀᴇғɪxᴏ『 ${q.trim()} 』ғᴏɪ ᴛɪʀᴀᴅᴏ ᴅᴀ ʟɪsᴛᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`)
break

case 'multiprefixo': case 'multiprefix':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
if(!isMultiP) {
dataGp[0].multiprefix = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴍᴜʟᴛɪ ᴘʀᴇғɪxᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
if(isMultiP) {
dataGp[0].multiprefix = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*')
}
break

case 'rmphotogp': case 'rmfotogroup':
if (!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
reply(`A foto do grupo foi removida com sucesso.`)
await tokito.removeProfilePicture(from)
break

case 'legendabv':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(args.length < 1) return reply('*ᴄᴀᴅᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ? 🤷‍♂️*')
teks = body.slice(11)
if(isWelkom) {
dataGp[0].wellcome[0].legendabv = teks
setGp(dataGp)
reply('*ʟᴇɢᴇɴᴅᴀ ᴅᴇ ʙᴏᴀs ᴠɪɴᴅᴀs ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*')
} else {
reply(`*ᴀᴛɪᴠᴇ ᴏ ${prefix}ʙᴇᴍᴠɪɴᴅᴏ 🤷‍♂️*`)
}
break

case 'legendabv2':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(args.length < 1) return reply('*ᴄᴀᴅᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ? 🤷‍♂️*')
teks = body.slice(12)
if(isWelkom2) {
dataGp[0].wellcome[1].legendabv2 = teks
setGp(dataGp)
reply('*ʟᴇɢᴇɴᴅᴀ ᴅᴇ ʙᴏᴀs ᴠɪɴᴅᴀs ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*')
} else {
reply(`*ᴀᴛɪᴠᴇ ᴏ ${prefix}ʙᴇᴍᴠɪɴᴅᴏ2 🤷‍♂️*`)
}
break

case 'legendasaiu':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(args.length < 1) return reply('*ᴄᴀᴅᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ? 🤷‍♂️*')
teks = body.slice(13)
if(isWelkom) {
dataGp[0].wellcome[0].legendasaiu = Number(teks) === 0 ? 0 : teks
setGp(dataGp)
reply('*ʟᴇɢᴇɴᴅᴀ ᴅᴇ sᴀɪᴅᴀ ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*')
} else {
reply(`*ᴀᴛɪᴠᴇ ᴏ ${prefix}ʙᴇᴍᴠɪɴᴅᴏ 🤷‍♂️*`)
}
break

case 'legendasaiu2':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(q.length < 1) return reply('*ᴄᴀᴅᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ? 🤷‍♂️*')
teks = body.slice(13)
if(isWelkom2) {
dataGp[0].wellcome[1].legendasaiu2 = Number(teks) === 0 ? 0 : teks
setGp(dataGp)
reply('*ʟᴇɢᴇɴᴅᴀ ᴅᴇ sᴀɪᴅᴀ ᴀᴛᴜᴀʟɪᴢᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*')
} else {
reply(`*ᴀᴛɪᴠᴇ ᴏ ${prefix}ʙᴇᴍᴠɪɴᴅᴏ2 🤷‍♂️*`)
}
break

case 'addautorm':
case 'addautoban':
case 'listanegra': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.botAdmin());
let numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ᴍᴇɴꜱᴀɢᴇᴍ ᴏᴜ ᴅɪɢɪᴛᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ᴀᴅɪᴄɪᴏɴᴀʀ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ 💁‍♂️*');
const jid = `${numero}@s.whatsapp.net`;
if (dataGp[0].listanegra.includes(jid))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ᴊᴀ́ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ*');
dataGp[0].listanegra.push(jid);
setGp(dataGp);
await tokito.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ᴅᴇ ᴀᴜᴛᴏʙᴀɴ ✅🙆‍♂️*`,
contextInfo:{...DLchanneldl, mentionedJid: [jid]}}, {quoted: selo}) 
break;
}

case 'autobang':
case 'listanegrag': {
if (!SoDono) return reply(mess.onlyOwner());
let numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ᴍᴀʀǫᴜᴇ ᴏᴜ ᴅɪɢɪᴛᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ᴀᴅɪᴄɪᴏɴᴀʀ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ 💁‍♂️*');
const jid = `${numero}@s.whatsapp.net`;
if (listanegraG.includes(jid))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ᴊᴀ́ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ*');
listanegraG.push(jid);
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json', JSON.stringify(nescessario, null, '\t'));
await tokito.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ᴀᴅɪᴄɪᴏɴᴀᴅᴏ ᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ ✅🙆‍♂️*`,
mentions: [jid]
}, { quoted: selo });
break;
}

case 'tirardalistag': {
if (!SoDono) return reply(mess.onlyOwner());
let numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ɪɴꜰᴏʀᴍᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ǫᴜᴇʀ ʀᴇᴍᴏᴠᴇʀ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ 💁‍♂️*');
const jid = `${numero}@s.whatsapp.net`;
if (!listanegraG.includes(jid))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ*');
listanegraG.splice(listanegraG.indexOf(jid), 1);
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json', JSON.stringify(nescessario, null, '\t'));
await tokito.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ ✅🙇‍♂️*`,
contextInfo:{...DLchanneldl, mentionedJid: [jid]}}, {quoted: selo}) 
break;
}

case 'delremover':
case 'delautorm':
case 'delautoban':
case 'tirardalista': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.botAdmin());
let numero = menc_os2 ? menc_os2.split('@')[0] : q ? q.replace(/\D/g, '') : '';
if (!numero) return reply('*💫 ɪɴꜰᴏʀᴍᴇ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴏ ɴᴜ́ᴍᴇʀᴏ ǫᴜᴇ ᴅᴇꜱᴇᴊᴀ ʀᴇᴍᴏᴠᴇʀ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ 💁‍♂️*');
const jid = `${numero}@s.whatsapp.net`;
if (!dataGp[0].listanegra.includes(jid))
return reply('*❌ ᴇꜱꜱᴇ ɴᴜ́ᴍᴇʀᴏ ɴᴀ̃ᴏ ᴇꜱᴛᴀ́ ɴᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ*');
dataGp[0].listanegra.splice(dataGp[0].listanegra.indexOf(jid), 1);
setGp(dataGp);
await tokito.sendMessage(from, {
text: `*@${numero} ꜰᴏɪ ʀᴇᴍᴏᴠɪᴅᴏ ᴅᴀ ʟɪꜱᴛᴀ ᴅᴇ ᴀᴜᴛᴏʙᴀɴ ✅🙇‍♂️*`,
contextInfo:{...DLchanneldl, mentionedJid: [jid]}}, {quoted: selo}) 
break;
}


case 'bang': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!SoDono) return reply(mess.onlyOwner());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!q || (q !== 'local' && q !== 'global')) {
return reply(`*ᴜsᴇ: ʙᴀɴɢ ʟᴏᴄᴀʟ* — ʙᴀɴ ᴅᴀ ʟɪsᴛᴀ ɴᴇɢʀᴀ ʟᴏᴄᴀʟ\n*ᴏᴜ: ʙᴀɴɢ ɢʟᴏʙᴀʟ* — ʙᴀɴ ᴅᴀ ʟɪsᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ`);
}
try {
const lista = q === 'local' ? dataGp[0].listanegra : listanegraG;
const numerosNegros = lista.map(n => n.replace(/[^0-9]/g, ''));
const banidos = [];
for (const membro of groupMembers) {
const membroNormalizado = normalizar(membro.id);
const numero = membroNormalizado.replace(/[^0-9]/g, '');
const isInLista = numerosNegros.includes(numero);
const isNotAdmin = !membro.admin;
const isNotBot = membroNormalizado !== normalizar(tokito.user.id);
if (isInLista && isNotAdmin && isNotBot) {
banidos.push(membroNormalizado);
}
}
if (banidos.length === 0) {
return reply(`*ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴇɪ ɴᴇɴʜᴜᴍ ᴍᴇᴍʙʀᴏ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ${q === 'local' ? 'ʟᴏᴄᴀʟ' : 'ɢʟᴏʙᴀʟ'} ɴᴇꜱᴛᴇ ɢʀᴜᴘᴏ 🤷‍♂️*`);
}
await tokito.groupParticipantsUpdate(from, banidos, 'remove');
reply(`*ʙᴀɴɪ ᴜᴍ ᴛᴏᴛᴀʟ ᴅᴇ ${banidos.length} ɪɴɪᴍɪɢᴏ(ꜱ) ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ ${q.toUpperCase()} 🙇‍♂️*`);

} catch (e) {
console.error(e);
reply('*ᴇʀʀᴏ ᴀᴏ ʙᴀɴɪʀ ᴏꜱ ɪɴɪᴍɪɢᴏꜱ ᴅᴀ ʟɪꜱᴛᴀ ɴᴇɢʀᴀ 🤷‍♂️*');
}
break;
}

case 'listbang': {
if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono) return reply(mess.onlyOwner());
if (!listanegraG || listanegraG.length < 1)
return reply('*ɴᴇɴʜᴜᴍ ɪɴɪᴍɪɢᴏ ꜰᴏɪ ᴍᴀʀᴄᴀᴅᴏ ᴀɪɴᴅᴀ... 🙆‍♂️*');
let resposta = '⛓️ *ʟɪsᴛᴀ ɴᴇɢʀᴀ ɢʟᴏʙᴀʟ*\n\n';
let infiltrados = '\n⚠️ *ɪɴꜰɪʟᴛʀᴀᴅᴏꜱ ᴀǫᴜɪ ɴᴏ ɢʀᴜᴘᴏ*\n';
let mencGlobal = [];
let achados = 0;
for (let [index, jid] of listanegraG.entries()) {
const jidNorm = normalizar(jid);
const membro = groupMembers.find(m => normalizar(m.id) === jidNorm);
const numero = jidNorm.replace(/[^0-9]/g, '');
const nome = `@${numero}`;
resposta += `*${index + 1}.* ${nome}\n`;
mencGlobal.push(jidNorm);
if (membro) {
achados++;
infiltrados += `✦ ${nome} — *ᴀǫᴜɪ ᴅᴇɴᴛʀᴏ... ᴍᴀʀᴄᴀɴᴅᴏ ᴛᴇʀʀɪᴛᴏ́ʀɪᴏ ᴇʀʀᴀᴅᴏ. 💁‍♂️*\n`;
}
}
resposta += achados > 0
? infiltrados
: '\n*ɴᴇɴʜᴜᴍ ᴅᴏꜱ ᴍᴀʀᴄᴀᴅᴏꜱ ᴇꜱᴛᴀ́ ɴᴇꜱᴛᴇ ɢʀᴜᴘᴏ... ᴀɪɴᴅᴀ. 🤷‍♂️*';
resposta += '\n\n*ᴏ ᴍᴀʀᴛᴇʟᴏ ᴅᴏ ʙᴀɴ ᴇꜱᴛᴀ́ ᴘʀᴇᴘᴀʀᴀᴅᴏ 🙇‍♂️*';
await tokito.sendMessage(from, {
text: resposta,
contextInfo:{...DLchanneldl, mentionedJid: mencGlobal}}, {quoted: selo}) 
break;
}

case 'listban': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
const lista = dataGp[0].listanegra;
if (!lista || lista.length < 1)
return reply('*ɴᴇɴʜᴜᴍ ɪɴɪᴍɪɢᴏ ꜰᴏɪ ᴍᴀʀᴄᴀᴅᴏ ᴀɪɴᴅᴀ... 🙆‍♂️*');
let resposta = '⛓️ *ʟɪsᴛᴀ ɴᴇɢʀᴀ ʟᴏᴄᴀʟ*\n\n';
let infiltrados = '\n⚠️ *ɪɴꜰɪʟᴛʀᴀᴅᴏꜱ ᴀǫᴜɪ ɴᴏ ɢʀᴜᴘᴏ*\n';
let mencLocal = [];
let achados = 0;
for (let [index, jid] of lista.entries()) {
const jidNorm = normalizar(jid);
const numero = jidNorm.replace(/[^0-9]/g, '');
const tag = `@${numero}`;
resposta += `*${index + 1}.* ${tag}\n`;
mencLocal.push(jidNorm);
const membro = groupMembers.find(m => normalizar(m.id) === jidNorm);
if (membro) {
achados++;
infiltrados += `✦ ${tag} — *sᴇ ᴍᴇᴛᴇɴᴅᴏ ᴏɴᴅᴇ ɴᴀ̃ᴏ ꜰᴏɪ ᴄʜᴀᴍᴀᴅᴏ... 💁‍♂️*\n`;
}
}
resposta += achados > 0
? infiltrados
: '\n*ɴᴇɴʜᴜᴍ ᴅᴏꜱ ᴍᴀʀᴄᴀᴅᴏꜱ ᴇꜱᴛᴀ́ ɴᴇꜱᴛᴇ ɢʀᴜᴘᴏ... ᴘᴏʀᴇ́ᴍ ᴘᴏʀ ᴇɴǫᴜᴀɴᴛᴏ. 🤷‍♂️*';
resposta += '\n\n*ᴏ ᴍᴀʀᴛᴇʟᴏ ᴅᴏ ʙᴀɴ ᴇꜱᴛᴀ́ ᴘʀᴇᴘᴀʀᴀᴅᴏ 🙇‍♂️*';
await tokito.sendMessage(from, {
text: resposta,
contextInfo:{...DLchanneldl, mentionedJid: mencGlobal}}, {quoted: selo}) 
break;
}


case 'mute': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!menc_os2) return reply(`*🎯 ᴍᴇɴᴄɪᴏɴᴇ ǫᴜᴇᴍ ǫᴜᴇʀ ᴘᴜɴɪʀ*`);

if (menc_os2 == botNumberLID) return reply(`*ɴᴀᴏ ᴘᴏssᴏ ᴍᴜᴛᴀʀ ᴏ ʙᴏᴛ 😵*`);
if (menc_os2 == nmrdn) return reply(`*ɴᴀᴏ ᴏᴜsᴇ ᴛᴏᴄᴀʀ ɴᴏ ᴍᴇᴜ ᴅᴏɴᴏ 💢*`);
if (vip.map(i => i.id).includes(menc_os2)) return reply(`*ɴᴀᴏ ᴍᴇxᴀ ᴄᴏᴍ ǫᴜᴇᴍ ᴇ ᴠɪᴘ 😎*`);
if (groupAdmins.includes(menc_os2)) return reply(`*ɴᴀᴏ ᴘᴏᴅᴇ ᴍᴜᴛᴀʀ ᴜᴍ ᴀᴅᴍɪɴ*`);

const tipo = q.toLowerCase().includes("silenciar") ? "silenciar" : "mutar";

if (tipo === "silenciar") {
if (grupoMute.silenciados.includes(menc_os2))
return mention(`*ᴏ @${menc_os2.split('@')[0]} ᴊᴀ ᴇsᴛᴀ sɪʟᴇɴᴄɪᴀᴅᴏ*`);

grupoMute.silenciados.push(menc_os2);
fs.writeFileSync("./DADOS_TOKITO/grupos/muted.json", JSON.stringify(muted, null, 2));
mention(`*ᴏ @${menc_os2.split('@')[0]} ꜰᴏɪ sɪʟᴇɴᴄɪᴀᴅᴏ ᴘᴏʀ @${sender.split('@')[0]} 🔇*`);
}

if (tipo === "mutar") {
if (grupoMute.mutados.includes(menc_os2))
return mention(`ᴏ @${menc_os2.split('@')[0]} ᴊᴀ ᴇsᴛᴀ ᴍᴜᴛᴀᴅᴏ`);

grupoMute.mutados.push(menc_os2);
fs.writeFileSync("./DADOS_TOKITO/grupos/muted.json", JSON.stringify(muted, null, 2));
mention(`*ᴏ @${menc_os2.split('@')[0]} ꜰᴏɪ ᴍᴜᴛᴀᴅᴏ ᴘᴏʀ @${sender.split('@')[0]} 🚫*`);
}
}
break;

case 'desmute': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!menc_os2) return reply(`*🎯 ᴍᴇɴᴄɪᴏɴᴇ ǫᴜᴇᴍ ǫᴜᴇʀ ᴅᴇsᴍᴜᴛᴀʀ*`);

if (!grupoMute.silenciados.includes(menc_os2) && !grupoMute.mutados.includes(menc_os2))
return mention(`*ᴏ @${menc_os2.split('@')[0]} ɴᴀᴏ ᴇsᴛᴀ ᴘᴜɴɪᴅᴏ*`);

grupoMute.silenciados = grupoMute.silenciados.filter(id => id !== menc_os2);
grupoMute.mutados = grupoMute.mutados.filter(id => id !== menc_os2);
fs.writeFileSync("./DADOS_TOKITO/grupos/muted.json", JSON.stringify(muted, null, 2));
mention(`*ᴏ @${menc_os2.split('@')[0]} ꜰᴏɪ ʟɪʙᴇʀᴀᴅᴏ ᴘᴏʀ @${sender.split('@')[0]} 🙆‍♂️*`);
}
break;

//===========[ FIM CMD DONO/ADM'S ]=============\\

//=============[ ATIVACOES ]=========\\
case 'ativic':
try {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

const todosAtivos = dataGp[0].jogos && 
dataGp[0]['antilink'] && 
dataGp[0]['antilinkhard'] && 
dataGp[0].wellcome[1].bemvindo2 && 
dataGp[0].x9 && 
dataGp[0].antifake &&
dataGp[0].antilinkgp;

if (todosAtivos) {
dataGp[0].jogos = false;
dataGp[0]['antilink'] = false;
dataGp[0]['antilinkhard'] = false;
dataGp[0].wellcome[1].bemvindo2 = false;
dataGp[0].x9 = false;
dataGp[0].antifake = false;
dataGp[0].antilinkgp = false;
setGp(dataGp);
reply('*ᴛᴏᴅᴏs ᴏs ᴄᴏᴍᴀɴᴅᴏs ɴᴇsᴄᴇssᴀʀɪᴏ ғᴏʀᴀᴍ ᴅᴇsᴀᴛɪᴠᴀᴅᴏs 🙅‍♂️*');
} else {
dataGp[0].jogos = true;
dataGp[0]['antilink'] = true;
dataGp[0]['antilinkhard'] = true;
dataGp[0].wellcome[1].bemvindo2 = true;
dataGp[0].x9 = true;
dataGp[0].antifake = true;
dataGp[0].antilinkgp = true;
setGp(dataGp);
reply('*ᴛᴏᴅᴏs ᴏs ᴄᴏᴍᴀɴᴅᴏs ɴᴇsᴄᴇssᴀʀɪᴏ ғᴏʀᴀᴍ ᴀᴛɪᴠᴀᴅᴏs 🙇‍♂️*');
}
} catch (error) {
console.error(error);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ ᴀᴏ ᴇғᴇᴛᴜᴀʀ ᴏ ᴄᴏᴍᴀɴᴅᴏ ⚠*');
}
break;

case 'boton':
case 'botoff':
if (!SoDono) return reply(mess.onlyOwner())
if (!isBotoff) {
nescessario.botoff = true;
setNes(nescessario);
reply(
"*ᴏ ʙᴏᴛ ꜰᴏɪ ᴅᴇsʟɪɢᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴘʀᴀ ᴜsᴏ ᴅᴇ ᴍᴇᴍʙʀᴏs ᴇ ᴀᴅᴍs ᴅᴇ ɢʀᴜᴘᴏs 🙇🏻‍♂️*"
);
} else if (isBotoff) {
nescessario.botoff = false;
setNes(nescessario);
reply(`*ᴀᴛɪᴠᴀɴᴅᴏ ᴛᴏᴅᴏs ᴏs ꜰᴜɴᴄɪᴏɴᴀᴍᴇɴᴛᴏs ᴅᴏ ʙᴏᴛ ɴᴏᴠᴀᴍᴇɴᴛᴇ 🙇🏻‍♂️*`);
}
break;

case 'limitecaracteres':
case 'limiteflood':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (isAntiFlood) {
dataGp[0].limitec.active = false;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].limitec.active = true;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ʟɪᴍɪᴛᴇ ғʟᴏᴏᴅ ғᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴇssᴇ ɢʀᴜᴘᴏ 🙇‍♂️*');
}
break;

case 'modocoins':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (isModoCoins) {
dataGp[0].isModoCoins = false;
setGp(dataGp);
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*`);
} else {
dataGp[0].isModoCoins = true;
setGp(dataGp);
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ N-ᴄᴏɪɴs ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴇssᴇ ɢʀᴜᴘᴏ 🙇‍♂️*`);
}
break;

case 'antistatus': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const statusAtual = dataGp[0].antistatus === true
if (statusAtual) {
dataGp[0].antistatus = false
setGp(dataGp)
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*`);
} else {
dataGp[0].antistatus = true
setGp(dataGp)
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪꜱᴛᴀᴛᴜꜱ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴇssᴇ ɢʀᴜᴘᴏ 🙇‍♂️*`);
}
break
}


case 'antiligar':
case 'antiligacao':
case 'antiligação':
if(!SoDono) return reply(mess.onlyOwner())
if(!isAnticall) {
nescessario.anticall = true
setNes(nescessario)
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ʟɪɢᴀʀ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`)
} else if(isAnticall) {
nescessario.anticall = false
setNes(nescessario)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break

case 'simih':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (isSimi) {
dataGp[0].simi1 = false; // Desativa o modo simi
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].simi1 = true; // Ativa o modo simi
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴍᴏᴅᴏ sɪᴍɪʜ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*');
}
break;

case 'verificado-global':
case 'verificado':
try {
if(!SoDono) return reply(mess.onlyOwner())

	if (!nescessario.verificado) {

		nescessario.verificado = true;

		fs.writeFileSync(`./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json`, JSON.stringify(nescessario, null, 2) + "\n");

		reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ᴠᴇʀɪғɪᴄᴀᴅᴏ ɢʟᴏʙᴀʟ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`)
	} else if (nescessario.verificado) {

		nescessario.verificado = false

		fs.writeFileSync(`./DADOS_TOKITO/INFO_TOKITO/media/nescessario.json`, JSON.stringify(nescessario, null, 2) + "\n");

		reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*`)
	}
} catch (e) {
	console.error(e);
	reply("Houve um erro no comando!");
}
break;

case 'console': 
if(!SoDono) return reply(mess.onlyOwner())
if(!isConsole) {
obrigadoEXT.consoleoff = true
setObg(obrigadoEXT)
reply(`*ᴍᴏᴅᴏ ᴄᴏɴsᴏʟᴇ ᴀᴛɪᴠᴏ, ᴀɢᴏʀᴀ ɪʀᴇɪ ᴄᴏɴsᴇɢᴜɪʀ ᴠᴇʀ ᴛᴏᴅᴏ ᴛɪᴘᴏ ᴅᴇ ᴍᴇɴsᴀɢᴇᴍ 🙇‍♂️*`) 
} else if(isConsole) {
obrigadoEXT.consoleoff = false
setObg(obrigadoEXT)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*');
}
break

case 'audio-menu': 
if(!SoDono) return reply(mess.onlyOwner())
if(!isAudioMenu) {
obrigadoEXT.menu_audio = true
setObg(obrigadoEXT)
reply(`*ᴄᴇʀᴛᴏ ᴍᴇꜱᴛʀᴇ ᴀᴄᴀʙᴇɪ ᴅᴇ ᴀᴛɪᴠᴀʀ ᴏ ᴀᴜᴅɪᴏ-ᴍᴇɴᴜ 🙇‍♂️*`)
} else if(isAudioMenu) {
obrigadoEXT.menu_audio = false
setObg(obrigadoEXT)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*');
}
break

case 'antipv':
if(!SoDono) return reply(mess.onlyOwner())
if(!isAntiPv) {
nescessario.antipv = true
setNes(nescessario)
reply(`*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪᴘᴠ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`)
} else if(isAntiPv) {
nescessario.antipv = false
setNes(nescessario)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*');
}
break

case 'antipv2':
if(!SoDono) return reply(mess.onlyOwner())
if(!isAntiPv2) {
nescessario.antipv2 = true
setNes(nescessario)
reply("*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪᴘᴠ2 ғᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*")
} else if(isAntiPv2) {
nescessario.antipv2 = false
setNes(nescessario)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*');
}
break

case 'antipv3':
if(!SoDono) return reply(mess.onlyOwner())
if(!isAntiPv3) {
nescessario.antipv3 = true
setNes(nescessario)
reply("*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪᴘᴠ3 ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*")
} else if(isAntiPv3) {
nescessario.antipv3 = false
setNes(nescessario)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*');
}
break

case 'visualizarmsg':
if(!SoDono) return reply(mess.onlyOwner())
if(!isVisualizar) {
nescessario.visualizarmsg = true
setNes(nescessario)
reply("*ᴏ ʀᴇᴄᴜʀsᴏ ᴅᴇ ᴠɪᴢᴜᴀʟɪᴢᴀʀ ᴍsɢ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*")
} else if(isVisualizar) {
nescessario.visualizarmsg = false
setNes(nescessario)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙅‍♂️*');
}
break

case 'antipalavrão':
case 'antipalavrao':
case 'antipalavra':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alterna o estado do recurso de anti palavrão
if (isPalavrao) {
dataGp[0].antipalavrao.active = !dataGp[0].antipalavrao.active; // Inverte o estado atual
setGp(dataGp);
if (dataGp[0].antipalavrao.active) {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ᴘᴀʟᴀᴠʀᴀᴏ ғᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴠʟᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
} else {
dataGp[0].antipalavrao.active = true; // Se ainda não tiver configurado, ativa por padrão
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ᴘᴀʟᴀᴠʀᴀᴏ ғᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴠʟᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
}

break;

case 'antinotas':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de antnotas
dataGp[0].antinotas = !dataGp[0].antinotas;
setGp(dataGp);

if (dataGp[0].antinotas) {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪɴᴏᴛᴀs ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;
 
case 'modobn':case 'modobrincadeira': case 'modobrincadeiras':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(isModobn) {
dataGp[0].jogos = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].jogos = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴍᴏᴅᴏ ʙʀɪɴᴄᴀᴅᴇɪʀᴀ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
break

case 'autorepo':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(isAutorepo) {
dataGp[0].autoresposta = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].autoresposta = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀᴜᴛᴏʀᴇᴘᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
break

case 'autototext':
if(!isGroup) return reply(mess.onlyGroup());
if(!SoDono) return reply(mess.onlyOwner());
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if(istokitoEscuta) {
dataGp[0].tokitoescutando = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].tokitoescutando = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀꜱᴏ ᴅᴇ ʟᴇʀ ᴏꜱ ᴀᴜᴅɪᴏꜱ ᴇ ᴛʀᴀɴꜱᴄʀᴇᴠᴇʀ ᴩʀᴀ ᴛᴇxᴛᴏ ꜰᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
break

case 'auroraia':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (dataGp[0].auroraia) {
dataGp[0].auroraia = false;
setGp(dataGp);

reply(
`*🧊 • ʀᴇᴄᴜʀsᴏ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ*
🤖 • ᴛᴏᴋɪᴛᴏ ɪᴀ ꜰᴏɪ ᴅᴇsʟɪɢᴀᴅᴀ ɴᴏ ɢʀᴜᴘᴏ`
);
} else {
dataGp[0].auroraia = true;
setGp(dataGp);

reply(
`*🧊 • ʀᴇᴄᴜʀsᴏ ᴀᴛɪᴠᴀᴅᴏ*
🤖 • ᴛᴏᴋɪᴛᴏ ɪᴀ ꜰᴏɪ ʟɪɢᴀᴅᴀ ɴᴏ ɢʀᴜᴘᴏ`
);
}
break;

case 'autodown':
if(!isGroup) return reply(mess.onlyGroup());
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if(isAutodown) {
dataGp[0].autodown = false
setGp(dataGp)
reply('*🧊 • ʀᴇᴄᴜʀsᴏ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ*\n📵 • ᴀᴜᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴇsʟɪɢᴀᴅᴏ ɴᴏ ɢʀᴜᴘᴏ*');
} else {
dataGp[0].autodown = true
setGp(dataGp)
reply('*🧊 • ʀᴇᴄᴜʀsᴏ ᴀᴛɪᴠᴀᴅᴏ*\n📥 • ᴀᴜᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɢᴀᴅᴏ ɴᴏ ɢʀᴜᴘᴏ')
}
break

case 'autofigu': case 'autosticker':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(isAutofigu) {
dataGp[0].autosticker = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].autosticker = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀᴜᴛᴏғɪɢᴜʀɪɴʜᴀs ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*')
}
break

case 'bangp':
case 'unbangp':
if(!isGroup) return reply(mess.onlyGroup())
if(!SoDono) return reply(mess.onlyOwner())
if(command == 'bangp'){
if(isBanchat) return reply(`*ᴏ ɢʀᴜᴘᴏ ᴊᴀ ᴇsᴛᴀ ʙᴀɴɪᴅᴏ sᴇɴʜᴏʀ(ᴀ) 🤷‍♂️*`)
dataGp[0].bangp = true
setGp(dataGp)
reply(`*ᴏ ɢʀᴜᴘᴏ ғᴏɪ ʙᴀɴɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ, ᴀɢᴏʀᴀ ɴɪɴɢᴜᴇᴍ ᴘᴏᴅᴇʀᴀ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs 🙇‍♂️*`)
} else {
if(!isBanchat) return reply(`*ᴇsᴛᴇ ɢʀᴜᴘᴏ ᴊᴀ ᴇsᴛᴀ ᴅᴇsʙᴀɴɪᴅᴏ sᴇɴʜᴏʀ(ᴀ) 🤷‍♂️*`)
dataGp[0].bangp = false
setGp(dataGp)
reply(`*ᴏ ɢʀᴜᴘᴏ ғᴏɪ ᴅᴇsʙᴀɴɪᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ), ᴀɢᴏʀᴀ ᴛᴏᴅᴏs ᴅᴇssᴇ ɢʀᴜᴘᴏ ᴘᴏᴅᴇ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴏs 🙇‍♂️*`)
}
break

case 'gppv':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
reply(`*ᴊᴀ ᴇsᴛᴏᴜ ᴇɴᴠɪᴀɴᴅᴏ ᴏ ʟɪɴᴋ ɴᴏ sᴇᴜ ᴘᴠ ${isCargo} 🙅‍♂️*`)
 linkgc = await tokito.groupInviteCode(from)
tokito.sendMessage(sender, { text: 'https://chat.whatsapp.com/' + linkgc}, {quoted: selo})
 break

case 'antilinkgp':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())

// Verifica o estado atual do antilink
if(isAntilinkgp) {
// Se já estiver ativado, desativa
dataGp[0].antilinkgp = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
// Se estiver desativado, ativa
dataGp[0].antilinkgp = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪʟɪɴᴋ ғᴏɪ ᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
break

case 'antidocumento':
case 'antidoc':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alterna automaticamente o estado do antidoc
if (dataGp[0].antidoc) {
dataGp[0].antidoc = false;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].antidoc = true;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪᴅᴏᴄᴜᴍᴇɴᴛᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
}
break;

case 'antictt':
case 'anticontato':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alterna automaticamente o estado do antictt
if (dataGp[0].antictt) {
dataGp[0].antictt = false;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].antictt = true;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ᴄᴏɴᴛᴀᴛᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
}
break;

case 'antiddd':
case 'anti_ddd':
case 'anti-ddd':
if (!isGroup) return await reply(mess.onlyGroup());
if (!isGroupAdmins) return await reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return await reply(mess.onlyBotAdmin());

// Alterna automaticamente o estado do antiDDD
if (dataGp[0].ANTI_DDD.active) {
dataGp[0].ANTI_DDD.active = false;
setGp(dataGp);
await reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].ANTI_DDD.active = true;
setGp(dataGp);
await reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪᴅᴅᴅ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
}
break;

case 'antiloc':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(isAntiLoc) {
dataGp[0].antiloc = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].antiloc = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ʟᴏᴄᴀʟɪᴢᴀᴄᴀᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*')
}
break

case 'antiporn':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(isAntiPorn) {
dataGp[0].antiporn = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].antiporn = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪᴘᴏʀɴᴏɢʀᴀғɪᴀ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
break

case 'antifake':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins())
if(isAntifake) {
dataGp[0].antifake = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].antifake = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪғᴀᴋᴇ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
break

case 'anticatalogo':
case 'anticatalg':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (isAnticatalogo) {
dataGp[0].anticatalogo = false;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].anticatalogo = true;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪᴄᴀᴛᴀʟᴀɢᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*');
}
break;

case 'bemvindo':
case 'welcome':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

if (isWelkom) {
dataGp[0].wellcome[0].bemvindo1 = false;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].wellcome[0].bemvindo1 = true;
setGp(dataGp);
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ʙᴇᴍᴠɪɴᴅᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*');
} 
break;
 
case 'fundobv':
case 'fundobemvindo': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const path = `./DADOS_TOKITO/grupos/ATIVAÇÕES-TOKITO/${from}.json`;
const jsonGp = JSON.parse(fs.readFileSync(path));
const arg = (q || args[0] || '').trim();
if (!isWelkom) {return reply(`*ᴀᴛɪᴠᴇ ᴏ ${prefix}ʙᴇᴍᴠɪɴᴅᴏ ᴘᴀʀᴀ ᴜsᴀʀ ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ 🤷‍♂️*`);}
const msg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage || info.message || {};
const v = msg.videoMessage || msg.viewOnceMessage?.message?.videoMessage || msg.viewOnceMessageV2?.message?.videoMessage;
const i = msg.imageMessage || msg.viewOnceMessage?.message?.imageMessage || msg.viewOnceMessageV2?.message?.imageMessage;
const salvar = (link) => { if (!jsonGp[0].wellcome) jsonGp[0].wellcome = [{}]; jsonGp[0].wellcome[0].fundobv = link; fs.writeFileSync(path, JSON.stringify(jsonGp, null, 2));
reagir(from, "✅");
reply('*ғᴜɴᴅᴏ ᴅᴇ ʙᴏᴀs-ᴠɪɴᴅᴀs ᴀᴛᴜᴀʟɪᴢᴀᴅᴏ 🙆‍♂️*');};
if (arg === '0') {salvar(null); return reply('*ғᴜɴᴅᴏ ᴅᴇ ʙᴏᴀs-ᴠɪɴᴅᴀs ʀᴇᴍᴏᴠɪᴅᴏ 💁‍♂️*');}
if (v) {reagir(from, "⏳"); return salvar(await upload(await getFileBuffer(v, 'video')));}
if (i) {reagir(from, "⏳"); return salvar(await upload(await getFileBuffer(i, 'image')));}
reply('*ᴍᴀɴᴅᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴏᴜ ᴠɪ́ᴅᴇᴏ ᴘᴀʀᴀ ᴀᴛᴜᴀʟɪᴢᴀʀ ᴏ ғᴜɴᴅᴏ 🙇‍♂️*');
}
break;

case 'antiaudio':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())
if(isAntiAudio) {
dataGp[0].antiaudio = false
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
} else {
dataGp[0].antiaudio = true
setGp(dataGp)
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ᴀᴜᴅɪᴏ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*')
}
break

case 'antisticker':
if(!isGroup) return reply(mess.onlyGroup())
if(!isGroupAdmins) return reply(mess.onlyAdmins())
if(!isBotGroupAdmins) return reply(mess.onlyBotAdmin())

// Alternar o estado de antisticker
dataGp[0].antisticker = !dataGp[0].antisticker;
setGp(dataGp);

if(dataGp[0].antisticker) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ sᴄᴛɪᴄᴋᴇʀ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;


case 'antiimg':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de antiimagem
dataGp[0].antiimg = !dataGp[0].antiimg;
setGp(dataGp);

if (dataGp[0].antiimg) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ɪᴍᴀɢᴇᴍ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;

case 'antivideo':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de antivídeo
dataGp[0].antivideo = !dataGp[0].antivideo;
setGp(dataGp);

if (dataGp[0].antivideo) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪ ᴠɪᴅᴇᴏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;

case 'x9adm':
case 'x9':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de x9
dataGp[0].x9 = !dataGp[0].x9;
setGp(dataGp);

if (dataGp[0].x9) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ᴄᴏᴍᴀɴᴅᴏ x9 ᴀᴅɪᴍɪɴ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;

case 'antilink':
case 'antilinkhard':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de antilink e antilinkhard
dataGp[0]['antilink'] = !dataGp[0]['antilink'];
dataGp[0]['antilinkhard'] = dataGp[0]['antilink']; // Sincroniza antilinkhard com antilink
setGp(dataGp);

if (dataGp[0]['antilink']) {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪʟɪɴᴋʜᴀʀᴅ ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ᴀɴᴛɪʟɪɴᴋʜᴀʀᴅ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;


case 'bemvindo2':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de bemvindo2
dataGp[0].wellcome[1].bemvindo2 = !dataGp[0].wellcome[1].bemvindo2;
setGp(dataGp);

if (dataGp[0].wellcome[1].bemvindo2) {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ʙᴇᴍᴠɪɴᴅᴏ2 ғᴏɪ ᴀᴛɪᴠᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;

case 'x9visuunica':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de x9visuunica
dataGp[0].X9VisuUnica = !dataGp[0].X9VisuUnica;
setGp(dataGp);

if (dataGp[0].X9VisuUnica) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ʀᴇᴄᴜʀsᴏ x9ᴠɪᴢᴜᴜɴɪᴄᴀ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;

case 'so_adm':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());

// Alternar o estado de so_adm
dataGp[0].soadm = !dataGp[0].soadm;
setGp(dataGp);

if (dataGp[0].soadm) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ʀᴇᴄᴜʀsᴏ sᴏ ᴀᴅᴍ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break;

case 'odelete':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
nescessario.Odelete = !nescessario.Odelete;
setNes(nescessario);
if (nescessario.Odelete) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ʀᴇᴄᴜʀsᴏ ᴏᴅᴇʟᴇᴛᴇ ɴᴏs ɢʀᴜᴘᴏs 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏs ɢʀᴜᴘᴏs 🙅‍♂️*');
}
break;

case 'antilinkeasy':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotGroupAdmins());

// Alternar o estado de antilinkeasy
dataGp[0].antilinkeasy = !dataGp[0].antilinkeasy;
setGp(dataGp);

if (dataGp[0].antilinkeasy) {
reply('*ᴀᴛɪᴠᴏᴜ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴏ ᴀɴᴛɪʟɪɴᴋᴇᴀsʏ ɴᴏ ɢʀᴜᴘᴏ 🙇‍♂️*');
} else {
reply('*ᴏ ʀᴇᴄᴜʀsᴏ ғᴏɪ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ ɴᴏ ɢʀᴜᴘᴏ 🙅‍♂️*');
}
break; 

case 'anti-sp':
case 'antisp':
case 'anti_sp': // YoshGGx
try {
	if (!isGroup) return reply("Comando apenas grupo!!");
	if (!SoDono && !info.key.fromMe) return reply("*Você não tem permissão de usar este comando!!!* 😠");
	if (!isBotGroupAdmins) return reply("O bot prescisa ser *Administrador* do grupo para executar este comando");
	
	if (ANT_SP.groupId === from && ANT_SP.active) {
		ANT_SP.active = false;
		fs.writeFileSync(directory, JSON.stringify(ANT_SP, null, 2));
		reply(`*ᴀɴᴛɪsᴘ ᴅᴇsᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`);
	}
	else {
		ANT_SP.active = true;
		ANT_SP.groupId = from;
		ANT_SP.groupName = groupName;
		fs.writeFileSync(directory, JSON.stringify(ANT_SP, null, 2));
		await reply(
			`*ᴅᴇᴛᴇᴄᴛᴏʀ ᴅᴇ ʟɪɴᴋs ɢʟᴏʙᴀʟ ᴀᴛɪᴠᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*`
			);
	}
} catch (error) {
	console.error(error);
	reply("Houve um erro inesperado!! ⚠️");
}
break;

//===============[ FIM DAS ATIVACOES ]============\\

//============[ RANDOM CMD ]=============\\

case 'anotar':
case 'tirar_nota':
case 'rmnota':
if(!isGroup) return reply(`Só em grupo pode utilizar este comando.`)
if(!isGroupAdmins) return reply(`Só adm pode utilizar este tipo de comando.`)
if(command == "anotar") {
var [q5, q10] = q.trim().split("|")
if(!q5 || !q10 || !q.includes("|")) return reply(`Digite o título da anotação e o texto que deseja anotar..\nExemplo: ${prefix}anotar Cachorro|Cachorros são bom pra comer na Venezuela...`)
if(JSON.stringify(anotar).includes(from)) {
var i2 = anotar.map(i => i.grupo).indexOf(from)
if(JSON.stringify(anotar[i2].puxar).includes(q5)) {
var i3 = anotar[i2].puxar.map(i => i.nota).indexOf(q5)
if(anotar[i2].puxar[i3].nota == q5) return reply(`Esta anotação já está inclusa, utilize outro título.. Ou você pode tirar com\n${prefix}tirar_nota ${q5}`)
}
}
if(!JSON.stringify(anotar).includes(from)) {
anotar.push({grupo: from, puxar: [{nota: q5, anotacao: q10}]})
fs.writeFileSync("./DADOS_TOKITO/func/anotar.json", JSON.stringify(anotar))
reply("Anotação registrada com sucesso...")
} else {
anotar[i2].puxar.push({nota: q5, anotacao: q10})
fs.writeFileSync("./DADOS_TOKITO/func/anotar.json", JSON.stringify(anotar))
reply("Anotação registrada com sucesso...")
}
} else {
if(!q) return reply("Digite qual anotação deseja tirar pelo título..")
if(JSON.stringify(anotar).includes(from)) {
var i2 = anotar.map(i => i.grupo).indexOf(from)
if(JSON.stringify(anotar[i2].puxar).includes(q)) {
var i3 = anotar[i2].puxar.map(i => i.nota).indexOf(q)
}
}
if(0 > anotar[i2].puxar.map(i => i.nota).indexOf(q)) return reply("Esta nota não está inclusa, verifique com atenção...")
anotar[i2].puxar.splice(i3, 1)
fs.writeFileSync("./DADOS_TOKITO/func/anotar.json", JSON.stringify(anotar))
reply(`Anotação ${q} tirada com sucesso...`)
}
break

case 'anotacao':
case 'anotacoes':
case 'nota':
case 'notas':
if(!isGroup) return reply(`Só em grupo pode utilizar este comando.`)
if(command == "anotacao" || command == "nota") {
if(!q) return reply("Digite o título da anotação que deseja puxar..")
if(!JSON.stringify(anotar).includes(from)) return reply("Este grupo não tem nenhuma anotação...")
var i2 = anotar.map(i => i.grupo).indexOf(from)
if(!JSON.stringify(anotar[i2].puxar).includes(q)) return reply("Não contém nenhuma anotação com este título.")
var i3 = anotar[i2].puxar.map(i => i.nota).indexOf(q)
mentions(`〈 ${anotar[i2].puxar[i3].anotacao} 〉`)
} else {
var i2 = anotar.map(i => i.grupo).indexOf(from)
if(anotar[i2].puxar.length == 0) return reply("Este grupo não tem nenhuma anotação...")
var i2 = anotar.map(i => i.grupo).indexOf(from) 
var antr = anotar[i2].puxar 
txtin = `Aqui está todas as anotações registradas em minha DADOS_TOKITO do grupo: *[ ${groupName} ]*\n`
for ( i = 0; i < antr.length; i++) {
txtin += `\n↝ Anotação: ⟮ ${anotar[i2].puxar[i].nota} ⟯ - 〈 ${anotar[i2].puxar[i].anotacao} 〉\n`
}
txtin += ""
reply(txtin)
}
break

case 'download-link':
if(q.includes("video") || q.includes("mp4")) {
await tokito.sendMessage(from, {video: {url: q}, mimetype: 'video/mp4'}, {quoted: selo}).catch(async(e) => {
reply("Erro, visualize se este link é válido...")
})
} else if(q.includes("webp") || q.includes("jpg")) {
await tokito.sendMessage(from, {image: {url: q}}, {quoted: selo}).catch(async(e) => {
reply("Erro, visualize se este link é válido...")
})
}
break

case 'criador':
await reagir(from, "🌪️")
try {
const thumbnail = await getBuffer(criador);
if (!thumbnail) throw new Error("Thumbnail não carregado");
await tokito.sendMessage(from, {
image: thumbnail,
caption: `— *✨ ᴄᴏɴᴛᴀᴛᴏ ᴅᴏ ᴅᴇsᴇɴᴠᴏʟᴠᴇᴅᴏʀ*\n> \`https://wa.me/${ownerNumber}\`\n•\n— "ᴇ sᴇ ᴛᴜᴅᴏ ᴀᴄᴀʙᴀssᴇ ᴀɢᴏʀᴀ? ᴏ ǫᴜᴇ ᴠᴏᴄê ғᴀʀɪᴀ?"\n•\n- *${NomeDoBot} — ᴜᴍ ʙᴏᴛ ᴄʀɪᴀᴅᴏ ᴘᴀʀᴀ ᴇɴᴛʀᴇɢᴀʀ ʀᴀᴘɪᴅᴇᴢ, ᴅᴇsᴇᴍᴘᴇɴʜᴏ ᴇ ᴄᴏɴғɪᴀʙɪʟɪᴅᴀᴅᴇ. ᴇsᴘᴇʀᴏ ǫᴜᴇ ᴠᴏᴄê ɢᴏsᴛᴇ ᴅᴏ ᴍᴇᴜ ᴛʀᴀʙᴀʟʜᴏ. 🥇*\n•\n> ${NomeDoBot}`,
contextInfo: DLchanneldl
}, { quoted: selo });
} catch (e) {
console.error(e);
await tokito.sendMessage(from, { text: mess.error() }, { quoted: selo });
}
break;

case 'correio':
if(!q.trim().includes("/")) return reply(`Exemplo: ${prefix}correio 5591.../Oi Amor, sdds`)
var [ tx1, tx2 ] = q.trim().split("/")
bla = mess.anonymousMail(tx2)
tokito.sendMessage(`${tx1}@s.whatsapp.net`, {text: bla})
reply(`*✰ ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴠɪᴀᴅᴀ ᴘᴀʀᴀ ${tx1} ★*`)
break

case 'destrava':
await tokito.sendMessage(from, {text: destrava(prefix)}, {quoted: selo})
break 

case 'perfil': {
if (!isGroup) return reply(mess.only.group);
try {
// Reagir ao comando
await tokito.sendMessage(from, { react: { text: "❤️‍🔥", key: info.key } });

const user = pushname || sender_ou_n?.split("@")[0];

// Obter imagem de perfil do usuário
let perfil = await tokito.profilePictureUrl(sender_ou_n, 'image').catch(_ => "https://files.catbox.moe/yet8m8.jpg");

// Obter bio/status
const bio = await tokito.fetchStatus(sender_ou_n);
const recado = Array.isArray(bio) ? bio[0]?.status?.status || "privado, ou sem recado!!" 
: bio?.status || "privado, ou sem recado!!";

// Valores aleatórios para análise de perfil
const levelGado = Math.floor(Math.random() * 102) + "%";
const levelGostosura = Math.floor(Math.random() * 103) + "%";
const valorPrograma = "R$" + (Math.floor(Math.random() * 10000) + 1000).toLocaleString("pt-BR");
const gay = Math.floor(Math.random() * 102) + "%";
const puta = Math.floor(Math.random() * 100) + "%";

// Nome do grupo e data/hora
const NomeGrupo = isGroup ? (await tokito.groupMetadata(from)).subject : "Sem grupo";
const data = new Date().toLocaleDateString("pt-BR");
const hora = new Date().toLocaleTimeString("pt-BR");

// URL do card estilizado
// fundo fixo + foto do usuário como logo/avatar
const imageUrl = `https://tokito-apis.site/canvas/criadorcard?` +
`fundo=https://raw.githubusercontent.com/dylanModz/uploads/main/midias/imagens/747wlpa89.jpg` +
`&text=${encodeURIComponent(user)}` +
`&subtext=tokito-apis.site` +
`&logo=${encodeURIComponent(perfil)}` +
`&apikey=${API_KEY_TOKITO}`;

// Número do usuário (telefone sem @)
const numeroUser = sender_ou_n.split("@")[0];

// Monta a legenda do card
let legenda = `
╭═ ⬩❄️ ⃝*ᴘᴇʀꜰɪʟ ᴛᴏᴋɪᴛᴏ*⃝ ❄️⬩ ═╮
┃👤 ɴɪᴄᴋ: ${user}
┃📱 ɴᴜ́ᴍᴇʀᴏ: ${numeroUser}
┃🗒️ ʙɪᴏ: ${recado}
┃💎 ᴠɪᴘ: ${isChVip}
┃🧰 ᴄᴀʀɢᴏ: ${isCargo}
╰━━━━━━━━━━━━━━━━━━━━╯

╭─〔 🌫️ *ᴀɴᴀ́ʟɪsᴇ ᴘᴇʀꜰɪʟ* 〕─╮
┃🐂 ɴɪᴠᴇʟ ɢᴀᴅᴏ: ${levelGado}
┃😋 ɢᴏꜱᴛᴏꜱᴜʀᴀ: ${levelGostosura}
┃🏳️‍🌈 ɢᴀʏ: ${gay}
┃🔞 ᴘᴜᴛᴀʀɪᴀ: ${puta}
┃💰 ᴘʀᴏɢʀᴀᴍᴀ: ${valorPrograma}
╰──────────────────╯

🌫️ *Conselho do Dia:*
_"espera, não pare ainda, ainda vai piorar mais doque ja ta agora"_
`;

// Envia a imagem com legenda final
await tokito.sendMessage(
from,
{
 image: { url: imageUrl },
 caption: legenda,
 footer: NomeDoBot,
 contextInfo: {
mentionedJid: [sender_ou_n],
isForwarded: true,
forwardingScore: 1,
forwardedNewsletterMessageInfo: {
newsletterJid: `${setting.channeldl}`,
newsletterName: `${NomeDoBot}`,
},
 },
},
{ quoted: selo }
);

} catch (err) {
console.log(err);
reply('❌ Ocorreu um erro ao gerar o card de perfil.');
}
break;
}

case 'figperfil':
case 'perfilfig':
case 'stickerperfil': {
try {
if (!isGroup) return reply(mess.only.group)

await tokito.sendMessage(from, { react: { text: "🖼️", key: info.key } })

var packnameStk = `${pushname}`
var authorSticker = `${NomeDoBot}`

const contextInfo = info.message?.extendedTextMessage?.contextInfo || {}
const mentionedJid = contextInfo.mentionedJid || []
const quotedUser = contextInfo.participant || null

const alvo = mentionedJid[0] || quotedUser || sender
const numeroAlvo = alvo.split('@')[0]

let fotoPerfil = null
try {
fotoPerfil = await tokito.profilePictureUrl(alvo, 'image')
} catch (e) {
fotoPerfil = null
}

if (!fotoPerfil) {
return tokito.sendMessage(from, {
text: `*❌ ᴀ ᴘᴇꜱꜱᴏᴀ @${numeroAlvo} ɴᴀ̃ᴏ ᴘᴏꜱꜱᴜɪ ꜰᴏᴛᴏ ᴅᴇ ᴘᴇʀꜰɪʟ ᴏᴜ ᴀ ꜰᴏᴛᴏ ᴇꜱᴛᴀ́ ᴘʀɪᴠᴀᴅᴀ.*`,
mentions: [alvo]
}, { quoted: selo })
}

const buffer = await getBuffer(fotoPerfil)
if (!buffer) return reply('*❌ ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ʙᴀɪxᴀʀ ᴀ ꜰᴏᴛᴏ ᴅᴇ ᴘᴇʀꜰɪʟ.*')

await tokito.sendMessage(from, {
text: `*🖼️ ɢᴇʀᴀɴᴅᴏ ᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴏ ᴘᴇʀꜰɪʟ ᴅᴇ @${numeroAlvo}...*`,
mentions: [alvo]
}, { quoted: selo })

let encmedia = await sendImageAsSticker2(
tokito,
from,
buffer,
selo,
{ packname: packnameStk, author: authorSticker }
)

await DLT_FL(encmedia)

} catch (e) {
console.log(e)
reply('*❌ ᴇʀʀᴏ ᴀᴏ ɢᴇʀᴀʀ ᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴏ ᴘᴇʀꜰɪʟ.*')
}
}
break
case 'hd':
if ((isMedia && !info.message.videoMessage) || isQuotedImage) { post = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo.message.imageMessage : info.message.imageMessage;
imagem = await downloadContentFromMessage(post, 'image');
base64 = Buffer.from([]);
for await (const send of imagem) {
base64 = Buffer.concat([base64, send]);
}
reply(`*ᴀʟᴛᴇʀᴀɴᴅᴏ ᴀ ǫᴜᴀʟɪᴅᴀᴅᴇ ᴘᴀʀᴀ ʜᴅ...* 💁‍♂️`);
try {
let link = await upload(base64) || q.trim();
return tokito.sendMessage(from, {image: {url: `https://shizuku-apis.online/api/upscale?img=${encodeURIComponent(link)}&apitoken=Nk-Petrov-And-Harunni-Petrov`}, contextInfo: DLchanneldl}, { quoted: selo });
} catch (error) {
console.error(error);
return reply(mess.error());
}
} else {
reply(`*ᴍᴇɴᴄɪᴏɴᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴘᴀʀᴀ ᴀᴘʟɪᴄᴀʀ ᴏ ᴇғᴇɪᴛᴏ ʜᴅ* 🙇‍♂️`);
}
break;

case 'ping': {
    const inicio = performance.now();
    const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss");
    const data = moment.tz("America/Sao_Paulo").format("DD/MM/YYYY");

    await tokito.sendMessage(from, {
        react: { text: "🏃‍♂️", key: selo.key }
    });

    const [totalGrupos, ramLivre, ramTotal, tempoOnline] = await Promise.all([
        tokito.groupFetchAllParticipating()
            .then(g => Object.keys(g).length)
            .catch(() => 0),
        (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
        (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
        TimeCount(process.uptime())
    ]);

    let speedConverted = ((performance.now() - inicio) / 1000).toFixed(3);
    if (speedConverted > 0.05)
        speedConverted = (Math.random() * 0.04 + 0.001).toFixed(3);

// ─── TOTAL DE COMANDOS ───
let totalcmds = 0;
try {
const dataCmd = fs.readFileSync("./tokito.js", "utf8");
const regex = /case\s'([^']+)'/g;
while (regex.exec(dataCmd) !== null) totalcmds++;
} catch {
totalcmds = "N/A";
}

    const pingInicio = performance.now();
    await tokito.sendPresenceUpdate("available", from).catch(() => {});
    const latency = (performance.now() - pingInicio).toFixed(2);
    const atraso = (latency / 1000).toFixed(4);

    let avatarUser;
    try {
        avatarUser = await tokito.profilePictureUrl(sender, 'image');
    } catch {
        avatarUser = 'https://raw.githubusercontent.com/dylanModz/uploads/main/midias/imagens/747wlpa89.jpg';
    }

    const fundo = 'https://raw.githubusercontent.com/dylanModz/uploads/main/midias/imagens/799qek6w4.jpg';

    // Montando a URL do canvas com todos os parâmetros extras
const canvasPing =
    `https://tokito-apis.site/canvas/ping2?` +
    `ping=${speedConverted}` +
    `&latency=${latency}` +
    `&uptime=${encodeURIComponent(tempoOnline)}` +
    `&memory=${encodeURIComponent(`${ramLivre} / ${ramTotal} GB`)}` +
    `&cpu=${encodeURIComponent(os.loadavg()[0].toFixed(2) + "%")}` +
    `&platform=${process.platform}` +
    `&node=${process.version}` +
    `&commands=${totalcmds}` +
    `&groups=${totalGrupos}` +
    `&avatar=${encodeURIComponent(avatarUser)}` +
    `&fundo=${encodeURIComponent(fundo)}` +
    `&apikey=${API_KEY_TOKITO}`;

    // Legenda mantendo o design antigo, com emoji e visual
    const legenda = `╭─ ͡┄┄───────ׅ─ׅ─ׅ──ׂ─ׅ──────⟡
╎⋆.°🏃‍♂️ • ᴠᴇʟᴏᴄɪᴅᴀᴅᴇ: *${speedConverted} s*
╎⋆.°⚡ • ʟᴀᴛᴇ̂ɴᴄɪᴀ: *${latency} ms*
╎⋆.°⌛ • ᴀᴛʀᴀsᴏ: *${atraso} s*
╎⋆.°🧠 • ʀᴀᴍ: *${ramLivre} GB / ${ramTotal} GB*
╎⋆.°💻 • ᴄᴘᴜ ʟᴏᴀᴅ: *${os.loadavg()[0].toFixed(2)}%*
╎⋆.°🖥️ • ɴᴏᴅᴇ: *${process.version}*
╎⋆.°👥 • ɢʀᴜᴘᴏs: *${totalGrupos}*
╎⋆.°🕰️ • ᴜᴘᴛɪᴍᴇ: *${tempoOnline}*
╎⋆.°📝 • ᴄᴏᴍᴀɴᴅᴏs: *${totalcmds}*
╰─͡┄┄───────ׂ─ׅ───ׂ─ׅ─ׅ──ׅ───⟡
> — *${NomeDoBot}*`;

    await tokito.sendMessage(
        from,
        {
            image: { url: canvasPing },
            caption: legenda,
            contextInfo: {
                mentionedJid: [sender],
                isForwarded: true,
                forwardingScore: 1,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: setting.channeldl,
                    newsletterName: NomeDoBot
                }
            }
        },
        { quoted: selo }
    );
    break;
}
case 'tabela':
await tokito.sendMessage(from, {text: tabela(prefix, NomeDoBot)}, {quoted: selo})
break 

case 'destrava2':
await tokito.sendMessage(from, {text: destrava2 (prefix)}, {quoted: selo})
break

case 'gerarcpf':
cp1 = `${Math.floor(Math.random() * 300) + 600}`
cp2 = `${Math.floor(Math.random() * 300) + 600}`
cp3 = `${Math.floor(Math.random() * 300) + 600}`
cp4 = `${Math.floor(Math.random() * 30) + 60}`
cpf = `${cp1}.${cp2}.${cp3}-${cp4}`
await tokito.sendMessage(from, {text: `CPF gerado com sucesso: ${cpf}`, contextInfo:{...DLchanneldl}}, {quoted: selo}) 
break

case 'ddd':
if(args.length < 1) return reply(`Use ${prefix + command} 81`)
ddd = body.slice(5)
ddds = await axios.get(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
dddlist = `Lista de Cidades de ${ddds.data.state} com este DDD ${q}>\n\n`
for (let i = 0; i < ddds.data.cities.length; i++) { dddlist += `${i + 1} ⪧ *${ddds.data.cities[i]}*\n` }
await tokito.sendMessage(from, {text: dddlist, contextInfo:{...DLchanneldl}}, {quoted: selo}) 
break

case 'gethtml':
if(!q || !isUrl(args[0])) return reply(`Modo de uso: ${prefix+command} link do site`)
try {
await replyWithReaction(`*ᴇɴᴠɪᴀɴᴅᴏ ᴇᴍ sᴇᴜ ᴘᴠ 🙇‍♂️*`, {react: {text: '✅', key: info.key}});
axios.get(args[0], { headers: {"user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"}}).then(async (res) => {
let htmlData = typeof res.data === 'object' ? JSON.stringify(res.data, null, 2) : res.data
htmlData = htmlData.replace(/    /g, '').replace(/></g, '>\n<').replace(/> </g, '>\n<')
await tokito.sendMessage(sender, {document: Buffer.from(htmlData), fileName: q+`.html`, mimetype: 'text/html'}, {quoted: selo})}).catch(e => {return reply(mess.error())})
} catch (e) {
console.log(e)
reply(mess.error())
}
break

case 'revelar':
case 'rvisu':
case 'open':
await reagir(from, "👀");

if (JSON.stringify(info).includes("videoMessage")) {
var Xoxota = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
var video = Xoxota?.videoMessage || info.message?.videoMessage || 
Xoxota?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || 
info.message?.viewOnceMessage?.message?.videoMessage || Xoxota?.viewOnceMessage?.message?.videoMessage;

if (video) {
video.viewOnce = false;
video.video = { url: video.url };
tokito.sendMessage(from, video, { quoted: selo });
}
} else if (JSON.stringify(info).includes("imageMessage")) {
var Xoxota = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
var image = Xoxota?.imageMessage || info.message?.imageMessage || 
Xoxota?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || 
info.message?.viewOnceMessage?.message?.imageMessage || Xoxota?.viewOnceMessage?.message?.imageMessage;

if (image) {
image.viewOnce = false;
image.image = { url: image.url };
tokito.sendMessage(from, image, { quoted: selo });
}
} else if (JSON.stringify(info).includes("audioMessage") || info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2Extension?.message?.audioMessage) {
var audio = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage;

if (audio) {
if (!audio.mimetype) return;

let buffAudio = await getFileBuffer(audio, 'audio');
let audioFile = getRandom('.mp3');
fs.writeFileSync(audioFile, buffAudio);

let audioBuffer = fs.readFileSync(audioFile);
tokito.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: false }, { quoted: selo });

fs.rmSync(audioFile);
}
} else {
reply("• Marque uma Imagem, video ou áudio em visualização única.");
}
break//Dylan modz 

case 'calculadora':
case 'calcular':
case 'calc':
rsp = q.replace("x", "*").replace('"', ":").replace(new RegExp("[()abcdefghijklmnopqrstwuvxyz]", "gi"), "").replace("÷", "/")
return reply(JSON.stringify(eval(rsp, null,'\t')))
break 
 


case 'ptvmsg':
if (!isQuotedVideo && !info.message.videoMessage) return reply('Marque um vídeo/gif que você deseja converter para mensagem de vídeo.');
await tokito.relayMessage(from, {ptvMessage: isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage }, {})
break


case 'getquoted':
reply(JSON.stringify(info.message.extendedTextMessage.contextInfo, null, 3))
break

case 'admins':
case 'listadmins':
case 'listaadmins':
if(!isGroup) return reply(mess.onlyGroup())
ytb = `Lista de admins do grupo *${groupMetadata.subject}*\n*Total de Adminstradores:* ${groupAdmins.length}\n-\n`
no = 0
for (let admon of groupAdmins) {
no += 1
ytb += `( ${no.toString()} ) - @${admon.split('@')[0]}\n`
}
await mentions(ytb, groupAdmins, true)
break

case 'consultar_vip':
if(!JSON.stringify(vip).includes(sender)) return reply("Você não está incluso atualmente na lista de usuários vip(s)..")
AB = vip.map(i => i.id).indexOf(sender)
await mention(`Usuário: @${vip[AB].id.split('@')[0]}\n• Expiração: ${vip[AAB].infinito == false ? `*Seu vip irá expirar em ${vip[AB].dias} dia${vip[AB].dias > 1 ? `s` : ``}.*` : `*Não existe um dia de expiração do seu vip.*`}`)
break

case 'viplist': {
if (vip.length === 0)
return reply(`📭 *ɴᴀ̃ᴏ ᴇxɪsᴛᴇ ɴᴇɴʜᴜᴍ ᴜsᴜᴀ́ʀɪᴏ ᴠɪᴘ.*`);

let teks = `👑 *ʟɪsᴛᴀ ᴅᴇ ᴜsᴜᴀ́ʀɪᴏs ᴠɪᴘ*
📊 Total: *${vip.length}*

`;

teks += vip.map((v, i) =>
`*[${i + 1}]* 👤 @${v.id.split('@')[0]}
⏳ Expiração: ${
v.infinito
? '*ᴠɪᴘ ɪɴғɪɴɪᴛᴏ*'
: `*ᴇxᴘɪʀᴀ ᴇᴍ ${v.dias} ᴅɪᴀ${v.dias > 1 ? 's' : ''}*`
}`
).join('\n\n────────────\n\n');

await mention(teks);
}
break;


case 'envpv':
case 'pv':{
if(!isGroup) return reply("*sᴏᴍᴇɴᴛᴇ ᴇᴍ ɢʀᴜᴘᴏs 🙇‍♂️*")
if(!menc_prt) return reply("*ᴍᴀʀǫᴜᴇ ᴀ ᴍsɢ ᴏᴜ ᴀ ᴍɪᴅɪᴀ ǫᴜᴇ ᴠᴏᴄᴇ ǫᴜᴇʀ ǫᴜᴇ ᴇᴜ ᴍᴀɴᴅᴇ ɴᴏ ᴘᴠ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*")
var DFC = "";
var rsm = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var pink = isQuotedImage ? rsm?.imageMessage: info.message?.imageMessage
var blue = isQuotedVideo ? rsm?.videoMessage: info.message?.videoMessage
var purple = isQuotedDocument ? rsm?.documentMessage: info.message?.documentMessage
var yellow = isQuotedDocW ? rsm?.documentWithCaptionMessage?.message?.documentMessage: info.message?.documentWithCaptionMessage?.message?.documentMessage
var aud_d = isQuotedAudio ? rsm.audioMessage : ""
var figu_d = isQuotedSticker ? rsm.stickerMessage : ""
var red = isQuotedMsg && !aud_d && !figu_d && !pink && !blue&& !purple && !yellow? rsm.conversation: info.message?.conversation
var green = rsm?.extendedTextMessage?.text || info?.message?.extendedTextMessage?.text
if(pink && !aud_d && !purple) {
var DFC = pink
pink.caption = q.length > 1 ? "*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*" :pink.caption.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`)
pink.image = {url: pink.url}
} else if(blue && !aud_d && !purple) {
var DFC = blue
blue.caption = q.length > 1 ? "*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*"+q.trim() :blue.caption.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`).trim()
blue.video = {url: blue.url}
} else if(red && !aud_d && !purple) {
black = {}
black.text = red.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`).trim()
var DFC = black
} else if(!aud_d && !figu_d && green && !purple && !purple) {
brown = {}
brown.text = green.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`).trim()
var DFC = brown
} else if(purple) {
var DFC = purple
purple.document = {url: purple.url}
} else if(yellow && !aud_d) {
var DFC = yellow 
yellow.caption = q.length > 1 ? "*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*"+q.trim() :yellow.caption.replace(new RegExp(prefix+command, "gi"), `*ᴘʀᴏɴᴛᴏ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`).trim()
yellow.document = {url: yellow.url}
} else if(figu_d && !aud_d) {
var DFC = figu_d
figu_d.sticker = {url: figu_d.url}
} else if(aud_d) {
var DFC = aud_d
aud_d.audio = {url: aud_d.url}
aud_d.ptt = true
}
reply("*ᴏʟʜᴀ ᴏ ᴍᴇᴜ ᴘᴠ sᴇɴʜᴏʀ(ᴀ).💞*")
await tokito.sendMessage(sender, DFC, {quoted: selo}).catch(e => {
console.log(e)
})
}
break


case 'doc':
case 'docfake':
try {
sprd = "|"
if(!q) return reply(`${prefix + command} exemplo${sprd}500${sprd}apk\n-\nOs tipos aceitos por enquanto são: pdf > xml > zip > jpg > ppt > apk > txt > aac > pptx > aac > m4a > mp4 > mp3 > svg > png`)
kls = args.join(' ')
let nomedoc = kls.split(sprd)[0] || `${setting.NomeDoBot}`
let peso = kls.split(sprd)[1] * 1000000 || '1000000'
let mimetyp = kls.split(sprd)[2].replace(" ", "") || 'gif'
let thumbc = kls.split(sprd)[3] || 'https://google.com/'
if(mimetyp.toLowerCase() == 'pdf') mimetyp = 'application/pdf'
if(mimetyp.toLowerCase() == 'apk') mimetyp = 'application/vnd.Android 🚀.package-archive'
if(mimetyp.toLowerCase() == 'aac') mimetyp = 'audio/aac'
if(mimetyp.toLowerCase() == 'xml') mimetyp = 'application/xml'
if(mimetyp.toLowerCase() == 'zip') mimetyp = 'application/zip'
if(mimetyp.toLowerCase() == 'jpg') mimetyp = 'image/jpeg'
if(mimetyp.toLowerCase() == 'ppt') mimetyp = 'application/vnd.ms-powerpoint'
if(mimetyp.toLowerCase() == 'pptx') mimetyp = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
if(mimetyp.toLowerCase() == 'mp4') mimetyp = 'video/mp4'
if(mimetyp.toLowerCase() == 'm4a') mimetyp = 'audio/mpeg'
if(mimetyp.toLowerCase() == 'mp3') mimetyp = 'audio/mpeg'
if(mimetyp.toLowerCase() == 'gif') mimetyp = 'image/gif'
if(mimetyp.toLowerCase() == 'png') mimetyp = 'image/png'
if(mimetyp.toLowerCase() == 'svg') mimetyp = 'image/svg+xml'
if(mimetyp.toLowerCase() == 'txt') mimetyp = 'text/plain'
let Messagemdoc = {document: fs.readFileSync('./DADOS_TOKITO/data/docf.txt'), mimetype: mimetyp, jpegThumbnail: await getBuffer(thumbc), fileName: nomedoc, fileLength: peso, headerType: 4, contextInfo:{forwardingScore:999,isForwarded:true}}
await tokito.sendMessage(from, Messagemdoc, {quoted: selo})
} catch (err) {
console.log(err)
reply(mess.error())
}
break

case 'sender':
let blaBruto = isGroup
? (info?.key?.participantAlt || info?.key?.participantPn || info?.key?.senderPn || info?.key?.participant || info?.key?.remoteJid)
: (info?.key?.participantAlt || info?.key?.senderPn || info?.key?.participant || info?.key?.remoteJid);
if (blaBruto && blaBruto.includes('@lid') && isGroup && groupMetadata?.participants) {
const ln = blaBruto.split('@')[0].split(':')[0];
const m = groupMetadata.participants.find(v => [v.id, v.lid, v.jid].filter(Boolean).some(c => c.split('@')[0].split(':')[0] === ln));
const r = m?.phoneNumber || m?.jid || m?.participantPn;
if (r && !r.includes('@lid')) blaBruto = r;
}
bla = jidNormalizedUser(blaBruto);
reply(bla)
break


case 'rename':
case 'roubar':
if (!isQuotedSticker) return reply('*ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ғɪɢᴜʀɪɴʜᴀ...💁‍♂️*');
encmediats = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
var kls = q;
var pack = kls.split("/")[0];
var author2 = kls.split("/")[1];
if (!q) {
return reply(`*ᴇꜱᴛᴀ ꜰᴀʟᴛᴀɴᴅᴏ ᴏ ɴᴏᴍᴇ ᴅᴏ ᴩᴀᴄᴏᴛᴇ + ᴀᴜᴛᴏʀ 🤷‍♂️*`);
}
if (!pack || !author2) {
return reply(`*ᴄᴏᴍᴏ ᴠᴏᴄᴇ ǫᴜᴇʀ ʀᴇɴᴏᴍᴇᴀʀ ᴀ ꜰɪɢᴜʀɪɴʜᴀ ᴅᴇꜱꜱᴇ ᴊᴇɪᴛᴏ ᴀɪ? 🤦‍♂️*\n> *ᴇxᴇᴍᴩʟᴏ ᴅᴇ ᴜꜱᴏ: ${prefix + command} Nk/Petrov*`);
}
reply(mess.wait());
var bas64 = `data:image/jpeg;base64,${encmediats.toString('base64')}`;
try {
var mantap = await convertSticker(bas64, author2, pack);
var sti = Buffer.from(mantap, 'base64');
tokito.sendMessage(from, {
sticker: sti,
contextInfo: DLchanneldl
}, { quoted: selo }).catch((err) => {
reply(mess.error());
});

} catch (e) {
console.error(e);
reply(mess.error());
}
break;

case 'take': // YoshGGx
try {
if (!isQuotedSticker) return reply('*ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ғɪɢᴜʀɪɴʜᴀ...💁‍♂️*');
reply(mess.teste());
const _author = `°‧🫧⋆ 𝙲𝚑𝚊𝚗𝚗𝚎𝚕-𝚝𝚎𝚏𝚏𝚢-𝚋𝚎𝚝𝚊.ೃ࿔*:･`
const _pack = `${pushname}`;
const takeSTK = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker');
const prepareSTK = await convertSticker(takeSTK.toString('base64'), _author, _pack);
tokito.sendMessage(from, {
sticker: prepareSTK,
contextInfo: DLchanneldl
}, { quoted: selo }).catch((err) => {
reply(mess.error());
});
} catch (e) {
console.error(e);
reply(mess.error());
}
break;


case 'gerarlink': {
const FormData = require("form-data");

async function uploadTokito(midia) {
try {
const { fileTypeFromBuffer } = await import("file-type");
const type = await fileTypeFromBuffer(midia);
const ext = type?.ext || "jpg";

const form = new FormData();
form.append("image", midia, { filename: `upload.${ext}` });

const uploadRes = await fetch("https://tokito-apis.site/api/upload", {
method: "POST",
body: form,
headers: form.getHeaders({ "User-Agent": "Mozilla/5.0" }),
});

if (!uploadRes.ok) throw new Error(await uploadRes.text());
const json = await uploadRes.json();

if (!json.sucesso || !json.url) throw new Error("Upload falhou!");
return json.url;
} catch (err) {
console.error("Erro upload Tokito:", err.message);
throw err;
}
}

const isMidia = isQuotedVideo || isQuotedImage || isImage || isVideo;
if (!isMidia) return reply(`🌫️ | Só é permitido gerar link de *imagem ou vídeo*.`);

await reagir(from, "🔗");

try {
let midia, buffer, tipoMensagem, icone;
const { fileTypeFromBuffer } = await import("file-type");

if ((isMedia && info.message?.imageMessage) || isQuotedImage) {
midia = isQuotedImage
? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage
: info.message.imageMessage;
buffer = await getFileBuffer(midia, "image");
tipoMensagem = "imagem";
icone = "🖼️";
} else if ((isMedia && info.message?.videoMessage) || isQuotedVideo) {
midia = isQuotedVideo
? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
: info.message.videoMessage;
buffer = await getFileBuffer(midia, "video");
tipoMensagem = "vídeo";
icone = "🎥";
} else {
return reply(`⚠️ | Só é permitido gerar link de *imagem ou vídeo*.`);
}

await reagir(from, icone);

const urlGerada = await uploadTokito(buffer);

const legenda_heart = `🔗 *Link de ${tipoMensagem} gerado com sucesso!*`;
const botoes = [
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "🧊⃞𝙲𝙾𝙿𝙸𝙰𝚁 𝙻𝙸𝙽𝙺⃞🧊",
copy_code: urlGerada
})
},
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "🧊⃞𝙰𝙱𝚁𝙸𝚁 𝙻𝙸𝙽𝙺⃞🧊",
url: urlGerada,
merchant_url: urlGerada
})
}
];

let headerPreview = null;
try {
const preview = await prepareWAMessageMedia(
tipoMensagem === "vídeo"
? { video: { url: urlGerada } }
: { image: { url: urlGerada } },
{ upload: tokito.waUploadToServer }
);
headerPreview = tipoMensagem === "vídeo" ? preview.videoMessage : preview.imageMessage;
} catch {
headerPreview = null;
}

const carouselMessage = {
cards: [
{
header: headerPreview
? tipoMensagem === "vídeo"
 ? { hasMediaAttachment: true, videoMessage: headerPreview }
 : { hasMediaAttachment: true, imageMessage: headerPreview }
: undefined,
headerType: headerPreview ? (tipoMensagem === "vídeo" ? "VIDEO" : "IMAGE") : "NONE",
body: { text: `╭─『 🧊 』𝐋𝐈𝐍𝐊 𝐆𝐄𝐑𝐀𝐃𝐎『 🧊 』─╮
*🧊 *Tokito processou o algoritmo com precisão.*
*O link está pronto para uso.*

> *${NomeDoBot}*` },
footer: { text: `Clique abaixo para copiar ou abrir.` },
nativeFlowMessage: { buttons: botoes }
}
]
};

await tokito.relayMessage(
from,
{
interactiveMessage: {
body: { text: legenda_heart }, // AQUI VAI A DECORAÇÃO
carouselMessage
}
},
{}
);

} catch (err) {
console.error(err);
return reply(`❌ *tokito sussurra:* “Não consegui gerar esse link...”`);
}
}
break;

case 'qc':
if(!q) return reply(`- Exemplo: ${prefix+command} ${NomeDoBot}`)
reply(mess.teste());
const text = `${q}`
const username2 = `${pushname}`
try {
ppimg = await tokito.profilePictureUrl(sender, 'image')
} catch {
ppimg = imgperfil
}
const { writeExifImg } = require('./DADOS_TOKITO/INFO_TOKITO/lib/exif')
tokito.sendImageAsSticker = async (jid, path, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await tokito.sendMessage(jid, { sticker: { url: buffer }, ...options})
return buffer
}
const avatar = `${ppimg}`
const json = { "type": "quote", "format": "png", "backgroundColor": "#000000", "width": 512, "height": 768, "scale": 2, "messages": [{ "entities": [], "avatar": true, "from": { "id": 1, "name": username2, "photo": { "url": avatar }
}, "text": text, "replyMessage": {}
}
]
};
 response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
sendImageAsSticker(tokito, from, buffer, selo, { packname: pushname, author: NomeDoBot, 
contextInfo: {...DLchanneldl}
}, {quoted: selo})
})
break

case 'cep':
try {
if (!q.trim()) return reply("digite o CEP que deseja buscar informações..");
const ABC = await fetchJson(`${TOKITO_URL}/api-bronxys/consultacep?cep=${q}&apikey=${TokitoBot}`);
reply(mess.textCep(ABC));
} catch (e) {
return reply(mess.error());
}
break;


case 'infogp':
case 'regras':
case 'infogrupo':
case 'ig':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
await reagir(from, "⏳");
try {
let ppUrl;
try { ppUrl = await tokito.profilePictureUrl(from, 'image');
} catch { ppUrl = semimg;
}
const tokitoDesc = await tokito.groupMetadata(from); 
const groupAdmins = tokitoDesc.participants.filter(p => p.admin);
const groupMembers = tokitoDesc.participants;
const criadorJid = normalizar(tokitoDesc.subjectOwner);
const descricao = tokitoDesc.desc || 'Sem descrição disponível.';
const metaCorrigido = { ...tokitoDesc, subjectOwner: criadorJid, desc: descricao };
await tokito.sendMessage(from, {
image: { url: ppUrl },
caption: mess.textInfoGrupo(metaCorrigido, groupAdmins, groupMembers, prefix, moment),
contextInfo: { ...DLchanneldl, mentionedJid: [criadorJid, ...groupAdmins.map(v => v.id)] }
}, { quoted: selo });

} catch (e) {
console.error(e);
reply(mess.error());
}
break;


case 'encurtalink': case 'tinyurl':
if(args.length < 1) return reply(`❌️ *Forma incorreta, use está como exemplo:* ${prefix + command} https://instagram.com/TokitoBot.wpp`)
anu = await axios.get(`https://tinyurl.com/api-create.php?url=${q}`)
reply(`*Link encurtado com sucesso, aqui está:* ${anu.data}`).catch(async(error) => {
reply(mess.error())
})
break

case 'lermais': case 'morechat': case 'spoiler':
var [text1_a, text2_b] = q.split("/"); // Separador
if (!text1_a) text1_a = ""; // Caso o texto1 esteja vazio, vai retornar vázio o parâmetro.
if (!text2_b) text2_b = ""; // Caso o texto2 esteja vazio, vai retornar vázio o parâmetro.
reply(text1_a + String.fromCharCode(8206).repeat(4001) + text2_b); // Enviar o spoiler.
break

case 'obesidade': case 'obeso':
if(!q.includes("/")) return reply(`Ex.: *${prefix+command} peso/altura*`)
var [peso, altura] = q.split("/");
var resultado = await obeso(peso, altura)
if (resultado <= 17 || resultado <= 18.4) {
await replyWithReaction(`• Seu índice de massa corporal é de: *${resultado}* -> Você está abaixo do peso.`, {react: {text: '😸', key: info.key}});
} else if (resultado <= 18.5 || resultado <= 24.9) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Você está no peso ideal.`, {react: {text: '👍', key: info.key}});
} else if (resultado <= 25 || resultado <= 29.9) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Você está com sobrepeso.`, {react: {text: '🫤', key: info.key}});
} else if (resultado <= 30 || resultado <= 39.9) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Em situção de Obesidade.`, {react: {text: '🤨', key: info.key}});
} else if (resultado > 40) {
await replyWithReaction(`• Seu índice de massa corporal é: *${resultado}* -> Obesidade mórbida!`, {react: {text: `😵`, key: info.key}});
}
break

case 'contardias': case 'countdays':
if(!q.includes("/")) return reply(`Você esqueceu da */* para separar os campos.. Exemplo: *31/03/2024*`)
if(q.length < 10) return reply(`Deve conter a data completa *(dia/mês/ano)* após o comando!\n• Exemplo: *${prefix+command} 31/03/2024*`)
try {
var tomp = await timeDate('DD/MM/YYYY')
countDay = await countDays(q.split("/"), tomp.split("/"))
reply(`*${countDay}* dia(s).`)
} catch(error) {
return reply(mess.error())
}
break


case 'idade':
if (!q) return reply(`- Exemplo: ${prefix}idade 23/12/2007`)
try {
let txt; 
const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/
if (!regexData.test(q)) return reply(`- Exemplo: ${prefix}idade 23/12/2007`)
const [dia, mes, ano] = q.split('/').map(Number)
const dataNascimento = new Date(ano, mes - 1, dia)
const hoje = new Date()
if (dataNascimento > hoje || isNaN(dataNascimento)) {
return reply(`*ᴄᴏʟᴏǫᴜᴇ ᴅᴀ ғᴏʀᴍᴀ ᴄᴇʀᴛᴀ ʙᴀɪᴛᴏʟᴀ 😡*`)
}
const diffMs = hoje - dataNascimento
const idadeData = new Date(diffMs)
const anos = idadeData.getUTCFullYear() - 1970
const meses = idadeData.getUTCMonth()
const dias = idadeData.getUTCDate() - 1
const diasVividos = Math.floor(diffMs / (1000 * 60 * 60 * 24))
const horasVividas = diasVividos * 24
const minutosVividos = horasVividas * 60
const proximoAniversario = new Date(hoje.getFullYear(), mes - 1, dia)
if (proximoAniversario <= hoje) proximoAniversario.setFullYear(hoje.getFullYear() + 1)
const diasParaAniversario = Math.ceil((proximoAniversario - hoje) / (1000 * 60 * 60 * 24))
txt = mess.idade(q, anos, meses, dias, diasVividos, horasVividas, minutosVividos, diasParaAniversario, NomeDoBot).trim()
tokito.sendMessage(from, {video: {url: idade}, gifPlayback: true, caption: txt, contextInfo:{...DLchanneldl}}, {quoted: selo})
} catch (e) {
console.log(e)
}
break


case 'qrcode': case 'gerarqr':
if (!q) return reply('Insira um link ou texto para que eu possa gerar o qr code..')
try {
await tokito.sendMessage(from, {image: {url: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${q}`}, caption: `${q}`}, {quoted: selo})
} catch (e) {
return reply(mess.error());
}
break

case 'perfil2': { //Criado por Lm
try {
const mentionMessage = info.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || info.message?.extendedTextMessage?.contextInfo?.participant || null;
if (mentionMessage) {
await reply("*Gerando um personalidade aleatória dessa pessoa, aguarde um momento... 🤗*");
const randomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
const getProfileUrl = await tokito.profilePictureUrl(mentionMessage, 'image').catch(() => imgperfil);
const types = {genders: ["Gay 🏳️‍🌈", "Masculino 💪", "Feminino 🦋", "Trans 🏳️‍⚧️", "Lésbica 👩‍❤️‍👩"], hobbies: ["Cozinhar 🍜", "Ler livros 📚", "Estudar 🎒", "Praticar esportes ⛹️", "Correr 🏃", "Ouvir música 🎧", "Dançar 💃", "Cantar 🎤", "Viajar 🛫", "Jogar video-gamer 🎮"], professions: ["Médico", "Engenheiro", "Professor", "Artista", "Designer", "Programador", "Músico", "Escritor", "Puta"], favoriteTimesOfDay: ["Manhã 🌤", "Tarde 🌅", "Noite 🌌", "Madrugada 🌃"], favoriteMusicGenres: ["Rock", "Pop", "Jazz", "Sertanejo", "Funk", "Clássica", "Eletrônica"], favoriteTemperatura: ["Frio 🥶", "Quente 🥵", "Morno 🙂‍↕"]};
function getResults() {
return {genero: randomFromArray(types.genders), hobbie: randomFromArray(types.hobbies), job: randomFromArray(types.professions), clima: randomFromArray(types.favoriteTimesOfDay), estilo_musical: randomFromArray(types.favoriteMusicGenres), temperatura: randomFromArray(types.favoriteTemperatura)
}}

const b = getResults();
await tokito.sendMessage(from, { image: { url: getProfileUrl, }, caption: mess.perfil2(mentionMessage, b), mentions: [mentionMessage, sender]}, {
quoted: selo
});
}
else {
reply("Mencione o '@' ou a mensagem de alguém...");
}
} catch (err) {
console.error(err);
reply(mess.error());
}
break;
}

case 'dinextenso': 
if(!q.includes(".")) return reply(`❌️ - Coloque apenas números para realizar a transformação de digitos numérico para números em extenso.\nPor exemplo: *${prefix}dinextenso 500.00 ou 756.50*, tudo que você colocar os valores deve colocar um ponto(.) para converter os valores.`)
try {
data = await fetchJson(`https://api.invertexto.com/v1/number-to-words?token=${API_KEY_INVERTEXTO}&number=${q}&language=pt&currency=BRL`);
reply(`*${q}* : ${capitalizeFirstLetter(data.text)}`);
} catch(error) {
reply(mess.error())
}
break

case 'validarcpf': case 'validarcnpj':
if(command === "validarcpf") {
if(!q) return reply("Digite um CPF para realizar a verificação se é válido ou inválido...")
if(q.length < 11) return reply("Você digitou um cpf que não tem 11 dígitos, verifique se colocou pontuação, se estiver retire.")
try {
data = await fetchJson(`https://api.invertexto.com/v1/validator?token=${API_KEY_INVERTEXTO}&value=${q}`)
if(data.valid == true) return reply("Válido.")
if(data.valid == false) return reply("Inválido.")
} catch(error) {reply(mess.error())}
} else if(command === "validarcnpj") {
if(!q) return reply("Digite um CNPJ para realizar a verificação se é válido ou inválido!")
if(q.length < 14) return reply("Você digitou um CNPJ que não tem 14 dígitos, verifique se colocou pontuação, se estiver retire.")
try {
data = await fetchJson(`https://api.invertexto.com/v1/validator?token=${API_KEY_INVERTEXTO}&value=${q}`)
if(data.valid == true) return reply("Válido.")
if(data.valid == false) return reply("Inválido.")
} catch(error) {reply(mess.error())}
}
break

case 'createimg': case 'texttoimage': case 'imagine':
if(!q) return reply(`O que você deseja criar amiguinho? Coloque após o comando o que você deseja criar... Por exemplo: ${prefix+command} macaco dirigindo uma bmw`);
try {
await replyWithReaction('Olá, estou criando a imagem a partir de seu questionamento, aguarde senhor(a)...', {react: {text: '🎨', key: info.key}});
dataResultAI = await fetchJson(`https://hercai.onrender.com/v3/text2image?prompt=${q}`);
await tokito.sendMessage(from, {image: {url: dataResultAI.url}}, {quoted: selo});
} catch(error) {
await replyWithReaction(mess.error(), {react: {text: '❌', key: info.key}});
}
break

case 'emoji': case 'semoji':
try {
if (!q.trim()) return reply(`Você está usando o comando de forma errada, use: *${prefix+command} [emj]/[pltf]*\n—\n• *Plataformas disponíveis:* whatsapp, facebook, google, samsung, twitter, apple, microsoft, mesengger, joypixels, openmoji, emojidex, htc, lg, mozilla, softbank, au_kddi`)
if (!q.includes("/")) return reply(`Está faltando a */*, para separar o emoji e plataforma.\n• Por exemplo: ${prefix+command} 🏃‍♂️/apple`);
reply(mess.wait());
var [emojiInput, platform] = q.split("/");
var { emojisData } = await emoji(emojiInput);
if (emojisData && emojisData[platform.toLowerCase()]) {
await sendStickerFromUrl(from, emojisData[platform.toLowerCase()]);
} else {
return reply(`Emoji '${emojiInput}' não encontrado!`);
}
} catch(error) {
reply(mess.error())
}
break

case 'figfundo':
case 'figvideo':
case 'figusemfundo': 
case 'sfundo':
if((isMedia && !info.message.videoMessage || isQuotedImage) && !q.length <= 1) {
rafa = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
reply(mess.wait())
buff = await getFileBuffer(rafa, 'image')
bas64 = `data:image/jpeg;base64,${buff.toString('base64')}`
anu = args.join(' ').split('|')
satu = anu[0] !== '' ? anu[0] : `${NomeDoBot}`
sd = `↳Feito pelo(a) usuário(a): ${pushname}`
dua = typeof anu[1] !== 'undefined' ? anu[1] : `${sd}`
var mantap = await convertSticker(bas64, `${dua}`, `${satu}`)
var sti = new Buffer.from(mantap, 'base64');
await tokito.sendMessage(from, {sticker: sti}, {quoted: selo})
} else {
return reply(`So imagem amigo(a)!`)
}
break

case 'rbale':
if(!isQuotedSticker) return reply('Marque uma figurinha...')
encmediats = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
reply(mess.wait())
bas64 = `data:image/jpeg;base64,${encmediats.toString('base64')}`
var mantap = await convertSticker(bas64, `↳Feito pelo(a) usuário(a): ${pushname}`, `${NomeDoBot}`)
var sti = new Buffer.from(mantap, 'base64');
await tokito.sendMessage(from, {sticker: sti}, {quoted: selo}).catch(async(error) => {
reply(mess.error()); 
})
break


case 'fstiker':
case 'fsticker':
case 'f':
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij2 = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage

if (boij) {
var packnameStk = `${pushname}`
var authorSticker = `${NomeDoBot}`
reply(mess.wait())
owgi = await getFileBuffer(boij, 'image')
let ENC_MEDIA1 = await sendImageAsSticker(tokito, from, owgi, selo, {
packname: packnameStk,
author: authorSticker,
contextInfo: DLchanneldl
})
await DLT_FL(ENC_MEDIA1)

} else if (boij2 && boij2?.seconds < 11) {
var packnameStk = `${pushname}`
var authorSticker = `${NomeDoBot}`
reply(mess.wait())
owgi = await getFileBuffer(boij2, 'video')
let ENC_MEDIA2 = await sendVideoAsSticker(tokito, from, owgi, selo, {
packname: packnameStk,
author: authorSticker,
contextInfo: DLchanneldl
})
await DLT_FL(ENC_MEDIA2)

} else {
reply(`*ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴏᴜ ᴠɪᴅᴇᴏ ᴄᴏᴍ ᴏ ᴍᴀxɪᴍᴏ ᴅᴇ 10 ꜱᴇɢᴜɴᴅᴏꜱ 🙇‍♂️*`)
}
break


case 'st':
case 'stk':
case 'sticker':
case 's':
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if (boij2) {
var pack = mess.fig(ownerName, NomeDoBot)
var author2 = mess.fig2(pushname, groupName, isGroup)
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(tokito, from, owgi, selo, { 
packname: pack, 
author: author2,
contextInfo: DLchanneldl
})
await DLT_FL(encmediaa)
} else if (boij && boij.seconds < 11) {
var pack = mess.fig(ownerName, NomeDoBot)
var author2 = mess.fig2(pushname, groupName, isGroup)
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(tokito, from, owgi, selo, { 
packname: pack, 
author: author2,
contextInfo: DLchanneldl
})
await DLT_FL(encmedia)
} else {
reply(`*ᴍᴀʀǫᴜᴇ ᴜᴍᴀ ɪᴍᴀɢᴇᴍ ᴏᴜ ᴠɪᴅᴇᴏ ᴄᴏᴍ ᴏ ᴍᴀxɪᴍᴏ ᴅᴇ 9.9 ꜱᴇɢᴜɴᴅᴏꜱ 🙇‍♂️*`)
}
break

case 'transcrever':
case 'totext': {
if (!isQuotedAudio && !(isMedia && info.message.audioMessage)) {
return reply('*💬 ᴍᴀʀǫᴜᴇ ᴜᴍ ᴀᴜ́ᴅɪᴏ...* 🔊');
}
await reagir(from, "👂");
try {
const audioMsg = isQuotedAudio
? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage
: info.message.audioMessage;

const stream = await downloadContentFromMessage(audioMsg, 'audio');
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}

const audioUrl = await upload(buffer);

const transcriptRes = await fetch('https://api.assemblyai.com/v2/transcript', {
method: 'POST',
headers: {
'authorization': '22be3718b6bf42019d9cc59f70133b83',
'content-type': 'application/json'
},
body: JSON.stringify({
audio_url: audioUrl,
language_code: 'pt'
})
});

const transcriptData = await transcriptRes.json();
if (!transcriptData.id) return reply('*ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ᴇɴᴠɪᴀʀ ᴏ ᴀᴜ́ᴅɪᴏ ᴘᴀʀᴀ ᴛʀᴀɴꜱᴄʀɪᴄ̧ᴀ̃ᴏ... 💢*');

const id = transcriptData.id;
let status = 'queued';
let transcriptResult;

while (status === 'queued' || status === 'processing') {
await new Promise(resolve => setTimeout(resolve, 4000));
const statusRes = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
headers: { 'authorization': '22be3718b6bf42019d9cc59f70133b83' }
});
transcriptResult = await statusRes.json();
status = transcriptResult.status;
}

if (status !== 'completed') return reply('*ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ᴛʀᴀɴꜱᴄʀᴇᴠᴇʀ ᴇꜱꜱᴇ ᴀᴜ́ᴅɪᴏ, ꜰᴏɪ ᴅɪꜰɪ́ᴄɪʟ ᴀᴛᴇ́ ᴘʀᴀ ᴍɪᴍ...* 😵‍💫');

let textoFinal = transcriptResult.text || 'ɴᴇɴʜᴜᴍ ᴛᴇxᴛᴏ ʀᴇᴄᴏɴʜᴇᴄɪᴅᴏ';

reply(`*ᴛʀᴀɴꜱᴄʀɪᴄ̧ᴀ̃ᴏ ᴅᴇ ᴀᴜ́ᴅɪᴏ 🗣️*\n-\n> *${textoFinal}*`);
} catch (e) {
console.error('erro ao transcrever:', e);
reply(mess.error());
}

break;
}

case 'suicidio':
setTimeout(() => { reagir(from, `😕`) }, 100)
{
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if(!isGroup) return reply(mess.onlyGroup());
await reply(`*ʟᴇᴍʙʀᴇ-ꜱᴇ ${pushname}... ᴠᴏᴄᴇ̂ ꜱᴇᴍᴘʀᴇ ᴇꜱᴛᴀʀᴀ́ ᴇᴍ ɴᴏꜱꜱᴏꜱ ᴄᴏʀᴀᴄ̧ᴏ̃ᴇꜱ...* ☁️😔`)
await sleep(3000)
await tokito.groupParticipantsUpdate(from, [sender], 'remove')
await sleep(1000)
await reply('*ᴀɢᴏʀᴀ ǫᴜᴇ ᴊᴀ́ ꜱᴇ ꜰᴏɪ... ᴠᴀᴍᴏꜱ ꜰᴀʟᴀʀ ᴍᴀʟ ᴅᴇʟᴇ ᴋᴋᴋ* 😈')
}
break


case 'toimg':
if(!isQuotedSticker) return reply('Por favor, *mencione um sticker* para executar o comando.')
try {
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
await tokito.sendMessage(from, {image: buff}, {quoted: selo}).catch(async(error) => {
reply(mess.error())
})
} catch(error) {
console.log(error)
}
break

case 'togif': 
if(!isQuotedSticker) return reply('Por favor, atribua uma figurinha animada à mensagem para realizar a conversão para vídeo/gif.');
try {
if((isMedia && !info.message.videoMessage || isQuotedSticker) && !q.length <= 1) {
const { FiguMp4OuGif } = require('./ARQUIVES/funcoes/togif.js');
getBufferWebP = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, "sticker");
fs.writeFileSync("./DADOS_TOKITO/data/media/sticker/convert.webp", getBufferWebP);
outputFile = "./DADOS_TOKITO/data/media/sticker/convert.webp";
convertWebP = await FiguMp4OuGif(outputFile);
await tokito.sendMessage(from, {video: {url: convertWebP}, gifPlayback: true, fileName: 'sticker-sb.gif'}, {quoted: selo}).catch(async(error) => {
await reply(mess.error()); // Notificar ao usuário que ocorreu um erro ao enviar o resultado da conversão do WebP para MP4.
await DLT_FL(outputFile); // Apagar o arquivo, caso ocorrer um erro na conversão entre eles.
console.log(error)
});
}
} catch(error) {
await reply(mess.error()); // Notificar ao usuário que ocorreu um erro ao realizar a conversão do WebP para MP4.
console.log(error)
};
break


case 'conselhobiblico': case 'conselhosbiblico': case 'conselhosb': case 'conselhob':
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(advices.biblicalAdvice[Math.floor(Math.random() * advices.biblicalAdvice.length)], {react: {text: '😌', key: info.key}}).catch(async(error) => {
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(mess.error(), {react: {text: '😿', key: info.key}});
});
break

case 'conselhos': case 'conselho':
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(advices.commonAdvices[Math.floor(Math.random() * advices.commonAdvices.length)], {react: {text: '😌', key: info.key}}).catch(async(error) => {
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(mess.error(), {react: {text: '😿', key: info.key}});
});
break
 
case 'cantadas': case 'cantada':
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(tools.Cantadas[Math.floor(Math.random() * tools.Cantadas.length)], {react: {text: '😼', key: info.key}}).catch(async(error) => {
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(mess.error(), {react: {text: '😿', key: info.key}});
});
break

case 'fatos': case 'curiosidades':
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(tools.curiousFacts[Math.floor(Math.random() * tools.curiousFacts.length)], {react: {text: '🙀', key: info.key}}).catch(async(error) => {
/* [Reagir a mensagem + enviar mensagem pré-definida] -> */ await replyWithReaction(mess.error(), {react: {text: '😿', key: info.key}});
});
break


case 'mencionar':
if (!q) return reply(`Você usou o comando de forma incorreta, use a correta: ${prefix}mencionar corno`);
if (!isGroup) return reply(`Esta brincadeira só funciona em grupos.`);
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
await mention(`Estou mencionando o *${q}* do grupo: *@${groupMembers[Math.floor(Math.random() * groupMetadata.participants.length)].id.split('@')[0]}*`);
break


case 'infocriador':
await tokito.sendMessage(from, {audio: fs.readFileSync(`./DADOS_TOKITO/data/media/audios/info_criador.mp3`), mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{ quoted: selo });
break;


case 'convite':
if(!budy.includes("chat.whatsapp.com")) return reply("Cadê o link do grupo que você deseja que eu entre?")
cnvt = args.join(" ")
reply(`O convite para o bot entrar em seu grupo, foi enviado, espere o dono aceitar..`)
await tokito.sendMessage(nmrdn, {text: mess.groupInvitation(sender, cnvt, prefix)}, {quoted: selo})
break

case 'recusar_convite':
if(!SoDono) return reply(mess.onlyOwner());
await tokito.sendMessage(`${q}@s.whatsapp.net`, {text: `Olá amigo(a), sinto muito dizer, mas seu convite foi recusado.`}, {quoted: selo});
break


case 'sip': case 'ip': 
if (!q) return reply(`Informe o ip que você deseja! *Exemplo:* ${prefix+command} 8.8.8.8`)
try {
ip = await axios.get(`https://ipwhois.app/json/${encodeURIComponent(q)}`);
await tokito.sendMessage(from, {image: {url: `https://maps.googleapis.com/maps/api/streetview?size=1400x1400&location=${ip.data.latitude},%20${ip.data.longitude}&sensor=false&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg`}, caption: mess.searchIpAdress(ip)}, {quoted: selo});
await tokito.sendMessage(from, {location: {degreesLatitude: ip.data.latitude,degreesLongitude: ip.data.longitude, addrees: ''}}, {quoted: selo});
} catch(error) {
reply(mess.error())
}
break

case 'mytag':
inff = `${pushname}`
tokito.sendMessage(from, {text: inff}, {quoted: selo})
break

case 'getbio':
case 'getb': {
if (!menc_os2 && !q) return reply(`*🌪️ ᴍᴀʀǫᴜᴇ ᴏ ᴜꜱᴜᴀʀɪᴏ ᴏᴜ ᴅɪɢɪᴛᴇ ᴏ ɴᴜᴍᴇʀᴏ ᴄᴏᴍ ᴏᴜ ꜱᴇᴍ ᴏ @*`);
reply("*ᴩᴇɢᴀɴᴅᴏ ᴀ ʙɪᴏɢʀᴀꜰɪᴀ ᴅᴏ ᴜꜱᴜᴀʀɪᴏ ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ ✨*");
try {
let numero = menc_os2 ? menc_os2.split('@')[0] : q.replace(/\D/g, '');
const getbb = `${numero}@s.whatsapp.net`;
let recadoW;
try {
const recadoUser = await tokito.fetchStatus(getbb);
recadoW = recadoUser[0]?.status?.status || "*privado*";
} catch {
recadoW = "*privado*";
}
const jidParaMencionar = menc_os2 ? menc_os2 : `${numero}@s.whatsapp.net`;
await tokito.sendMessage(
from,
{
text: `*🗿 | ʙɪᴏɢʀᴀꜰɪᴀ ᴅᴏ ᴜꜱᴜᴀʀɪᴏ:* @${numero}\n•\n> ${recadoW}`,
contextInfo: { ...DLchanneldl, mentionedJid: [jidParaMencionar] }
},
{ quoted: selo }
);
} catch (e) {
console.log(e);
reply(mess.error());
}
}
break;

case 'getperfil': {
if (!menc_os2 && !q) return reply(`*🌪️ ᴍᴀʀǫᴜᴇ ᴏ ᴜꜱᴜᴀʀɪᴏ ᴏᴜ ᴅɪɢɪᴛᴇ ᴏ ɴᴜᴍᴇʀᴏ ᴄᴏᴍ ᴏᴜ ꜱᴇᴍ ᴏ @*`);
let numero = menc_os2 ? menc_os2.split('@')[0] : q.replace(/\D/g, '');
reply("*ᴩᴇɢᴀɴᴅᴏ ᴏ ᴩᴇʀꜰɪʟ ᴅᴏ ᴜꜱᴜᴀʀɪᴏ ᴀɢᴜᴀʀᴅᴇ ᴜᴍ ᴍᴏᴍᴇɴᴛᴏ 🙇‍♂️*");
let ppimgUrl;
try {
ppimgUrl = await tokito.profilePictureUrl(`${numero}@s.whatsapp.net`, 'image');
} catch {
ppimgUrl = imgperfil;
}
const jidParaMencionar = menc_os2 ? menc_os2 : `${numero}@s.whatsapp.net`;
await tokito.sendMessage(
from,
{
image: { url: ppimgUrl },
caption: `*⚡ | ᴩᴇʀꜰɪʟ ᴅᴏ ᴜꜱᴜᴀʀɪᴏ:* @${numero}\n> *🗿 ꜱᴇ ᴄᴀꜱᴏ ᴠᴏᴄᴇ ǫᴜᴇɪʀᴀ ᴩᴇɢᴀʀ ᴀ ʙɪᴏɢʀᴀꜰɪᴀ ᴅᴏ ᴜꜱᴜᴀʀɪᴏ ᴜꜱᴇ ᴏ ᴄᴏᴍᴀɴᴅᴏ:* ${prefix}getbio`,
contextInfo: { ...DLchanneldl, mentionedJid: [jidParaMencionar] }
},
{ quoted: selo }
);
}
break;

case 'doc':
case 'docfake':
try {
sprd = "|"
if(!q) return reply(`${prefix + command} exemplo${sprd}500${sprd}apk\n-\nOs tipos aceitos por enquanto são: pdf > xml > zip > jpg > ppt > apk > txt > aac > pptx > aac > m4a > mp4 > mp3 > svg > png`)
kls = args.join(' ')
let nomedoc = kls.split(sprd)[0] || `${setting.NomeDoBot}`
let peso = kls.split(sprd)[1] * 1000000 || '1000000'
let mimetyp = kls.split(sprd)[2].replace(" ", "") || 'gif'
let thumbc = kls.split(sprd)[3] || 'https://google.com/'
if(mimetyp.toLowerCase() == 'pdf') mimetyp = 'application/pdf'
if(mimetyp.toLowerCase() == 'apk') mimetyp = 'application/vnd.Android 🚀.package-archive'
if(mimetyp.toLowerCase() == 'aac') mimetyp = 'audio/aac'
if(mimetyp.toLowerCase() == 'xml') mimetyp = 'application/xml'
if(mimetyp.toLowerCase() == 'zip') mimetyp = 'application/zip'
if(mimetyp.toLowerCase() == 'jpg') mimetyp = 'image/jpeg'
if(mimetyp.toLowerCase() == 'ppt') mimetyp = 'application/vnd.ms-powerpoint'
if(mimetyp.toLowerCase() == 'pptx') mimetyp = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
if(mimetyp.toLowerCase() == 'mp4') mimetyp = 'video/mp4'
if(mimetyp.toLowerCase() == 'm4a') mimetyp = 'audio/mpeg'
if(mimetyp.toLowerCase() == 'mp3') mimetyp = 'audio/mpeg'
if(mimetyp.toLowerCase() == 'gif') mimetyp = 'image/gif'
if(mimetyp.toLowerCase() == 'png') mimetyp = 'image/png'
if(mimetyp.toLowerCase() == 'svg') mimetyp = 'image/svg+xml'
if(mimetyp.toLowerCase() == 'txt') mimetyp = 'text/plain'
let Messagemdoc = {document: fs.readFileSync('./DADOS_TOKITO/data/docf.txt'), mimetype: mimetyp, jpegThumbnail: await getBuffer(thumbc), fileName: nomedoc, fileLength: peso, headerType: 4, contextInfo:{forwardingScore:999,isForwarded:true}}
await tokito.sendMessage(from, Messagemdoc, {quoted: selo})
} catch (err) {
console.log(err)
reply(mess.error())
}
break

//=============[ FIM RANDOM CMD ]=========\\

//===========[ PLAQS ]=============\\

case 'plaq': 
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
reagir(from, "🕒")
buffer = await getBuffer(`https://raptibef.sirv.com/images%20(3).jpeg?text.0.text=${q}&text.0.position.gravity=center&text.0.position.x=19%25&text.0.size=45&text.0.color=000000&text.0.opacity=55&text.0.font.family=Crimson%20Text&text.0.font.weight=300&text.0.font.style=italic&text.0.outline.opacity=21`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq1':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
reagir(from, "🕒")
buffer = await getBuffer(`https://raptibef.sirv.com/images%20(1).jpeg?profile=Zanga%202.0&text.0.text=${q}`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq2':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
reagir(from, "🕒")
buffer = await getBuffer(`https://raptibef.sirv.com/images.jpeg?profile=Zanga%203.0&text.0.text=${q}&text.0.outline.blur=63`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq3':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
reagir(from, "🕒")
buffer = await getBuffer(`https://umethroo.sirv.com/Torcedora-da-sele%C3%A7%C3%A3o-brasileira-nua-mostrando-a-bunda-236x300.jpg?text.0.text=${q}&text.0.position.x=-64%25&text.0.position.y=-39%25&text.0.size=25&text.0.color=1b1a1a&text.0.font.family=Architects%20Daughter`) //api
plaq = ` *Plaquinha feita ✓* `
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq4':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
reagir(from, "🕒")
buffer = await getBuffer(`https://umethroo.sirv.com/peito1.jpg?text.0.text=${q}&text.0.position.x=-4%25&text.0.position.y=-6%25&text.0.size=14&text.0.color=000000&text.0.font.family=Shadows%20Into%20Light&text.0.font.weight=700`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq5':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
buffer = await getBuffer(`https://lerrewor.sirv.com/Teste/images%20(1)%20(6).jpeg?text.0.text=${q}&text.0.position.x=-17%25&text.0.position.y=-20%25&text.0.size=41&text.0.color=000000&text.0.opacity=59&text.0.font.family=PT%20Mono&text.0.outline.blur=10" width="463" height="662" alt="" />`,`https://lerrewor.sirv.com/Teste/images%20(1)%20(12).jpeg?text.0.text=${q}&text.0.position.x=-20%25&text.0.position.y=-35%25&text.0.size=41&text.0.color=000000&text.0.font.family=Playball&text.0.background.opacity=16&text.0.outline.color=ff0000&text.0.outline.blur=24" width="225" height="225" alt="" />`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq6':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
buffer = await getBuffer(`https://lerrewor.sirv.com/Teste/images%20(1)%20(5).jpeg?text.0.text=${q}&text.0.position.x=-45%25&text.0.position.y=-29%25&text.0.size=36&text.0.color=000000&text.0.opacity=65&text.0.font.family=PT%20Sans%20Narrow" width="479" height="640" alt="" />`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq7':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
buffer = await getBuffer(`https://lerrewor.sirv.com/Teste/images%20(1)%20(10).jpeg?text.0.text=${q}&text.0.position.y=-25%25&text.0.size=41&text.0.color=000000&text.0.font.family=Vollkorn&text.0.background.opacity=100" width="193" height="261" alt="" />`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq8':
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
buffer = await getBuffer(`https://lerrewor.sirv.com/Teste/images%20(1)%20(9).jpeg?text.0.text=${q}&text.0.position.x=-49%25&text.0.position.y=-19%25&text.0.size=45&text.0.color=000000&text.0.opacity=97&text.0.font.family=Patrick%20Hand" width="250" height="333" alt="" />`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

case 'plaq9': 
if(!isGroup)
if (args.length < 1) return reply('❕Ei humano, cadê o texto?')
if (q.length > 25) return reply('❗O texto é longo, o máximo é 25 caracteres.')
buffer = await getBuffer(`https://lerrewor.sirv.com/Teste/images%20(1)%20(8).jpeg?text.0.text=${q}&text.0.position.x=-28%25&text.0.position.y=-41%25&text.0.size=41&text.0.color=000000&text.0.opacity=99&text.0.font.family=Signika" width="225" height="225" alt="" />`)
sendMsg = tokito.sendMessage(sender, {image: buffer}, {quoted: selo}),
reply(`Eai, ${pushname}, preparado(a)? Enviando agora verifique seu pv... 😈🔥`)
break

//==============[ FIM PLAQS]============\\


//==========[ DOWNLOADS DO tokito ]==============\\

case 'nick': {
if (!args[0]) return reply('❌ Digite o nick que deseja transformar, exemplo: /fazernick Vitor');
let nick = args.join(' ');

// 30 fontes diferentes
let fontes = [
{ nome: 'Negrito', texto: nick.split('').map(c => ({ a:'𝐚',b:'𝐛',c:'𝐜',d:'𝐝',e:'𝐞',f:'𝐟',g:'𝐠',h:'𝐡',i:'𝐢',j:'𝐣',k:'𝐤',l:'𝐥',m:'𝐦',n:'𝐧',o:'𝐨',p:'𝐩',q:'𝐪',r:'𝐫',s:'𝐬',t:'𝐭',u:'𝐮',v:'𝐯',w:'𝐰',x:'𝐱',y:'𝐲',z:'𝐳'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Itálico', texto: nick.split('').map(c => ({ a:'𝘢',b:'𝘣',c:'𝘤',d:'𝘥',e:'𝘦',f:'𝘧',g:'𝘨',h:'𝘩',i:'𝘪',j:'𝘫',k:'𝘬',l:'𝘭',m:'𝘮',n:'𝘯',o:'𝘰',p:'𝘱',q:'𝘲',r:'𝘳',s:'𝘴',t:'𝘵',u:'𝘶',v:'𝘷',w:'𝘸',x:'𝘹',y:'𝘺',z:'𝘻'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Negrito Itálico', texto: nick.split('').map(c => ({ a:'𝙖',b:'𝙗',c:'𝙘',d:'𝙙',e:'𝙚',f:'𝙛',g:'𝙜',h:'𝙝',i:'𝙞',j:'𝙟',k:'𝙠',l:'𝙡',m:'𝙢',n:'𝙣',o:'𝙤',p:'𝙥',q:'𝙦',r:'𝙧',s:'𝙨',t:'𝙩',u:'𝙪',v:'𝙫',w:'𝙬',x:'𝙭',y:'𝙮',z:'𝙯'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Monospace', texto: nick.split('').map(c => ({ a:'𝚊',b:'𝚋',c:'𝚌',d:'𝚍',e:'𝚎',f:'𝚏',g:'𝚐',h:'𝚑',i:'𝚒',j:'𝚓',k:'𝚔',l:'𝚕',m:'𝚖',n:'𝚗',o:'𝚘',p:'𝚙',q:'𝚚',r:'𝚛',s:'𝚜',t:'𝚝',u:'𝚞',v:'𝚟',w:'𝚠',x:'𝚡',y:'𝚢',z:'𝚣'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Subscrito', texto: nick.split('').map(c => ({ a:'ₐ',b:'b',c:'c',d:'d',e:'ₑ',f:'f',g:'g',h:'h',i:'ᵢ',j:'j',k:'k',l:'l',m:'m',n:'ₙ',o:'ₒ',p:'p',q:'q',r:'ᵣ',s:'s',t:'ₜ',u:'ᵤ',v:'v',w:'w',x:'x',y:'y',z:'z'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Sobrescrito', texto: nick.split('').map(c => ({ a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ᶦ',j:'ʲ',k:'ᵏ',l:'ˡ',m:'ᵐ',n:'ⁿ',o:'ᵒ',p:'ᵖ',q:'ᑫ',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Cursivo', texto: nick.split('').map(c => ({ a:'𝒶',b:'𝒷',c:'𝒸',d:'𝒹',e:'ℯ',f:'𝒻',g:'𝑔',h:'𝒽',i:'𝒾',j:'𝒿',k:'𝓀',l:'𝓁',m:'𝓂',n:'𝓃',o:'ℴ',p:'𝓅',q:'𝓆',r:'𝓇',s:'𝓈',t:'𝓉',u:'𝓊',v:'𝓋',w:'𝓌',x:'𝓍',y:'𝓎',z:'𝓏'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Gótico', texto: nick.split('').map(c => ({ a:'𝔞',b:'𝔟',c:'𝔠',d:'𝔡',e:'𝔢',f:'𝔣',g:'𝔤',h:'𝔥',i:'𝔦',j:'𝔧',k:'𝔨',l:'𝔩',m:'𝔪',n:'𝔫',o:'𝔬',p:'𝔭',q:'𝔮',r:'𝔯',s:'𝔰',t:'𝔱',u:'𝔲',v:'𝔳',w:'𝔴',x:'𝔵',y:'𝔶',z:'𝔷'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Bloco', texto: nick.split('').map(c => ({ a:'🅰️',b:'🅱️',c:'🅲',d:'🅳',e:'🅴',f:'🅵',g:'🅶',h:'🅷',i:'🅸',j:'🅹',k:'🅺',l:'🅻',m:'🅼',n:'🅽',o:'🅾️',p:'🅿️',q:'🆀',r:'🆁',s:'🆂',t:'🆃',u:'🆄',v:'🆅',w:'🆆',x:'🆇',y:'🆈',z:'🆉'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Espelhado', texto: nick.split('').map(c => ({a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Coração', texto: nick.split('').map(c => ({a:'🄰',b:'🄱',c:'🄲',d:'🄳',e:'🄴',f:'🄵',g:'🄶',h:'🄷',i:'🄸',j:'🄹',k:'🄺',l:'🄻',m:'🄼',n:'🄽',o:'🄾',p:'🄿',q:'🅀',r:'🅁',s:'🅂',t:'🅃',u:'🅄',v:'🅅',w:'🅆',x:'🅇',y:'🅈',z:'🅉'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Quadrado', texto: nick.split('').map(c => ({a:'🅰',b:'🅱',c:'🅲',d:'🅳',e:'🅴',f:'🅵',g:'🅶',h:'🅷',i:'🅸',j:'🅹',k:'🅺',l:'🅻',m:'🅼',n:'🅽',o:'🅾',p:'🅿',q:'🆀',r:'🆁',s:'🆂',t:'🆃',u:'🆄',v:'🆅',w:'🆆',x:'🆇',y:'🆈',z:'🆉'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Estrela', texto: nick.split('').map(c => `*${c}*`).join('') },
{ nome: 'Underline', texto: nick.split('').map(c => `_${c}_`).join('') },
{ nome: 'Riscado', texto: nick.split('').map(c => `̶${c}`).join('') },
{ nome: 'Bolinha', texto: nick.split('').map(c => `⃝${c}`).join('') },
{ nome: 'Grego', texto: nick.split('').map(c => ({a:'α',b:'β',c:'χ',d:'δ',e:'ε',f:'φ',g:'γ',h:'η',i:'ι',j:'ϳ',k:'κ',l:'λ',m:'μ',n:'ν',o:'ο',p:'π',q:'ϙ',r:'ρ',s:'σ',t:'τ',u:'υ',v:'ϑ',w:'ω',x:'ξ',y:'ψ',z:'ζ'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Russo', texto: nick.split('').map(c => ({a:'а',b:'в',c:'с',d:'д',e:'е',f:'ф',g:'г',h:'н',i:'і',j:'ј',k:'к',l:'л',m:'м',n:'н',o:'о',p:'р',q:'ҁ',r:'г',s:'ѕ',t:'т',u:'ц',v:'ѵ',w:'щ',x:'х',y:'у',z:'з'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Kanji', texto: nick.split('').map(c => ({a:'日',b:'本',c:'中',d:'国',e:'文',f:'学',g:'習',h:'字',i:'漢',j:'字',k:'書',l:'法',m:'音',n:'楽',o:'語',p:'文',q:'学',r:'文',s:'書',t:'道',u:'学',v:'漢',w:'字',x:'書',y:'法',z:'文'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Emoji Aleatório', texto: nick.split('').map(c => '😀😎😍🤖🎮🎵🛸🚀'[Math.floor(Math.random()*12)]).join('') },
{ nome: 'Gótico Duplo', texto: nick.split('').map(c => ({a:'𝕒',b:'𝕓',c:'𝕔',d:'𝕕',e:'𝕖',f:'𝕗',g:'𝕘',h:'𝕙',i:'𝕚',j:'𝕛',k:'𝕜',l:'𝕝',m:'𝕞',n:'𝕟',o:'𝕠',p:'𝕡',q:'𝕢',r:'𝕣',s:'𝕤',t:'𝕥',u:'𝕦',v:'𝕧',w:'𝕨',x:'𝕩',y:'𝕪',z:'𝕫'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Neon', texto: nick.split('').map(c => `✨${c}✨`).join('') },
{ nome: 'Futurista', texto: nick.split('').map(c => `🅕${c}🅡`).join('') },
{ nome: 'Círculo Pequeno', texto: nick.split('').map(c => `◌${c}`).join('') },
{ nome: 'Estilo Matemático', texto: nick.split('').map(c => ({a:'𝑎',b:'𝑏',c:'𝑐',d:'𝑑',e:'𝑒',f:'𝑓',g:'𝑔',h:'ℎ',i:'𝑖',j:'𝑗',k:'𝑘',l:'𝑙',m:'𝑚',n:'𝑛',o:'𝑜',p:'𝑝',q:'𝑞',r:'𝑟',s:'𝑠',t:'𝑡',u:'𝑢',v:'𝑣',w:'𝑤',x:'𝑥',y:'𝑦',z:'𝑧'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Curly', texto: nick.split('').map(c => ({a:'ą',b:'ƀ',c:'ç',d:'ď',e:'ę',f:'ƒ',g:'ğ',h:'ħ',i:'į',j:'ĵ',k:'ķ',l:'ł',m:'ɱ',n:'ń',o:'ø',p:'ƥ',q:'ɋ',r:'ŕ',s:'ş',t:'ť',u:'ų',v:'ṽ',w:'ŵ',x:'ẋ',y:'ý',z:'ž'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Fancy', texto: nick.split('').map(c => ({a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'}[c.toLowerCase()]||c)).join('') },
{ nome: 'Square Bold', texto: nick.split('').map(c => ({a:'🄰',b:'🄱',c:'🄲',d:'🄳',e:'🄴',f:'🄵',g:'🄶',h:'🄷',i:'🄸',j:'🄹',k:'🄺',l:'🄻',m:'🄼',n:'🄽',o:'🄾',p:'🄿',q:'🅀',r:'🅁',s:'🅂',t:'🅃',u:'🅄'}[c.toLowerCase()]||c)).join('') },
];

const { prepareWAMessageMedia } = require('@whiskeysockets/baileys');
const imagemFundo = './DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.jpg';
const img = await prepareWAMessageMedia({ image: { url: imagemFundo } }, { upload: tokito.waUploadToServer });

let cards = fontes.map(f => ({
header: {
title: f.texto,
subtitle: f.nome,
hasMediaAttachment: true,
imageMessage: img.imageMessage
},
body: { text: '' },
footer: { text: `Fonte: ${f.nome}` },
nativeFlowMessage: {
buttons: [
{
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: '🧊『 ᴄʟɪǫᴜᴇ ᴘᴀʀᴀ ᴄᴏᴘɪᴀʀ 』🧊',
copy_code: f.texto
})
}
],
messageParamsJson: ""
}
}));

await tokito.relayMessage(from, {
interactiveMessage: {
body: { text: `> *ᴛʀᴀɴsғᴏʀᴍᴀᴅᴏʀ ᴅᴇ ɴɪᴄᴋ 🎨:* ${nick}` },
carouselMessage: { cards }
}
}, { quoted: selo });
}
break//by: Dylan modz 
 
case 'play2': {
  if (!q) {
    return reply(`🧊 | Digite o nome da música!\nEx: *${prefix}play2 Perfect*`);
  }

  try {
    await reagir(from, "⌛");

    // PESQUISA
    let data = await fetchJson(
      `https://tokito-apis.site/api/youtube-search?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`
    );

    if (!data || !data.status || !data.resultado || data.resultado.length === 0) {
      return reply("❌ Nenhum resultado encontrado.");
    }

    const m = data.resultado[0];

    const gerarImagem = () =>
      `https://tokito-apis.site/canvas/musicard?nome=${encodeURIComponent(m.title || "Desconhecido")}&autor=${encodeURIComponent(m.author?.name || "Desconhecido")}&logo=${encodeURIComponent(m.thumbnail || "https://tokito-apis.site/1bb9ce.jpg")}&thumb=${encodeURIComponent(m.thumbnail || "https://tokito-apis.site/1bb9ce.jpg")}&end=${encodeURIComponent(m.timestamp || "00:00")}&apikey=${API_KEY_TOKITO}`;

    const imgAudio = await prepareWAMessageMedia(
      { image: { url: gerarImagem() } },
      { upload: tokito.waUploadToServer }
    );

    const imgVideo = await prepareWAMessageMedia(
      { image: { url: gerarImagem() } },
      { upload: tokito.waUploadToServer }
    );

    const imgDoc = await prepareWAMessageMedia(
      { image: { url: gerarImagem() } },
      { upload: tokito.waUploadToServer }
    );

    const topButtons = [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "🎬 VIDEO",
          id: `${prefix}play-video ${m.url}`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "📄 DOCUMENTO",
          id: `${prefix}playdoc ${m.url}`
        })
      }
    ];

    const cardAudio = {
      header: {
        hasMediaAttachment: true,
        imageMessage: imgAudio.imageMessage
      },
      body: {
        text:
          `🎧 *${m.title}*\n` +
          `🎤 ${m.author?.name || "Desconhecido"}\n` +
          `⏳ ${m.timestamp || "00:00"}\n` +
          `👀 ${Intl.NumberFormat("pt-BR").format(m.views || 0)}\n\n` +
          `Opção: Áudio de melhor qualidade`
      },
      footer: {
        text: "↩️ [ 🎧 Áudio ]"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "🎧 Áudio",
              id: `${prefix}play-audio ${m.url}`
            })
          }
        ]
      }
    };

    const cardVideo = {
      header: {
        hasMediaAttachment: true,
        imageMessage: imgVideo.imageMessage
      },
      body: {
        text:
          `🎬 *${m.title}*\n` +
          `🎤 ${m.author?.name || "Desconhecido"}\n` +
          `⏳ ${m.timestamp || "00:00"}\n` +
          `👀 ${Intl.NumberFormat("pt-BR").format(m.views || 0)}\n\n` +
          `Opção: Vídeo`
      },
      footer: {
        text: "↩️ [ 🎬 Vídeo ]"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "🎬 Vídeo",
              id: `${prefix}play-video ${m.url}`
            })
          }
        ]
      }
    };

    const cardDoc = {
      header: {
        hasMediaAttachment: true,
        imageMessage: imgDoc.imageMessage
      },
      body: {
        text:
          `📄 *${m.title}*\n` +
          `🎤 ${m.author?.name || "Desconhecido"}\n` +
          `⏳ ${m.timestamp || "00:00"}\n` +
          `👀 ${Intl.NumberFormat("pt-BR").format(m.views || 0)}\n\n` +
          `Opção: Documento`
      },
      footer: {
        text: "↩️ [ 📄 Documento ]"
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "📄 Documento",
              id: `${prefix}playdoc ${m.url}`
            })
          }
        ]
      }
    };

    await tokito.relayMessage(
      from,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: "⬅️ Escolha uma opção abaixo:"
              },
              nativeFlowMessage: {
                buttons: topButtons
              },
              carouselMessage: {
                cards: [cardAudio, cardVideo, cardDoc]
              }
            }
          }
        }
      },
      { quoted: info }
    );

    await reagir(from, "✨");
  } catch (e) {
    console.log(e);
    reply("❌ Erro ao buscar música.");
  }
  break;
}


case 'pinterest':
case 'pin': {
try {
if (!q)
return reply(
'*❌ ᴅɪɢɪᴛᴇ ᴏ ɴᴏᴍᴇ ᴅᴀ ɪᴍᴀɢᴇᴍ*\n' +
`🧊] *ᴇxᴇᴍᴘʟᴏ:* ${prefix + command} ᴀɴɪᴍᴇ`
);

await reagir(from, "📷");

await tokito.sendMessage(
from,
{
image: {
url: `https://tokito-apis.site/api/pinterest?q=${encodeURIComponent(q)}&mode=landscape&apikey=${API_KEY_TOKITO}`
},
caption:
'> 🎨 *ɪᴍᴀɢᴇᴍ ᴅᴏ ᴘɪɴᴛᴇʀᴇsᴛ*\n' +
`> 🔎 *ᴘᴇsǫᴜɪsᴀ:* ${q}`,
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: setting.channeldl,
newsletterName: NomeDoBot,
serverMessageId: -1
}
}
},
{ quoted: info }
);

} catch (error) {
console.log(error);
reply(mess.error());
}
}
break;



case 'spotify':
case 'sp': {
  try {
    if (!q) {
      return reply(`❌ | Digite o nome da música!\nEx: *${prefix + command} no batidão*`)
    }

    await reagir(from, '🎧')

    const api = `${API_URL}/api/spotify-play?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`
    const data = await fetchJson(api)

    if (!data || !data.status || (!data.resultado && !data.result)) {
      await reagir(from, '❌')
      return reply('❌ | Música não encontrada.')
    }

    const musica = data.resultado || data.result

    const downloadUrl =
      musica.download_url ||
      musica.downloadUrl ||
      musica.audio ||
      musica.url_audio ||
      null

    if (!downloadUrl) {
      await reagir(from, '❌')
      return reply('❌ | Não foi possível obter o áudio.')
    }

    const title = musica.title || 'Não encontrado'
    const artist = musica.artist || musica.artists || 'Não encontrado'
    const duration = musica.duration || musica.duracao || '0:00'
    const url = musica.url || musica.spotify_url || musica.link || ''
    const thumb = musica.thumbnail || musica.image || musica.cover || logoslink?.logo

    const album =
      musica.album ||
      musica.album_name ||
      musica.albumName ||
      'Spotify'

    const popularity =
      musica.popularity ||
      musica.popularidade ||
      0

    const releaseAt =
      musica.release_at ||
      musica.release_date ||
      musica.releaseDate ||
      musica.date ||
      ''

    const safeTitle = String(title).replace(/[\\/:*?"<>|]/g, '').trim() || 'spotify'

    const cardUrl =
      `${API_URL}/canvas/spotify?` +
      `apikey=${encodeURIComponent(API_KEY_TOKITO)}` +
      `&title=${encodeURIComponent(title)}` +
      `&artist=${encodeURIComponent(artist)}` +
      `&duration=${encodeURIComponent(duration)}` +
      `&thumbnail=${encodeURIComponent(thumb)}` +
      `&popularity=${encodeURIComponent(popularity)}` +
      `&album=${encodeURIComponent(album)}` +
      `&release_at=${encodeURIComponent(releaseAt)}` +
      `&url=${encodeURIComponent(url)}` +
      `&download_url=${encodeURIComponent(downloadUrl)}`

    let texto = `*🎧 | 𝐒𝐏𝐎𝐓𝐈𝐅𝐘 𝐌𝐔𝐒𝐈𝐂*\n\n` +
      `- *🤖 | 𝙱𝙾𝚃 → ${NomeDoBot}*\n` +
      `- *👤 | 𝚄𝚂𝚄Á𝚁𝙸𝙾 → ${pushname}*\n` +
      `- *🎶 | 𝚃Í𝚃𝚄𝙻𝙾 → ${title}*\n` +
      `- *🎤 | 𝙰𝚁𝚃𝙸𝚂𝚃𝙰 → ${artist}*\n` +
      `- *💿 | 𝙰𝙻𝙱𝚄𝙼 → ${album}*\n` +
      `- *🔥 | 𝙿𝙾𝙿𝚄𝙻𝙰𝚁𝙸𝙳𝙰𝙳𝙴 → ${popularity}%*\n` +
      `- *📅 | 𝙻𝙰𝙽Ç𝙰𝙼𝙴𝙽𝚃𝙾 → ${releaseAt || 'Sem data'}*\n` +
      `- *⏱️ | 𝙳𝚄𝚁𝙰ÇÃ𝙾 → ${duration}*\n` +
      `- *🔗 | 𝙻𝙸𝙽𝙺 → ${url || 'Indisponível'}*`

    await tokito.sendMessage(from, {
      image: { url: cardUrl },
      caption: texto,
      contextInfo: canalInfo([sender])
    }, { quoted: info })

    await tokito.sendMessage(from, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      fileName: `${safeTitle}.mp3`,
      contextInfo: canalInfo([sender])
    }, { quoted: info })

    await reagir(from, '✅')

  } catch (e) {
    console.log('[SPOTIFY CASE ERRO]', e?.response?.data || e)
    await reagir(from, '❌')
    reply('❌ | Erro ao buscar a música.')
  }
}
break
case 'capcut':
case 'capcutdl': {
try {
if (!q) return reply(`❌ | Digite o link do CapCut!\nEx: *${prefix + command} https://www.capcut.com/tv2/ZSuWHGkDf/*`)

await reagir(from, "⌛")

let api = `${API_URL}/api/capcut-download?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`
let data = await fetchJson(api)

if (!data || !data.status || !data.resultado) {
await reagir(from, "❌")
return reply("❌ | Vídeo do CapCut não encontrado.")
}

let capcut = data.resultado

let caption = `🎬 *CAPCUT DOWNLOAD*
━━━━━━━━━━━━━━━━━━━
- *📌 | ᴛɪ́ᴛᴜʟᴏ:* ${capcut.title || "Desconhecido"}
- *🆔 | ɪᴅ:* ${capcut.id || "Desconhecido"}
- *⏱️ | ᴅᴜʀᴀᴄ̧ᴀ̃ᴏ:* ${capcut.duration || "Desconhecido"}
- *👁️ | ᴜsᴏs:* ${capcut.usage || "0"}
- *❤️ | ʟɪᴋᴇs:* ${capcut.likes || "0"}
- *📝 | ᴅᴇsᴄʀɪᴄ̧ᴀ̃ᴏ:* ${capcut.description || "Sem descrição"}
━━━━━━━━━━━━━━━━━━━
- *👤 | ᴀᴜᴛᴏʀ:* ${capcut.author?.name || "Desconhecido"}
🔗 *Link:* ${capcut.url || "Indisponível"}`

await tokito.sendMessage(from, {
image: { url: capcut.thumbnail },
caption: caption
}, { quoted: info })

if (capcut.url) {
await tokito.sendMessage(from, {
video: { url: capcut.url },
caption: `🎬 ${capcut.title || "CapCut"}`
}, { quoted: info })
}

await reagir(from, "✅")

} catch (e) {
console.log('[CAPCUT CASE ERRO]', e)
await reagir(from, "❌")
reply("❌ | Erro ao buscar o vídeo do CapCut.")
}
}
break
case 'applemusic':
case 'apple':
case 'am': {
try {
if (!q) return reply(`❌ | Envie o link do Apple Music!\nEx: *${prefix + command} https://music.apple.com/...*`)

await reagir(from, "⌛")

const audioUrl = `${API_URL}/api/applemusic-audio?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`

await tokito.sendMessage(from, {
audio: { url: audioUrl },
mimetype: 'audio/mpeg',
ptt: false,
fileName: 'apple-music.mp3'
}, { quoted: info })

await reagir(from, "✅")

} catch (e) {
console.log('[APPLE MUSIC CASE ERRO]', e)
await reagir(from, "❌")
reply("❌ | Erro ao baixar a música.")
}
}
break
case 'soundcloud':
case 'sc': {
try {
if (!q) return reply(`❌ | Digite o nome ou link da música!\nEx: *${prefix + command} mc ig*`)

await reagir(from, '🎧')

let api = `${API_URL}/api/soundcloud?q=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`
let data = await fetchJson(api)

if (!data || !data.status || !data.resultado) {
await reagir(from, '❌')
return reply('❌ | Música não encontrada.')
}

let musica = data.resultado

const title = musica.title || 'Não encontrado'
const artist = musica.artist || 'Não encontrado'
const duration = musica.duration || musica.tempo || 'Não encontrado'
const url = musica.url || 'Indisponível'

// capa garantida
const thumb = musica.image || musica.thumbnail || logoslink?.logo

let texto = `*🎧 | 𝐒𝐎𝐔𝐍𝐃𝐂𝐋𝐎𝐔𝐃 𝐌𝐔𝐒𝐈𝐂*\n\n- *🤖 | 𝙱𝙾𝚃 → ${NomeDoBot}*\n- *👤 | 𝚄𝚂𝚄Á𝚁𝙸𝙾 → ${pushname}*\n- *🎶 | 𝚃Í𝚃𝚄𝙻𝙾 → ${title}*\n- *🎤 | 𝙰𝚁𝚃𝙸𝚂𝚃𝙰 → ${artist}*\n- *⏱️ | 𝙳𝚄𝚁𝙰ÇÃ𝙾 → ${duration}*\n- *🔗 | 𝙻𝙸𝙽𝙺 → ${url}*`

// envia com capa da música
await tokito.sendMessage(from, {
image: { url: thumb },
caption: texto,
contextInfo: canalInfo([sender])
}, { quoted: selo })

// áudio
await tokito.sendMessage(from, {
audio: { url: musica.audio },
mimetype: 'audio/mpeg',
fileName: `${title.replace(/[\\/:*?"<>|]/g, '')}.mp3`,
ptt: false,
contextInfo: canalInfo([sender])
}, { quoted: selo })

await reagir(from, '✅')

} catch (e) {
console.log('[SOUNDCLOUD ERRO]', e)
await reagir(from, '❌')
return reply(mess.error())
}
}
break

case 'sound_audio':
case 'soundcloudmp3':
case 'sc':
case 'scmp3': {
try {
if (!q) return reply(`❌ | Digite o link do SoundCloud!\nEx: *${prefix + command} https://soundcloud.com/artista/musica*`)

await reagir(from, "🎧")

const apiUrl = `${API_URL}/api/soundcloud-audio?url=${encodeURIComponent(q.trim())}&apikey=${API_KEY_TOKITO}`

await tokito.sendMessage(
from,
{
audio: { url: apiUrl },
mimetype: "audio/mpeg",
ptt: false
},
{ quoted: selo }
)

await reagir(from, "✅")

} catch (e) {
console.log('[SOUNDCLOUD MP3 ERRO]', e)
await reagir(from, "❌")
return reply(mess.error())
}
}
break;


case 'spotify_audio':
case 'spy': {
try {
if (!q)
return reply(`${prefix + command} link do Spotify`);
if (!/open\.spotify\.com\/(track|playlist|album)/i.test(q))
return reply("❌ Envie um link válido do Spotify.");
await reagir(from, "🎧");
reply(mess.wait())
const apiUrl = `https://tokito-apis.site/api/downloads/spotify-mp3?url=${encodeURIComponent(q.trim())}&apikey=${API_KEY_TOKITO}`;
await tokito.sendMessage(
from,
{
audio: { url: apiUrl },
mimetype: "audio/mpeg",
ptt: false
},
{ quoted: selo }
);
await reagir(from, "✅");
} catch (e) {
console.log('[SPOTIFY ERRO]', e);
await reagir(from, "❌");
return reply(mess.error());
}
}
break;

case 'pinvideo':
case 'pinterestvideo':
case 'pinvid': {
try {
if (!q)
return reply(
'*❌ ᴅɪɢɪᴛᴇ ᴏ ʟɪɴᴋ ᴅᴏ ᴘɪɴᴛᴇʀᴇsᴛ*\n' +
`🧊] *ᴇxᴇᴍᴘʟᴏ:* ${prefix + command} https://pin.it/2a3paLt9X`
);

await reagir(from, "🎥");

const apiUrl =
`https://tokito-apis.site/api/pin-video?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(
from,
{
video: { url: apiUrl },
mimetype: "video/mp4",
caption:
'> 🎥 *ᴠɪ́ᴅᴇᴏ ᴅᴏ ᴘɪɴᴛᴇʀᴇsᴛ*\n' +
`> 🔗 *ʟɪɴᴋ:* ${q}`,
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: setting.channeldl,
newsletterName: NomeDoBot,
serverMessageId: -1
}
}
},
{ quoted: info }
);

} catch (error) {
console.log(error);
reply(mess.error());
}
}
break;

case 'youtubemix':
case 'ytmix': {
try {
if (!q)
return reply(
'*❌ ᴅɪɢɪᴛᴇ ᴏ ɴᴏᴍᴇ ᴅᴀ ᴍᴜ́sɪᴄᴀ / ᴀʀᴛɪsᴛᴀ*\n' +
`🧊] *ᴇxᴇᴍᴘʟᴏ:* ${prefix + command} matue`
);

await reagir(from, "🎶");

const url = `https://tokito-apis.site/api/youtube-mix?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
const res = await fetch(url);
const json = await res.json();

if (!json.data || !json.data.length)
return reply('❌ Nenhum resultado encontrado.');

const lista = json.data.slice(0, 5); // top 5
const primeiro = lista[0];

let texto = `🎧 *YOUTUBE MIX — ${q}*\n\n`;

lista.forEach((v, i) => {
texto +=
`*${i + 1}.* ${v.title}\n` +
`⏱️ ${v.timestamp} • 👤 ${v.author.name}\n` +
`🔗 ${v.url}\n\n`;
});

await tokito.sendMessage(
from,
{
image: { url: primeiro.thumbnail },
caption: texto.trim()
},
{ quoted: info }
);

} catch (e) {
console.log(e);
reply(mess.error());
}
}
break;
case 'ytsearch2':
case 'youtube-search': {
try {
if (!q)
return reply(
'*❌ ᴅɪɢɪᴛᴇ ᴏ ɴᴏᴍᴇ ᴅᴏ ᴠɪ́ᴅᴇᴏ / ᴀʀᴛɪsᴛᴀ*\n' +
`🧊] *ᴇxᴇᴍᴘʟᴏ:* ${prefix + command} matue 1993`
);

await reagir(from, "🔍");

const url = `https://tokito-apis.site/api/youtube-search?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
const res = await fetch(url);
const json = await res.json();

if (!json.status || !json.resultado || !json.resultado.length)
return reply('❌ Nenhum resultado encontrado.');

const lista = json.resultado.slice(0, 5); // top 5
const primeiro = lista[0];

let texto = `🔎 *YOUTUBE SEARCH — ${q}*\n\n`;

lista.forEach((v, i) => {
texto +=
`*${i + 1}.* ${v.title}\n` +
`⏱️ ${v.timestamp || 'N/A'} • 👤 ${v.author?.name || 'Desconhecido'}\n` +
`🔗 ${v.url}\n\n`;
});

await tokito.sendMessage(
from,
{
image: { url: primeiro.thumbnail },
caption: texto.trim()
},
{ quoted: info }
);

} catch (e) {
console.log(e);
reply(mess.error());
}
}
break;
case 'geminitts':
case 'ttsgemini': {
try {

if (!q)
return reply(`${prefix + command} texto`);

await reagir(from, "🎧");

const apiUrl = `https://tokito-apis.site/api/gemini-tts?texto=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(
from,
{
audio: { url: apiUrl },
mimetype: "audio/mpeg",
ptt: false
},
{ quoted: selo }
);

await reagir(from, "✅");

} catch (e) {
console.log('[GEMINI TTS ERRO]', e);
await reagir(from, "❌");
return reply(mess.error());
}
}
break;


case 'gemini': {
try {

if (!q)
return reply("❗ Faça uma pergunta.");

const data = await fetchJson(
API_URL + `/api/gemini?texto=${encodeURIComponent(iaPrompt(q))}&apikey=` + API_KEY_TOKITO
);
let resposta = '';
if (typeof data?.resposta === 'string') {
resposta = data.resposta.trim();
} else if (data?.resposta?.candidates?.length) {
resposta = data.resposta.candidates[0]?.content?.parts
?.map(p => p.text || '')
.join('')
.trim();
} else if (data?.candidates?.length) {
resposta = data.candidates[0]?.content?.parts
?.map(p => p.text || '')
.join('')
.trim();
}
if (!resposta) resposta = "Sem resposta da IA.";
await reply(resposta);
} catch (err) {
console.error('Erro no comando Gemini:', err);
reply("Erro ao usar a IA.");

}

}
break;

case 'gemini-pro': {
try {

if (!q)
return reply("❗ Faça uma pergunta.");

const data = await fetchJson(
API_URL + `/api/gemini-pro?texto=${encodeURIComponent(iaPrompt(q))}&apikey=` + API_KEY_TOKITO
);
let resposta = '';
if (typeof data?.resposta === 'string') {
resposta = data.resposta.trim();
} else if (data?.resposta?.candidates?.length) {
resposta = data.resposta.candidates[0]?.content?.parts
?.map(p => p.text || '')
.join('')
.trim();
} else if (data?.candidates?.length) {
resposta = data.candidates[0]?.content?.parts
?.map(p => p.text || '')
.join('')
.trim();
}
if (!resposta) resposta = "Sem resposta da IA.";
await reply(resposta);
} catch (err) {
console.error('Erro no comando Gemini:', err);
reply("Erro ao usar a IA.");

}

}
break;


case 'aurora-ia': {
try {

if (!q)
return reply("❗ Faça uma pergunta.");

const data = await fetchJson(
API_URL + `/api/tokito-ia?texto=${encodeURIComponent(iaPrompt(q))}&apikey=` + API_KEY_TOKITO
);
let resposta = '';
if (typeof data?.resposta === 'string') {
resposta = data.resposta.trim();
} else if (data?.resposta?.candidates?.length) {
resposta = data.resposta.candidates[0]?.content?.parts
?.map(p => p.text || '')
.join('')
.trim();
} else if (data?.candidates?.length) {
resposta = data.candidates[0]?.content?.parts
?.map(p => p.text || '')
.join('')
.trim();
}
if (!resposta) resposta = "Sem resposta da IA.";
await reply(resposta);
} catch (err) {
console.error('Erro no comando Gemini:', err);
reply("Erro ao usar a IA.");

}

}
break;

case 'openai':
case 'gpt':
case 'chatgpt': {
try {

if (!q) return reply(`Digite sua pergunta.`)

await reagir(from, "💬")

const apiUrl = `${API_URL}/api/openai?q=${encodeURIComponent(iaPrompt(q))}&apikey=${API_KEY_TOKITO}`
const { data } = await axios.get(apiUrl)

if (!data || !data.status || !data.resposta) {
await reagir(from, "❌")
return reply('Erro ao obter resposta.')
}

await reply(data.resposta)

await reagir(from, "✅")

} catch (e) {
console.log(e)
await reagir(from, "❌")
reply('Erro ao consultar IA.')
}
}
break;

case 'perplexity':
case 'perplexityai':
case 'ppx': {
try {

if (!q) return reply(`Digite sua pergunta.`)

await reagir(from, "🧠")

const apiUrl = `${API_URL}/api/perplexity-ai?q=${encodeURIComponent(iaPrompt(q))}&apikey=${API_KEY_TOKITO}`
const { data } = await axios.get(apiUrl)

if (!data || !data.status || !data.resposta) {
await reagir(from, "❌")
return reply('Erro ao obter resposta.')
}

await reply(data.resposta)

await reagir(from, "✅")

} catch (e) {
console.log(e)
await reagir(from, "❌")
reply('Erro ao consultar IA.')
}
}
break;
case 'cria': 
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_api.jpg?text.0.text=${teks}&text.0.color=000000&text.0.font.family=Pacifico&text.0.font.weight=600&text.0.background.color=ffffff&text.0.outline.color=ffffff&text.0.outline.width=10&text.0.outline.blur=17`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break

case 'anime1':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis2.jpg?text.0.text=${teks}&text.0.position.gravity=center&text.0.position.x=1%25&text.0.position.y=16%25&text.0.size=80&text.0.color=ff2772&text.0.opacity=67&text.0.font.family=Bangers&text.0.font.style=italic&text.0.background.opacity=50&text.0.outline.width=6`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break

case 'ff1':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis3.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=59%25&text.0.size=89&text.0.color=000000&text.0.opacity=71&text.0.font.family=Changa%20One&text.0.font.style=italic&text.0.background.opacity=10&text.0.outline.color=ffffff&text.0.outline.width=3`)
tokito.sendMessage(from, { image: Nkzin }, {quoted: selo })
break	

case 'game':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis5.jpg?text.0.text=${teks}&text.0.position.gravity=center&text.0.position.x=1%25&text.0.position.y=22%25&text.0.align=left&text.0.size=59&text.0.font.family=Permanent%20Marker&text.0.outline.color=df00ff&text.0.outline.width=2&text.0.outline.blur=18`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break

case 'ff2':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis6.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.x=1%25&text.0.position.y=50%25&text.0.size=68&text.0.color=464646&text.0.opacity=51&text.0.font.family=Sigmar%20One&text.0.background.opacity=2&text.0.outline.color=ffffff&text.0.outline.width=2&text.0.outline.opacity=61`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break	

case 'anime2':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis7.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.x=1%25&text.0.position.y=58%25&text.0.size=69&text.0.color=00ffea&text.0.opacity=37&text.0.font.family=Bangers&text.0.background.opacity=77&text.0.outline.color=ffffff&text.0.outline.width=2&text.0.outline.blur=20`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break

case 'entardecer':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis9.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=50%25&text.0.size=68&text.0.color=ffffff&text.0.opacity=61&text.0.font.family=Tangerine&text.0.font.style=italic&text.0.background.opacity=61&text.0.outline.color=ff6f00&text.0.outline.width=9`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break

case 'indian':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis10.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=62%25&text.0.size=63&text.0.color=004124&text.0.opacity=99&text.0.font.family=Permanent%20Marker&text.0.font.style=italic&text.0.background.color=feff00&text.0.outline.color=ffe8a3&text.0.outline.width=9&text.0.outline.blur=21`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break 

case 'ffrose':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis12.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=65%25&text.0.size=61&text.0.color=ff00e6&text.0.opacity=32&text.0.font.family=Chewy&text.0.font.style=italic&text.0.outline.width=6`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break	

case 'ffgren':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis13.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=63%25&text.0.size=68&text.0.color=ffffff&text.0.opacity=92&text.0.font.family=Permanent%20Marker&text.0.font.weight=800&text.0.outline.color=5dff00&text.0.outline.width=13&text.0.outline.blur=21`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break		

case 'chufuyu':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis14.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=68%25&text.0.size=60&text.0.color=ffffff&text.0.font.family=Sigmar%20One&text.0.font.style=italic&text.0.background.opacity=17&text.0.outline.color=a99cff&text.0.outline.width=9&text.0.outline.blur=16`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break	

case 'wolf':
if (args.length < 1) return reply("cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis15.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=62%25&text.0.size=63&text.0.color=000000&text.0.font.family=Audiowide&text.0.font.style=italic&text.0.background.opacity=15&text.0.outline.color=ffffff&text.0.outline.width=9&text.0.outline.blur=33`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break	

case 'dragonred':
if (args.length < 1) return reply("Cade o texto ?")
teks = q
if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
reply(`*ɢᴇʀᴀɴᴅᴏ ᴀ sᴜᴀ ʟᴏɢᴏ, ᴀɢᴜᴀʀᴅᴇ 🙇‍♂️*`)
Nkzin = await getBuffer(`https://lollityp.sirv.com/venom_apis16.jpg?text.0.text=${teks}&text.0.position.gravity=north&text.0.position.y=58%25&text.0.size=99&text.0.color=fffefe&text.0.font.family=Permanent%20Marker&text.0.background.color=000000&text.0.outline.color=000000&text.0.outline.width=19&text.0.outline.blur=66`)
tokito.sendMessage(from, { image: Nkzin }, { quoted: selo })
break
 
case 'instagram':
case 'insta':
case 'insta_video': {
await reagir(from, "⏳");
try {
if (!q || q.length < 5)
return reply(`*${prefix + command} ʟɪɴᴋ ᴅᴏ ɪɴꜱᴛᴀɢʀᴀᴍ ᴩᴏʀ ɢᴇɴᴛɪʟᴇᴢᴀ 💁‍♂️*`);
const apiUrl = `https://tokito-apis.site/api/insta-video?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
await tokito.sendMessage(from, {
video: { url: apiUrl },
mimetype: "video/mp4",
}, { quoted: selo });

} catch (e) {
console.log(e);
return reply(mess.error());
}
}
break;

case 'insta_audio':
case 'instagram_audio': {
await reagir(from, "⏳");
try {
if (!q || q.length < 5)
return reply(`*${prefix + command} ʟɪɴᴋ ᴅᴏ ɪɴꜱᴛᴀɢʀᴀᴍ ᴩᴏʀ ɢᴇɴᴛɪʟᴇᴢᴀ 💁‍♂️*`);
const apiUrl = `https://tokito-apis.site/api/insta-video?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
await tokito.sendMessage(from, {
audio: { url: apiUrl },
mimetype: "audio/mpeg",
ptt: false
}, { quoted: selo });
} catch (e) {
console.log(e);
return reply(mess.error());
}
}
break;

case 'tiktok':
case 'tiktok_video':
await reagir(from, "⏳")
try {
if (!q) return reply(`${prefix + command} link do Tiktok`);
await tokito.sendMessage(from, {
video: {
url: `https://tokito-apis.site/api/tiktok-video?url=${q}&apikey=${API_KEY_TOKITO}`
},
mimetype: "video/mp4"
}, { quoted: selo });
} catch (e) {
console.log(e);
return reply(mess.error());
}
break;

case 'tiktokaudio':
case 'tiktok_audio':
await reagir(from, "⏳")
try {
if (!q) return reply(`${prefix + command} link do Tiktok`);
const apiUrl = `https://tokito-apis.site/api/tiktok-video?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
await tokito.sendMessage(from, {
audio: {
url: apiUrl
},
mimetype: "audio/mpeg",
ptt: false
}, { quoted: selo });
} catch (e) {
console.log(e);
return reply(mess.error());
}
break;

case 'tiktok_foto':
case 'ttkfoto':
case 'tiktok_all':
await reagir(from, "⏳");
try {
if (!q) return reply(`${prefix + command} link do TikTok`);
const axios = require("axios");
const firstResp = await axios.get(
`https://tokito-apis.site/api/tiktok-foto?url=${q}&apikey=${API_KEY_TOKITO}&index=0`,
{ responseType: 'stream' }
);
const total = parseInt(firstResp.headers['x-total-fotos']) || 1;
await tokito.sendMessage(
from,
{
image: {
url: `https://tokito-apis.site/api/tiktok-foto?url=${q}&apikey=${API_KEY_TOKITO}&index=0`
}
},
{ quoted: selo }
);
for (let i = 1; i < total; i++) {
await tokito.sendMessage(
from,
{
image: {
 url: `https://tokito-apis.site/api/tiktok-foto?url=${q}&apikey=${API_KEY_TOKITO}&index=${i}`
}
},
{ quoted: selo }
);
}

} catch (e) {
console.log(e);
return reply(mess.error());
}
break;


case 'facebook':
try {

if (!q) {
return reply(`📘 Exemplo: ${prefix + command} link do Facebook\n\n📝 Cole o link do vídeo do Facebook (facebook.com ou fb.watch).`);
}
if (!q.includes("facebook.com") && !q.includes("fb.watch")) {
return reply("❌ Envie um link válido do Facebook.");
}
const url = `https://tokito-apis.site/api/facebook?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
await tokito.sendMessage(from, {
video: { url: url },
mimetype: "video/mp4"
}, { quoted: info });

} catch (e) {
console.error(e);
return reply("❌ Erro ao processar vídeo do Facebook...");
}
break;
case 'face_audio':
case 'fbaudio':
await reagir(from, "⏳")
try {

if (!q) return reply(`${prefix + command} link do Facebook`);

if (!q.includes("facebook.com") && !q.includes("fb.watch")) {
return reply("❌ Envie um link válido do Facebook.");
}

const api = `${API_URL}/api/facebook?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(from, {
audio: { url: api },
mimetype: "audio/mpeg",
ptt: false
}, { quoted: selo });

} catch (e) {
console.log(e);
return reply(mess.error());
}
break;
case 'tiktokpesq': {
try {
if (!q) {
return reply(
`*🧊 Opa! Parece que você esqueceu de colocar o título da pesquisa!*\n` +
`🧊 Exemplo: *${prefix + command} edit aurora*`
);
}

reply(
`*🧊 Procurando TikTok com:* *${q.trim()}*...\n` +
`*⏳ Segura aí, já já aparece pra você!*`
);

const tiktoksearch = await fetchJson(
`https://tokito-apis.site/api/tiktok-search?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`
);

const result = tiktoksearch.resultado;
if (!result) return reply(mess.error());

const caption = `🎬 *ᴛíᴛᴜʟᴏ:* ${result.titulo || "Desconhecido"}`;

// Envia SOMENTE o vídeo
await tokito.sendMessage(
from,
{
video: { url: result.videos },
mimetype: result.mime || "video/mp4",
caption: caption,
newsletterJid: `${setting.channeldl}`,
newsletterName: `${NomeDoBot}`,
},
{ quoted: selo }
);

} catch (err) {
console.error(err);
reply(
`⚠️┆Ocorreu um erro ao tentar buscar no TikTok!\nTente novamente mais tarde.`
);
}
}
break;
case 'fakemsg':
case 'fakechat'://Criado por Nk 
if ([prefix, "&", "/", "#", "+"].includes(q.trim())) {
return reply(`_Infelizmente não pode ser colocado comandos no fake chat._`);
}

const [repplace, tarrget, bott] = q.split("|");

const m_ = info.message.extendedTextMessage && info.message.extendedTextMessage.contextInfo && info.message.extendedTextMessage.contextInfo.mentionedJid ? info.message.extendedTextMessage.contextInfo.mentionedJid[0] : null;

if (!m_ || !tarrget || !bott) {
return reply(`- Exemplo:\n\n ${prefix}fakechat _@user|mensagem do usuário|Sua mensagem_`);
}

tokito.sendMessage(from, {
text: bott
}, {
quoted: {
key: {
fromMe: false,
participant: m_
},
message: {
conversation: tarrget
}
}
});
break;

case 'shazam': {
if ((isMedia && !info.message.imageMessage) || isQuotedAudio) {
await reagir(from, "✨");
let encmedia;
if (isQuotedAudio) {
encmedia = info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage;
} else {
encmedia = info.message.audioMessage;
}
try {
const infoMusica = await identificarMusica(encmedia, arcloud, ytAudio, DLT_FL, getRandom, getExtension, getFileBuffer);
let txt = mess.shazam(infoMusica).trim();
await tokito.sendMessage(from, {image: { url: infoMusica.thumbYT }, caption: txt, contextInfo: DLchanneldl
}, { quoted: selo });
if (infoMusica.infoYT?.download?.url) {
await tokito.sendMessage(from, {audio: { url: infoMusica.infoYT.download.url }, mimetype: 'audio/mpeg', fileName: `${infoMusica.tituloYT}.mp3`, contextInfo: DLchanneldl
}, { quoted: selo });
} else {
reply(mess.error());
}} catch (e) {
console.log(e);
reply(mess.error());
}} else {
reply('*ᴍᴀʀǫᴜᴇ ᴜᴍ ᴀᴜᴅɪᴏ 🙇‍♂️*');
}
break;
}


case 'play-audio': {
try {
if (!q || !q.trim())
return reply(`❌ Exemplo: ${prefix + command} nome da música`);

await reagir(from, "🎧");

const apiUrl =
`https://tokito-apis.site/api/youtube-audio?q=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(
from,
{
audio: { url: apiUrl },
mimetype: "audio/mpeg",
fileName: "audio.mp3",
contextInfo: DLchanneldl
},
{ quoted: selo }
);

} catch (e) {
console.log(e);
reply("❌ Erro ao buscar o áudio.");
}
}
break;

case 'play-video': {
try {
if (!q || !q.trim())
return reply(`❌ Exemplo: ${prefix + command} nome do vídeo`);

await reagir(from, "🎥");

const apiUrl =
`https://tokito-apis.site/api/youtube-video?q=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;

await tokito.sendMessage(
from,
{
video: { url: apiUrl },
mimetype: "video/mp4",
fileName: "video.mp4",
contextInfo: DLchanneldl
},
{ quoted: selo }
);

} catch (e) {
console.log(e);
reply("❌ Erro ao buscar o vídeo.");
}
}
break;


case 'play':
case 'ytplay': {
  try {
    if (!q || !q.trim()) {
      return reply(`*❌ | 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁, 𝙸𝙽𝚂𝙸𝚁𝙰 𝙾 𝙽𝙾𝙼𝙴 𝙳𝙰 𝙼𝚄́𝚂𝙸𝙲𝙰.*`)
    }

    await reagir(from, "🎧")

    const contextInfo = {
      mentionedJid: [sender],
      isForwarded: true,
      forwardingScore: 1,
      forwardedNewsletterMessageInfo: {
        newsletterJid: `${setting.channeldl}`,
        newsletterName: `${NomeDoBot}`,
        serverMessageId: "",
      },
    }

    // Busca a música pelo yt-search
    const pesquisa = await yts(q)

    if (!pesquisa || !pesquisa.videos || pesquisa.videos.length === 0) {
      await reagir(from, "❌")
      return reply(`*❌ | 𝙽𝙰̃𝙾 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙴𝙸 𝙽𝙴𝙽𝙷𝚄𝙼 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾.*`)
    }

    const video = pesquisa.videos[0]

    const title = video.title || 'Não encontrado'
    const channel = video.author?.name || video.author || 'Não encontrado'
    const duration = video.timestamp || video.duration?.timestamp || '0:00'
    const thumbnail = video.image || video.thumbnail || logoslink?.logo
    const url = video.url || `https://www.youtube.com/watch?v=${video.videoId}`

    const safeTitle = String(title)
      .replace(/[\\/:*?"<>|]/g, '')
      .trim() || 'audio'

    // Card novo YouTube
    const card =
      `${API_URL}/canvas/youtube?` +
      `apikey=${encodeURIComponent(API_KEY_TOKITO)}` +
      `&titulo=${encodeURIComponent(title)}` +
      `&canal=${encodeURIComponent(channel)}` +
      `&duracao=${encodeURIComponent(duration)}` +
      `&capa=${encodeURIComponent(thumbnail)}` +
      `&fundo=${encodeURIComponent(thumbnail)}`

    const texto = `*🎧 | 𝐏𝐋𝐀𝐘 𝐀𝐔𝐃𝐈𝐎*

- *🤖 | 𝙱𝙾𝚃 → ${NomeDoBot}*
- *👤 | 𝚄𝚂𝚄Á𝚁𝙸𝙾 → ${pushname}*
- *🎶 | 𝚃Í𝚃𝚄𝙻𝙾 → ${title}*
- *📺 | 𝙲𝙰𝙽𝙰𝙻 → ${channel}*
- *⏱️ | 𝙳𝚄𝚁𝙰ÇÃ𝙾 → ${duration}*
- *🔗 | 𝙻𝙸𝙽𝙺 → ${url}*`

    await tokito.sendMessage(from, {
      image: { url: card },
      caption: texto,
      contextInfo
    }, { quoted: selo })

    // Usa sua API nova pra mandar o áudio
    const audioUrl = `https://tokito-apis.site/api/youtube-audio?q=${encodeURIComponent(url)}&apikey=${API_KEY_TOKITO}`

    await tokito.sendMessage(from, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
      fileName: `${safeTitle}.mp3`,
      contextInfo
    }, { quoted: selo })

    await reagir(from, "✅")

  } catch (e) {
    console.log('[PLAY ERRO]', e)
    await reagir(from, "❌")
    reply(`*❌ | 𝙴𝚁𝚁𝙾 𝙰𝙾 𝙱𝚄𝚂𝙲𝙰𝚁 𝙾 Á𝚄𝙳𝙸𝙾.*`)
  }
}
break


case 'playdoc': {
try {
if (!q || !q.trim())
return reply(`- Exemplo: ${prefix}playdoc nome da música`);

await reagir(from, "📃");

// 🔍 pega o título pelo youtube-search (mesma lógica do ytsearch2)
const searchUrl = `https://tokito-apis.site/api/youtube-search?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
const res = await fetch(searchUrl);
const json = await res.json();

if (!json.status || !json.resultado || !json.resultado.length)
return reply('❌ Nenhum resultado encontrado.');

const primeiro = json.resultado[0];

// título seguro
let title = primeiro.title || q;

// limpa caracteres inválidos
title = title.replace(/[\\/:*?"<>|]/g, '').slice(0, 60);

await tokito.sendMessage(
from,
{
document: {
url: `https://tokito-apis.site/api/youtube-doc?q=${encodeURIComponent(primeiro.url || q)}&apikey=${API_KEY_TOKITO}`
},
mimetype: "audio/mpeg",
fileName: `${title}.mp3`,
contextInfo: DLchanneldl
},
{ quoted: selo }
);

} catch (e) {
console.log(e);
reply(mess.error());
}
}
break;

case 'playstore':
if (!q) return reply(`NaN, você esqueceu de digitar após o comando.`)
try {
let AB = await fetchJson(`${API_URL}/api/playstore?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`)

if (!AB || !Array.isArray(AB) || AB.length == 0) return reply(mess.noresult())

let ABC = `> 𝐏𝐥𝐚𝐲𝐒𝐭𝐨𝐫𝐞 𝐀𝐩𝐩𝐬 - 𝐒𝐞𝐚𝐫𝐜𝐡\n–\n`
ABC += `${AB.map((v, index) => `*${index+1}.* Nome: *${v.nome}*\n• Url: *${v.link}*`).join('\n–\n')}`

await tokito.sendMessage(from, {
text: ABC,
contextInfo: {
externalAdReply: {
title: AB[0].nome,
body: `PlayStore Search`,
mediaType: 2,
sourceUrl: AB[0].link
}
}
}, { quoted: selo })

} catch (error) {
console.log(error)
return reply(mess.error())
}
break


case 'happymod': {
if (!q) return reply('❌ | Digite o nome do app.')

try {
let res = await fetchJson(`${API_URL}/api/happymod-search?q=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`)
if (!res || !res.status || !res.resultado || res.resultado.length === 0) {
return reply('❌ | Nenhum resultado encontrado.')
}
let v = res.resultado[0]
let teks = `*Nome:* ${v.title}
• Versão: ${v.version}
• Tamanho: ${v.size}
• Tipo: ${v.mod_status || 'Original'}
• Link: ${v.url}`
await tokito.sendMessage(from, {
image: { url: v.icon },
caption: teks
}, { quoted: info })

} catch (e) {
console.log(e)
reply('❌ | Erro ao buscar apps.')
}
}
break



case 'metadinha':
try {
await reagir(from, "💑️");
const anuData = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
let selectRandom = anuData[Math.floor(Math.random() * anuData.length)];

const maleMedia = await prepareWAMessageMedia({ image: { url: selectRandom.male } }, { upload: tokito.waUploadToServer });
const femaleMedia = await prepareWAMessageMedia({ image: { url: selectRandom.female } }, { upload: tokito.waUploadToServer });

const carouselMessage = {
text: "*Resultados da metadinha* 💝 ↴",
cards: [
{
header: {
hasMediaAttachment: true,
imageMessage: maleMedia.imageMessage
},
headerType: 'IMAGE',
body: {
text: "• Perfil Masculino 🕊️"
},
footer: {
text: `${NomeDoBot}`
},
nativeFlowMessage: {
buttons: []
}
},
{
header: {
hasMediaAttachment: true,
imageMessage: femaleMedia.imageMessage
},
headerType: 'IMAGE',
body: {
text: "• Perfil Feminino 🌸"
},
footer: {
text: `${NomeDoBot}`
},
nativeFlowMessage: {
buttons: []
}
}
]
};
await tokito.relayMessage(from, {
interactiveMessage: {
contextInfo: {
participant: from,
quotedMessage: {
documentMessage: {
contactVcard: true,
quoted: selo
}
}
},
body: { text: '*Resultados da metadinha* 💝 ↴' },
carouselMessage: carouselMessage
}
}, {});

} catch (e) {
console.log(e);
await tokito.sendMessage(from, { text: mess.error() }, { quoted: selo });
}
break; 


//==============[ FIM CASES DOWNLOADS ]============\\


//===========[ INFORMATIVOS DO tokito ]===============\\

case 'redacao':
if(!q) return reply(`Você esqueceu de colocar o tema de sua redação ao lado do comando.`)
try {
let { key } = await tokito.sendMessage(from, {text: `Estou processando sua solicitação. Isso pode levar alguns segundos...`}, {quoted: selo})
promptUser = `Crie um texto dissertativo-argumentativo com o tema: ${q}`
anu1 = await fetchJson(`https://aemt.me/gpt4?text=${promptUser}`)
await tokito.sendMessage(from, {text: mess.respostaRedacao(anu1), edit: key});
} catch(error) {
return reply(mess.error())
}
break

case 'summerize':
if(!q) return reply(`Você esqueceu de colocar o que você deseja resumir ao lado do comando.`)
try {
let { key } = await tokito.sendMessage(from, {text: `Estou resumindo o texto solicitado. Isso pode levar alguns segundos...`}, {quoted: selo})
promptUser = `Faça um resumo básico do texto apresentado: ${q}`
anu1 = await fetchJson(`https://aemt.me/gpt4?text=${promptUser}`)
await tokito.sendMessage(from, {text: mess.respostaResumida(anu1), edit: key})
} catch(error) {
return reply(mess.error())
}
break


case 'wikipedia': case 'wiki':
try {
if(!q) return reply(`Exemplo: ${prefix+command} JavaScript`)
await reagir(from, "✅")
wikip = await axios.get(`https://pt.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(q)}&prop=info&inprop=url`);
wikis = await axios.get(`https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${wikip.data.query.search[0].pageid}`);
var carre = [`${mess.wikiResposta(wikis)}`]
let { key } = await tokito.sendMessage(from, { text:`*⚡ᴀᴄᴀʙᴇɪ ᴅᴇ ᴀᴄʜᴀʀ ᴀǫᴜɪ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`}, {quoted: selo})
for (let i = 0; i < carre.length; i++) {
await new Promise(resolve => setTimeout(resolve, 5000)); // Atraso de 5 segundos
await tokito.sendMessage(from, { text: carre[i], mentions: [sender], edit: key });
}
} catch(error) {
reply(mess.error())
}
break


case 'book':
if (args.length == 0) return reply(`*Exemplo:* ${prefix+command} Nome do Livro`)
try {
const takeBook = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&langRestrict=pt`);
const getBook = await axios.get(`${takeBook.data.items[0].selfLink}`);
var bookImage = await getBuffer(getBook.data.volumeInfo.imageLinks.thumbnail)
await tokito.sendMessage(from, {image: bookImage, caption: mess.searchBooks(getBook)}, {quoted: selo})
} catch(error) {
reply(mess.error())
}
break

case 'clima':// YoshGGx
case 'tempo':
tokito.sendMessage(from, { react: { text: `📡`, key: info.key } })
if (args.length < 1) return reply(`*Sintaxe correta para uso:* ${prefix + command} nome da cidade\n• Caso tenha algum acento, retire ok?`)
cidade = body.slice(7)
clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=f5c0840c2457fbb64188a6d4be05618f&units=metric&lang=pt_br`)
if (clima.error) return reply(resposta.erro)
jr = `🌞 Temperatura agora: ${clima.data.main.temp}ºC\n🏙️ Cidade: ${clima.data.name}\n🔥 Temperatura Máxima: ${clima.data.main.temp_max}°C\n❄ Temperatura Mínima: ${clima.data.main.temp_min}°C\n🌦 Clima: ${clima.data.weather[0].description}\n💧 Umidade de ar: ${clima.data.main.humidity}%\n🌫 Ventos: ${clima.data.wind.speed}

Solicitado por: ${pushname}`
await tokito.sendMessage(from, { text: jr }, { quoted: selo, contextInfo: { "mentionedJid": jr } })
break


case 'simi':
if(!isGroup) return reply(mess.onlyGroup())
try {
datasimi = await fetchJson(`https://api.simsimi.vn/v1/simtalk`, {method: 'POST', headers: {'content-type': "application/x-www-form-urlencoded"}, body: "text="+q+"&lc=pt"});
var carre = [
`${datasimi.message}`]
let { key } = await tokito.sendMessage(from, { text:`*⚡ᴀᴄᴀʙᴇɪ ᴅᴇ ᴀᴄʜᴀʀ ᴀǫᴜɪ sᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*`}, {quoted: selo})
for (let i = 0; i < carre.length; i++) {
await new Promise(resolve => setTimeout(resolve, 5000));
await tokito.sendMessage(from, { text: carre[i], mentions: [sender], edit: key });
}
} catch (e) {
return reply("Resposta não encontrada..");
}
break

case 'getchannel':
case 'infoch': {//Dylan modz 
if (!q) return reply(`• Por favor, forneça o link do canal.\n\n> exemplo: ${prefix + command} https://whatsapp.com/channel/0029ValLKgUAO7RCUU0dO03k`);
await reagir(from, "🎉");
try {
let channelId;
if (q.includes('whatsapp.com/channel/')) {
channelId = q.split('whatsapp.com/channel/')[1].split('/')[0];
} else if (q.includes('wa.me/channel/')) {
channelId = q.split('wa.me/channel/')[1].split('/')[0];
} else {
channelId = text;}
const idNewsletter = await tokito.newsletterMetadata('invite', channelId);
const axios = require('axios');
const cheerio = require('cheerio');
const response = await axios.get(q);
const $ = cheerio.load(response.data);
const title = $('title').text() || 'Nome não encontrado';
const img = $('img._9vx6').attr('src');
const subs = $('h5._9vd5._9scy').text() || 'Seguidores não encontrados';
const description = $('h4._9vd5._9scb').text() || 'Descrição não encontrada';
await tokito.sendMessage(from, {
image: { url: img },
caption: `- 🌟 *Nome*: ${title}\n- 👤 *Seguidores*: ${subs}\n- 🎭 *Id Channel*: ${idNewsletter.id}\n- 🔗 *Link*: ↴\n${q}\n- 🌃 *Descrição*: ↴\n\n${description}`,
}, { quoted: selo });
} catch (e) {
reply('Ocorreu um erro ao tentar obter as informações do canal.');
console.log(e);
}
}
break;

case 'alugarbot':
case 'alugar': {
try {
if (!isModoAluguel) return reply(`「🧊」 ᴏ ᴍᴏᴅᴏ ᴀʟᴜɢᴜᴇʟ ɴᴀ̃ᴏ ᴇsᴛᴀ́ ᴀᴛɪᴠᴏ.`)
if (!isGroup) return reply(mess.onlyGroup())

await reagir(from, "💎")

const { prepareWAMessageMedia } = require('@whiskeysockets/baileys')
const imgPlano = './DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.png'

const planosAluguel = [
{ id: 1, dias: 15, valor: 10.00, nome: '15 Dias', desc: 'Alugue por 15 dias por apenas 10,00R$ e aproveite uma solução rápida, prática e econômica. Ideal para uso temporário, com estabilidade e segurança garantidas durante todo o período. ⏳' },
{ id: 2, dias: 30, valor: 20.00, nome: '30 Dias', desc: 'Com 30 dias por 20,00R$, você garante mais tempo, flexibilidade e melhor aproveitamento. Uma opção equilibrada para quem busca eficiência e conforto no dia a dia. 📅' },
{ id: 3, dias: 45, valor: 30.00, nome: '45 Dias', desc: 'Escolhendo 45 dias por 30,00R$, você obtém mais estabilidade e ótimo custo-benefício, ideal para quem quer mais tempo sem preocupações. 🛡️' },
{ id: 4, dias: 60, valor: 40.00, nome: '60 Dias', desc: 'Com 60 dias por 40,00R$, você garante tranquilidade por mais tempo, suporte prioritário e uso contínuo sem interrupções. 🚀' },
{ id: 5, dias: 90, valor: 55.00, nome: '90 Dias', desc: 'A melhor opção: 90 dias por 55,00R$, oferecendo máximo custo-benefício, estabilidade prolongada e uso sem preocupações. 💎' }
]

const mediaPlano = fs.existsSync(imgPlano)
? await prepareWAMessageMedia({ image: fs.readFileSync(imgPlano) }, { upload: tokito.waUploadToServer })
: null

const cards = planosAluguel.map(p => ({
header: mediaPlano?.imageMessage ? { hasMediaAttachment: true, imageMessage: mediaPlano.imageMessage } : { hasMediaAttachment: false },
headerType: mediaPlano?.imageMessage ? 'IMAGE' : 'TEXT',
body: {
text: `🌠 ${p.nome} -『 R$ ${p.valor.toFixed(2)} 』🌠

${p.desc}

- *📦 | 𝙿𝙻𝙰𝙽𝙾 → ${p.nome}*
- *💸 | 𝚅𝙰𝙻𝙾𝚁 → R$ ${p.valor.toFixed(2)}*
- *⏳ | 𝙳𝚄𝚁𝙰ÇÃ𝙾 → ${p.dias} dias*

> ᴄʟɪǫᴜᴇ ᴇᴍ ɢᴇʀᴀʀ ᴘɪx ᴘᴀʀᴀ ᴀʟᴜɢᴀʀ 🧊`
},
footer: { text: `ꜱᴜᴩᴏʀᴛᴇ ${NomeDoBot}` },
nativeFlowMessage: {
buttons: [
{
name: 'quick_reply',
buttonParamsJson: JSON.stringify({
display_text: '💵 𝙶𝙴𝚁𝙰𝚁 𝙿𝙸𝚇',
id: `${prefix}pixaluguel ${p.id}`
})
}
]
}
}))

const carouselMessage = {
text: `*⏤͟͟͞͞ESTÁ QUERENDO ALUGAR? OLHE A TABELA ABAIXO... 🙇‍♂️* ↴

- *🤖 | 𝙱𝙾𝚃 → ${NomeDoBot}*
- *👤 | 𝚄𝚂𝚄Á𝚁𝙸𝙾 → ${pushname}*
- *💵 | 𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾 → 𝙿𝙸𝚇*
- *📦 | 𝙿𝙻𝙰𝙽𝙾𝚂 → ${planosAluguel.length}*

> ᴘᴀssᴇ ᴘʀᴏ ʟᴀᴅᴏ ᴇ ᴇsᴄᴏʟʜᴀ ᴜᴍ ᴘʟᴀɴᴏ 🧊`,
cards
}

await tokito.relayMessage(from, {
interactiveMessage: {
contextInfo: {
participant: selo?.key?.participant || sender,
quotedMessage: selo?.message,
stanzaId: selo?.key?.id,
remoteJid: selo?.key?.remoteJid || from
},
body: { text: '' },
carouselMessage
}
}, {})

} catch (e) {
console.log(e)
await tokito.sendMessage(from, { text: mess.error() }, { quoted: selo })
}
}
break

case 'pixaluguel': {
try {
if (!isModoAluguel) return reply(`「🧊」 ᴏ ᴍᴏᴅᴏ ᴀʟᴜɢᴜᴇʟ ɴᴀ̃ᴏ ᴇsᴛᴀ́ ᴀᴛɪᴠᴏ.`)
if (!isGroup) return reply(mess.onlyGroup())
if (!q) return reply(`*ᴇsᴄᴏʟʜᴀ ᴜᴍ ᴘʟᴀɴᴏ. ᴇx: ${prefix}pixaluguel 1*`)

const { prepareWAMessageMedia } = require('@whiskeysockets/baileys')

const planosAluguel = [
{ id: 1, dias: 15, valor: 10.00, nome: '15 Dias' },
{ id: 2, dias: 30, valor: 20.00, nome: '30 Dias' },
{ id: 3, dias: 45, valor: 30.00, nome: '45 Dias' },
{ id: 4, dias: 60, valor: 40.00, nome: '60 Dias' },
{ id: 5, dias: 90, valor: 55.00, nome: '90 Dias' }
]

const entrada = Number(String(args[0] || '').replace(',', '.'))
let plano = planosAluguel.find(p => p.id === entrada) || planosAluguel.find(p => Number(p.valor) === entrada)
if (!plano) return reply('*❌ ɴᴀ̃ᴏ ᴇɴᴄᴏɴᴛʀᴇɪ ᴇssᴇ ᴘʟᴀɴᴏ. ᴜsᴇ ᴏ ᴍᴇɴᴜ ᴅᴇ ᴀʟᴜɢᴜᴇʟ.*')

await reagir(from, '💵')

const valor = Number(plano.valor)
const descricao = `Aluguel ${NomeDoBot} - ${plano.nome}`
const idempotencyKey = uuidv4()
const pagamentoInfo = await criarPagamentoPix(valor, descricao, idempotencyKey)

const qrBase64 = pagamentoInfo?.qr_code_base64 || pagamentoInfo?.point_of_interaction?.transaction_data?.qr_code_base64 || ''
const codigoPix = pagamentoInfo?.qr_code || pagamentoInfo?.point_of_interaction?.transaction_data?.qr_code || ''
const pagamentoId = pagamentoInfo?.id || pagamentoInfo?.payment_id || pagamentoInfo?.data?.id || ''

if (!pagamentoId || !codigoPix) return reply('*❌ ᴇʀʀᴏ ᴀᴏ ɢᴇʀᴀʀ ᴏ ᴘɪx. ɪᴅ ᴏᴜ ᴄóᴅɪɢᴏ ɴãᴏ ʀᴇᴛᴏʀɴᴏᴜ.*')
if (!qrBase64) return reply(`*❌ ᴏ ǫʀ ᴄᴏᴅᴇ ɴãᴏ ʀᴇᴛᴏʀɴᴏᴜ.*\n\n*💵 ᴄóᴅɪɢᴏ ᴘɪx:*\n${codigoPix}`)

const qrLimpo = String(qrBase64).replace(/^data:image\/\w+;base64,/, '')
const mediaQR = await prepareWAMessageMedia({ image: Buffer.from(qrLimpo, 'base64') }, { upload: tokito.waUploadToServer })

const carouselMessage = {
text: '*𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾 𝙳𝙴 𝙰𝙻𝚄𝙶𝚄𝙴𝙻*',
cards: [
{
header: {
hasMediaAttachment: true,
imageMessage: mediaQR.imageMessage
},
headerType: 'IMAGE',
body: {
text: `- *⚖️ | 𝐏𝐈𝐗 𝐆𝐄𝐑𝐀𝐃𝐎 𝐂𝐎𝐌 𝐒𝐔𝐂𝐄𝐒𝐒𝐎*
- *📦 | 𝙿𝙻𝙰𝙽𝙾 → ${plano.nome}*
- *💸 | 𝚅𝙰𝙻𝙾𝚁 → R$ ${valor.toFixed(2)}*
- *⏳ | 𝙳𝚄𝚁𝙰ÇÃ𝙾 → ${plano.dias} dias*
- *⚙️ | 𝙸𝙳 → ${pagamentoId}*
- *🪫 | 𝚂𝚃𝙰𝚃𝚄𝚂 → 𝙰𝙶𝚄𝙰𝚁𝙳𝙰𝙽𝙳𝙾 𝙿𝙰𝙶𝙰𝙼𝙴𝙽𝚃𝙾*

> ᴄʟɪǫᴜᴇ ɴᴏ ʙᴏᴛᴀ̃ᴏ ᴀʙᴀɪxᴏ ᴘᴀʀᴀ ᴄᴏᴘɪᴀʀ ᴏ ᴘɪx 🧊`
},
footer: {
text: '*ᴇxᴩɪʀᴀ ᴇᴍ 30 ᴍɪɴᴜᴛᴏꜱ*'
},
nativeFlowMessage: {
buttons: [
{
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: '💵 𝙲𝙾𝙿𝙸𝙰𝚁 𝙿𝙸𝚇',
copy_code: codigoPix
})
}
]
}
}
]
}

await tokito.relayMessage(from, {
interactiveMessage: {
contextInfo: {
participant: selo?.key?.participant || sender,
quotedMessage: selo?.message,
stanzaId: selo?.key?.id,
remoteJid: selo?.key?.remoteJid || from
},
body: { text: '' },
carouselMessage
}
}, {})

const tempoMaximo = 30 * 60 * 1000
const inicio = Date.now()

while (Date.now() - inicio < tempoMaximo) {
await sleep(5000)

const check = await verificarPix(pagamentoId)

if (check?.status === 'approved') {
const dias = Number(plano.dias) || 0
const horas = 0

const aluguelPath = './ARQUIVES/tictactoe/grupos_com_aluguel.json'

let listaAluguel = []
try {
if (fs.existsSync(aluguelPath)) listaAluguel = JSON.parse(fs.readFileSync(aluguelPath))
} catch {
listaAluguel = []
}

let grupoExistente = listaAluguel.find(g => g.id === from)

if (grupoExistente) {
const agoraMs = Date.now()
const expiraMs = new Date(grupoExistente.expiraEm).getTime()
const baseMs = expiraMs > agoraMs ? expiraMs : agoraMs
const novoVencimento = new Date(baseMs + ((dias * 24 + horas) * 60 * 60 * 1000))

grupoExistente.expiraEm = novoVencimento.toISOString()
grupoExistente.duracaoDias = Number(grupoExistente.duracaoDias || 0) + dias
grupoExistente.duracaoHoras = Number(grupoExistente.duracaoHoras || 0) + horas

fs.writeFileSync(aluguelPath, JSON.stringify(listaAluguel, null, 2))

if (typeof gruposAutorizados !== 'undefined' && Array.isArray(gruposAutorizados)) {
const i = gruposAutorizados.findIndex(g => g.id === from)
if (i >= 0) gruposAutorizados[i] = grupoExistente
else gruposAutorizados.push(grupoExistente)
}
} else {
ativarAluguelGrupo(from, dias, horas)

try {
if (fs.existsSync(aluguelPath)) listaAluguel = JSON.parse(fs.readFileSync(aluguelPath))
grupoExistente = listaAluguel.find(g => g.id === from)
} catch {}
}

const grupoAtualizado = grupoExistente || (typeof gruposAutorizados !== 'undefined' ? gruposAutorizados.find(g => g.id === from) : null)

const dataFormatada = grupoAtualizado?.expiraEm
? new Date(grupoAtualizado.expiraEm).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
: new Date(Date.now() + (dias * 24 * 60 * 60 * 1000)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

await reagir(from, '✅')
await reply(`「🧊」 ᴀʟᴜɢᴜᴇʟ ᴄᴏɴғɪʀᴍᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ.

📦 ᴘʟᴀɴᴏ: *${plano.nome}*
💸 ᴠᴀʟᴏʀ: *R$ ${valor.toFixed(2)}*
⏳ ᴅᴜʀᴀçãᴏ: *${dias} dias*
📅 ᴠᴇɴᴄɪᴍᴇɴᴛᴏ: *${dataFormatada}*

🧊 ᴏ ɢʀᴜᴘᴏ ᴀɢᴏʀᴀ ᴇsᴛá ᴄᴏᴍ ᴏ ᴀʟᴜɢᴜᴇʟ ᴀᴛɪᴠᴏ.`)
return
}
}

await reagir(from, '😿')
reply('*❌ ᴏ ᴛᴇᴍᴘᴏ ᴅᴏ ᴘᴀɢᴀᴍᴇɴᴛᴏ ᴇxᴘɪʀᴏᴜ. ɢᴇʀᴇ ᴏᴜᴛʀᴏ ᴘɪx ᴇ ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ.*')

} catch (e) {
console.error('Erro no pixaluguel:', e)
reply(mess.error())
}
}
break

case 'gpt-3.5': case 'chatgpt-3.5':
try {
if(!q) return reply("Você esqueceu de perguntar ao lado do comando.");
let { key } = await tokito.sendMessage(from, {text: `Estou processando sua pergunta, isso pode levar alguns segundos...`}, {quoted: selo});
data = await fetchJson(`https://aemt.me/turbo?text=${encodeURIComponent(iaPrompt(q))}`);
await tokito.sendMessage(from, {text: `${data.result}`, edit: key});
} catch(error) {
reply(mess.error());
}
break


case 'gtts':
try {
if (args.length < 1) return await tokito.sendMessage(from,{text: `Cade o texto?, digite algo Exemplo:\n${prefix}gtts PT Oi`}, {quoted: selo})
const gtts = require('./ARQUIVES/funcoes/gtts.js')(args[0])
if (args.length < 2) return await tokito.sendMessage(from, {text: 'Falta colocar o código do idioma!'}, {quoted: selo})
dtt = body.slice(8)
ranm = getRandom('.mp3')
rano = getRandom('.ogg')
if(dtt.length > 200) return reply('Para reduzir spam o máximo de letras permitidas são 200!')
gtts.save(ranm, dtt, async function() {
await exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, async(err) => {
await tokito.sendMessage(from, {audio: fs.readFileSync(ranm), mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo}).catch(async(error) => {
return reply(mess.error())
})
DLT_FL(ranm); DLT_FL(rano)
})
})
} catch(error) {
console.log(error)
return reply(mess.error())
}
break

case 'tagme':
const tagme = `@${sender.split("@")[0]} ✔️`
await mentions(tagme, [sender], true)
break

case 'avalia': {
try {
if(!isGroup) return reply(mess.onlyGroup())
const groupMetadata = await tokito.groupMetadata(from);
const members = groupMetadata.participants;
const randomMember = members[Math.floor(Math.random() * members.length)];
let profilePictureUrl;
try {
profilePictureUrl = await tokito.profilePictureUrl(randomMember.id, 'image');
} catch {
profilePictureUrl = imgperfil; 
}
const evaluations = ["Uma ótima escolha de foto de perfil!", "Essa foto mostra sua personalidade!", "Adorei a vibe dessa imagem!", "Você parece estar se divertindo nessa foto!", "Essa foto reflete bem quem você é!", "Que lindo essa foto, ameiii!!"];
const randomEvaluation = evaluations[Math.floor(Math.random() * evaluations.length)];
const messageContent = {
image: { url: profilePictureUrl },
caption: mess.avalia({ randomMember, info, groupName, isChVip, randomEvaluation }),
contextInfo: { ...DLchanneldl, mentionedJid: [randomMember.id] }
};
await tokito.sendMessage(from, messageContent, { quoted: selo });
} catch (e) {
console.error(e);
return reply(mess.error());
}
break;
}


case 'avaliar':
case 'avalie':
if(q.length < 1) return reply(`*ᴇxᴇᴍᴘʟᴏ ${prefix}ᴀᴠᴀʟɪᴇ ᴍᴇʟʜᴏʀ ʙᴏᴛ ǫᴜᴇ ᴊᴀ ᴠɪ!!*`);
if(q.length > 400) return reply(`*ᴠᴏᴄᴇ ᴘᴀssᴏᴜ ᴅᴇ 400 ᴄᴀʀᴀᴄᴛᴀʀᴇs*`);
await sendMentions(nmrdn, `*🌟 ᴀᴠᴀʟɪᴀᴄᴀᴏ ᴅᴇ: @${sender.split("@")[0]}*\n- *ᴅᴇᴛᴀʟʜᴇs:*\n• ${q}`);
await sendMentions(from, `*ᴄᴇʀᴛᴏ @${sender.split("@")[0]} ᴇɴᴠɪᴇɪ ᴀ sᴜᴀ ᴀᴠᴀʟɪᴀᴄᴀᴏ ᴀᴏ ᴍᴇᴜ ᴅᴏɴᴏ 🙇‍♂️*`);
break

case 'bug':
if(q.length < 1) return reply(`*ᴇxᴇᴍᴘʟᴏ ${prefix}ʙᴜɢ ᴏ ʙᴏᴛ ᴇsᴛᴀ ᴄᴏᴍ ᴀᴛʀᴀsᴏ*`);
if(q.length > 400) return reply(`*ᴠᴏᴄᴇ ᴘᴀssᴏᴜ ᴅᴇ 400 ᴄᴀʀᴀᴄᴛᴀʀᴇs*`);
await sendMentions(nmrdn, `*⚠ ᴏ ᴜsᴜᴀʀɪᴏ @${sender.split("@")[0]} ʀᴇʟᴀᴛᴏᴜ ᴀʟɢᴜᴍ ᴇʀʀᴏ ᴏᴜ ʙᴜɢ ɴᴏ ʙᴏᴛ*\n*ᴅᴇᴛᴀʟʜᴇs:*\n• ${q}`);
reply('*ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴠɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴀᴏ ᴍᴇᴜ ᴍᴇsᴛʀᴇ, ᴄᴀsᴏ ᴠᴏᴄᴇ ғʟᴏᴏᴅ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ᴢᴜᴇɪʀᴀ ᴇᴜ ɪʀᴇɪ ʙʟᴏǫᴜᴇᴀʀ ᴠᴏᴄᴇ ᴅᴇ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs 🙇‍♂️*');
break

case 'sugestão': case 'sugestao':
if(q.length < 1) return reply(`*ᴇxᴇᴍᴘʟᴏ ${prefix}sᴜɢᴇsᴛᴀᴏ ǫᴜᴇ ᴛᴀʟ ᴄᴏʟᴏᴄᴀʀ ᴜᴍ ᴄᴏᴍᴀɴᴅᴏ ǫᴜᴇ ғᴜɴᴄɪᴏɴᴇ ᴅᴀ ᴛᴀʟ ᴍᴀɴᴇɪʀᴀ? 🤷‍♂️*`);
if(q.length > 400) return reply(`*ᴠᴏᴄᴇ ᴘᴀssᴏᴜ ᴅᴇ 400 ᴄᴀʀᴀᴄᴛᴀʀᴇs*`);
await sendMentions(nmrdn, `*⚠ ᴏ ᴜsᴜᴀʀɪᴏ @${sender.split("@")[0]} sᴜɢᴇʀɪᴜ ᴜᴍ ᴄᴏᴍᴀɴᴅᴏ ᴏᴜ sɪsᴛᴇᴍᴀ ɴᴏ ʙᴏᴛ*\n*ᴅᴇᴛᴀʟʜᴇs:*\n• ${q}`);
reply('*ᴍᴇɴsᴀɢᴇᴍ ᴇɴᴠɪᴀᴅᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ ᴀᴏ ᴍᴇᴜ ᴍᴇsᴛʀᴇ, ᴄᴀsᴏ ᴠᴏᴄᴇ ғʟᴏᴏᴅ ᴏ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ᴢᴜᴇɪʀᴀ ᴇᴜ ɪʀᴇɪ ʙʟᴏǫᴜᴇᴀʀ ᴠᴏᴄᴇ ᴅᴇ ᴜsᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs 🙇‍♂️*');
break


case 'filme': {

if (!q) return reply('Digite o nome do filme.\n\nExemplo:\n.filme avatar')

try {

let res = await fetch(`https://tokito-apis.site/api/filme?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`)
let json = await res.json()

if (json.error) return reply(json.error)

let teks = `🎬 *FILME*\n\n`
teks += `📌 Título: ${json.titulo}\n`
teks += `🌍 Título original: ${json.titulo_original}\n`
teks += `📅 Lançamento: ${json.lancamento}\n`
teks += `⭐ Avaliação: ${json.avaliacao}\n`
teks += `🗳 Votos: ${json.votos}\n`
teks += `🔥 Popularidade: ${json.popularidade}\n`
teks += `🌐 Idioma: ${json.idioma_original}\n\n`
teks += `📝 Sinopse:\n${json.sinopse}`

await tokito.sendMessage(from, {
image: { url: json.imagem },
caption: teks
}, { quoted: selo })

} catch (err) {
console.log(err)
reply('Erro ao buscar o filme.')
}

}
break
case 'serie': {

if (!q) return reply('Digite o nome da série.\n\nExemplo:\n.serie breaking bad')

try {

let res = await fetch(`https://tokito-apis.site/api/serie?query=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`)
let json = await res.json()

if (json.error) return reply(json.error)

let teks = `📺 *SÉRIE*\n\n`
teks += `📌 Título: ${json.titulo}\n`
teks += `🌍 Título original: ${json.titulo_original}\n`
teks += `📅 Lançamento: ${json.lancamento}\n`
teks += `⭐ Avaliação: ${json.avaliacao}\n`
teks += `🗳 Votos: ${json.votos}\n`
teks += `🔥 Popularidade: ${json.popularidade}\n`
teks += `🌐 Idioma: ${json.idioma_original}\n\n`
teks += `📝 Sinopse:\n${json.sinopse}`

await tokito.sendMessage(from, {
image: { url: json.imagem },
caption: teks
}, { quoted: selo })

} catch (err) {
console.log(err)
reply('Erro ao buscar a série.')
}

}
break

case 'grupos': {
reply(mess.teste());
blue = await fetchJson(TOKITO_URL + `/api-bronxys/grupos?q=${q}&apikey=` + TokitoBot)
let red = "Listagem de grupos para você:\n\n"
blue.forEach(function(ab) {
red += ` - Url do Grupo: ${ab.link}\n\n - Descrição: ${ab.desc}\n\n${"-".repeat(20)}\n\n`
})
reply(red)
}
break;

case 'moedas': 
case 'moeda':
try {
ABC = await fetchJson(TOKITO_URL + `/api-bronxys/Moedas_Agora?apikey=` + TokitoBot)
reply(`${ABC?.dolar}\n\n${ABC?.euro}\n\n${ABC?.libra}\n\n${ABC?.bitcoin}\n\n${ABC?.ethereum}\n\n${ABC?.bovespa}\n\n${ABC?.ouro}`);
} catch {
return reply(mess.error())
}
break;

case "letra": 
case "liryc": 
case "letram": 
case "letramusic": 
case "letramusica": {
if(!q.trim()) return reply(`Exemplo: ${prefix+command} Ela me traiu`)
try {
reply(mess.teste());
const abc = await fetchJson(TOKITO_URL + `/api-bronxys/letra_musica?letra=${q.trim()}&apikey=` + TokitoBot)
reply(` - Titulo: ${abc.titulo}\n\n - Compositor: ${abc.compositor}\n\n - Letra: ${abc.letra}`)
} catch (e) {
reply(mess.error())
}
}
break;

case 'mega':
case 'mg': {
  try {
    if (!q) return reply(`Exemplo: ${prefix + command} https://mega.nz/file/xxx`);

    await reagir(from, "📦");
    reply(mess.wait());

    const apiUrl = `https://tokito-apis.site/api/mega?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
    const res = await fetchJson(apiUrl);

    if (!res || !res.status) {
      await reagir(from, "❌");
      return reply(res?.resultado || 'Erro ao buscar arquivo do Mega.');
    }

    // 🔥 GARANTIR NOME
    let fileName = res.filename;
    if (!fileName || fileName === 'unknown_file') {
      fileName = decodeURIComponent((res.download || q).split('/').pop().split('?')[0]);
    }

    const fileSize = res.filesize || 'Desconhecido';
    const mimeType = res.mimetype || 'application/octet-stream';

    let txt = `╭━━━〔 *MEGA DOWNLOAD* 〕━━━⬣
┃📁 *Nome:* ${fileName}
┃📦 *Tamanho:* ${fileSize}
┃🧾 *Tipo:* ${mimeType}
╰━━━━━━━━━━━━━━━━━━⬣`;

    // 📩 mensagem primeiro
    await reply(txt);

    // 📦 envia arquivo
    await tokito.sendMessage(from, {
      document: { url: res.download },
      mimetype: mimeType,
      fileName: fileName
    }, { quoted: selo });

    await reagir(from, "✅");

  } catch (e) {
    console.log('[MEGA CASE ERRO]', e);
    await reagir(from, "❌");
    return reply(mess.error());
  }
}
break;


case 'mediafire':
case 'mf': {
  try {
    if (!q) return reply(`Exemplo: ${prefix + command} https://www.mediafire.com/file/xxx/arquivo.zip/file`);

    await reagir(from, "📦");
    reply(mess.wait());

    const apiUrl = `https://tokito-apis.site/api/mediafire?url=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;
    const res = await fetchJson(apiUrl);

    if (!res || !res.status) {
      await reagir(from, "❌");
      return reply(res?.resultado || 'Erro ao buscar arquivo.');
    }

    let fileName = res.filename;
    if (!fileName || fileName === 'unknown_file') {
      fileName = decodeURIComponent((res.download || q).split('/').pop().split('?')[0]);
    }

    const fileSize = res.filesize || 'Desconhecido';
    const uploaded = res.uploaded || 'Desconhecido';
    const mimeType = res.mimetype || 'application/octet-stream';

    let txt = `╭━━━〔 *MEDIAFIRE DOWNLOAD* 〕━━━⬣
┃📁 *Nome:* ${fileName}
┃📦 *Tamanho:* ${fileSize}
┃🧾 *Tipo:* ${mimeType}
┃📅 *Upload:* ${uploaded}
╰━━━━━━━━━━━━━━━━━━⬣`;

    await reply(txt);

    await tokito.sendMessage(from, {
      document: { url: res.download },
      mimetype: mimeType,
      fileName: fileName
    }, { quoted: selo });

    await reagir(from, "✅");

  } catch (e) {
    console.log('[MEDIAFIRE CASE ERRO]', e);
    await reagir(from, "❌");
    return reply(mess.error());
  }
}
break;
//===========[ FIM CASES INFORMATIVOS ]==========\\

//=======[ COMANDOS BÁSICOS DE LOGOS DO tokito ]=========\\
case 'angelwing':case 'hackneon': case 'fpsmascote': 
case 'equipemascote': case 'txtquadrinhos': case 'ffavatar':
case 'mascotegame': case 'angelglx': case 'gizquadro': 
case 'wingeffect': case 'blackpink': case 'metalgold':
case 'girlmascote': case 'logogame':
try {
if(!q.trim()) return reply(`Digite algo, Exemplo: ${prefix+command} bronxys`);
reply(mess.teste());
ABC = await fetchJson(TOKITO_URL + `/api-bronxys/logos_EPH?texto=${q}&category=${command}&apikey=` + TokitoBot);
tokito.sendMessage(from, {image: {url: ABC.resultado}}, {quoted: selo}).catch(() => {
return reply(mess.error())
})
} catch (e) {
return reply(mess.error())
}
break;

case 'fiction': 
case '3dstone': 
case 'areia': 
case 'style': 
case 'blood': 
case 'pink': 
case 'cattxt': 
case 'neondevil':
case 'carbon': 
case 'metalfire': 
case 'thunder': 
case 'vidro': 
case 'jokerlogo': 
case 'transformer': 
case 'demonfire':
case 'jeans': 
case 'metalblue': 
case 'natal': 
case 'ossos':
case 'asfalto': 
case 'break': 
case 'glitch2': 
case 'colaq':
case 'neon3': 
case 'nuvem': 
case 'horror': 
case 'matrix':
case 'berry': 
case 'luxury': 
case 'lava': 
case 'thunderv2':
case 'neongreen': 
case 'neve': 
case 'neon': 
case 'neon1':
case 'neon3d': 
case 'gelo': 
case 'neon3': 
case '3dgold':
case 'lapis': 
case 'toxic': 
case 'demongreen': 
case 'rainbow':
case 'halloween':
try {
if(!q) return reply(`Digite algo, Exemplo: ${prefix+command} bronxys`);
reply(mess.teste());
ABC = await fetchJson(TOKITO_URL + `/api/${command}?texto=${q}&apikey=` + TokitoBot);
tokito.sendMessage(from, {image: {url: ABC.resultado}}, {quoted: selo}).catch(() => {
return reply(mess.error())
})
} catch (e) {
return reply(mess.error())
}
break;

case 'shadow': 
case 'metalgold': 
case 'cup': 
case 'txtborboleta': 
case 'cemiterio': 
case 'efeitoneon':
case 'harryp': 
case 'lobometal':
case 'neon2':
case 'madeira': 
case 'lovemsg3': 
case 'coffecup':
case 'coffecup2': 
case 'florwooden': 
case 'narutologo':
case 'fire': 
case 'romantic': 
case 'smoke':
case 'papel': 
case 'lovemsg': 
case 'lovemsg2':
try {
if(!q) return reply(`Digite algo, Exemplo: ${prefix+command} bronxys`);
reply(mess.teste());
ABC = await fetchJson(TOKITO_URL + `/api-bronxys/logos_PHT?texto=${q}&category=${command}&apikey=` + TokitoBot);
tokito.sendMessage(from, {image: {url: ABC.resultado.imageUrl}}, {quoted: selo}).catch((e) => {
return reply(mess.error())
})
} catch (e) {
return reply(mess.error())
}
break;


case 'marvel': 
case 'pornhub':
case 'space': 
case 'stone':
case 'steel': 
case 'grafity': 
case 'glitch3': 
case 'america':
try {
var [DG, DG2] = q.split("/")
if(!q.includes("/")) return reply(`Exemplo: ${prefix+command} xbot/mdm`)
reply(mess.teste());
ABC = await fetchJson(TOKITO_URL + `/api/${command}?texto=${DG}&texto2=${DG2}&apikey=` + TokitoBot);
tokito.sendMessage(from, {image: {url: ABC.resultado}}, {quoted: selo}).catch(e => {
return reply(mess.error())
})
} catch (e) {
return reply(mess.error())
}
break;

case 'lixo': 
case 'lgbt': 
case 'morto': 
case 'preso': 
case 'deletem':
case 'procurado': 
case 'hitler': 
case 'borrar': 
case 'merda':
try {
IMG = JSON.parse(JSON.stringify(info)?.replace('quotedM','m'))?.message?.extendedTextMessage?.contextInfo?.message?.imageMessage || info.message?.imageMessage
PXR = await getFileBuffer(IMG, "image")
reply(mess.teste());
link = await upload(PXR)
tokito.sendMessage(from, {image: {url:TOKITO_URL + `/api-bronxys/montagem?url=${link}&category=${command}&apikey=` + TokitoBot}}, {quoted: selo}).catch(e => {
return reply(mess.error())
console.log(erro)
})
} catch (e) {
return reply('Marque uma imagem no WhatsApp, formato jpeg/jpg');
}
break

//==============[ FIM CASES LOGOS ]============\\

//=============[ MENUS E INFOS ]==========\\


case 'ativar': {
if (!isGroupAdmins && !SoDono) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
const user = sender;
if (global.menuAzAtivos[user]) return reply('*ᴅᴇꜱᴄᴜʟᴩᴇ ꜱᴇɴʜᴏʀ(ᴀ), ᴍᴀꜱ ᴠᴏᴄᴇ ᴊᴀ ᴛᴇᴍ ᴜᴍᴀ ʟɪꜱᴛᴀ ᴅᴇ ᴀᴛɪᴠᴀᴄᴀᴏ ᴩᴇɴᴅᴇɴᴛᴇ 🤷‍♂️*');
global.menuAzAtivos[user] = true;
const texto = linguagem.ativic(prefix);
await sendMenu(from, selo, { caption: texto });
}
break;



case 'status':
await sendMenu(from, selo, {
reaction: "🎉",
videoUrl: status,
caption: linguagem.status(prefix, isAntiImg, isAntiVid, isAntiAudio, isAntiSticker, Antidoc, isAntiCtt, Antiloc, isAntilinkgp, isAntiLinkEasy, isAntiLinkHard, isAntifake, isAntiNotas, isAnticatalogo, isPalavrao, isAntiFlood, isAntiDDD, isModobn, isSimi, isAutorepo, isModoCoins, isAutofigu, isAnticall, isAntiPv, isAntiPv2, isAntiPv3, ANT_SP, nescessario, isBotoff, So_Adm, isMultiP, isx9, isAntistatus,isX9VisuUnica, isWelkom, isWelkom2),
isAdminRequired: true
});
break;


case 'menu': {
try {

await reagir(from, '🧊')

const caminhoVideo = "./DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.mp4";
const caminhoImagem = "./DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.png";

let menuMedia;

if (fs.existsSync(caminhoVideo)) {
menuMedia = await prepareWAMessageMedia(
{
video: { url: caminhoVideo },
mimetype: "video/mp4",
gifPlayback: true,
seconds: 8
},
{ upload: tokito.waUploadToServer }
);
} else {
menuMedia = await prepareWAMessageMedia(
{
image: { url: caminhoImagem }
},
{ upload: tokito.waUploadToServer }
);
}

// LISTA PRINCIPAL (single_select) — MENUS COM IMAGEM LOCAL
const listaMenus = {
title: "🧊⃞ ᴍᴇɴᴜ-ʟɪsᴛᴀs ⃞🧊",
sections: [
{
title: "🧊⃞ ᴍᴇɴᴜs ᴘʀɪɴᴄɪᴘᴀɪs ⃞🧊",
highlight_label: `${ownerName}`,
rows: [

// MENUS (COM IMAGEM LOCAL)
{
header: "🧊⃞ ᴍᴇɴᴜ-ᴘʀɪɴᴄɪᴘᴀʟ ⃞🧊",
title: "🧊 ᴄᴏᴍᴀɴᴅᴏs ʙᴀ́sɪᴄᴏs ᴅᴏ ʙᴏᴛ.",
id: prefix + "menuzz"
},
{
header: "🧊⃞ ᴍᴇɴᴜ-ᴄᴏɪɴs ⃞🧊",
title: "🧊 sɪsᴛᴇᴍᴀ ᴅᴇ ᴄᴏɪɴs ᴇ ᴀᴠᴇɴᴛᴜʀᴀs.",
id: prefix + "menucoins"
},
{
header: "🧊⃞ ᴍᴇɴᴜ+18 ⃞🧊",
title: "🧊 ꜰᴜɴᴄᴏᴇs +18 (ᴠɪᴘ).",
id: prefix + "menu18"
},
{
header: "🧊⃞ ᴍᴇɴᴜ-ᴀᴅᴍ ⃞🧊",
title: "🧊 ꜰᴜɴᴄᴏᴇs ᴘᴀʀᴀ ᴀᴅᴍɪɴs.",
id: prefix + "menuadm"
},
{
header: "🧊⃞ ᴍᴇɴᴜ-ᴅᴏɴᴏ ⃞🧊",
title: "🧊 ꜰᴜɴᴄᴏᴇs ᴇxᴄʟᴜsɪᴠᴀs ᴅᴏ ᴅᴏɴᴏ.",
id: prefix + "menudono"
},
{
header: "🧊⃞ ᴍᴇɴᴜ-ʟᴏɢᴏs ⃞🧊",
title: "🧊 ᴄʀɪᴀᴄᴀᴏ ᴅᴇ ʟᴏɢᴏs ᴘᴇʀsᴏɴᴀʟɪᴢᴀᴅᴀs.",
id: prefix + "menulogos"
},
{
header: "🧊⃞ ᴍᴇɴᴜ-ʙʀɪɴᴄᴀᴅᴇɪʀᴀs ⃞🧊",
title: "🧊 ᴊᴏɢᴏs ᴇ ʙʀɪɴᴄᴀᴅᴇɪʀᴀs ᴇᴍ ɢʀᴜᴘᴏ.",
id: prefix + "menubrincadeira"
},

// COMANDOS EXTRAS
{
header: "🧊⃞ ᴄʀɪᴀᴅᴏʀ ⃞🧊",
title: "🧊 ɪɴꜰᴏʀᴍᴀᴄᴏᴇs ᴅᴏ ᴄʀɪᴀᴅᴏʀ.",
id: prefix + "criador"
},
{
header: "🧊⃞ ᴅᴏɴᴏ ⃞🧊",
title: "🧊 ɪɴꜰᴏʀᴍᴀᴄᴏᴇs ᴅᴏ ᴅᴏɴᴏ.",
id: prefix + "dono"
},
{
header: "🧊⃞ ᴅᴏɴᴏs ⃞🧊",
title: "🧊 ʟɪsᴛᴀ ᴅᴇ ᴅᴏɴᴏs ᴅᴏ ʙᴏᴛ.",
id: prefix + "donos"
},
{
header: "🧊⃞ ᴘɪɴɢ ⃞🧊",
title: "🧊 ᴠᴇʀɪꜰɪᴄᴀʀ ʟᴀᴛᴇ̂ɴᴄɪᴀ ᴅᴏ ʙᴏᴛ.",
id: prefix + "ping"
},
{
header: "🧊⃞ ᴘᴇʀꜰɪʟ ⃞🧊",
title: "🧊 ᴠᴇʀ sᴇᴜ ᴘᴇʀꜰɪʟ ᴇ sᴛᴀᴛᴜs.",
id: prefix + "perfil"
}

]
}
]
};
// TODOS OS BOTÕES - INVOLVENDO URL TAMBÉM

const botoes = [
{
name: "single_select",
buttonParamsJson: JSON.stringify(listaMenus)
},
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "🧊 Aurora System 🧊",
id: prefix + "aurorasystem"
})
}
];

const carouselMessage = {
cards: [
{
header: {
hasMediaAttachment: true,
...(menuMedia.videoMessage
? { videoMessage: menuMedia.videoMessage }
: { imageMessage: menuMedia.imageMessage })
},
headerType: menuMedia.videoMessage ? "VIDEO" : "IMAGE",
body: {
text: `❪🧊.ꯧ𝙼𝙴𝙽𝚄 𝙻𝙸𝚂𝚃ꯧ⸼🧊❫
┏☆∻∹⋰ ★∻∹⋰ ☆∻∹⋰ ★∻∹⋰┓
├̟⊹ 🧊 𝙱𝙾𝚃: ${NomeDoBot}
├̟⊹ 🧊 𝚄𝚂𝚄Á𝚁𝙸𝙾: ${pushname}
├̟⊹ 🧊 𝙲𝙰𝚁𝙶𝙾: ${isCargo}
├̟⊹ 🧊 𝚅𝙸𝙿: ${isChVip ? '✓' : '✗'}
┗☆∻∹⋰ ★∻∹⋰ ☆∻∹⋰ ★∻∹⋰┛`
},
footer: { text: 'ᴇsᴄᴏʟʜᴀ ᴜᴍᴀ ᴏᴘᴄ̧ᴀ̃ᴏ ᴀʙᴀɪxᴏ' },
nativeFlowMessage: { buttons: botoes }
}
]
}

await tokito.relayMessage(
from,
{
interactiveMessage: {
contextInfo: {
quotedMessage: selo.message,
participant: selo.key.participant || selo.key.remoteJid,
stanzaId: selo.key.id,
remoteJid: selo.key.remoteJid
},
body: { text: "*🧊⃞ᴀǫᴜɪ ᴇsᴛᴀ sᴇᴜ ᴍᴇɴᴜ⃞🧊*" },
carouselMessage
}
},
{}
);

} catch (err) {
console.error("Erro no menu:", err);
}

}
break;

// ===== MENUS COM IMAGEM PADRÃO =====

case 'menucoins':
await sendMenu(from, selo, {
reaction: "🎉",
caption: linguagem.coins(prefix, sender, pushname, isVip, isCargo),
isGroupRequired: true,
isModoCoinsRequired: true,
sendAudio: true
});
break;



case 'menuzz':
await sendMenu(from, selo, {
reaction: "🎉",
caption: linguagem.menu(prefix, sender, pushname, isVip, isCargo),
sendAudio: true
});
break;

case 'menu18':
await sendMenu(from, selo, {
reaction: "🎉",
caption: linguagem.menu18(prefix, sender, pushname, isVip, isCargo),
sendAudio: true
});
break;

case 'menudono':
await sendMenu(from, selo, {
reaction: "🎉",
caption: linguagem.menudono(prefix, sender, pushname, isVip, isCargo),
isOwnerRequired: true,
sendAudio: true
});
break;

case 'menuadm':
await sendMenu(from, selo, {
reaction: "🎉",
caption: linguagem.adms(prefix, sender, pushname, isVip, isCargo),
isAdminRequired: true,
sendAudio: true
});
break;

case 'menulogos':
case 'efeitoimg':
case 'logo':
case 'logos':
case 'menulogo':
await sendMenu(from, selo, {
reaction: "🎉",
caption: linguagem.menulogos(prefix, sender, pushname, isVip, isCargo),
sendAudio: true
});
break;

case 'menubrincadeira':
case 'menubrincadeiras':
case 'brincadeiras':
case 'brincadeira':
case 'menubn':
await sendMenu(from, selo, {
reaction: "🎉",
caption: linguagem.brincadeiras(prefix, sender, pushname, isVip, isCargo),
isGroupRequired: true,
isModoBnRequired: true,
sendAudio: true
});
break;
case 'donos': {
await reagir(from, "🎉")
try {
const fs = require("fs")
const path = require("path")

const videoPath = path.join(
__dirname,
"DADOS_TOKITO",
"INFO_TOKITO",
"LOGOS",
"donos.mp4"
)

if (!fs.existsSync(videoPath)) {
throw new Error("Arquivo donos.mp4 não encontrado")
}

const videoBuffer = fs.readFileSync(videoPath)

await tokito.sendMessage(from, {
video: videoBuffer,
caption: linguagem.consultas(
prefix,
numero_dono1,
numero_dono2,
numero_dono3,
numero_dono4,
numero_dono5,
numero_dono6,
NomeDoBot,
ownerName
),
gifPlayback: true,
contextInfo: DLchanneldl
}, { quoted: selo })

} catch (e) {
console.error("Erro ao executar o comando:", e)
await tokito.sendMessage(from, {
text: linguagem.consultas(
prefix,
numero_dono1,
numero_dono2,
numero_dono3,
numero_dono4,
numero_dono5,
numero_dono6,
NomeDoBot
)
}, { quoted: selo })
}
break
}

case 'infobot':
case 'infodono':
case 'dono': {
await reagir(from, "🎉")
try {
const fs = require("fs")
const path = require("path")

const videoPath = path.join(
__dirname,
"DADOS_TOKITO",
"INFO_TOKITO",
"LOGOS",
"dono.mp4"
)

if (!fs.existsSync(videoPath)) {
throw new Error("Arquivo infodono.mp4 não encontrado")
}

const videoBuffer = fs.readFileSync(videoPath)

await tokito.sendMessage(from, {
video: videoBuffer,
caption: linguagem.dono(
prefix,
NomeDoBot,
NumeroDoBot,
ownerNumber,
isBotoff,
ownerName,
botNumber
),
gifPlayback: true,
contextInfo: DLchanneldl
}, { quoted: selo })

} catch (e) {
console.error("Erro ao executar o comando:", e)
await tokito.sendMessage(from, {
text: linguagem.dono(
prefix,
NomeDoBot,
NumeroDoBot,
ownerNumber,
isBotoff,
ownerName,
botNumber
)
}, { quoted: selo })
}
break
}


//============[ FIM MENU E INFOS ]==========\\

//=========== [ ÍNICIO JOGOS ] =========\\

case 'quando':
if (args.length < 1) return reply('Digite a pergunta!')
const meupirul = ['Hoje', 'Amanhã', 'Nunca', 'dia', 'semana', 'mês', 'ano']
const meupirul2 = ['dias', 'semanas', 'meses', 'anos']
randomm = meupirul[Math.floor(Math.random() * meupirul.length)]
random2 = `${Math.floor(Math.random() * 11) + 1}`
if (randomm == 'Hoje' || randomm == 'Amanhã' || randomm == 'Nunca') {
texto = `Pergunta: ${body.slice(1)}\nResposta: ${randomm}`
} else if (random2 == 1) {
texto = `Pergunta: ${body.slice(1)}\nResposta:1 ${randomm}`
} else {
random3 = meupirul2[Math.floor(Math.random() * meupirul2.length)]
texto = `Pergunta: ${body.slice(1)}\nResposta: ${random2} ${random3}`
}
reply(texto)
break

case 'forca': { // YoshGGxOnly
try {
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))

//Atenção aqui, o caminho pode ser diferente
const pathF = `./DADOS_TOKITO/data/media/forca/database/session-${from}.json`;

if (fs.existsSync(pathF)) {
return reply('*ᴏ ᴊᴏɢᴏ ᴊᴀ ғᴏɪ ɪɴɪᴄɪᴀᴅᴏ ᴀɴᴛᴇs 🙇‍♂️*');
}

//Tema aleatório
const word = palavras[Math.floor(Math.random() * palavras.length)];

const params = {
palavra: word.palavra,
tema: word.tema,
dica: word.dica,
path: './DADOS_TOKITO/data/media/forca/database', //Caminho da pasta
};
const data = forca.startSession(from, params);

reply(`• 🎮 𝐉𝐎𝐆𝐎--𝐃𝐀-𝐅𝐎𝐑𝐂𝐀 🌠 •\n*⏤͟͟͞͞ʟᴇᴛʀᴀs*: ${data.palavra.length}\n*⏤͟͟͞͞ᴛᴇᴍᴀ*: ${word.tema}\n*⏤͟͟͞͞ᴅɪᴄᴀ*: ${word.dica}\n|───𖡜̸｡᭭\n_¦_\n╚ ${frames[data.erros]}\n\n\n⏤꫶͟͟͞͞───────────➮\n\n『 ${data.letrasX.join('')} 』\n\n⏤͟͟͞͞───────────➮\n⏤͟͟͞͞ʟᴇᴛʀᴀs ᴊᴏɢᴀᴅᴀs: ${data.usado.join(', ')}\n\n> ᴜsᴇ ᴏ ${prefix}ғᴄ ᴘᴀʀᴀ ᴀᴅᴠɪɴʜᴀʀ ᴀ ʟᴇᴛʀᴀ ᴏᴜ ᴀ ᴘᴀʟᴀᴠʀᴀ ᴛᴏᴅᴀ`);
} catch (e) {
console.error(e);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴍᴀɪs ᴛᴀʀᴅᴇ 🙇‍♂️*');
}
break; // YoshGGxOnly
}




//Case principal para adivinhar a letra e etc..
case 'fc': { // YoshGGxOnly
try {
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (!fs.existsSync(`./DADOS_TOKITO/data/media/forca/database/session-${from}.json`)) {
return reply(`*ᴏ ᴊᴏɢᴏ ᴀɪɴᴅᴀ ɴᴀᴏ ᴄᴏᴍᴇᴄᴏᴜ 🤷‍♂️*\n\n*ᴜsᴇ ${prefix}ғᴏʀᴄᴀ ᴘᴀʀᴀ ɪɴɪᴄɪᴀʀ ᴏ ᴊᴏɢᴏ 🙆‍♂️*`);
}
if (!q || q.length == 2 || !isNaN(q)) return reply("*ᴠᴏᴄᴇ sᴏ ᴘᴏᴅᴇ ᴜsᴀʀ ᴜᴍᴀ ᴘᴀʟᴀᴠʀᴀ ᴏᴜ ᴀ ғʀᴀsᴇ ᴛᴏᴅᴀ 🤷‍♂️*");

const pathF = `./DADOS_TOKITO/data/media/forca/database/session-${from}.json`;

const database = JSON.parse(fs.readFileSync(pathF));
const q_ToLC = q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

if (database.usado.includes(q_ToLC)) return reply('*ᴇsᴛᴀ ʟᴇᴛʀᴀ ᴊᴀ ғᴏɪ ᴜsᴀᴅᴀ, ᴛᴇʙᴛᴇ ᴏᴜᴛʀᴀ ʟᴇᴛʀᴀ 🙇‍♂️*');

//Atenção aqui
const data = forca.verify(from, q_ToLC, './DADOS_TOKITO/data/media/forca/database');

if (data.ended) {
if (data.win) {
reply('*ᴠᴏᴄᴇ ᴀᴄᴀʙᴀ ᴅᴇ ɢᴀɴʜᴀʀ ᴏ ɢᴀᴍᴇ 🙇‍♂️*');
//...Implementar o resto do que você quiser
} else {
reply('*sɪɴᴛᴏ ᴍᴜɪᴛᴏ ᴍᴀs ᴠᴏᴄᴇ ᴘᴇʀᴅᴇᴜ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ɴᴀ ᴘʀᴏxɪᴍᴀ 🤷‍♂️*');
//...Implementar o resto do que você quiser
}
DLT_FL(data.session);
} else {
if (data.letrasY.includes(q_ToLC)) {
reply('*ᴠᴏᴄᴇ ᴀᴄᴇʀᴛᴏᴜ ᴀ ʟᴇᴛʀᴀ 🙆‍♂️*');
} else {
reply('*sɪɴᴛᴏ ᴍᴜɪᴛᴏ, ᴠᴏᴄᴇ ᴇʀʀᴏᴜ 🤷‍♂️*');
}

reply(`• 🎮 𝐉𝐎𝐆𝐎--𝐃𝐀-𝐅𝐎𝐑𝐂𝐀 🌠 •\n*⏤͟͟͞͞ʟᴇᴛʀᴀs*: ${data.palavra.length}\n*⏤͟͟͞͞ᴛᴇᴍᴀ*: ${data.tema}\n*⏤͟͟͞͞ᴅɪᴄᴀ*: ${data.dica}\n|───𖡜̸｡᭭\n_¦_\n╚ ${frames[data.erros]}\n\n\n⏤꫶͟͟͞͞───────────➮\n\n『 ${data.letrasX.join('')} 』\n\n⏤͟͟͞͞───────────➮\n⏤͟͟͞͞ʟᴇᴛʀᴀs ᴊᴏɢᴀᴅᴀs: ${data.usado.join(', ')}\n\n> ᴜsᴇ ᴏ ${prefix}ғᴄ ᴘᴀʀᴀ ᴀᴅᴠɪɴʜᴀʀ ᴀ ʟᴇᴛʀᴀ ᴏᴜ ᴀ ᴘᴀʟᴀᴠʀᴀ ᴛᴏᴅᴀ`);
}

} catch (e) {
console.log(e);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴍᴀɪs ᴛᴀʀᴅᴇ 🙇‍♂️*');
}
break; // YoshGGxOnly
}

//Comando para resetar a forca
case 'rv_forca': // YoshGGxOnly
try {
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))

//Atenção ao caminho correto do arquivo
const database = `./DADOS_TOKITO/data/media/forca/database/session-${from}.json`;

if (!fs.existsSync(database)) {
reply(`*ᴏ ᴊᴏɢᴏ ᴀɪɴᴅᴀ ɴᴀᴏ ᴄᴏᴍᴇᴄᴏᴜ 🤷‍♂️*\n\n*ᴜsᴇ ${prefix}ғᴏʀᴄᴀ ᴘᴀʀᴀ ɪɴɪᴄɪᴀʀ ᴏ ᴊᴏɢᴏ 🙆‍♂️*`);
} else {
DLT_FL(database);
reply('*ᴘʀᴏɴᴛᴏ, ʀᴇsᴇᴛᴇɪ ᴀ ғᴏʀᴄᴀ ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*');
}
} catch (e) {
console.error(e);
reply('*ᴏᴄᴏʀʀᴇᴜ ᴜᴍ ᴇʀʀᴏ, ᴛᴇɴᴛᴇ ɴᴏᴠᴀᴍᴇɴᴛᴇ ᴍᴀɪs ᴛᴀʀᴅᴇ 🙇‍♂️*');
}
break;

case 'jogov':
case 'jogodavelha':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (!menc_jid) return reply("「🎮」- *Marque junto com o comando o @ do usuário que deseja desafiar..*")

joguinhodavelhajs.push(sender);
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs));
joguinhodavelhajs2.push(from);
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha2.json', JSON.stringify(joguinhodavelhajs2));

if (fs.existsSync(`./ARQUIVES/tictactoe/db/${from}.json`)) {
const boardnow = setGame(`${from}`);
const jogadorX = normalizar(boardnow.X + '@s.whatsapp.net');
const jogadorO = normalizar(boardnow.O + '@s.whatsapp.net');

const msg = `「🎮」- *ᴊᴀ́ ᴇxɪsᴛᴇ ᴜᴍᴀ ᴘᴀʀᴛɪᴅᴀ ᴇᴍ ᴀɴᴅᴀᴍᴇɴᴛᴏ!* ↴

『❌』 @${jogadorX.split('@')[0]}
『⚔️』 @${jogadorO.split('@')[0]}

*_ᴀɢᴜᴀʀᴅᴇ ᴏ ꜰɪᴍ ᴅᴇssᴀ ʀᴏᴅᴀᴅᴀ ᴘᴀʀᴀ ɪɴɪᴄɪᴀʀ ᴏᴜᴛʀᴀ._* 🕹️`;
return await mentions(msg, [jogadorX, jogadorO], true);
}

if (argss.length === 1)
return reply(`「🎮」- *ᴊᴏɢᴜᴇ ᴄᴏᴍ ᴀʟɢᴜᴇ́ᴍ ᴘᴀʀᴀ ɪɴɪᴄɪᴀʀ ᴀ ᴘᴀʀᴛɪᴅᴀ.* ↴

> *Exemplo: ${prefix + command} @membro*`);

const boardnow = setGame(`${from}`);
boardnow.status = false;
boardnow.X = sender.replace("@s.whatsapp.net", "");
boardnow.O = menc_jid.replace("@s.whatsapp.net", "").replace("@", "");

fs.writeFileSync(`./ARQUIVES/tictactoe/db/${from}.json`, JSON.stringify(boardnow, null, 2));

const jogadorX = normalizar(boardnow.X + '@s.whatsapp.net');
const jogadorO = normalizar(boardnow.O + '@s.whatsapp.net');

const mensagem = `「🎮」@${jogadorO.split('@')[0]}
- *🕹️ | ʀᴇᴄᴇʙᴇᴜ ᴜᴍ ᴄᴏɴᴠɪᴛᴇ ᴘᴀʀᴀ ᴊᴏɢᴏ ᴅᴀ ᴠᴇʟʜᴀ ᴅᴇ* ↴

『❌』 @${jogadorX.split('@')[0]}

ᴅɪɢɪᴛᴇ『 s 』 ᴘᴀʀᴀ ᴀᴄᴇɪᴛᴀʀ ᴏᴜ 『 n 』 ᴘᴀʀᴀ ʀᴇᴄᴜsᴀʀ 🎲
> *⚠️ | @${jogadorX.split('@')[0]} ᴘᴏᴅᴇ ᴄᴀɴᴄᴇʟᴀʀ ᴄᴏᴍ: ${prefix}rv*`;

await mentions(mensagem, [jogadorX, jogadorO], true);
break;

case 'resetarvelha':
case 'resetavelha':
case 'resetarv':
case 'resetav': 
case 'resetvelha':
case 'rv': 
if(!isJoguin && !isGroupAdmins) 
return reply(`「⚠️」- *ᴀᴘᴇɴᴀs ǫᴜᴇᴍ ɪɴɪᴄɪᴏᴜ ᴏ ᴊᴏɢᴏ ᴏᴜ ᴜᴍ ᴀᴅᴍɪɴ ᴘᴏᴅᴇ ʀᴇsᴇᴛᴀʀ.*`)

if(fs.existsSync("./ARQUIVES/tictactoe/db/" + from + ".json")) {

DLT_FL("./ARQUIVES/tictactoe/db/" + from + ".json");

reply(`「🎮」- *ᴊᴏɢᴏ ᴅᴀ ᴠᴇʟʜᴀ ʀᴇsᴇᴛᴀᴅᴏ ᴄᴏᴍ sᴜᴄᴇssᴏ!* ♻️`)

joguinhodavelhajs.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelha.json', JSON.stringify(joguinhodavelhajs))

joguinhodavelhajs2.splice([])
fs.writeFileSync('./DADOS_TOKITO/usuarios/joguinhodavelhajs2.json', JSON.stringify(joguinhodavelhajs2))

} else {

reply(`「❌」- *ɴᴀ̃ᴏ ʜᴀ́ ɴᴇɴʜᴜᴍᴀ ᴘᴀʀᴛɪᴅᴀ ᴇᴍ ᴀɴᴅᴀᴍᴇɴᴛᴏ...*`)

}
break
case 'vord': //Criado do zero Por Nk hackzin
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
/** Se não conter "verdade" ou "dessfio" */
if (q !== "verdade" && q !== "desafio") return reply("• Escolha *verdade* ou *desafio*");

const question = JSON.parse(fs.readFileSync("./DADOS_TOKITO/questions.json"));

if (q == "verdade") {
const randomQuest = question[0].words[Math.floor(Math.random() * question[0].words.length)];
reply(`*⸺͟͞ꪶ𝐄 𝐕𝐄𝐑𝐃𝐀𝐃𝐄 𝐐𝐔𝐄↴*\n\n${randomQuest}`);
}
else {
const randomQuest = question[1].words[Math.floor(Math.random() * question[1].words.length)];
reply(`*⸺͟͞ꪶ𝐃𝐄𝐒𝐀𝐅𝐈𝐎 𝐕𝐎𝐂𝐄↴*\n\n${randomQuest}`);
}
break;

//=========== [ FINAL JOGOS ] =========\\

//==========[ EDIT AUDIO/VIDEO/FOTO ] =========\\

case 'imgpraanime': case 'animeia': case 'toanime':
if((isMedia && !info.message.videoMessage || isQuotedImage)) {
post = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.imageMessage : info.message.imageMessage
imagem = await downloadContentFromMessage(post, 'image')
base64 = Buffer.from([])
for await(const send of imagem) { base64 = Buffer.concat([base64, send ]) }
reply(`Criando seu avatar, aguarde! Não vai demorar muito amiguinho(a)...️`)
link = await upload(base64)
conv = await fetchJson(`https://delirius-api-oficial.vercel.app/api/toanime?url=${link}`)
await tokito.sendMessage(from, {image: {url: conv.data.comparation}}, {quoted: selo}).catch(async(error) => {
return reply(`Não foi possível criar seu avatar! Por favor, tente com outra imagem!`);
})
} else {
reply('Mencione uma imagem para atribuir o efeito a foto.')
}
break

case 'gtaia': case 'togta': case 'imgpragta':
if((isMedia && !info.message.videoMessage || isQuotedImage)) {
post = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.imageMessage : info.message.imageMessage
imagem = await downloadContentFromMessage(post, 'image')
base64 = Buffer.from([])
for await(const send of imagem) { base64 = Buffer.concat([base64, send ]) }
reply(`Criando seu avatar, aguarde! Não vai demorar muito amiguinho(a)...️`)
link = await upload(base64);
dataConvertAndreas = await fetchJson(`https://aemt.me/jadigta?url=${link}`)
await tokito.sendMessage(from, {image: {url: dataConvertAndreas.result}}, {quoted: selo})
.catch(async(error) => {
return reply(`Não foi possível criar seu avatar! Por favor, tente com outra imagem!`);
})
} else {
reply('Mencione uma imagem para atribuir o efeito a foto.')
}
break



case 'tozombie': case 'zombieai': case 'imgprazombie':
if((isMedia && !info.message.videoMessage || isQuotedImage)) {
post = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.imageMessage : info.message.imageMessage
imagem = await downloadContentFromMessage(post, 'image')
base64 = Buffer.from([])
for await(const send of imagem) { base64 = Buffer.concat([base64, send ]) }
reply(`Criando seu avatar, aguarde! Não vai demorar muito amiguinho(a)...️`)
link = await upload(base64);
dataConvertZombie = await fetchJson(`https://aemt.me/converter/zombie?url=${link}`);
await tokito.sendMessage(from, {image: {url: dataConvertZombie.url}}, {quoted: selo})
.catch(async(error) => {
return reply(`Não foi possível criar seu avatar! Por favor, tente com outra imagem!`);
})
} else {
reply('Mencione uma imagem para atribuir o efeito a foto.')
}
break

case 'enhance': case 'dehaze': case 'recolor':
if((isMedia && !info.message.videoMessage || isQuotedImage)) {
post = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.imageMessage : info.message.imageMessage
imagem = await downloadContentFromMessage(post, 'image')
base64 = Buffer.from([])
for await(const send of imagem) { base64 = Buffer.concat([base64, send])}
data = await vyroEngine(base64, command);
await tokito.sendMessage(from, {image: data}, {quoted: selo}).catch(async(error) => {
return reply(mess.error())
})
} else {
reply('Mencione uma imagem para atribuir o efeito a foto.')
}
break

case 'videocontrario':
case 'reversevid':
if((isMedia && info.message.videoMessage || !isQuotedImage) && !q.length <= 1) { 
reply(mess.wait())
encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, buffimg)
media = rane
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} -vf reverse -af areverse ${ran}`, async(err) => {
await DLT_FL(media)
if(err) return reply(`Err: ${err}`)
buffer453 = fs.readFileSync(ran)
await tokito.sendMessage(from, {video: buffer453, mimetype: 'video/mp4'}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque um vídeo..")
}
break 

case 'videolento':
case 'slowvid':
if((isMedia && info.message.videoMessage || !isQuotedImage) && !q.length <= 1) {
reply(mess.wait()) 
encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, buffimg)
media = rane
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ${ran}`, async(err) => {
await DLT_FL(media)
if(err) return reply(`Error: ${err}`)
buffer453 = fs.readFileSync(ran)
await tokito.sendMessage(from, {video: buffer453, mimetype: 'video/mp4'}, {quoted: selo})
await DLT_FL(ran)
})
} else {
reply("Marque um vídeo..")
}
break

case 'videorapido':
case 'fastvid':
if((isMedia && info.message.videoMessage || !isQuotedImage) && !q.length <= 1) {
reply(mess.wait())
encmedia = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, buffimg)
media = rane
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2[a]" -map "[v]" -map "[a]" ${ran}`, async(err) => {
await DLT_FL(media)
if(err) return reply(`Err: ${err}`)
buffer453 = fs.readFileSync(ran)
await tokito.sendMessage(from, {video: buffer453, mimetype: 'video/mp4'}, {quoted: selo })
await DLT_FL(ran)
})	
} else {
reply("Marque o vídeo..")
}
break

case 'grave2':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'slowed':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -af "atempo=4/4,asetrate=50000*2/3"${ran}`, (err, stderr, stdout) => {
DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'speed':
case 'speedup':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -af "atempo=4/4,asetrate=86000*2/3"${ran}`, (err, stderr, stdout) => {
DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'grave':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a "atempo=0.9,asetrate=44100" ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'adolesc':
case 'vozmenino':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.');
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'tomp3': {
if ((isMedia && !info.message.imageMessage) || isQuotedVideo) {
reply(mess.wait())
const encmedia = isQuotedVideo
? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
: info.message.videoMessage
const bufferVideo = await getFileBuffer(encmedia, 'video')
const input = getRandom('.mp4')
const output = getRandom('.mp3')
fs.writeFileSync(input, bufferVideo)
exec(`ffmpeg -y -i ${input} ${output}`, async (err) => {
if (fs.existsSync(input)) fs.unlinkSync(input)
if (err) {
if (fs.existsSync(output)) fs.unlinkSync(output)
return reply('❌ Erro ao converter o vídeo para mp3.')
}
const audio = fs.readFileSync(output)
await tokito.sendMessage(
from,
{ audio, mimetype: 'audio/mpeg', contextInfo: DLchanneldl },
{ quoted: selo }
)
if (fs.existsSync(output)) fs.unlinkSync(output)
})
} else {
reply('🎵 Marque um vídeo para converter em mp3.')
}
}
break

case 'bass3':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -af equalizer=f=20:width_type=o:width=2:g=15 ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'bass': 
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -af equalizer=f=20:width_type=o:width=2:g=15 ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'bass2': 
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'estourar': 
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait());
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -af equalizer=f=90:width_type=o:width=2:g=30 ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'fast':
case 'audiorapido':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, async(err, stderr, stdout) => {
await DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'esquilo':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait())
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a "atempo=0.7,asetrate=65100" ${ran}`, async(err, stderr, stdout) => {
DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.')
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

case 'audiolento': 
case 'slow':
if((isMedia && !info.message.imageMessage && !info.message.videoMessage || isQuotedAudio)) {
reply(mess.wait());
muk = isQuotedAudio ? info.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : info.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
ran = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a "atempo=0.9,asetrate=44100" ${ran}`, async(err, stderr, stdout) => {
DLT_FL(gem)
if(err) return reply('Ocorreu um erro ao adicionar o *efeito sonoro* no áudio.');
hah = fs.readFileSync(ran)
tokito.sendMessage(from, {audio: hah, mimetype: 'audio/mpeg', ptt:false, contextInfo: DLchanneldl}, {quoted: selo})
DLT_FL(ran)
})
} else {
reply("Marque o áudio...")
}
break

//==============[ FIM DAS CASES DE EDIT ]==============\\

//============[ BRINCADEIRAS/JOGOS/RANKS]===============\\

case 'chance':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(args.length < 1) return reply(`Você precisa digitar da forma correta... Por exemplo: *${prefix}chance* _do jubileu ser gay_`)
await tokito.sendMessage(from, {
text: `😵‍💫🌟 - A chance _“${q}”_ é de: *${Math.floor(Math.random() * 100)}%*. Eai, foi o que a probabilidade que esperava jovem?`,
contextInfo: {...DLchanneldl, mentionedJid: [sender]}
}, {quoted: selo});
break


case 'comer':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer botar rebolar pros cria, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: comer}, gifPlayback: true,
caption: `Você acabou de comer a(o) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'capinarlote':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer botar pra capinar um lote, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: capinarlote}, gifPlayback: true,
caption: `Você acabou de botar o(a) *@${menc_os2.split('@')[0]}* pra capinar um lote`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'pgpeito':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer pegar nos peitinhos, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: pgpeito}, gifPlayback: true,
caption: `Você acabou de pegar nos peitos do(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'pgpau':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer pegar no pau dele(a), a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: pgpau}, gifPlayback: true,
caption: `Você acabou de pegar no pau do(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'pgbunda':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que desejas ser acariciado, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: pgbunda}, gifPlayback: true,
caption: `Você acabou de pegar na bunda do(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'morder':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer dar uma mordida, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: morder}, gifPlayback: true,
caption: `Você acabou de dar uma mordida no(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'sentar':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer dar uma sentadinha, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: sentar}, gifPlayback: true,
caption: `Você acabou de dar uma sentadinha no(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'tirarft':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer tirar a foto, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: tirarft}, gifPlayback: true,
caption: `Você acabou de tirar uma foto do(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'boquete':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
await tokito.sendMessage(from, {
video: {url: boquete}, gifPlayback: true,
caption: `Eita *@${menc_os2.split('@')[0]}* garganta profunda voce tem 😰`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'cagar':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
await tokito.sendMessage(from, {
video: {url: cagar}, gifPlayback: true,
caption: `CARALHOOOOO *@${menc_os2.split('@')[0]}* FAMOSO CAGA TRONCO KAKAKAKAK??? 🤯😳`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'cu':
if (!isGroup) return reply(mess.onlyGroup())
if (!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text: `Pesquisando quantos cm de profundidade tem seu bozo @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: { url: cu },
caption: `Quantos cm o(a) *@${sender_ou_n.split("@")[0]}* tem no bozo ?\n• A chance é de *${random}cm* 😳`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break


case 'abraco':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer dar um abraço, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: abraco}, gifPlayback: true,
caption: `Você acabou de dar um abraço fofo no(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break

case 'louca':
case 'lavarlouca':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer botar pra lavar a louça, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: lavarlouca}, gifPlayback: true,
caption: `Você acabou de botar a(o) *@${menc_os2.split('@')[0]}* pra lavar a louça`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'carinho':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer dar um carinho, a mensagem ou o @.')
await tokito.sendMessage(from, {
video: {url: carinho}, gifPlayback: true,
caption: `Você acabou de dar um carinho no(a) *@${menc_os2.split('@')[0]}*`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'morte':
case 'death':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (args.length == 0) return reply(`Está faltando o nome da pessoa! Por exemplo: ${prefix+command} Victor`)
predea = await axios.get(`https://api.agify.io/?name=${encodeURIComponent(args[0])}`);
if (predea.data.age == null) return reply(`Você inseriu um nome invalido, certifique-se de inserir um sem acentos, emojis, números e outros.`);
await tokito.sendMessage(from, {
video: {url: deathcmd}, gifPlayback: true,
caption: `Pessoas com este nome citado “${predea.data.name}” tendem a morrer aos ${predea.data.age} anos.`,
contextInfo: {...DLchanneldl, mentionedJid: [sender]}
}, {quoted: selo})
break

case 'carioca':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de carioca @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgcarioca},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa carioca?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'louco':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de louco @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imglouco},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa louca?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'louca':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de louca @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imglouca},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa louca?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'safada':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de safada @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgsafada},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa safada?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'safado':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de safado @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgsafado},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa safada?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'macaco':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de macaco @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgmacaco},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser um macaco?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'macaca':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de macaca @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgmacaca},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma macaca?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'puta':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de puta @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async () => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgputa},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma puta?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'matar': case 'mata':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('marque o alvo que você quer matar, a mensagem ou o @')
await tokito.sendMessage(from, {
video: {url: matar},
gifPlayback: true,
caption: `Você acabou de matar o(a) *@${menc_os2.split('@')[0]}*, seu... 😵‍💫💅🏻`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break

case 'leitada':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
await tokito.sendMessage(from, {
video: {url: leitada},
gifPlayback: true,
caption: `Você acabou de dar leitinho gostoso para o(a) *@${menc_os2.split('@')[0]}*!`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break

case 'beijo':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
await tokito.sendMessage(from, {
video: {url: beijocmd},
gifPlayback: true,
caption: `Você acabou de beijar o(a) *@${menc_os2.split('@')[0]}*! 😳💖`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break

case 'tapa':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
await tokito.sendMessage(from, {
video: {url: tapacmd},
gifPlayback: true,
caption: `Você acabou de dar um tapa em *@${menc_os2.split('@')[0]}*! 😏`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break


case 'nazista':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text: `Pesquisando a sua ficha de nazista: *@${sender_ou_n.split("@")[0]}* aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgnazista},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa nazista?\n• Porcentagem de chance de ser uma pessoa nazista: *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'corno':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a ficha de corno @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgcorno},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa chifruda?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'vesgo':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a ficha de vesgo @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgvesgo},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa vesga?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'bebado':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a ficha de bebado(a) @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgbebado},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa bêbada?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'gado':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a ficha de gado @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imggado},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser um gado?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'fiel':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a ficha de fiel @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: fielcmd},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser fiel?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'lindo':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a ficha de lindo @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: lindocmd},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser lindo?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'linda':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a ficha de linda @${sender_ou_n.split("@")[0]}, aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: lindacmd},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser linda?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'gostoso':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de gostoso @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imggostoso},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa gostosa?\n• A porcentagem de chance é *${random}%*`,
gifPlayback: true,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'gostosa':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de gostosa @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imggostosa},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa gostosa?\n• A porcentagem de chance é *${random}%*`,
gifPlayback: true,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'sigma':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de sigma @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgsigma},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa sigma?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'beta':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de beta @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgbeta},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser um beta?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'baiano':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de baiano @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgbaiano},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa baiana?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'baiana':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await tokito.sendMessage(from, {
text:`Pesquisando a sua ficha de baiana @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
setTimeout(async() => {
const random = `${Math.floor(Math.random() * 110)}`
await tokito.sendMessage(from, {
image: {url: imgbaiana},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa baiana?\n• A porcentagem de chance é *${random}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'gay':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))

await tokito.sendMessage(from, {
text: `Pesquisando a sua ficha de gay: @${sender_ou_n.split("@")[0]} aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})

setTimeout(async () => {
let percent = Math.floor(Math.random() * 110)
let status = ''

if(percent < 20) status = 'hmm... você é hetero...'
else if(percent <= 50) status = '+/- boiola'
else if(percent <= 80) status = 'tenho minha desconfiança...'
else status = 'você é gay...'

await tokito.sendMessage(from, {
image: {url: imggay},
caption: `Qual é a porcentagem de chance do(a) *@${sender_ou_n.split("@")[0]}* ser gay?\n• *${percent}% homossexual*, ${status}`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'feio':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))

await tokito.sendMessage(from, {
text: `Pesquisando a sua ficha de feio: *@${sender_ou_n.split("@")[0]}* aguarde...`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})

setTimeout(async () => {
let percent = Math.floor(Math.random() * 110)
let status = ''

if(percent < 20) status = 'Não é feio'
else if(percent <= 50) status = 'Meio feio'
else if(percent <= 80) status = 'Feio moderado'
else status = 'Feio demais'

await tokito.sendMessage(from, {
image: {url: imgfeio},
caption: `O quanto *@${sender_ou_n.split("@")[0]}* pode ser uma pessoa feia?\n• A porcentagem de chance é *${percent}%*, ${status}`,
contextInfo: {...DLchanneldl, mentionedJid: [sender_ou_n]}
}, {quoted: selo})
}, 7000)
break

case 'soco':
case 'socar':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer dar um soco, a mensagem ou o @')
const frases = [`Ei @${menc_os2.split('@')[0]}, @${sender.split('@')[0]} te deu um golpe fatal!`, `Atenção @${menc_os2.split('@')[0]}, @${sender.split('@')[0]} acabou de te nocautear!`, `Olá @${menc_os2.split('@')[0]}, você foi atingido pelo @${sender.split('@')[0]}!`]
const videos = [soco]
const fraseEscolhida = frases[Math.floor(Math.random() * frases.length)]
const videoEscolhido = await getBuffer(videos[Math.floor(Math.random() * videos.length)])
await tokito.sendMessage(from, {video: videoEscolhido, gifPlayback: true, caption: fraseEscolhida, contextInfo: {...DLchanneldl, mentionedJid: [sender, menc_os2]}}, {quoted: selo})
break


case 'ppt':
if(args.length < 1) return reply(`Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`);
ppt = ["pedra", "papel", "tesoura"];
ppy = ppt[Math.floor(Math.random() * ppt.length)];
ppg = Math.floor(Math.random() * 1) + 10
pptb = ppy
if((pptb == "pedra" && args == "papel") ||
(pptb == "papel" && args == "tesoura") ||
(pptb == "tesoura" && args == "pedra")) {
var vit = "vitoria"
} else if((pptb == "pedra" && args == "tesoura") ||
(pptb == "papel" && args == "pedra") ||
(pptb == "tesoura" && args == "papel")) {
var vit = "derrota"
} else if((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
var vit = "empate"
} else if(vit = "undefined") {
return reply(`Você deve digitar ${prefix}ppt pedra, ${prefix}ppt papel ou ${prefix}ppt tesoura`)
}
if(vit == "vitoria") {var tes = "Vitória do jogador"}
if(vit == "derrota") {var tes = "A vitória é do BOT"} 
if(vit == "empate") {var tes = "O jogo terminou em empate"}
reply(`*${NomeDoBot}* jogou ${pptb}, o jogador jogou: ${args} -> *${tes}*`);
break


case 'chute':
case 'chutar':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply('Marque o alvo que você quer dar um chute, a mensagem ou o @')

await tokito.sendMessage(from, {
video: {url: chutecmd},
gifPlayback: true,
caption: `Você acabou de dar um chute em *@${menc_os2.split('@')[0]}*.`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break

case 'dogolpe':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2 || menc_jid2[1]) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")

const golpes = ["𝐄𝐌 𝐈𝐋𝐔𝐃𝐈𝐑 𝐏𝐄𝐒𝐒𝐎𝐀𝐒", "𝐄𝐌 𝐅𝐄𝐑𝐈𝐑 𝐎𝐒 𝐒𝐄𝐍𝐓𝐈𝐌𝐄𝐍𝐓𝐎𝐒", "𝐄𝐌 𝐃𝐀𝐑 𝐂𝐇𝐈𝐅𝐑𝐄"]
const golpeEscolhido = golpes[Math.floor(Math.random() * golpes.length)]

await tokito.sendMessage(from, {
text: `𝐎(𝐀) *@${menc_os2.split("@")[0]}* 𝐄 𝐄𝐒𝐏𝐄𝐂𝐈𝐀𝐋𝐈𝐒𝐓𝐀: ${golpeEscolhido}.`,
contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
break

case 'shipo':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if(!menc_os2) return reply('Marque uma pessoa do grupo para encontrar o par dela.')

const parceiro = groupMembers[Math.floor(Math.random() * groupMembers.length)].id
const porcentagem = Math.floor(Math.random() * 100)

await tokito.sendMessage(from, {
text: `💘 𝐄𝐔 𝐒𝐇𝐈𝐏𝐎:\n@${parceiro.split('@')[0]}\n\n@${menc_os2.split("@")[0]}\n\n𝐂𝐎𝐌 𝐔𝐌𝐀 𝐏𝐎𝐑𝐂𝐄𝐍𝐓𝐀𝐆𝐄𝐌 𝐃𝐄: *${porcentagem}%*`,
contextInfo: {...DLchanneldl, mentionedJid: [parceiro, menc_os2]}
}, {quoted: selo})
break

case 'casal':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await reagir(from, "💘");
let m1 = groupMembers[Math.floor(Math.random() * groupMembers.length)].id
let m2 = groupMembers[Math.floor(Math.random() * groupMembers.length)].id
let random = Math.floor(Math.random() * 100)
await tokito.sendMessage(from, { image: {url: casal}, caption: `👩🏼‍❤️‍💋‍👨🏻𝐒𝐈𝐍𝐓𝐎 𝐐𝐔𝐄 𝐄𝐒𝐒𝐄𝐒 𝐃𝐎𝐈𝐒 𝐅𝐎𝐑𝐌𝐀𝐑𝐈𝐀 𝐔𝐌 𝐎𝐓𝐈𝐌𝐎 𝐂𝐀𝐒𝐀𝐋:\n\n- @${m1.split("@")[0]}\n\n- @${m2.split("@")[0]}\n\n𝐂𝐎𝐌 𝐔𝐌𝐀 𝐄𝐒𝐏𝐄𝐂𝐓𝐀𝐓𝐈𝐕𝐀 𝐃𝐄:*${random}%*`, contextInfo: {...DLchanneldl, mentionedJid: [m1, m2]}}, {quoted: selo}).catch(() => {reply(mess.error())})
break

case 'gozar':
case 'goza':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
await reagir(from, "😈")
if(!menc_os2 || menc_jid2[1]) return reply('*ᴍᴀʀǫᴜᴇ ᴀ ᴘᴇssᴏᴀ ǫᴜᴇ ᴠᴏᴄᴇ ǫᴜᴇʀ ɢᴏᴢᴀʀ 🙈*')

const gozacao = ['Você acabou de gozar na boca do(a)', 'Você acabou de gozar no cuzinho do(a)', 'Você acabou de gozar na bucetinha do(a)', 'Você acabou de gozar no pé do(a)', 'Você acabou de gozar na cabeça do(a)', 'Você acabou de gozar na cara do(a)'] 
const gozarEscolhido = gozacao[Math.floor(Math.random() * gozacao.length)]
await tokito.sendMessage(from, {video: {url: Gozar}, gifPlayback: true, caption: `${gozarEscolhido} @${menc_os2.split('@')[0]} 🥵`, contextInfo: {...DLchanneldl, mentionedJid: [menc_os2]}}, {quoted: selo})
break

case 'wame':
reply(`*⏤͟͟͞͞Aqui está o link do seu número do Whatsapp* 🙇‍♂️ ↴\n\n • https://wa.me/${sender.split("@")[0]}${q ? "?text="+ q.replace(/ /g, "%20") : ""}`);
break;

case 'vab':
case 'vcprefere':
case 'voceprefere': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isModobn) return reply(mess.onlyGroupFun(prefix));
await reagir(from, '🎭');
try {
const array = await psycatgames();
const sorteio = array[Math.floor(Math.random() * array.length)];
const { pergunta1, pergunta2 } = sorteio.questions[Math.floor(Math.random() * sorteio.questions.length)];
await sendPoll(tokito, from, `*🤔 𝐕𝐎𝐂𝐄̂ 𝐏𝐑𝐄𝐅𝐄𝐑𝐄 ⧽*\n•\n> 1️⃣ - ${pergunta1}\n-\n> 2️⃣ - ${pergunta2}\n•\n⚡ 𝐄𝐒𝐂𝐎𝐋𝐇𝐀 𝐁𝐄𝐌...`, [ '✰ 𝐎𝐏𝐂̧𝐀̃𝐎 𝟏 ✰', '✰ 𝐎𝐏𝐂̧𝐀̃𝐎 𝟐 ✰' ]);
} catch (err) {
console.error("Erro no comando 'Você Prefere':", err);
await replyWithReaction(mess.error(), { react: { text: '💀', key: info.key } });
}
break;
}

case 'eununca': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isModobn) return reply(mess.onlyGroupFun(prefix));
await reagir(from, '🧊');
try {
const Never = tools.iNever[Math.floor(Math.random() * tools.iNever.length)];
await sendPoll(tokito, from, `*❓𝑃𝐸𝑅𝐺𝑈𝑁𝑇𝐴 ⧽*\n\n> ${Never}\n\n✅ 𝐕𝐎𝐂𝐄̂ 𝐉𝐀 𝐎𝐔 𝐍𝐔𝐍𝐂𝐀? ❎`, [ `✰ 𝐄𝐔 𝐉𝐀 😳 ✰`, `✰ 𝐄𝐔 𝐍𝐔𝐍𝐂𝐀 👀 ✰` ]
);
} catch (err) {
console.error("Erro no comando 'Eu Nunca':", err);
await replyWithReaction(mess.error(), { react: { text: '🕯️', key: info.key } });
}
break;
}

case 'rankgay': case 'rankgays':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsGay = []
let rankGay = `🏳️‍🌈 RANK DOS 5 MAIS GAY DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsGay.push(membro)
rankGay += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image: {url: rnkgay}, caption: rankGay, contextInfo:{...DLchanneldl, mentionedJid: mentionsGay}}, {quoted: selo})
break

case 'rankcasalzin': case 'rankcasais': case 'rankcasal':
if(!isGroup) return reply(mess.onlyGroup());
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
await reagir(from, "💞");
let mentionsCasal = []
let rankCasal = `❣ RANK CASAIS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const m1 = somembros[Math.floor(Math.random()*somembros.length)];
const m2 = somembros[Math.floor(Math.random()*somembros.length)];
mentionsCasal.push(m1, m2);
const porcent = Math.floor(Math.random()*101);
rankCasal += `• ${i+1}° ${porcent}% - @${m1.split('@')[0]} e @${m2.split('@')[0]}\n\n`;
}
await tokito.sendMessage(from, {image: {url: rankcasal}, caption: rankCasal, contextInfo:{...DLchanneldl, mentionedJid: mentionsCasal}}, {quoted: selo})
break

case 'rankfalido': case 'rankfalidos':
if(!isGroup) return reply(mess.onlyGroup());
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
let mentionsFalido = []
let rankFalido = `💸 RANK DOS 5 MAIS FALIDOS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)];
mentionsFalido.push(membro);
rankFalido += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`;
}
await tokito.sendMessage(from, {image: {url: rankfalido}, caption: rankFalido, contextInfo:{...DLchanneldl, mentionedJid: mentionsFalido}}, {quoted: selo})
break

case 'rankcu':
if(!isGroup) return reply(mess.onlyGroup());
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
let mentionsCu = []
let rankCu = `🍑 RANK DOS 5 MAIS CUZUDOS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)];
mentionsCu.push(membro);
rankCu += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`;
}
await tokito.sendMessage(from, {image: {url: rankcu}, caption: rankCu, contextInfo:{...DLchanneldl, mentionedJid: mentionsCu}}, {quoted: selo})
break

case 'rankbct': case 'rankbuceta': case 'rankbucetudas':
if(!isGroup) return reply(mess.onlyGroup());
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
let mentionsBCT = []
let rankBCT = `🔥 RANK DAS 5 MAIS BUCETUDAS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)];
mentionsBCT.push(membro);
rankBCT += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`;
}
await tokito.sendMessage(from, {image: {url: rankbct}, caption: rankBCT, contextInfo:{...DLchanneldl, mentionedJid: mentionsBCT}}, {quoted: selo})
break

case 'rankgado': case 'rankgados':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsGado = []
let rankGado = `🏆 TOP 5 MAIS GADOS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsGado.push(membro)
rankGado += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image: {url: rnkgado}, caption: rankGado, contextInfo:{...DLchanneldl, mentionedJid: mentionsGado}}, {quoted: selo})
break

case 'rankcorno': case 'rankcornos':
if(!isGroup) return reply(mess.onlyGroup());
if(!isModobn) return reply(mess.onlyGroupFun(prefix));
let mentionsCorno = []
let rankCorno = `🐂 TOP 5 MAIS CHIFRUDOS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)];
mentionsCorno.push(membro);
rankCorno += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`;
}
await tokito.sendMessage(from, {image: {url: rnkcorno}, caption: rankCorno, contextInfo:{...DLchanneldl, mentionedJid: mentionsCorno}}, {quoted: selo})
break

case 'surubao': case 'suruba':
await reagir(from, "😈")
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
if (!q) return reply(`Eita, coloque o número de pessoas após o comando.`)
if (Number(q) > 1000) return reply("Coloque um número menor, ou seja, abaixo de *1000*.")
const frasesSuruba = [
`tá querendo relações sexuais a ${q}, topa?`,
`quer que ${q} pessoas venham de chicote, algema e corda de alpinista.`,
`quer que ${q} pessoas der tapa na cara, lhe chame de cachorra e fud3r bem gostosinho...`
]
const fraseEscolhidakk = frasesSuruba[Math.floor(Math.random()*frasesSuruba.length)]
let mentionsSuruba = [sender]
let msgSuruba = `😝 @${sender.split('@')[0]} ${fraseEscolhidakk}\n\n`
for(let i=0;i<q;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)];
mentionsSuruba.push(membro)
msgSuruba += `@${membro.split('@')[0]}\n`
}
await tokito.sendMessage(from, {text: msgSuruba, contextInfo:{...DLchanneldl, mentionedJid: mentionsSuruba}}, {quoted: selo})
break

case 'rankgostosos': case 'rankgostoso':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsGostoso = []
let rankGostoso = `🔥 RANK DOS 5 MAIS GOSTOSOS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsGostoso.push(membro)
rankGostoso += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image: {url: rnkgostoso}, caption: rankGostoso, contextInfo:{...DLchanneldl, mentionedJid: mentionsGostoso}}, {quoted: selo})
break

case 'rankgostosas': case 'rankgostosa':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsGostosa = []
let rankGostosa = `😏 RANK DAS 5 MAIS GOSTOSAS DO GRUPO\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsGostosa.push(membro)
rankGostosa += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image: {url: rnkgostosa}, caption: rankGostosa, contextInfo:{...DLchanneldl, mentionedJid: mentionsGostosa}}, {quoted: selo})
break

case 'ranknazista': case 'ranknazistas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsNazista = []
let rankNazista = `💂‍♂ RANK DOS 5 MAIS NAZISTAS DO GRUPO 卐\n\n`;
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsNazista.push(membro)
rankNazista += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image: {url: rnknazista}, caption: rankNazista, contextInfo:{...DLchanneldl, mentionedJid: mentionsNazista}}, {quoted: selo})
break

case 'rankotaku': case 'rankotakus':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsOtaku = []
let rankOtaku = `㊙ RANK DOS 5 MAIS OTAKUS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsOtaku.push(membro)
rankOtaku += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkotaku}, caption: rankOtaku, contextInfo:{...DLchanneldl, mentionedJid: mentionsOtaku}}, {quoted: selo})
break

case 'ranksigma': case 'ranksigmas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsSigma = []
let rankSigma = `🗿🍷 RANK DOS 5 MAIS SIGMAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsSigma.push(membro)
rankSigma += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnksigma}, caption: rankSigma, contextInfo:{...DLchanneldl, mentionedJid: mentionsSigma}}, {quoted: selo})
break

case 'rankbeta': case 'rankbetas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsBeta = []
let rankBeta = `😂 RANK DOS 5 MAIS BETAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsBeta.push(membro)
rankBeta += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkbeta}, caption: rankBeta, contextInfo:{...DLchanneldl, mentionedJid: mentionsBeta}}, {quoted: selo})
break

case 'rankbaiano': case 'rankbaianos':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsBaiano = []
let rankBaiano = `💤 RANK DOS 5 MAIS BAIANOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsBaiano.push(membro)
rankBaiano += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkbaiano}, caption: rankBaiano, contextInfo:{...DLchanneldl, mentionedJid: mentionsBaiano}}, {quoted: selo})
break

case 'rankbaiana': case 'rankbaianas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsBaiana = []
let rankBaiana = `😴 RANK DAS 5 MAIS BAIANAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsBaiana.push(membro)
rankBaiana += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkbaiana}, caption: rankBaiana, contextInfo:{...DLchanneldl, mentionedJid: mentionsBaiana}}, {quoted: selo})
break

case 'rankcarioca': case 'rankcariocas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsCarioca = []
let rankCarioca = `🔫 RANK DOS 5 MAIS CARIOCAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsCarioca.push(membro)
rankCarioca += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkcarioca}, caption: rankCarioca, contextInfo:{...DLchanneldl, mentionedJid: mentionsCarioca}}, {quoted: selo})
break

case 'ranklouco': case 'rankloucos':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsLouco = []
let rankLouco = `💀 RANK DOS 5 MAIS LOUCOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsLouco.push(membro)
rankLouco += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnklouco}, caption: rankLouco, contextInfo:{...DLchanneldl, mentionedJid: mentionsLouco}}, {quoted: selo})
break

case 'ranklouca': case 'rankloucas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsLouca = []
let rankLouca = `💀 RANK DAS 5 MAIS LOUCAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsLouca.push(membro)
rankLouca += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnklouca}, caption: rankLouca, contextInfo:{...DLchanneldl, mentionedJid: mentionsLouca}}, {quoted: selo})
break

case 'ranksafada': case 'ranksafadas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsSafada = []
let rankSafada = `🔥 RANK DAS 5 MAIS SAFADINHAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsSafada.push(membro)
rankSafada += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnksafada}, caption: rankSafada, contextInfo:{...DLchanneldl, mentionedJid: mentionsSafada}}, {quoted: selo})
break

case 'ranksafado': case 'ranksafados':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsSafado = []
let rankSafado = `🥵 RANK DOS 5 MAIS SAFADINHOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsSafado.push(membro)
rankSafado += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnksafado}, caption: rankSafado, contextInfo:{...DLchanneldl, mentionedJid: mentionsSafado}}, {quoted: selo})
break

case 'rankmacaco': case 'rankmacacos':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsMacaco = []
let rankMacaco = `🐒 RANK DOS 5 MAIS MACACOS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsMacaco.push(membro)
rankMacaco += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkmacaco}, caption: rankMacaco, contextInfo:{...DLchanneldl, mentionedJid: mentionsMacaco}}, {quoted: selo})
break

case 'rankmacaca': case 'rankmacacas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsMacaca = []
let rankMacaca = `🙈 RANK DAS 5 MAIS MACACAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsMacaca.push(membro)
rankMacaca += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkmacaca}, caption: rankMacaca, contextInfo:{...DLchanneldl, mentionedJid: mentionsMacaca}}, {quoted: selo})
break

case 'rankputa': case 'rankputas':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsPuta = []
let rankPuta = `🔞 RANK DAS 5 MAIS PUTAS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsPuta.push(membro)
rankPuta += `• ${i+1}° ${Math.floor(Math.random()*100)}% - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkputa}, caption: rankPuta, contextInfo:{...DLchanneldl, mentionedJid: mentionsPuta}}, {quoted: selo})
break

case 'rankpau':
if(!isGroup) return reply(mess.onlyGroup())
if(!isModobn) return reply(mess.onlyGroupFun(prefix))
let mentionsPau = []
let rankPau = `🍆 RANK DOS 5 MAIORES PAUS DO GRUPO\n\n`
for(let i=0;i<5;i++){
const membro = somembros[Math.floor(Math.random()*somembros.length)]
mentionsPau.push(membro)
rankPau += `• ${i+1}° ${Math.floor(Math.random()*100)}cm - @${membro.split('@')[0]}\n\n`
}
await tokito.sendMessage(from, {image:{url: rnkpau}, caption: rankPau, contextInfo:{...DLchanneldl, mentionedJid: mentionsPau}}, {quoted: selo})
break

//===========[ FIM JOGOS/BRINCADEIRAS/RANKS=========\\

//==============[ RANK ATIVO E INATIVO ]===========\\
case 'atividade':
case 'atividades': {
if (!isGroupAdmins && !issupre && !ischyt) return reply(mess.onlyAdmins());

const groupIndex = countMessage.findIndex(g => g.groupId === from);
if (groupIndex === -1 || countMessage[groupIndex].numbers.length === 0) 
return reply('*"NADA FOI ENCONTRADO... GRUPO MORTO? 💀"*');

let mentionsList = [];
let texto = `- 「 *𝐀𝐓𝐈𝐕𝐈𝐃𝐀𝐃𝐄𝐒 𝐃𝐎𝐒 𝐌𝐄𝐌𝐁𝐑𝐎𝐒* 」\n\n`;
for (const u of countMessage[groupIndex].numbers) {
mentionsList.push(u.id);
texto += mess.atividade(u);
}
await tokito.sendMessage(from, {text: texto, contextInfo:{...DLchanneldl, mentionedJid: mentionsList}
}, {quoted: selo})
break;
}

case 'rankativo':
case 'rankativos': {
if (!isGroup) return reply(mess.onlyGroup());
const groupIndex = countMessage.findIndex(g => g.groupId === from);
if (groupIndex === -1) return reply('*Não há dados do grupo.*');

const sorted = [...countMessage[groupIndex].numbers].sort((a, b) =>
(b.messages + b.cmd_messages + (b.figus || 0)) - (a.messages + a.cmd_messages + (a.figus || 0))
);

let mentionsList = [];
let texto = `- 「 *𝐑𝐀𝐍𝐊 𝐀𝐓𝐈𝐕𝐎𝐒 𝐃𝐎 𝐂𝐇𝐀𝐓* 」\n\n`;
for (let i = 0; i < Math.min(5, sorted.length); i++) {
const u = sorted[i];
mentionsList.push(u.id);
texto += mess.rankativo(u, i);
}
await tokito.sendMessage(from, {text: texto, contextInfo:{...DLchanneldl, mentionedJid: mentionsList}
}, {quoted: selo})
break;
}

case 'rankinativo':
case 'rankinativos': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return;

const inativos = countMessage[groupIndex].numbers
.filter(u => u.messages <= 1)
.sort((a, b) => (b.messages + b.cmd_messages) - (a.messages + a.cmd_messages));

if (inativos.length === 0) return reply('*Todos estão ativos no grupo! ✅*');

let mentionsList = [];
let texto = `- 「 *𝐈𝐍𝐀𝐓𝐈𝐕𝐎𝐒 𝐃𝐎 𝐆𝐑𝐔𝐏𝐎* 」\n\n`;
for (let i = 0; i < Math.min(5, inativos.length); i++) {
const u = inativos[i];
mentionsList.push(u.id);
texto += mess.rankinativo(u, i);
}
await tokito.sendMessage(from, {text: texto, contextInfo:{...DLchanneldl, mentionedJid: mentionsList}
}, {quoted: selo})
break;
}

case 'check':
case 'checkativo': {
if (!isGroup) return reply(mess.onlyGroup());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply('O bot não tem ainda dados sobre o grupo');
if (!menc_os2 || Array.isArray(menc_os2) || menc_os2.includes(',')) 
return reply('Marque apenas 1 @ por vez para verificar a atividade.');
const userIndex = countMessage[groupIndex].numbers.findIndex(u => u.id === menc_os2);
if (userIndex >= 0) {
const u = countMessage[groupIndex].numbers[userIndex];
await tokito.sendMessage(from, {
text: mess.check(u),
contextInfo:{...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
} else {
await tokito.sendMessage(from, {
text: `*SEM DADOS SOBRE @${menc_os2.split('@')[0]} NESTE GRUPO...*`,
contextInfo:{...DLchanneldl, mentionedJid: [menc_os2]}
}, {quoted: selo})
}
break;
}

case 'me':
case 'mecheck':
case 'checkme': {
if (!isGroup) return reply(mess.onlyGroup());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply('O bot ainda não tem dados sobre este grupo.');
const userIndex = countMessage[groupIndex].numbers.findIndex(u => u.id === sender);
if (userIndex >= 0) {
const u = countMessage[groupIndex].numbers[userIndex];
await tokito.sendMessage(from, {
text: mess.checkme(u),
contextInfo: {...DLchanneldl, mentionedJid: [sender]}
}, {quoted: selo})
} else {
await tokito.sendMessage(from, {
text: `*SEM DADOS SOBRE @${sender.split('@')[0]} NESTE GRUPO...*`,
contextInfo: {...DLchanneldl, mentionedJid: [sender]}
}, {quoted: selo})
}
break;
}

case 'inativos':
case 'inativo': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!q || q.match(/[a-z]/i)) return reply(`Exemplo: ${prefix + command} 0\nMostrará membros com 0 mensagens ou menos.`);

const groupIndex = getGroupIndex(from);
const limite = Number(q.trim());
const inativos = countMessage[groupIndex].numbers
.filter(u => u.messages <= limite && u.cmd_messages <= limite && (u.figus || 0) <= limite)
.map(u => u.id);

if (inativos.length === 0) return reply(`Não tem pessoas com ${limite} mensagens ou menos.`);

let texto = `Usuários com *${limite}* mensagens ou menos:\n–\n`;
inativos.forEach((id, i) => {
texto += `*${i+1}.* @${id.split('@')[0]}\n`;
});

await mention(texto, inativos, true);
break;
}

case 'banghost': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if (!isBotGroupAdmins) return reply(mess.onlyBotAdmin());
if (!q || q.match(/[a-z]/i) || q.length > 3)
return reply(`*ᴅɪɢɪᴛᴇ ᴀ ǫᴜᴀɴᴛɪᴅᴀᴅᴇ ᴍɪɴɪᴍᴀ ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ 🤷‍♂️*\n*Exemplo:* ${prefix + command} 5`);
const limite = Number(q.trim());
let ind = countMessage.map(i => i.groupId).indexOf(from);
if (ind === -1) return reply('Não há dados deste grupo ainda.');
const groupData = countMessage[ind];
const groupMemberIds = groupMembers.map(m => m.jid); 
const membersToRemove = groupData.numbers
.filter(u => {
const msgs = u.messages || 0;
const cmds = u.cmd_messages || 0;
const figus = u.figus || 0;
const imgs = u.imagens || 0;
const vids = u.videos || 0;
const auds = u.audios || 0;
const docs = u.documentos || 0;
return (msgs <= limite && cmds <= limite && figus <= limite && imgs <= limite && vids <= limite && auds <= limite && docs <= limite );
})
.filter(u => !groupAdmins.includes(u.id))
.filter(u => !numerodono.includes(u.id))
.filter(u => u.id !== botNumber)
.filter(u => groupMemberIds.includes(u.id)) 
.map(u => u.id);
if (membersToRemove.length === 0)
return reply(`*ɴᴀᴏ ᴛᴇᴍ ᴍᴇᴍʙʀᴏꜱ ᴄᴏᴍ ${limite} ᴍᴇɴꜱᴀɢᴇɴꜱ ᴘᴀʀᴀ ʀᴇᴍᴏᴠᴇʀ.* 🤷‍♂️`);
try {
await tokito.groupParticipantsUpdate(from, membersToRemove, 'remove');
groupData.numbers = groupData.numbers.filter(u => !membersToRemove.includes(u.id));
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/countmsg.json', JSON.stringify(countMessage, null, 2));
reply(`*ᴛᴏᴛᴀʟ ᴅᴇ ${membersToRemove.length} ᴍᴇᴍʙʀᴏꜱ ʀᴇᴍᴏᴠɪᴅᴏꜱ ᴅᴏ ɢʀᴜᴩᴏ ${groupName} ᴘᴏʀ ᴄᴏɴᴛᴇʀ ${limite} ᴍᴇɴꜱᴀɢᴇɴꜱ.* 🙇‍♂️`);
} catch (err) {
console.error(err);
reply(mess.error());
}
break;
}

case 'limpargp':
case 'limpar_mortos-cnt': {
if (!SoDono) return reply(mess.onlyOwner());
if (!isGroup) return reply(mess.onlyGroup());

const ind = countMessage.findIndex(i => i.groupId === from);
if (ind === -1) return reply("Nenhum dado de contador encontrado para este grupo.");

const participantesAtuais = groupMembers.map(m => m.id);
const grupo = countMessage[ind];

let removidos = 0;
for (let i = grupo.numbers.length - 1; i >= 0; i--) {
if (!participantesAtuais.includes(grupo.numbers[i].id)) {
grupo.numbers.splice(i, 1);
removidos++;
}
}

fs.writeFileSync("./DADOS_TOKITO/INFO_TOKITO/media/countmsg.json", JSON.stringify(countMessage, null, 2));
reply(`Usuários que saíram ou foram removidos do grupo foram tirados do contador: ${removidos} removidos.`);
break;
}


case 'addmsg': {
if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const txt = budy.trim();
const barra = txt.indexOf('|');
if (barra === -1)
return reply(`*🤦‍♂️ ᴠᴏᴄᴇ ᴄᴏʟᴏᴄᴏᴜ ᴇʀʀᴀᴅᴏ sᴇɴʜᴏʀ(ᴀ), ᴠᴏᴜ ᴅᴀʀ ᴜᴍ ᴇxᴇᴍᴘʟᴏ:*\n> *⚙️ → ${prefix + command}@ᴜsᴇʀ|100ᴍsɢ 20 ғɪɢ 10 ᴄᴍᴅ..*`);
let alvo;
const ctx = info.message?.extendedTextMessage?.contextInfo;
if (ctx?.mentionedJid?.length)
alvo = ctx.mentionedJid[0];
else {
const num = txt.split(/ +/)[1];
if (num && /^\d+$/.test(num)) alvo = num + "@s.whatsapp.net";
}
if (!alvo) alvo = sender;
alvo = jidNormalizedUser(alvo);
const valoresTxt = txt.slice(barra + 1).trim();
if (!valoresTxt) return reply("*ᴄᴏʟᴏǫᴜᴇ ᴏs ᴠᴀʟᴏʀᴇs ᴀᴘᴏs ᴀ ʙᴀʀʀᴀ ɴᴇ 🙄*\n> *ᴇxᴇᴍᴘʟᴏ /100ɴsɢ 10 ғɪɢ");
const mapa = { msg:'messages', fig:'figus', img:'imagens', vid:'videos', audio:'audios', doc:'documentos', cmd:'cmd_messages'};
const grupo = countMessage.find(g => g.groupId === from);
if (!grupo) return reply("ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀᴏ ᴘᴏssᴜɪ ᴄᴏɴᴛᴀᴅᴏʀ.");
const user = grupo.numbers.find(u => u.id === alvo);
if (!user) return reply("*ᴇʟᴇ ɴᴇᴍ ᴛᴀ ɴᴏ ᴄᴏɴᴛᴀᴅᴏʀ, ǫᴜᴇʀ ǫᴜᴇ ᴇᴜ ғᴀᴄᴀ ᴍᴀɢɪᴄᴀ ᴇ? 🙄*");
const itens = valoresTxt.split(/ +/);
const adicionados = [];
const invalidos = [];
for (const x of itens) {
const m = x.match(/^(\d+)(msg|fig|img|vid|audio|doc|cmd)$/i);
if (!m) { invalidos.push(x); continue; }
const qtd = Number(m[1]);
const tipo = m[2].toLowerCase();
const campo = mapa[tipo];
if (!campo) { invalidos.push(x); continue; }
user[campo] = (user[campo] || 0) + qtd;
adicionados.push(x);
}
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/countmsg.json', JSON.stringify(countMessage));
let resp = `*ᴠᴀʟᴏʀᴇs ᴀᴅɪᴄɪᴏɴᴀᴅᴏs ᴘᴀʀᴀ @${alvo.split("@")[0]} ᴄᴏᴍ sᴜᴄᴇssᴏ 🙇‍♂️*\n`;
if (adicionados.length) resp += `*ᴀᴅɪᴄɪᴏɴᴀᴅᴏs: ${adicionados.join(', ')} 💯*`;
if (invalidos.length)resp += `\n*ɪɴᴠᴀʟɪᴅᴏs: ${invalidos.join(', ')} ❗*`;
await tokito.sendMessage(from,{text: resp, contextInfo: { ...DLchanneldl, mentionedJid: [alvo]}}, { quoted: selo });
break;
}


case 'tirardb':
case 'tirar_docnt': {
if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply("*ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀᴏ ᴘᴏssᴜɪ ᴄᴏɴᴛᴀᴅᴏʀ. 🤷‍♂️*");
let alvo;
if (info.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
alvo = info.message.extendedTextMessage.contextInfo.mentionedJid[0];
} else if (args[0]) {
const num = args[0].replace(/\D/g, '');
if (!num) return reply('*ᴠᴏᴄᴇ ᴇʀʀᴏᴜ ᴇᴍ ᴀʟɢᴏ ᴀɪ sᴇɴʜᴏʀ(ᴀ) 🤷‍♂️*');
alvo = num + '@s.whatsapp.net';
} else {
return reply(`*🤦‍♂️ ᴠᴏᴄᴇ ᴄᴏʟᴏᴄᴏᴜ ᴇʀʀᴀᴅᴏ sᴇɴʜᴏʀ(ᴀ), ᴠᴏᴜ ᴅᴀʀ ᴜᴍ ᴇxᴇᴍᴘʟᴏ:*\n> *⚙️ → ${prefix + command} @ᴜsᴇʀ*`);
}
let userIndex = countMessage[groupIndex].numbers.findIndex(u => u.id === alvo);
if (userIndex === -1) {
return reply("*ᴇʟᴇ ɴᴇᴍ ᴛᴀ ɴᴏ ᴄᴏɴᴛᴀᴅᴏʀ, ǫᴜᴇʀ ǫᴜᴇ ᴇᴜ ғᴀᴄᴀ ᴍᴀɢɪᴄᴀ ᴇ? 🙄*");
}
countMessage[groupIndex].numbers.splice(userIndex, 1);
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/countmsg.json', JSON.stringify(countMessage));
await tokito.sendMessage(from, {
text: `*ᴄᴇʀᴛᴏ ᴍᴇsᴛʀᴇ, ᴀᴄᴀʙᴇɪ ᴅᴇ ʀᴇᴍᴏᴠᴇʀ ᴏ @${alvo.split('@')[0]} ᴅᴏ ᴄᴏɴᴛᴀᴅᴏʀ ᴅᴇ ᴍᴇɴsᴀɢᴇᴍ 💁‍♂️*.`,
contextInfo: { mentionedJid: [alvo], ...DLchanneldl }
}, { quoted: selo });
break;
}

case 'limpar_contador':
case 'clean_counter': {
if (!isGroup) return reply(mess.onlyGroup());
if (!SoDono && !isnit && !issupre && !ischyt) return reply(mess.onlyOwner());
const groupIndex = getGroupIndex(from);
if (groupIndex === -1) return reply("*ᴇsᴛᴇ ɢʀᴜᴘᴏ ɴᴀᴏ ᴘᴏssᴜɪ ᴄᴏɴᴛᴀᴅᴏʀ. 🤷‍♂️*");
const totalAntes = countMessage[groupIndex].numbers.length;
countMessage[groupIndex].numbers = [];
fs.writeFileSync('./DADOS_TOKITO/INFO_TOKITO/media/countmsg.json', JSON.stringify(countMessage));
const mensagem = totalAntes > 0 
? `*ᴄᴏɴᴛᴀᴅᴏʀ ᴅᴇ ᴍᴇɴꜱᴀɢᴇᴍ ᴅᴇꜱᴛᴇ ɢʀᴜᴩᴏ ʟɪᴍᴩᴏ ᴄᴏᴍ ꜱᴜᴄᴇꜱꜱᴏ ꜱᴇɴʜᴏʀ(ᴀ), ꜰᴏʀᴀᴍ ɴᴏ ᴛᴏᴛᴀʟ ${totalAntes} ᴄᴏɴᴛᴀᴛᴏꜱ 🙆‍♂️*`
: '*ɴᴇɴʜᴜᴍ ᴄᴏɴᴛᴀᴛᴏ ꜰᴏɪ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ, ᴇꜱᴛᴀ ᴛᴜᴅᴏ ʟɪᴍᴩᴏ ꜱᴇɴʜᴏʀ(ᴀ) 🙇‍♂️*';
reply(mensagem);
break;
}


//============[ FIM CASES RANK ATIVO/INATIVO ]==========\\

//================[ NAMORO ]===========\\

case 'namorar':
case 'pediremnamoro': {
if (!isGroup) return reply(mess.onlyGroup());
if (!menc_os2) return reply("*🌟 ᴍᴇɴᴄɪᴏɴᴇ ᴀ ᴍᴇɴsᴀɢᴇᴍ ᴏᴜ ᴍᴀʀǫᴜᴇ ᴜᴍ ᴜsᴜᴀʀɪᴏ ᴄᴏᴍ ᴏ @ ᴅᴇʟᴇ*")
if (botNumberLID.includes(menc_os2)) return reply("*ᴇᴜ sᴏᴜ ᴀᴘᴇɴᴀs ᴜᴍᴀ ᴍᴀǫᴜɪɴᴀ ǫᴜᴇ ɴᴀᴏ ᴛᴇᴍ sᴇɴᴛɪᴍᴇɴᴛᴏs.. ɴᴀᴏ ᴘᴏssᴏ ᴘʀᴇᴇɴᴄʜᴇʀ sᴇᴜ ᴠᴀᴢɪᴏ, ᴘᴇᴄᴀ ᴀʟɢᴜᴇᴍ ʀᴇᴀʟ ᴇᴍ ɴᴀᴍᴏʀᴏ, ᴇ ɴᴀᴏ ᴜᴍ ʀᴏʙᴏ. 🤦‍♂️*");
if (JSON.stringify(namoro2).includes(menc_os2)) return reply(`*ᴇꜱᴛᴇ ᴜꜱᴜᴀʀɪᴏ ᴊᴀ ꜰᴏɪ ᴩᴇᴅɪᴅᴏ ᴇᴍ ɴᴀᴍᴏʀᴏ 💁‍♂️*`);
if (JSON.stringify(namoro1).includes(menc_os2) && namoro1[namoro1.map(i => i.usu1).indexOf(menc_os2)].namorados == false)
return reply(`*ᴇssᴀ ᴘᴇssᴏᴀ ᴊᴀ ᴘᴇᴅɪᴜ ᴀʟɢᴜᴇᴍ ᴍᴀɪs ɪɴᴛᴇʀᴇssᴀɴᴛᴇ ǫᴜᴇ ᴠᴏᴄᴇ ᴇᴍ ɴᴀᴍᴏʀᴏ, sɪɴᴛᴏ ᴍᴜɪᴛᴏ 🤷‍♂️*`);
if (JSON.stringify(namoro1).includes(menc_os2) && namoro1[namoro1.map(i => i.usu1).indexOf(menc_os2)].namorados == true)
return reply(`*ɴᴀᴏ ᴇ ᴘᴏssɪᴠᴇʟ, ᴘᴏɪs ᴀ ᴍᴇsᴍᴀ ᴊᴀ ᴇsᴛᴀ ᴄᴏᴍ ᴏᴜᴛʀᴏ(ᴀ) 💁‍♂️*`);
if (JSON.stringify(namoro1).includes(sender) && namoro1[namoro1.map(i => i.usu1).indexOf(sender)].namorados == false)
return mention(`*ᴠᴏᴄᴇ ᴊᴀ ᴘᴇᴅɪᴜ ᴀʟɢᴜᴇᴍ ᴇᴍ ɴᴀᴍᴏʀᴏ, ᴘᴀʀᴇ ᴅᴇ ʙʀɪɴᴄᴀʀ ᴄᴏᴍ ᴏs sᴇɴᴛɪᴍᴇɴᴛᴏs ᴅᴏs ᴏᴜᴛʀᴏs 🤦‍♂️*`);
if (JSON.stringify(namoro1).includes(sender) && namoro1[namoro1.map(i => i.usu1).indexOf(sender)].namorados == true)
return mention(`*ᴠᴏᴄᴇ ᴊᴀ ᴇsᴛᴀ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴀʟɢᴜᴇᴍ, ᴘᴀʀᴇ ᴅᴇ sᴇʀ ɪɴғɪᴇʟ ᴇ sᴇᴊᴀ ғɪᴇʟ ɪɢᴜᴀʟ ᴀ ᴍɪᴍ 💁‍♂️*`);
await reagir(from, "💍");
namoro1.push({usu1: sender, usu2: menc_os2.split('@')[0], namorados: false, idgp: from, hora: hourofc, data: dattofc});
fs.writeFileSync("./DADOS_TOKITO/func/namoro1.json", JSON.stringify(namoro1));
namoro2.push({id: menc_os2, pedido: sender.split('@')[0], idgp: from});
fs.writeFileSync("./DADOS_TOKITO/func/namoro2.json", JSON.stringify(namoro2));
const texto = mess.pedidoNamoro(menc_os2, sender, prefix);
await tokito.sendMessage(from, { image: { url: namorar }, caption: texto, contextInfo: { ...DLchanneldl, mentionedJid: [menc_os2, sender] }}, { quoted: selo });
break;
}

case 'cancelar':
case 'cancelarpedido': {
if (!isGroup) return reply(mess.onlyGroup());
const index1 = namoro1.findIndex(i => i.usu1 === sender);
if (index1 === -1) return reply("*ᴇᴜ ᴠᴏᴜ ᴄᴀɴᴄᴇʟᴀʀ ᴏ ǫᴜᴇ sᴇ ɴᴀᴏ ᴛᴇᴍ ɴᴀᴅᴀ? 🤦‍♂️*");
if (namoro1[index1].namorados === true)
return reply("*ɴᴀᴏ ᴇ ᴘᴏssɪᴠᴇʟ ᴄᴀɴᴄᴇʟᴀʀ ᴀʟɢᴏ ǫᴜᴇ ᴊᴀ ғᴏɪ ᴀᴄᴇɪᴛᴏ 🤷‍♂️*");
const parceiro = namoro1[index1].usu2 + "@s.whatsapp.net";
namoro1.splice(index1, 1);
fs.writeFileSync("./DADOS_TOKITO/func/namoro1.json", JSON.stringify(namoro1));
const index2 = namoro2.findIndex(i => i.id === parceiro && i.pedido === sender.split("@")[0]);
if (index2 !== -1) {
namoro2.splice(index2, 1);
fs.writeFileSync("./DADOS_TOKITO/func/namoro2.json", JSON.stringify(namoro2));
}
reply("*ᴘᴇᴅɪᴅᴏ ᴅᴇ ɴᴀᴍᴏʀᴏ ᴄᴀɴᴄᴇʟᴀᴅᴏ! 💁‍♂️*");
break;
}

case 'terminar':
case 'terminar_namoro': {
if (!JSON.stringify(namoro1).includes(sender))
return reply(`*ᴠᴏᴄᴇ ɴᴀᴏ ᴇꜱᴛᴀ ɴᴀᴍᴏʀᴀɴᴅᴏ ᴄᴏᴍ ɴɪɴɢᴜᴇᴍ...🙇‍♂️*`);
let D1 = namoro1.map(i => i.usu1).indexOf(sender);
if (D1 === -1) D1 = namoro1.map(i => i.usu2).indexOf(sender);
if (D1 === -1)
return reply(`*ɴᴀᴏ ᴇɴᴄᴏɴᴛʀᴇɪ ᴏ ꜱᴇᴜ ʀᴇʟᴀᴄɪᴏɴᴀᴍᴇɴᴛᴏ. ᴛᴇɴᴛᴇ ᴅᴇ ɴᴏᴠᴏ 🤷‍♂️*`);
const parceiro = namoro1[D1].usu1 === sender ? namoro1[D1].usu2 : namoro1[D1].usu1;
const jidParceiro = parceiro.includes('@s.whatsapp.net') ? parceiro : `${parceiro}@s.whatsapp.net`;
const D2 = namoro1.map(a => a.usu1).indexOf(jidParceiro);
if (D2 !== -1) { namoro1[D2].namorados = false; namoro1.splice(D2, 1);
}
await reply(`*ᴏ ɴᴀᴍᴏʀᴏ ꜰᴏɪ ᴅᴇꜱᴛʀᴜɪ́ᴅᴏ... ᴠᴏᴄᴇ ᴀɢᴏʀᴀ ᴇꜱᴛᴀ ꜱᴏʟᴛᴇɪʀᴏ ᴅᴇ ɴᴏᴠᴏ!🙆‍♂️*`);
await tokito.sendMessage(jidParceiro, { text: `*💔 ᴛᴇɴʜᴏ ᴜᴍᴀ ɴᴏᴛɪ́ᴄɪᴀ ᴛʀɪꜱᴛᴇ... ꜱᴇᴜ ᴘᴀʀᴄᴇɪʀᴏ(ᴀ) ᴀᴄᴀʙᴏᴜ ᴅᴇ ᴛᴇʀᴍɪɴᴀʀ ᴏ ɴᴀᴍᴏʀᴏ...😔*\n> *ɢᴜᴀʀᴅᴇ ᴏꜱ ʙᴏɴꜱ ᴍᴏᴍᴇɴᴛᴏꜱ, ᴍᴇꜱᴍᴏ ǫᴜᴇ ᴅᴏᴀ...🙇‍♂️*`, contextInfo: { ...DLchanneldl, mentionedJid: [sender, jidParceiro] }}, { quoted: selo });
namoro1.splice(D1, 1);
fs.writeFileSync('./DADOS_TOKITO/func/namoro1.json', JSON.stringify(namoro1));
break;
}


case 'minhadupla':
case 'dupla': {
if (!isGroup) return reply(mess.onlyGroup())
const userNum = sender.split('@')[0]
const dupla = namoro1.find(i => i.usu1 === sender || i.usu1 === userNum || i.usu2 === sender || i.usu2 === userNum)
if (!dupla) return reply('*ᴠᴏᴄᴇ ɴᴀᴏ ᴇsᴛᴀ ɴᴀᴍᴏʀᴀɴᴅᴏ ɴɪɴɢᴜᴇᴍ.. 🤷‍♂️*')
if (!dupla.namorados) return reply('*sᴇᴜ ᴘᴇᴅɪᴅᴏ ᴀɪɴᴅᴀ ɴᴀᴏ ғᴏɪ ᴀᴄᴇɪᴛᴏ.. 💁‍♂️*')
await reagir(from, "❤️‍🩹");
const parceiro1 = dupla.usu1.includes('@') ? dupla.usu1 : `${dupla.usu1}@s.whatsapp.net`
const parceiro2 = dupla.usu2.includes('@') ? dupla.usu2 : `${dupla.usu2}@s.whatsapp.net`
if (!dupla.inicio) {
dupla.inicio = Date.now()
const fs = require('fs')
fs.writeFileSync('./DADOS_TOKITO/func/namoro1.json', JSON.stringify(namoro1))
}
const tempoJuntos = msToTime(Date.now() - dupla.inicio)
const texto = mess.minhaDupla(parceiro1, parceiro2, tempoJuntos, dupla);
try {
const ppimg = await tokito.profilePictureUrl(parceiro2, 'image')
await tokito.sendMessage(from, { image: { url: ppimg }, caption: texto, mentions: [parceiro1, parceiro2], contextInfo: { ...DLchanneldl, mentionedJid: [parceiro1, parceiro2] }}, { quoted: selo })
} catch {
await tokito.sendMessage(from, { image: { url: imgperfil }, caption: texto, mentions: [parceiro1, parceiro2], contextInfo: { ...DLchanneldl, mentionedJid: [parceiro1, parceiro2] }}, { quoted: selo })}
}
break

//============[ FIM CASES NAMORO ]==========\\

//==========[ CASES N-COINS ]============\\

case 'coins': 
case 'estatisticas': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);

const usuario = RG_SCOINS[ID_G_COINS]?.usus[ID_USU_COINS] || { coins: 0, chances: { minerar: 0, cassino: 0 } };

await mention(`↳ ${tempo} ↝ @${sender.split('@')[0]} ↴\n\n` +
`☆ۜ͜͡💰 • Saldo atual: '${usuario.coins} N-Coins' 💨\n\n` +
`☆ۜ͜͡⛏️ • Chances restantes de mineração: ${usuario.chances.minerar}/6\n\n` +
`☆ۜ͜͡🎰 • Chances restantes no cassino: ${usuario.chances.cassino}/5`);
break;
}

case 'sorteiocoins': 
case 'sortcoins': {
if (!isGroup) return reply(mess.onlyGroup());
if (!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (!SoDono) return reply(mess.onlyOwner());
if (q.match(/[a-z]/i)) return reply("️️😭🌟 Por favor, insira um valor numérico válido para sortear.");

const participantes = RG_SCOINS[ID_G_COINS]?.usus || [];
if (participantes.length === 0) return reply("Não há usuários registrados no sistema para o sorteio.");

const randomIndex = Math.floor(Math.random() * participantes.length);
const LuckyUser = participantes[randomIndex].id;

await mention(`🎉🌟 Parabéns @${LuckyUser.split("@")[0]}, você acaba de ganhar: ${q.trim()} N-Coins. *Gaste com moderação!*`);
SYSTEM_COIN.AdicionarCoins(LuckyUser, Math.floor(q.trim()));
break;
}

case 'dadoapostado':
if (!isGroup) {
return reply(mess.onlyGroup());
}
if (!isModoCoins) {
return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
}
const [numberDado, amountBet] = q.split('/');
if (!numberDado) {
return reply(`Você esqueceu de escolher o número que você quer tirar. Escolha um número de 1 a 6. Exemplo:\n\t• *${prefix + command} número/aposta*`);
}
if (!amountBet) {
return reply(`Você esqueceu de colocar o valor que deseja apostar...`);
}
if (isNaN(numberDado) || isNaN(amountBet)) {
return reply(`Por favor, insira apenas números válidos!`);
}

const numDado = parseInt(numberDado);
const aposta = parseInt(amountBet);

if (aposta > 500) {
return reply(`Não é possível apostar mais de 500 N-Coins.`);
}
if (numDado < 1 || numDado > 6) {
return reply(`Número inválido! Informe um número de 1 a 6.`);
}
const saldoAtual = SYSTEM_COIN.VerificarCampo(sender, "coins");
if (saldoAtual < aposta) {
return reply(`Saldo insuficiente! Verifique seu saldo com '${prefix}saldo' antes de apostar.`);
}
await reagir(from, "🎲");
await reply(`Sorteando dado(s)! ⏳️`);
const drawQuantity = Math.floor(Math.random() * 6) + 1;
setTimeout(async () => {
if (drawQuantity === numDado) {
const winMessages = [
`🎲 Parabéns @${sender.split('@')[0]}, você ganhou ${aposta} N-Coins!`,
`💰 Sucesso @${sender.split('@')[0]}! Você acertou e ganhou ${aposta} N-Coins!`
];
await mention(winMessages[Math.floor(Math.random() * winMessages.length)]);
await SYSTEM_COIN.AdicionarCoins(sender, aposta);
} else {
const lossMessages = [
`🤧 Infelizmente *@${sender.split("@")[0]}*, você errou a previsão e perdeu *${aposta} N-Coins*!`,
`😿 @${sender.split("@")[0]}, você não acertou e perdeu ${aposta} N-Coins.`
];
await mention(lossMessages[Math.floor(Math.random() * lossMessages.length)]);
await SYSTEM_COIN.RemoverCoins(sender, aposta);
}
}, 5000);
break;
 

case 'anagrama':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (fs.existsSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`)) {
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`);
reply("Desativado com sucesso.");
} else {
const anaaleatorio = Math.floor(Math.random() * palavrasANA.length);
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/anagrama/${from}.json`, JSON.stringify(palavrasANA[anaaleatorio]));
await tokito.sendMessage(from, {text: `🌟😲 Decifre a palavra embaralhada abaixo, qual será a ordem correta das letras?\n—\n• Palavra: *${shuffle(palavrasANA[anaaleatorio].palavraOriginal)}*\n• Dica: ${palavrasANA[anaaleatorio].dica}`}, {quoted: selo});
}
break;

case 'quizanimais':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (fs.existsSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`)) {
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`);
reply("Desativado com sucesso.");
} else {
const animaisquiz = Math.floor(Math.random() * quizanimais.length);
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/quiz-animais/${from}.json`, JSON.stringify(quizanimais[animaisquiz]));
wew = await getBuffer(`${quizanimais[animaisquiz].foto}`);
await tokito.sendMessage(from, {image: wew, caption: `🤔 Pergunta: ${quizanimais[animaisquiz].question}`}, {quoted: selo});
}
break;

case 'whatmusic':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (fs.existsSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`)) {
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`);
reply("Desativado com sucesso.");
} else {
const whatMAle = Math.floor(Math.random() * whatMusicAr.length);
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/wmusic/${from}.json`, JSON.stringify(whatMusicAr[whatMAle]));
await tokito.sendMessage(from, {text: `🎶🎧 𝐖𝐇𝐀𝐓 𝐌𝐔𝐒𝐈𝐂? 😱💡\n–\n${whatMusicAr[whatMAle].trechoMusic}\n–\n🤔😱 Qual música pertence o trecho apresentado acima?\n• Dica: ${whatMusicAr[whatMAle].dica}`}, {quoted: selo});
}
break;

case 'gartic':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (fs.existsSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`)) {
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`);
reply("Desativado com sucesso.");
} else {
const garticquiz = Math.floor(Math.random() * garticArchives.length);
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`, JSON.stringify(garticArchives[garticquiz]));
await tokito.sendMessage(from, {image: {url: `${garticArchives[garticquiz].imagem}`}, caption: `👩🏼‍🏫 - A resposta é representada por um(a): ${garticArchives[garticquiz].pergunta}\n📜 - A resposta supostamente começa com a(s) letra(s): "${garticArchives[garticquiz].letra_inicial}"\n🤔 - Contém traços? ${garticArchives[garticquiz].contem_traços}`}, {quoted: selo});
}
break;

case 'enigma':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (fs.existsSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`)) {
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`);
reply("Desativado com sucesso.");
} else {
const engimaSolu = Math.floor(Math.random() * enigmaArchive.length);
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`, JSON.stringify(enigmaArchive[engimaSolu]));
await tokito.sendMessage(from, {image: {url: enigma}, caption: `📜 - Resolva o seguinte enigma abaixo:\n—\n${enigmaArchive[engimaSolu].charada}\n–\n❓️ - *Não sabe a resposta?* _Peça ao adm do grupo para usar o comando *${prefix}revelarenigma* para revelar a resposta correta._`}, {quoted: selo});
}
break;

case 'quizfutebol': 
case 'quizfut':
if (!isGroup) return reply(mess.onlyGroup());
if (!isGroupAdmins) return reply(mess.onlyAdmins());
if(!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (fs.existsSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`)) {
fs.unlinkSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`);
reply("Desativado com sucesso.");
} else {
const futebolquiz = Math.floor(Math.random() * quizFutebol.length);
fs.writeFileSync(`./DADOS_TOKITO/grupos/games/quiz-futebol/${from}.json`, JSON.stringify(quizFutebol[futebolquiz]));
await tokito.sendMessage(from, {text: `💫⚽ 𝐐𝐔𝐈𝐙 𝐅𝐔𝐓𝐄𝐁𝐎𝐋 ⚽💫\n–\n*🗣️| Responda a pergunta mostrada abaixo:*\n• _${quizFutebol[futebolquiz].pergunta}_`}, {quoted: selo});
}
break;

case 'cassino':
case 'slot':
if (!isGroup) return reply(mess.onlyGroup());
if (!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);

const usuario = RG_SCOINS[ID_G_COINS].usus[ID_USU_COINS];

if (usuario.chances.cassino >= 5) {
return reply(`Volte amanhã! Você consumiu todas suas 5 chances do dia no cassino.`);
}

if (usuario.coins < 30) {
return reply('Saldo insuficiente! Para usar os comandos de Coins, você deve ter pelo menos 30 N-Coins em sua carteira.');
}

usuario.chances.cassino++;
CoinsUpdate(RG_SCOINS);

const getResultSlot = ["🍓", "🍒", "🍎", "🍉"];
const V_ = Array.from({ length: 3 }, () => getResultSlot[Math.floor(Math.random() * getResultSlot.length)]);

const slotMensagem = async (mensagem) => {
reply(`> ${mensagem}\n\n『 🕹️ 𝑪𝑨𝑺𝑺𝑰𝑵𝑶 💎 』↴ \n
╔═╌✯╌═⊱×⊰🎰⊱×⊰═╌✯╌═╗
║𖣴⋗[${V_[0]} | ${V_[1]} | ${V_[2]}]◄
╚═╌✯╌═⊱×⊰💰⊱×⊰═╌✯╌═╝\n\n\n*${usuario.chances.cassino}/5* chances no cassino por hoje.`);
};

if (V_[0] === V_[1] && V_[1] === V_[2]) {
await SYSTEM_COIN.AdicionarCoins(sender, 65);
const mensagensVitoria = [
'Parece que a sorte estava esperando por você! Você acaba de levantar 65 N-Coins, aproveite você é digno de ganhar. 💰🌟',
'Que reviravolta! Você saiu do cassino com 65 N-Coins no bolso! Quem disse que os jogos de azar não valem a pena? 🌟💰',
'Surpreendente! A sorte sorriu para você esta noite no cassino, você ganhou 65 N-Coins como recompensa! 🎰✨'
];
await slotMensagem(mensagensVitoria[Math.floor(Math.random() * mensagensVitoria.length)]);
} else {
await SYSTEM_COIN.RemoverCoins(sender, 5);
const mensagensDerrota = [
'Que pena! Você perdeu, o que resultará na perda de 5 N-Coins. Mas não fique triste, na próxima você ganha! 🙏🏼🌟',
'Você perdeu, o que resultará na perda de 5 N-Coins! Com o tempo você recuperará e ultrapassará o valor perdido. 😇🌟',
'Hoje a sorte não estava de bom humor com você, perdeu 5 N-Coins. 🥱☠️'
];
await slotMensagem(mensagensDerrota[Math.floor(Math.random() * mensagensDerrota.length)]);
}
break;

case 'minerar':
case 'minerarcoins':
if (!isGroup) return reply(mess.onlyGroup());
if (!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if (RG_SCOINS[ID_G_COINS].usus[ID_USU_COINS].chances.minerar >= 6) {
return reply(`Sinto muito, você não tem mais chance para minerar hoje, porque você completou: 6/6.`);
}
if (!RG_SCOINS[ID_G_COINS].usus[ID_USU_COINS]) {
RG_SCOINS[ID_G_COINS].usus[ID_USU_COINS].chances.minerar = 1;
} else {
RG_SCOINS[ID_G_COINS].usus[ID_USU_COINS].chances.minerar += 1;
}
CoinsUpdate(RG_SCOINS);
const aleatValor = Math.floor(Math.random() * 2);
const rndg = Math.floor(Math.random() * 300); 
if (aleatValor === 0) {
const randomMining = [
`Você estava minerando nas ilhas savitas e encontrou ${rndg} N-Coins em minerais preciosos! 💰`,
`🗣💰 Você invadiu uma mina proibida e achou ${rndg} N-Coins em troca de ouro!`,
`💎👷🏻‍♀️ Em uma mina de diamantes, você encontrou 2 diamantes equivalentes a ${rndg} N-Coins.`,
`⛏️👷🏻‍♀️ Você escavou uma mina de ouro subterrânea em Minas Gerais e encontrou ${rndg} N-Coins!`,
];
await reply(randomMining[Math.floor(Math.random() * randomMining.length)]);
SYSTEM_COIN.AdicionarCoins(sender, rndg);
} else {
const miningFailureRX = [
"😥 Em sua tentativa de mineração, não foi possível encontrar nenhum mineral valioso!",
"😿 Você não deu sorte em sua escavação. Tente novamente mais tarde!",
"⛏️💎 Em Minas Gerais, famosa por suas minas de diamantes, você não encontrou nada desta vez.",
];
let miningFailure = miningFailureRX[Math.floor(Math.random() * miningFailureRX.length)];
miningFailure += RG_SCOINS[ID_G_COINS].usus[ID_USU_COINS].chances.minerar >= 6 
? "\n> Infelizmente você não tem mais chances para minerar hoje, volte amanhã..." 
: `\n> Ainda restam ${6 - RG_SCOINS[ID_G_COINS].usus[ID_USU_COINS].chances.minerar} tentativas para minerar hoje.`;
await reply(miningFailure);
}
break;

case 'revelargartic':
if (!isGroupAdmins) return reply('Somente adms podem ver a(s) resposta(s) do jogos!')
if (!isGroup) return reply(mess.onlyGroup());
if (!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if(fs.existsSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`)) return reply("Não existe nenhuma partida atual do jogo neste grupo.")
let datenagramaa = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/gartic/${from}.json`))
reply(`• Olá *${pushname}*, a resposta correta da afirmação era: ${II}${datenagramaa.resposta}${II}\n• Envie a resposta apresentada acima para passar a próxima..`)
break

case 'revelarenigma':
if (!isGroupAdmins) return reply('Somente adms podem ver a(s) resposta(s) do jogos!');
if (!isGroup) return reply(mess.onlyGroup());
if (!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
if(fs.existsSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`)) return reply("Não existe nenhuma partida atual do jogo neste grupo.");
let eni1 = JSON.parse(fs.readFileSync(`./DADOS_TOKITO/grupos/games/enigma/${from}.json`))
reply(`• Olá *${pushname}*, a resposta correta do enigma era: ${II}${eni1.respostaEne}${II}\n• Envie a resposta apresentada acima para passar a próxima..`)
break



case 'rankcoins':
if (!isGroup) return reply(mess.onlyGroup());
if (!isModoCoins) return reply(`*ᴇssᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏ ᴘᴏᴅᴇ sᴇʀ ᴀᴛɪᴠᴏ ǫᴜᴀɴᴅᴏ ᴏ sɪᴛᴇᴍᴀ ${prefix}ᴍᴏᴅᴏᴄᴏɪɴs ᴇsᴛɪᴠᴇʀ ᴀᴛɪᴠᴏ 🤷‍♂️*`);
const grupo = RG_SCOINS.find(g => g.grupo === from) || { chances: { minerar: 0, cassino: 0 } };
if (!grupo) return reply('*ɴᴀᴏ ʜᴀ ɴɪɴɢᴜᴇᴍ ᴄᴏᴍ N-ᴄᴏɪɴs ɴᴇsᴛᴇ ɢʀᴜᴘᴏ 🤷‍♂️*');
const rank = grupo.usus.sort((a, b) => b.coins - a.coins).slice(0, 10);
let mensagemRank = `╔═╌✯╌═⊱×⊰平⊱×⊰═╌✯╌═╗
║➪ 𝐑𝐀𝐍𝐊 𝐍-𝐂𝐎𝐈𝐍𝐒『💰』
╚═╌✯╌═⊱×⊰平⊱×⊰═╌✯╌═╝\n\n`;
rank.forEach((usuario, i) => {
mensagemRank += `『 ${i + 1}º 』↴
╔═╌✯╌═⊱×⊰平⊱×⊰═╌✯╌═╗
║𖣴⋗ ᴜsᴜᴀʀɪᴏ - @${usuario.id.split('@')[0]}
║𖣴⋗ sᴀʟᴅᴏ - ${usuario.coins} N-Coins
║𖣴⋗ ᴍɪɴᴇʀᴀʀ - ${usuario.chances.minerar}/6
║𖣴⋗ ᴄᴀssɪɴᴏ - ${usuario.chances.cassino}/5
╚═╌✯╌═⊱×⊰平⊱×⊰═╌✯╌═╝\n\n`;
});
mentions(mensagemRank, rank.map(u => u.id), true);
break


case 'darkgreen':
case 'glitch':
case 'write':
case 'advancedglow':
case 'typography':
case 'pixelglitch':
case 'neonglitch':
case 'flag':
case 'flag3d':
case 'deleting':
case 'blackpink':
case 'glowing':
case 'underwater':
case 'logomaker':
case 'cartoon':
case 'papercut':
case 'watercolor':
case 'affectclouds':
case 'blackpinklogo':
case 'gradient':
case 'summerbeach':
case 'luxurygold':
case 'sandsummer':
case 'galaxywallpaper':
case '1917':
case 'markingneon':
case 'royal':
case 'freecreate':
case 'galaxy':
case 'lighteffects':
case 'neondevil':
case 'frozen':
case 'metal3d':
case 'ligatures':
case 'sunset':
case 'clouds':
case 'colorido':
case 'desfoque':
case 'naruto':
case 'amongus':
case 'comic3d': {
try {
if (!q) return reply(`❌ | Digite o texto`)
await reagir(from, "🎨")
const apiUrl = `${API_URL}/api/${command}?texto=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`
await tokito.sendMessage(from, {
image: { url: apiUrl }
}, { quoted: selo })
await reagir(from, "✅")
} catch (e) {
console.log('[ERRO LOGO]', command, e)
await reagir(from, "❌")
reply("❌ Erro ao gerar o logo.")
}
}
break



case 'pornhub':
case 'deadpool':
case 'thor':
case 'captainamerica': {
try {
if (!q || !q.includes('|')) {
return reply(
`❌ | Use assim:\n` +
`${prefix}pornhub texto1|texto2\n` +
`${prefix}thor pequeno|grande\n` +
`${prefix}captainamerica pequeno|grande`
)}
await reagir(from, "🎨")
const apiUrl = `${API_URL}/api/${command}?texto=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`
await tokito.sendMessage(from, {
image: { url: apiUrl }
}, { quoted: selo })
await reagir(from, "✅")
} catch (e) {
console.log(e)
await reagir(from, "❌")
reply("❌ Erro ao gerar a imagem.")
}
}
break


case 'brat':
case 'bratimg':
case 'bratvid':
case 'bratanime':
case 'brathd': {
try {
if (!q?.trim()) return reply(`Exemplo: ${prefix + command} aurora`);

var packnameStk = `${pushname}`;
var authorSticker = `${NomeDoBot}`;

const isVideo = command === 'bratvid';
const isAnime = command === 'bratanime';
const isHD = command === 'brathd';

const apiUrl = API_URL + (
isHD
? `/api/stickers/brathd?text=${encodeURIComponent(q)}&apikey=` + API_KEY_TOKITO
: isAnime
? `/api/stickers/bratanime?text=${encodeURIComponent(q)}&apikey=` + API_KEY_TOKITO
: isVideo
? `/api/stickers/brat-vid?text=${encodeURIComponent(q)}&apikey=` + API_KEY_TOKITO
: `/api/stickers/brat-img?text=${encodeURIComponent(q)}&apikey=` + API_KEY_TOKITO
);

const buffer = await getBuffer(apiUrl);
if (!buffer) return reply("Erro ao gerar figurinha.");

let encmedia;
if (isVideo) {
encmedia = await sendVideoAsSticker2(
tokito,
from,
buffer,
selo,
{ packname: packnameStk, author: authorSticker }
);
} else {
encmedia = await sendImageAsSticker2(
tokito,
from,
buffer,
selo,
{ packname: packnameStk, author: authorSticker }
);
}

await DLT_FL(encmedia);
} catch (e) {
console.log(e);
reply("Erro ao gerar figurinha.");
}
}
break;
case 'brataurora':
case 'aurorabrat': {
try {
if (!q?.trim()) return reply(`Exemplo: ${prefix + command} aurora apis`);

var packnameStk = `${pushname}`;
var authorSticker = `${NomeDoBot}`;

const apiUrl = `${API_URL}/canvas/tokito-placa?text=${encodeURIComponent(q)}&apikey=${API_KEY_TOKITO}`;

const buffer = await getBuffer(apiUrl);
if (!buffer) return reply("Erro ao gerar figurinha.");

let encmedia = await sendImageAsSticker2(
tokito,
from,
buffer,
selo,
{ packname: packnameStk, author: authorSticker }
);

await DLT_FL(encmedia);
} catch (e) {
console.log(e);
reply("Erro ao gerar figurinha.");
}
}
break;
case 'emojigif': {
	try {
		if (!q) return reply(`uso incorreto, use: ${prefix + command} 🥰`);

		const image = await getBuffer(
			API_URL + `/api/tools/emojigif?emoji=${encodeURIComponent(q)}` + "&apikey=" + API_KEY_TOKITO
		);

		await tokito.sendMessage(from, { 
			sticker: image
		}, {  
			quoted
		});

	} catch (e) {
		reply("Erro na solicitação");
		console.log("Erro apresentado em: ", e.message);
	}
	break;
}

case 'emoji-mix':
case 'emojimix': {
	try {
		if (!q || !q.includes("+")) return reply(`uso incorreto, use: ${prefix + command} 🥰+😡`);

		var packnameStk = `${pushname}`;
		var authorSticker = `${NomeDoBot}`;

		const [emoji1, emoji2] = q.split("+").map(e => e.trim());

		const buffer = await getBuffer(
			API_URL + `/api/tools/emojimix?emoji1=${encodeURIComponent(emoji1)}&emoji2=${encodeURIComponent(emoji2)}` + "&apikey=" + API_KEY_TOKITO
		);

		if (!buffer) return reply("Erro ao gerar figurinha.");

		let encmedia = await sendImageAsSticker2(
			tokito,
			from,
			buffer,
			selo,
			{ packname: packnameStk, author: authorSticker }
		);

		await DLT_FL(encmedia);

	} catch (e) {
		reply("Erro na solicitação");
		console.log("Erro apresentado em: ", e.message);
	}
	break;
}
case 'figu':
case 'figurinhas':
case 'figuemoji':
case 'figuanime':
case 'figuengracada':
case 'figuriva':
case 'figuraiva':
case 'figuflork':
case 'figucoreana':
case 'figubebe':
case 'figuanimais':
case 'figudesenho': {
try {

let quantidade = Number(q) || 1
if (quantidade > 10) quantidade = 10
if (quantidade < 1) quantidade = 1

let endpoint = 'figurinhas'
let emoji = '😂'

if (command === 'figuemoji') {
endpoint = 'figu_emoji'
emoji = '😀'
} else if (command === 'figuanime') {
endpoint = 'figu_anime'
emoji = '🎌'
} else if (command === 'figuengracada') {
endpoint = 'figu_engracadas'
emoji = '🤣'
} else if (command === 'figuriva' || command === 'figuraiva') {
endpoint = 'figu_raiva'
emoji = '😡'
} else if (command === 'figuflork') {
endpoint = 'figu_flork'
emoji = '😆'
} else if (command === 'figucoreana') {
endpoint = 'figu_coreana'
emoji = '🇰🇷'
} else if (command === 'figubebe') {
endpoint = 'figu_bebe'
emoji = '👶'
} else if (command === 'figuanimais') {
endpoint = 'figu_animais'
emoji = '🐶'
} else if (command === 'figudesenho') {
endpoint = 'figu_desenho'
emoji = '🎨'
}

await reagir(from, emoji)

for (let i = 0; i < quantidade; i++) {
const url = `${API_URL}/api/stickers/${endpoint}?apikey=${API_KEY_TOKITO}`

await tokito.sendMessage(
from,
{ sticker: { url: url } },
{ quoted: info }
)
}

} catch (e) {
console.log('[ERRO FIGU]', command, e)
await reagir(from, "❌")
reply("❌ Erro ao enviar figurinhas.")
}
}
break
//==========[ FIM DAS CASES N-COINS ]=============\\

//==========[ CASES MIGRADAS DO KASANE ]=============\\

// ---- CONSULTAS (CPF / CPFBASICO / NOME / MAE / PAI / EMAIL / PLACA) ----
case 'cpf': {
const _v2 = KS.getVip2(sender);
if (!podeTudo && !_v2) return reply('⛔ Comando exclusivo para *dono oficial / criador* e *VIP2*.');
if (_v2 && !podeTudo && !KS.checkVip2Limit(sender)) return reply(`❌ *Limite diario atingido!*\nVoce usou suas *${_v2.dailyLimit}* consultas de hoje.\n🕛 Renova a meia-noite.`);
if (!args[0]) return reply(`⚠️ *Uso:* ${prefix}cpf [CPF]\n_Exemplo:_ ${prefix}cpf 12345678901`);
const cpfVal = args[0].replace(/\D/g, '');
if (cpfVal.length !== 11) return reply('❌ CPF deve ter exatamente 11 digitos.');
await reagir(from, '🔍');
reply('⚡ *Consultando CPF...*');
try {
const api = await KS._kasaneConsulta('cpf', cpfVal);
const d = KS._extrairDados(api);
if (!d) { await reagir(from, '❌'); return reply(`❌ *Nao encontrado*\n${api?.error || 'Nenhum dado retornado.'}`); }
await reagir(from, '✅');
if (_v2 && !podeTudo) KS.consumeVip2(sender);
reply(KS._msgCpf(d, cpfVal));
} catch (e) { await reagir(from, '❌'); reply('❌ Erro ao consultar CPF. Tente novamente.'); }
}
break;

case 'cpfbasico':
case 'cpfs': {
const _v2 = KS.getVip2(sender);
if (!podeTudo && !_v2) return reply('⛔ Comando exclusivo para *dono oficial / criador* e *VIP2*.');
if (_v2 && !podeTudo && !KS.checkVip2Limit(sender)) return reply(`❌ *Limite diario atingido!*\nVoce usou suas *${_v2.dailyLimit}* consultas de hoje.\n🕛 Renova a meia-noite.`);
if (!args[0]) return reply(`⚠️ *Uso:* ${prefix}cpfs [CPF]\n_Exemplo:_ ${prefix}cpfs 12345678901`);
const cpfVal2 = args[0].replace(/\D/g, '');
if (cpfVal2.length !== 11) return reply('❌ CPF deve ter exatamente 11 digitos.');
await reagir(from, '🔍');
reply('⚡ *Consultando CPF Basico...*');
try {
const api = await KS._kasaneConsulta('cpfbasico', cpfVal2);
const d = KS._extrairDados(api);
if (!d) { await reagir(from, '❌'); return reply(`❌ *Nao encontrado*\n${api?.error || 'Nenhum dado retornado.'}`); }
await reagir(from, '✅');
if (_v2 && !podeTudo) KS.consumeVip2(sender);
const db = {};
if (d && typeof d === 'object') for (const [k, v] of Object.entries(d)) db[k.toLowerCase()] = v;
const x2 = 'Não encontrado';
const sexoB = (db.sexo || db.genero || '') === 'M' ? 'Masculino' : (db.sexo || db.genero || '') === 'F' ? 'Feminino' : (db.sexo || db.genero || '');
let msg2 = '╔══════════════════╗\n║   📋 CPF BÁSICO   ║\n╚══════════════════╝\n\n';
msg2 += `🪪 *CPF:* ${KS._fmtCpf(cpfVal2)}\n`;
msg2 += `👤 *Nome:* ${db.nome || db.name || db.nome_completo || x2}\n`;
if (sexoB) msg2 += `🧬 *Sexo:* ${sexoB}\n`;
msg2 += `📅 *Nascimento:* ${db.nascimento || db.data_nascimento || db.dt_nascimento || x2}\n`;
const cidB = db.cidade || db.municipio || '';
const ufB = db.uf || db.estado || '';
if (cidB || ufB) msg2 += `🏙 *Cidade/UF:* ${[cidB, ufB].filter(Boolean).join(' / ')}\n`;
if (db.renda || db.renda_presumida) msg2 += `💰 *Renda:* R$ ${db.renda || db.renda_presumida}\n`;
if (db.estado_civil || db.estadocivil) msg2 += `💍 *Estado Civil:* ${db.estado_civil || db.estadocivil}\n`;
msg2 += `📌 *Situação:* ${db.situacao_cadastral || db.situacao || db.status || x2}\n`;
if (db.atualizacao_rf || db.atualizacao) msg2 += `🔄 *Atualização RF:* ${db.atualizacao_rf || db.atualizacao}\n`;
const maeB = db.mae || db.nome_mae || '';
const paiB = db.pai || db.nome_pai || '';
if (maeB || paiB) { msg2 += '\n👨‍👩‍👦 *Filiação*\n'; if (maeB) msg2 += `   👩 Mãe: ${maeB}\n`; if (paiB) msg2 += `   👨 Pai: ${paiB}\n`; }
msg2 += '\n══════════════════\n✅ *Consulta concluída*';
reply(msg2);
} catch (e) { await reagir(from, '❌'); reply('❌ Erro ao consultar. Tente novamente.'); }
}
break;

case 'nome':
case 'buscanome': {
const _v2 = KS.getVip2(sender);
if (!podeTudo && !_v2) return reply('⛔ Comando exclusivo para *dono oficial / criador* e *VIP2*.');
if (_v2 && !podeTudo && !KS.checkVip2Limit(sender)) return reply(`❌ *Limite diario atingido!*\nVoce usou suas *${_v2.dailyLimit}* consultas de hoje.\n🕛 Renova a meia-noite.`);
const nomeVal = q.trim();
if (!nomeVal) return reply(`⚠️ *Uso:* ${prefix}nome [Nome completo]\n_Exemplo:_ ${prefix}nome Joao Silva`);
await reagir(from, '🔍');
reply('⚡ *Buscando por nome...*');
try {
const api = await KS._kasaneConsulta('nome', nomeVal);
const d = KS._extrairDados(api);
const lista = api?.lista || (Array.isArray(d) ? d : null) || d?.lista || (d ? [d] : null);
if (!lista || lista.length === 0) { await reagir(from, '❌'); return reply(`❌ *Nao encontrado*\n${api?.error || 'Nenhum resultado.'}`); }
await reagir(from, '✅');
if (_v2 && !podeTudo) KS.consumeVip2(sender);
reply(KS._msgLista(lista, 'nome', nomeVal));
} catch (e) { await reagir(from, '❌'); reply('❌ Erro ao buscar nome. Tente novamente.'); }
}
break;

case 'mae':
case 'buscamae': {
const _v2 = KS.getVip2(sender);
if (!podeTudo && !_v2) return reply('⛔ Comando exclusivo para *dono oficial / criador* e *VIP2*.');
if (_v2 && !podeTudo && !KS.checkVip2Limit(sender)) return reply(`❌ *Limite diario atingido!*\nVoce usou suas *${_v2.dailyLimit}* consultas de hoje.\n🕛 Renova a meia-noite.`);
const maeVal = q.trim();
if (!maeVal) return reply(`⚠️ *Uso:* ${prefix}mae [Nome da mae]\n_Exemplo:_ ${prefix}mae Maria Silva`);
await reagir(from, '🔍');
reply('⚡ *Buscando por nome da mae...*');
try {
const api = await KS._kasaneConsulta('mae', maeVal);
const d = KS._extrairDados(api);
const lista = api?.lista || (Array.isArray(d) ? d : null) || d?.lista || (d ? [d] : null);
if (!lista || lista.length === 0) { await reagir(from, '❌'); return reply(`❌ *Nao encontrado*\n${api?.error || 'Nenhum resultado.'}`); }
await reagir(from, '✅');
if (_v2 && !podeTudo) KS.consumeVip2(sender);
reply(KS._msgLista(lista, 'mae', maeVal));
} catch (e) { await reagir(from, '❌'); reply('❌ Erro ao buscar. Tente novamente.'); }
}
break;

case 'pai':
case 'buscapai': {
const _v2 = KS.getVip2(sender);
if (!podeTudo && !_v2) return reply('⛔ Comando exclusivo para *dono oficial / criador* e *VIP2*.');
if (_v2 && !podeTudo && !KS.checkVip2Limit(sender)) return reply(`❌ *Limite diario atingido!*\nVoce usou suas *${_v2.dailyLimit}* consultas de hoje.\n🕛 Renova a meia-noite.`);
const paiVal = q.trim();
if (!paiVal) return reply(`⚠️ *Uso:* ${prefix}pai [Nome do pai]\n_Exemplo:_ ${prefix}pai Jose Silva`);
await reagir(from, '🔍');
reply('⚡ *Buscando por nome do pai...*');
try {
const api = await KS._kasaneConsulta('pai', paiVal);
const d = KS._extrairDados(api);
const lista = api?.lista || (Array.isArray(d) ? d : null) || d?.lista || (d ? [d] : null);
if (!lista || lista.length === 0) { await reagir(from, '❌'); return reply(`❌ *Nao encontrado*\n${api?.error || 'Nenhum resultado.'}`); }
await reagir(from, '✅');
if (_v2 && !podeTudo) KS.consumeVip2(sender);
reply(KS._msgLista(lista, 'pai', paiVal));
} catch (e) { await reagir(from, '❌'); reply('❌ Erro ao buscar. Tente novamente.'); }
}
break;

case 'email':
case 'buscaemail': {
const _v2 = KS.getVip2(sender);
if (!podeTudo && !_v2) return reply('⛔ Comando exclusivo para *dono oficial / criador* e *VIP2*.');
if (_v2 && !podeTudo && !KS.checkVip2Limit(sender)) return reply(`❌ *Limite diario atingido!*\nVoce usou suas *${_v2.dailyLimit}* consultas de hoje.\n🕛 Renova a meia-noite.`);
const emailVal = args[0] || '';
if (!emailVal) return reply(`⚠️ *Uso:* ${prefix}email [e-mail]\n_Exemplo:_ ${prefix}email exemplo@gmail.com`);
await reagir(from, '🔍');
reply('⚡ *Buscando por e-mail...*');
try {
const api = await KS._kasaneConsulta('email', emailVal);
const d = KS._extrairDados(api);
const lista = api?.lista || (Array.isArray(d) ? d : null) || d?.lista || (d ? [d] : null);
if (!lista || lista.length === 0) { await reagir(from, '❌'); return reply(`❌ *Nao encontrado*\n${api?.error || 'Nenhum resultado.'}`); }
await reagir(from, '✅');
if (_v2 && !podeTudo) KS.consumeVip2(sender);
reply(KS._msgLista(lista, 'email', emailVal));
} catch (e) { await reagir(from, '❌'); reply('❌ Erro ao buscar. Tente novamente.'); }
}
break;

case 'buscaplaca': {
const _v2 = KS.getVip2(sender);
if (!podeTudo && !_v2) return reply('⛔ Comando exclusivo para *dono oficial / criador* e *VIP2*.');
if (_v2 && !podeTudo && !KS.checkVip2Limit(sender)) return reply(`❌ *Limite diario atingido!*\nVoce usou suas *${_v2.dailyLimit}* consultas de hoje.\n🕛 Renova a meia-noite.`);
const placaVal = (args[0] || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
if (!placaVal) return reply(`⚠️ *Uso:* ${prefix}buscaplaca [PLACA]\n_Exemplo:_ ${prefix}buscaplaca ABC1234`);
await reagir(from, '🔍');
reply('⚡ *Buscando placa...*');
try {
const api = await KS._kasaneConsulta('placa', placaVal);
const d = KS._extrairDados(api);
if (!d) { await reagir(from, '❌'); return reply(`❌ *Nao encontrado*\n${api?.error || 'Nenhum dado retornado.'}`); }
await reagir(from, '✅');
if (_v2 && !podeTudo) KS.consumeVip2(sender);
reply(KS._msgPlaca(d, placaVal));
} catch (e) { await reagir(from, '❌'); reply('❌ Erro ao buscar placa. Tente novamente.'); }
}
break;

// ---- LIKE / LIKES ----
case 'like':
case 'likes': {
await reagir(from, '🔥');
if (!args[0]) return reply('Exemplo: ' + prefix + command + ' 12345678');
const uid = args[0];
const podeUsarComoDono = SoDono;
const userIsVip = isVip;
const aluguelGrupo = isGroup ? KS.getAluguelGrupo(from) : null;
const grupoTemAluguel = !!aluguelGrupo;
// Aluguel do tokito (gruposAutorizados / isGrupoAutorizado) tambem libera o like
const grupoAlugadoTokito = isGroup ? isGrupoAutorizado(from) : false;
const likeLiberado = isGroup ? (KS.isLikeLiberadoGrupo(from) || grupoAlugadoTokito) : false;
const grupoLiberado = grupoTemAluguel || likeLiberado;
const modoLivreAtivo = !!(aluguelGrupo && aluguelGrupo.modoLivre);

const checkAutoV2 = KS.getAutoLikeV2ByUid(uid);
if (checkAutoV2 && checkAutoV2.ativo) {
return reply('⛔ *ACESSO NEGADO*\n\nEste ID ja esta registrado no *Auto-Like 320* e recebe likes automaticamente.');
}
if (isGroup && !podeUsarComoDono) {
if (!grupoLiberado) return reply('⛔ *ACESSO NEGADO*\n\nEste grupo nao possui um plano ativo nem o like liberado.\nPeca a um dono para usar *' + prefix + 'liberarlike* ou contrate um plano de aluguel.');
if (grupoTemAluguel) {
const verificacao = KS.verificarIdDisponivel(from);
if (!verificacao.permitido) return reply('*⛔ | LIMITE DO CONTRATO*\n\n- *📦 | PLANO → ' + aluguelGrupo.plano + '*\n- *🆔 | USADOS → ' + aluguelGrupo.idsUsados + '/' + aluguelGrupo.idsPermitidos + '*\n\n> ' + verificacao.motivo);
}
}
const idCooldown = KS.checkIdUsadoHoje(sender, uid);
if (idCooldown && idCooldown.blocked) return reply('*⏳ | ID EM COOLDOWN*\n\n- *🆔 | ID → ' + uid + '*\n- *⏰ | LIBERA EM → ' + (idCooldown.tempoRestante || '24h') + '*\n\n> Esse ID ja recebeu likes nas ultimas 24 horas.');
if (!podeUsarComoDono && !userIsVip && !grupoLiberado) {
const limitCheck = KS.checkLikeLimit(sender, { isOwner: podeUsarComoDono, isVip: userIsVip });
if (!limitCheck.allowed) return reply('⛔ *LIMITE GRATIS ATINGIDO*\n\n- *👤 | USUARIO → ' + (pushname || 'Membro') + '*\n- *📦 | LIMITE → 1 like a cada 24h*\n- *⏰ | LIBERA EM → ' + (limitCheck.tempoRestante || '24h') + '*\n\n> Para usar sem esperar, peca ativacao VIP.');
}
reply('⏳ *AGUARDE:* Processando envio de likes...');
try {
const phone = sender.split('@')[0];
const startTime = Date.now();
const checkAuto = KS.getAutoLikeV2ByUid(uid);
const isTargetAutoLike = checkAuto && checkAuto.ativo;
let dualApiResult;
if (isTargetAutoLike) dualApiResult = await KS.sendLikesDualApi(uid, phone, 320, true);
else if (podeUsarComoDono || userIsVip) dualApiResult = await KS.sendLikesDualApi(uid, phone, 220, false);
else {
const api1Res = await KS.requestS1(uid, phone);
const api2Res = await KS.requestFrifas('sendlikes', { id: uid });
const totalSent = (api1Res.likesSent || 0) + (Number(api2Res.enviadas) || 0);
const hubsD = Array.isArray(api2Res.data) ? api2Res.data[0] : api2Res.data;
const hubsC = hubsD?.conta || {};
const hubsL = hubsD?.likes || {};
const likesBefore = (hubsL.antes !== undefined && hubsL.antes !== null) ? Number(hubsL.antes) : (api1Res.data?.likes_before !== undefined ? Number(api1Res.data.likes_before) : null);
let likesAfterComum = (hubsL.depois !== undefined && hubsL.depois !== null && Number(hubsL.depois) > 0) ? Number(hubsL.depois) : (api1Res.data?.likes_after !== undefined && Number(api1Res.data.likes_after) > 0 ? Number(api1Res.data.likes_after) : (likesBefore !== null ? likesBefore + totalSent : null));
if (likesAfterComum !== null && likesBefore !== null && likesAfterComum <= likesBefore && totalSent > 0) likesAfterComum = likesBefore + totalSent;
let finalTotalSent = totalSent;
if (likesAfterComum !== null && likesBefore !== null && likesAfterComum > likesBefore && finalTotalSent === 0) finalTotalSent = likesAfterComum - likesBefore;
dualApiResult = { totalLikesSent: finalTotalSent, api1: api1Res, api2: api2Res, api3: { likesSent: 0, success: false, error: 'Acesso restrito' }, nickname: hubsC.nome_conta || api1Res.data?.nickname || api2Res.data?.nickname || null, likesBefore, likesAfter: likesAfterComum, profileImage: null };
}
const tempoGasto = ((Date.now() - startTime) / 1000).toFixed(2);
const isAlreadyLiked = (dualApiResult.totalLikesSent === 0 && (dualApiResult.api1.isAlreadyLiked || dualApiResult.api2.isAlreadyLiked || dualApiResult.api3.isAlreadyLiked));
if (dualApiResult.totalLikesSent > 0) {
KS.registerLikeUse(sender, uid, { isOwner: podeUsarComoDono, isVip: userIsVip });
if (isGroup && grupoTemAluguel) KS.registrarUsoId(from);
}
if (dualApiResult.totalLikesSent > 0 || isAlreadyLiked) {
const d = (Array.isArray(dualApiResult.api2.data) ? dualApiResult.api2.data[0] : dualApiResult.api2.data) || {};
const p = d.conta || {};
const finalNick = dualApiResult.nickname || p.nome_conta || p.nickname || d.nickname || 'Desconhecido';
const region = p.regiao_conta || dualApiResult.api1.data?.region || 'BR';
const level = p.nivel || dualApiResult.api1.data?.level || 'N/A';
const totalAdd = dualApiResult.totalLikesSent;
const likesBefore = dualApiResult.likesBefore;
const likesAfter = dualApiResult.likesAfter;
let layoutFinal;
if (isGroup && grupoTemAluguel && !modoLivreAtivo) {
const gAtualizado = KS.getAluguelGrupo(from);
const idsUsadosAtual = gAtualizado ? gAtualizado.idsUsados : 0;
const idsPermitidosAtual = gAtualizado ? gAtualizado.idsPermitidos : 'ilimitado';
layoutFinal = KS.layoutLikeLimpo(uid, finalNick, region, level, totalAdd, tempoGasto, idsUsadosAtual, idsPermitidosAtual, isAlreadyLiked, likesBefore, likesAfter, sender, pushname);
} else {
layoutFinal = KS.layoutLikeOriginal(uid, finalNick, region, level, totalAdd, tempoGasto, isAlreadyLiked, likesBefore, likesAfter, sender, pushname);
}
if (dualApiResult.profileImage) {
try { const buffer = await getBuffer(dualApiResult.profileImage); await tokito.sendMessage(from, { image: buffer, caption: layoutFinal, mentions: [sender] }, { quoted: info }); }
catch (e) { await tokito.sendMessage(from, { image: { url: dualApiResult.profileImage }, caption: layoutFinal, mentions: [sender] }, { quoted: info }); }
} else await tokito.sendMessage(from, { text: layoutFinal, mentions: [sender] }, { quoted: info });
} else {
if (dualApiResult.api1.isRateLimited || dualApiResult.api2.isRateLimited || dualApiResult.api2.isDailyLimit) {
reply(KS.layoutErro429(dualApiResult.api2.error || dualApiResult.api1.error || ''));
} else {
reply('❌ *FALHA AO ENVIAR LIKES*\n\n*Servidor 1:* ' + (dualApiResult.api1.error || 'Offline') + '\n*Servidor 2:* ' + (dualApiResult.api2.error || 'Offline'));
}
}
} catch (e) { console.log('[LIKE] erro:', e.message); reply('❌ Erro interno ao processar o comando.'); }
}
break;

// ---- AUTOLIKE_OLD (estrutura completa com API e key) ----
case 'addauto_old': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0] || !args[1]) return reply('Use: ' + prefix + 'addauto_old <uid> <dias>');
const res = await KS.requestFrifas('add-auto', { id: args[0], dias: args[1], open: KS.FRIFAS_OPEN_ID });
if (res.sucesso) { KS.addAutoLikeLocal(args[0], res.nick || 'FF Player', parseInt(args[1])); reply('✅ *AUTO-LIKE ORIGINAL ADICIONADO*'); }
else reply('❌ Erro: ' + res.mensagem);
}
break;

case 'delauto_old': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0]) return reply('Use: ' + prefix + 'delauto_old <uid>');
const res = await KS.requestFrifas('delete-auto', { id: args[0] });
if (res.sucesso) { KS.removeAutoLikeLocal(args[0]); reply('🗑️ *AUTO-LIKE ORIGINAL REMOVIDO*'); }
else reply('❌ Erro: ' + res.mensagem);
}
break;

case 'listauto_old': {
if (!SoDono) return reply(mess.onlyOwner());
const regs = KS.listAutoLikeLocal();
if (regs.length === 0) return reply('📭 Nenhuma conta registrada localmente.');
let msg = '📋 *LISTA AUTO-LIKE ORIGINAL*\n\n';
regs.forEach((r, i) => msg += (i + 1) + '. 👤 *' + r.nick + '* (' + r.uid + ') - ' + r.diasRestantes + ' dias\n');
reply(msg);
}
break;

// ---- INFO / INFOPLAYER (dados da conta FF) ----
case 'info':
case 'infoplayer': {
await reagir(from, '🔍');
if (!args[0]) return reply('Exemplo: ' + prefix + command + ' 12345678');
const uid = args[0];
const aluguelGrupoI = isGroup ? KS.getAluguelGrupo(from) : null;
const grupoLiberadoI = isGroup ? (!!aluguelGrupoI || KS.isLikeLiberadoGrupo(from) || isGrupoAutorizado(from)) : false;
if (isGroup && !SoDono && !grupoLiberadoI) return reply('⛔ *ACESSO NEGADO*\n\nEste grupo nao possui plano ativo nem o like/info liberado.');
reply('Aguarde, consultando informacoes...');
try {
const [infoData, skinData] = await Promise.all([
KS.requestFrifas('info-player', { id: uid }),
KS.requestFrifas('get-skin', { id: uid })
]);
const infoRawData = Array.isArray(infoData.data) ? infoData.data : (infoData.data ? [infoData.data] : []);
const infoOk = infoData && infoData.sucesso && infoRawData.length > 0 && infoRawData[0];
const skinOk = skinData && skinData.sucesso && skinData.data;
if (infoOk || skinOk) {
const conta = infoOk ? (infoRawData[0].conta || {}) : {};
const skinConta = skinOk ? ((Array.isArray(skinData.data) ? skinData.data[0] : skinData.data)?.conta || {}) : {};
const profileImage = skinConta.images?.download_get || null;
const nome = conta.nome_conta || 'Desconhecido';
const nivel = conta.level !== undefined ? conta.level : 'N/A';
const regiao = conta.region || 'BR';
const likes = conta.likes !== undefined ? conta.likes : '0';
const social = conta.informacoes_sociais || {};
const bio = social.assinatura || 'Sem bio';
const generoRaw = social.genero || null;
const generoFmt = generoRaw === 'Gender_MALE' ? 'Masculino' : generoRaw === 'Gender_FEMALE' ? 'Feminino' : generoRaw || null;
const cla = conta.cla || {}, rankBR = conta.rank_br || {}, rankCS = conta.rank_cs || {};
const extra = {
clanname: cla.nome || null, clanlevel: cla.level || null,
clanmembers: (cla.membros !== undefined && cla.capacidade !== undefined) ? (cla.membros + '/' + cla.capacidade) : null,
rank: rankBR.rank !== undefined ? rankBR.rank : null, rankpoints: rankBR.pontos !== undefined ? rankBR.pontos : null,
csrank: rankCS.rank !== undefined ? rankCS.rank : null, csrankpoints: rankCS.pontos !== undefined ? rankCS.pontos : null,
liked: conta.likes !== undefined ? conta.likes : null, badgecnt: conta.badge?.quantidade || null,
exp: conta.experiencia || null, gender: generoFmt, lastlogin: conta.ultimo_login || null, createat: conta.criado_em || null
};
const infoMsg = KS.layoutInfoLimpo(uid, nome, nivel, regiao, likes, bio, extra, sender, pushname);
if (profileImage) {
try { const buffer = await getBuffer(profileImage); await tokito.sendMessage(from, { image: buffer, caption: infoMsg, mentions: [sender] }, { quoted: info }); }
catch (e) { await tokito.sendMessage(from, { image: { url: profileImage }, caption: infoMsg, mentions: [sender] }, { quoted: info }); }
} else await tokito.sendMessage(from, { text: infoMsg, mentions: [sender] }, { quoted: info });
} else reply('❌ Jogador nao encontrado ou erro na API: ' + (infoData?.mensagem || skinData?.mensagem || 'Erro desconhecido'));
} catch (e) { console.log('[INFO] erro:', e.message); reply('❌ Erro ao consultar info.'); }
}
break;

// ---- AUTO-LIKE 320 (V2) — envio automatico as 09:00 BRT ----
case 'addauto': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0] || !args[1]) return reply('Use: ' + prefix + 'addauto <uid> <dias>');
const uid = args[0];
const dias = parseInt(args[1]);
reply('⏳ *CONSULTANDO:* Verificando ID ' + uid + '...');
let nick = 'FF Player';
try { const m = await KS.getMitsuriInfo(uid); if (m?.basicinfo?.nickname) nick = m.basicinfo.nickname; } catch (_) {}
if (nick === 'FF Player') {
const res = await KS.requestFrifas('info-player', { id: uid });
const rconta = (Array.isArray(res.data) ? res.data[0] : res.data)?.conta || {};
if (rconta.nome_conta) nick = rconta.nome_conta;
else if (res?.nickname) nick = res.nickname;
else { const pub = await KS.getNickFromPublicApi(uid); if (pub) nick = pub; }
}
KS.addAutoLikeV2(uid, nick, dias);
reply('✅ *AUTO-LIKE 320 ADICIONADO*\n\n👤 *NICK:* ' + nick + '\n🆔 *UID:* ' + uid + '\n📅 *DIAS:* ' + dias + '\n👍 *LIKES/DIA:* 320\n\n> O sistema envia os likes automaticamente as 09:00 BRT.');
}
break;

case 'infoauto': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0]) return reply('Use: ' + prefix + 'infoauto <uid>');
const reg = KS.getAutoLikeV2ByUid(args[0]);
if (!reg) return reply('❌ Este ID nao possui um Auto-Like 320 ativo.');
const expStr = new Date(reg.expiresAt).toLocaleDateString('pt-BR');
const lastDeliveryStr = reg.lastDelivery ? new Date(reg.lastDelivery).toLocaleString('pt-BR') : 'Nunca';
const enviadosHoje = reg.likesEnviadosHoje || 0;
let msg = '🤖 *INFORMACOES AUTO-LIKE 320*\n\n';
msg += '👤 *NICK:* ' + reg.nick + '\n🆔 *UID:* ' + reg.uid + '\n📅 *RESTANTE:* ' + reg.diasRestantes + ' dias\n⏰ *EXPIRA EM:* ' + expStr + '\n\n';
msg += '📈 *PROGRESSO DIARIO (320 LIKES)*\n✅ *ENVIADOS HOJE:* ' + enviadosHoje + '\n⏳ *FALTANDO HOJE:* ' + Math.max(0, 320 - enviadosHoje) + '\n\n';
msg += '📊 *TOTAL ENVIADO:* ' + (reg.likesEntreguesTotal || 0) + ' likes\n🕒 *ULTIMO ENVIO:* ' + lastDeliveryStr + '\n🟢 *STATUS:* ' + (reg.ativo ? 'Ativo' : 'Expirado');
reply(msg);
}
break;

case 'delauto': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0]) return reply('Use: ' + prefix + 'delauto <uid>');
KS.removeAutoLikeV2(args[0].replace(/[^0-9]/g, ''));
reply('🗑️ *AUTO-LIKE 320 REMOVIDO*');
}
break;

case 'listauto': {
if (!SoDono) return reply(mess.onlyOwner());
const regsV2 = KS.listAutoLikeV2();
if (regsV2.length === 0) return reply('📭 Nenhuma conta registrada no Auto-Like 320.');
const nowBR2 = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
const todayStr = nowBR2.toLocaleDateString('pt-BR');
let msg = '📋 *LISTA AUTO-LIKE 320*\n\n';
regsV2.forEach((r) => {
const dataFormatada = new Date(r.addedAt).toLocaleDateString('pt-BR');
let enviadoHoje = 0;
if (r.lastDelivery) { const ld = new Date(new Date(r.lastDelivery).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).toLocaleDateString('pt-BR'); if (ld === todayStr) enviadoHoje = r.likesEnviadosHoje || 0; }
msg += 'ID: `' + r.uid + '` DATA: `' + dataFormatada + '` DIAS: `' + r.dias + '`\nHOJE: `' + enviadoHoje + '` | TOTAL: `' + (r.likesEntreguesTotal || 0) + '` enviados\n\n';
});
reply(msg);
}
break;

// ---- LIBERAR LIKE NO GRUPO (sistema de aluguel/liberacao) ----
case 'liberarlike':
case 'liberarlikes':
case 'liblikes': {
if (!SoDono) return reply(mess.onlyOwner());
if (!isGroup) return reply('⛔ Use este comando dentro do grupo que deseja liberar.');
const jaLiberado = KS.isLikeLiberadoGrupo(from);
const novoEstado = KS.setLikeLiberadoGrupo(from, !jaLiberado);
if (novoEstado) reply('✅ *LIKE LIBERADO NESTE GRUPO!*\n\nAgora todos os membros podem usar *' + prefix + 'like* aqui.\nUse *' + prefix + command + '* de novo para desativar.');
else reply('🚫 *LIKE BLOQUEADO NESTE GRUPO!*\n\nAgora so donos, VIP ou grupos com aluguel ativo podem usar *' + prefix + 'like*.');
}
break;

// ---- VIP2 (consultas com limite diario) ----
case 'vip2': {
if (!podeTudo) return reply('⛔ *Apenas dono oficial e criador* podem liberar VIP2. Subdonos nao podem.');
let targetV2, limitV2 = 5, daysV2 = 30;
const ctxV2 = info.message?.extendedTextMessage?.contextInfo;
if (ctxV2?.quotedMessage) { targetV2 = ctxV2.participant; limitV2 = parseInt(args[0]) || 5; daysV2 = parseInt(args[1]) || 30; }
else if (ctxV2?.mentionedJid?.length) { targetV2 = ctxV2.mentionedJid[0]; limitV2 = parseInt(args[1]) || 5; daysV2 = parseInt(args[2]) || 30; }
else if (args[0]) { targetV2 = args[0].includes('@') ? args[0] : args[0].replace(/\D/g, '') + '@s.whatsapp.net'; limitV2 = parseInt(args[1]) || 5; daysV2 = parseInt(args[2]) || 30; }
if (!targetV2) return reply(`⚠️ *Uso:* ${prefix}vip2 @usuario <limite_dia> <dias>\n_Exemplo:_ ${prefix}vip2 @Ze 10 30`);
KS.addVip2(targetV2, limitV2, daysV2);
reply(`╔══════════════════╗\n║   💎 VIP2 ATIVADO  ║\n╚══════════════════╝\n\n📱 *Usuario:* ${KS.onlyNumbers(targetV2)}\n🔢 *Limite diario:* ${limitV2} consultas\n📅 *Duracao:* ${daysV2} dias\n\n✅ *Acesso liberado aos comandos de consulta!*`);
}
break;

case 'delvip2': {
if (!podeTudo) return reply('⛔ *Apenas dono oficial e criador* podem remover VIP2. Subdonos nao podem.');
let targetDV2;
const ctxDV2 = info.message?.extendedTextMessage?.contextInfo;
if (ctxDV2?.quotedMessage) targetDV2 = ctxDV2.participant;
else if (ctxDV2?.mentionedJid?.length) targetDV2 = ctxDV2.mentionedJid[0];
else if (args[0]) targetDV2 = args[0].includes('@') ? args[0] : args[0].replace(/\D/g, '') + '@s.whatsapp.net';
if (!targetDV2) return reply(`Use: ${prefix}delvip2 @usuario ou responda a mensagem de alguem.`);
KS.removeVip2(targetDV2);
reply(`🗑️ *VIP2 REMOVIDO!*\n📱 Usuario: ${KS.onlyNumbers(targetDV2)}`);
}
break;

case 'listvip2': {
if (!podeTudo) return reply('⛔ *Apenas dono oficial e criador* podem ver a lista VIP2. Subdonos nao podem.');
const v2list = KS.listVip2();
if (v2list.length === 0) return reply('Nenhum VIP2 registrado.');
let msgV2 = '╔══════════════════╗\n║   💎 LISTA VIP2   ║\n╚══════════════════╝\n\n';
v2list.forEach((v, i) => {
const dd = Math.ceil((v.expiresAt - Date.now()) / 86400000);
const used = KS.getVip2Usage(v.id);
msgV2 += `*[${i + 1}]* 📱 ${KS.onlyNumbers(v.id)}\n`;
msgV2 += `   🔢 Limite: ${v.dailyLimit}/dia | Usado hoje: ${used}\n`;
msgV2 += `   📅 Expira em: ${dd} dia(s)\n\n`;
});
reply(msgV2.trim());
}
break;

// ---- SALDO / ELITE PASS (estrutura completa de envio de passe de elite) ----
case 'addsd': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0] || !args[1]) return reply('Use: ' + prefix + 'addsd @numero valor');
const mj = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const targetNum = KS.normalizeJid(mj[0] || args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net');
const valor = parseFloat(args[1]);
if (isNaN(valor) || valor <= 0) return reply('Valor invalido!');
KS.addBalance(targetNum, valor);
const saldoTotal = KS.getBalance(targetNum);
reply(`✅ *Saldo adicionado!*\n📱 Numero: ${targetNum}\n💰 Valor: R$${valor.toFixed(2)}\n💵 Saldo total: R$${saldoTotal.toFixed(2)}`);
try { await tokito.sendMessage(targetNum + '@s.whatsapp.net', { text: `✅ *SALDO ADICIONADO*\n💰 Valor: R$${valor.toFixed(2)}\n💵 Saldo total: R$${saldoTotal.toFixed(2)}` }); } catch (e) {}
}
break;

case 'rmvsaldo': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0] || !args[1]) return reply('Use: ' + prefix + 'rmvsaldo @numero valor');
const mj = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const targetNum = KS.normalizeJid(mj[0] || args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net');
const valorRmv = parseFloat(args[1]);
if (isNaN(valorRmv) || valorRmv <= 0) return reply('Valor invalido!');
const saldoAtualRmv = KS.getBalance(targetNum);
if (saldoAtualRmv < valorRmv) return reply(`❌ *Saldo insuficiente!*\n📱 Numero: ${targetNum}\n💵 Saldo atual: R$${saldoAtualRmv.toFixed(2)}`);
KS.removeBalance(targetNum, valorRmv);
const saldoRestante = KS.getBalance(targetNum);
reply(`✅ *Saldo removido!*\n📱 Numero: ${targetNum}\n💸 Valor removido: R$${valorRmv.toFixed(2)}\n💵 Saldo restante: R$${saldoRestante.toFixed(2)}`);
}
break;

case 'liberar': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0]) return reply('Use: ' + prefix + 'liberar @numero');
const mj = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const targetNum = KS.normalizeJid(mj[0] || args[0] + '@s.whatsapp.net');
KS.liberarUsuario(targetNum);
reply(`✅ *Usuario liberado!*\n📱 Numero: ${targetNum}\n🎁 Pode usar Elite Pass agora!`);
}
break;

case 'removerps': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0]) return reply('Use: ' + prefix + 'removerps @numero');
const mj = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const targetNum = KS.normalizeJid(mj[0] || args[0] + '@s.whatsapp.net');
KS.removerLiberacao(targetNum);
reply(`❌ *Liberacao removida!*\n📱 Numero: ${targetNum}\n🚫 Nao pode usar Elite Pass mais!`);
}
break;

case 'saldo': {
const saldo = KS.getBalance(sender);
const liberado = KS.isLiberated(sender);
reply(`💰 *SEU SALDO*\n\n💵 Saldo: R$${saldo.toFixed(2)}\n🎁 Liberado: ${liberado ? '✅ Sim' : '❌ Nao'}`);
}
break;

case 'versaldo': {
const mj = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const targetNum = (SoDono && mj[0]) ? mj[0] : sender;
const saldo = KS.getBalance(targetNum);
const liberado = KS.isLiberated(targetNum);
reply(`💰 *SALDO*\n\n👤 Numero: ${KS.onlyNumbers(targetNum)}\n💵 Saldo: R$${saldo.toFixed(2)}\n🎁 Liberado: ${liberado ? '✅ Sim' : '❌ Nao'}`);
}
break;

case 'ps': {
if (!KS.canUsePS(sender, SoDono)) return reply('❌ *Voce nao esta liberado para usar Elite Pass!*');
if (!args[0]) return reply('Use: ' + prefix + 'ps ID_DO_JOGADOR');
const playerId = args[0].replace(/[^0-9]/g, '');
if (!playerId) return reply('❌ *ID invalido!*');
reply('⏳ *Aguarde...* Consultando informacoes da conta...');
try {
const infoData = await KS.requestFrifas('info-player', { id: playerId });
const infoRawData = Array.isArray(infoData.data) ? infoData.data : (infoData.data ? [infoData.data] : []);
const infoOk = infoData && infoData.sucesso && infoRawData.length > 0 && infoRawData[0];
if (!infoOk) return reply('❌ *ID nao encontrado!* Verifique e tente novamente.');
const conta = infoRawData[0].conta || {};
const nome = conta.nome_conta || 'Desconhecido';
const nivel = conta.level !== undefined ? conta.level : 'N/A';
const tempData = { playerId, userNum: KS.normalizeJid(sender), userName: pushname || 'Usuario', from: sender, nome, nivel, timestamp: Date.now() };
try { fs.writeFileSync('./database/temp_ps_' + sender.split('@')[0] + '.json', JSON.stringify(tempData)); } catch (err) {}
reply(`✅ *CONFIRMAR ELITE PASS*\n\n👤 *Nome:* ${nome}\n📊 *Nivel:* ${nivel}\n🎮 *ID:* ${playerId}\n\n⚠️ *Confirma que quer enviar passe para esta conta?*\n\nResponda com:\n✅ sim\n❌ nao`);
} catch (err) { reply('❌ *Erro ao consultar informacoes da conta. Tente novamente.*'); }
}
break;

case 'gg': {
if (!SoDono) return reply(mess.onlyOwner());
if (!args[0]) return reply('Use: ' + prefix + 'gg ID_DO_JOGADOR');
const playerId = args[0].replace(/[^0-9]/g, '');
if (!playerId) return reply('❌ *ID invalido!*');
try {
const pendingRequests = KS.readJson(KS.PATHS.pendingRequestsFile) || { requests: [] };
const request = pendingRequests.requests.find(r => r.playerId === playerId);
if (!request) return reply('❌ *Nenhuma solicitacao encontrada para este ID!*');
const successMsg = `✅ *Boa noticia, passe de elite enviado com sucesso!*\n🎮 ID: ${playerId}`;
try { await tokito.sendMessage(request.userNum + '@s.whatsapp.net', { text: successMsg }); } catch (e) {}
pendingRequests.requests = pendingRequests.requests.filter(r => r.playerId !== playerId);
KS.saveJson(KS.PATHS.pendingRequestsFile, pendingRequests);
reply(`✅ *Confirmacao enviada!*\n👤 Usuario: ${request.userName}\n🎮 ID: ${playerId}`);
} catch (err) { reply(`❌ *Erro ao processar confirmacao: ${err.message}*`); }
}
break;

//==========[ FIM DAS CASES MIGRADAS DO KASANE ]=============\\

//////////////////////FIM\\\\\\\\\\\\\\\\\\\\\\\\\

default:

// ============================================================
// [KASANE] ELITE PASS (confirmacao sim/nao) + IA AURORA (texto/audio)
// ============================================================
try {

// 1) Confirmacao SIM/NAO da solicitacao de Elite Pass (comando /ps)
if (!isCmd && !info.key.fromMe && (budy2 === 'sim' || budy2 === 'nao')) {
const tempFile = './database/temp_ps_' + sender.split('@')[0] + '.json';
const tempData = KS.readJson(tempFile);
if (tempData && tempData.playerId) {
if (budy2 === 'sim') {
const isFreeUser = SoDono;
const isLiberado = KS.isLiberated(tempData.userNum);
const custoPasse = KS.ELITE_PASS_COST;
let novoSaldo = null;
if (!isFreeUser) {
const saldoAtual = KS.getBalance(tempData.userNum);
if (saldoAtual >= custoPasse) { KS.removeBalance(tempData.userNum, custoPasse); novoSaldo = KS.getBalance(tempData.userNum); }
else if (!isLiberado) { try { fs.unlinkSync(tempFile); } catch (e) {} return reply(`❌ *Saldo insuficiente!*\n\n💰 Voce tem: R$${saldoAtual.toFixed(2)}\n💵 Necessario: R$${custoPasse.toFixed(2)}`); }
}
const confirmationMsg = `✅ *NOVA SOLICITACAO DE ELITE PASS*\n\n👤 *Usuario:* ${tempData.userName}\n📱 *Numero:* ${tempData.userNum}\n🎮 *ID:* ${tempData.playerId}\n👤 *Nome da Conta:* ${tempData.nome}\n📊 *Nivel:* ${tempData.nivel}\n⏰ *Hora:* ${new Date().toLocaleTimeString('pt-BR')}\n\n💬 Use ${prefix}gg ${tempData.playerId} para confirmar o envio do passe.`;
const pendingRequests = KS.readJson(KS.PATHS.pendingRequestsFile) || { requests: [] };
pendingRequests.requests.push({ playerId: tempData.playerId, userNum: tempData.userNum, userName: tempData.userName, nome: tempData.nome, nivel: tempData.nivel, from: from, timestamp: Date.now(), status: 'pending' });
KS.saveJson(KS.PATHS.pendingRequestsFile, pendingRequests);
try { await tokito.sendMessage(KS.ELITE_PASS_OWNER + '@s.whatsapp.net', { text: confirmationMsg }); } catch (e) {}
if (novoSaldo !== null) reply(`✅ *Solicitacao enviada!*\n\n💰 Saldo descontado: R$${custoPasse.toFixed(2)}\n💵 Novo saldo: R$${novoSaldo.toFixed(2)}\n\nAguarde a confirmacao do administrador.`);
else reply('✅ *Solicitacao enviada!*\n\nAguarde a confirmacao do administrador.');
} else { reply('❌ *Solicitacao cancelada!*'); }
try { fs.unlinkSync(tempFile); } catch (e) {}
return;
}
}

const _globalKS = KS.readJson(KS.PATHS.settingsFile) || { ia_active: true };
const _iaLigada = _globalKS.ia_active !== false && (!isGroup || isTokitoIA); // em grupo respeita o toggle auroraia
// Detecta mencao/citacao ao bot (marcou @bot ou respondeu uma msg do bot)
const _ehMencaoBot = (ctx) => !!ctx && (((ctx.mentionedJid || []).some(j => j === botNumber || j === botNumberLID)) || ctx.participant === botNumber || ctx.participant === botNumberLID);
const _ctxTxt = info.message?.extendedTextMessage?.contextInfo;
// Citou o nome dela (aurora) ou o nome do bot
const _citouNome = budy2.includes('aurora') || (NomeDoBot && budy2.includes(String(NomeDoBot).toLowerCase()));
const _mencaoBot = _ehMencaoBot(_ctxTxt) || _citouNome;

// 2) IA AURORA por AUDIO — SO quando o audio for resposta/mencao ao bot (nao em todo audio)
const _audioMsgKS = info.message?.audioMessage || info.message?.viewOnceMessageV2Extension?.message?.audioMessage;
if (_iaLigada && _audioMsgKS && !info.key.fromMe && _ehMencaoBot(_audioMsgKS.contextInfo)) {
await reagir(from, '👂');
const stream = await downloadContentFromMessage(_audioMsgKS, 'audio');
let buffer = Buffer.from([]);
for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
const textoAudio = await KS.transcreverAudio(buffer, upload);
if (textoAudio) {
const iaResult = await KS.getIAHandler(textoAudio, sender, DonoOficial, isCriador, pushname);
const audioBuffer = await KS.gerarVozAurora(iaResult.texto);
if (audioBuffer) await tokito.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: info }).catch(() => tokito.sendMessage(from, { text: iaResult.texto }, { quoted: info }));
else await tokito.sendMessage(from, { text: iaResult.texto }, { quoted: info });
return;
}
}

// 3) IA AURORA por TEXTO — SO responde quando mencionarem a Aurora/o bot (ou @/responder o bot)
if (_iaLigada && !isCmd && !info.key.fromMe && body && body.length > 2 && type !== 'audioMessage' && _mencaoBot) {
const iaResult = await KS.getIAHandler(body, sender, DonoOficial, isCriador, pushname);
const audioBuffer = await KS.gerarVozAurora(iaResult.texto);
if (audioBuffer) await tokito.sendMessage(from, { audio: audioBuffer, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: info }).catch(() => tokito.sendMessage(from, { text: iaResult.texto }, { quoted: info }));
else await tokito.sendMessage(from, { text: iaResult.texto }, { quoted: info });
return;
}

} catch (eKS) { console.log('[KASANE IA] erro:', eKS.message); }

// IF DOS ANTIs - (LOCALIZAÇÃO - CONTATO - CATALOGO)
if(isGroup && isBotGroupAdmins && !isGroupAdmins) {
if(isAntiCtt || Antiloc || isAnticatalogo) {
if(type === 'contactMessage' || type === 'contactsArrayMessage' || type === 'locationMessage' || type === 'productMessage') {
if(isGroupAdmins) return await tokito.sendMessage(from, {text: mess.antisRandomMessage()}, {quoted: selo})
if(IS_DELETE) {
setTimeout(async() => {
await tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500)
}
if(!JSON.stringify(groupMembers).includes(sender)) return
await tokito.groupParticipantsUpdate(from, [sender], 'remove')
await tokito.sendMessage(from, {text: `🗑${"\n".repeat(255)}🗑️\n✅️ A limpeza de chat foi concluída com sucesso.`, contextInfo: {forwardingScore: 500, isForwarded:true}});
await tokito.sendMessage(from, {text: 'Por favor, reporte aos adminstradores do grupo sobre o ocorrido.', mentions: groupAdmins})
}
}
}

if(isGroup && isAntiFlood && !SoDono && !isVip && !isnit && isBotGroupAdmins && !isGroupAdmins && !isBot) { 
if(isLimitec == null){var limitefl = limitefll.limitefl} else {var limitefl = isLimitec};
if(budy.length >= limitefl){
setTimeout(async() => {
reply(mess.charactersAnti());
console.log(colors.red(`[SPAM DETECTED IN THE GROUP]`), 'Grupo:', colors.yellow(`${groupName}`), colors.white(`Ocorrência: ${hourofc} ${dattofc}`));
}, 100);
setTimeout(async() => {
 if(IS_DELETE) {
setTimeout(async() => {
tokito.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 500);
}
 if(!JSON.stringify(groupMembers).includes(sender)) return
 await tokito.groupParticipantsUpdate(from, [sender], 'remove')
 }, 1000)
}
}

if (istokitoEscuta && isGroup && !info.key.fromMe) {
const audioMessage = info.message?.audioMessage || info.message?.viewOnceMessageV2Extension?.message?.audioMessage;

if (audioMessage) {
await reagir(from, "👂");

try {
const stream = await downloadContentFromMessage(audioMessage, 'audio');
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}

const audioUrl = await upload(buffer);

const transcriptRes = await fetch('https://api.assemblyai.com/v2/transcript', {
method: 'POST',
headers: {
'authorization': '22be3718b6bf42019d9cc59f70133b83',
'content-type': 'application/json'
},
body: JSON.stringify({
audio_url: audioUrl,
language_code: 'pt'
})
});

const transcriptData = await transcriptRes.json();
if (!transcriptData.id)
return reply('*ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ᴇɴᴠɪᴀʀ ᴏ ᴀᴜ́ᴅɪᴏ ᴘᴀʀᴀ ᴛʀᴀɴꜱᴄʀɪᴄ̧ᴀ̃ᴏ... 💢*');

const id = transcriptData.id;
let status = 'queued';
let transcriptResult;

while (status === 'queued' || status === 'processing') {
await new Promise(resolve => setTimeout(resolve, 4000));
const statusRes = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
headers: { 'authorization': '22be3718b6bf42019d9cc59f70133b83' }
});
transcriptResult = await statusRes.json();
status = transcriptResult.status;
}





if (status !== 'completed')
return reply('*ɴᴀ̃ᴏ ꜰᴏɪ ᴘᴏꜱꜱɪ́ᴠᴇʟ ᴛʀᴀɴꜱᴄʀᴇᴠᴇʀ ᴇꜱꜱᴇ ᴀᴜ́ᴅɪᴏ, ꜰᴏɪ ᴅɪꜰɪ́ᴄɪʟ ᴀᴛᴇ́ ᴘʀᴀ ᴍɪᴍ...* 😵‍💫');

let textoFinal = transcriptResult.text || 'ɴᴇɴʜᴜᴍ ᴛᴇxᴛᴏ ʀᴇᴄᴏɴʜᴇᴄɪᴅᴏ';

await tokito.sendMessage(from, { text: `*🎙️ ᴛʀᴀɴꜱᴄʀɪᴄ̧ᴀ̃ᴏ ᴅᴏ ᴀᴜ́ᴅɪᴏ 🎙️*\n-\n> *${textoFinal}*` }, { quoted: selo });

} catch (e) {
console.error('erro ao transcrever:', e);
reply(mess.error());
}
}
}


if(isAutorepo) { 
if(budy2.includes("bom dia")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/bomdia.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `BOM DIAAA 😹` }
}
});
}

if(budy2.includes("boa tarde")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/boatarde.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `BOA TARDE 🥱` }
}
});
}

if(budy2.includes("boa noite")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/boanoite.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `BOA NOITE 🌆` }
}
});
}

if(budy2.includes("aurora")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/tokito.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `VOLTA HUTAO 😭` }
}
});
}

if(budy2.includes("amo")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/amor.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `EU AMO EL* 😢` }
}
});
}

if(budy2.includes("bot ruim")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/oi.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `EU AMO ESSE BOT 💕` }
}
});
}

if(budy2.includes("louca")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/louca.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `i a louça? 🗣️` }
}
});
}

if(budy2.includes("prr")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/porra.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `PORRA MANO 💢` }
}
});
}

if(budy2.includes("gado")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/jack.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `GADAO KKKKKKKK 🐂` }
}
});
}

if(budy2.includes("gay")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/gay.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `EU NAO NASCI GAY, A CULPA É DO MEU PAI 🏳️‍🌈` }
}
});
}

if(budy2.includes("burro")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/burro.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `MLK BURRO DO KRL 😡` }
}
});
}

if(budy2.includes("lindo")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/gato.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `SOU LINDO QUE DÓI 💕` }
}
});
}

if(budy2.includes("vt")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/cu.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `AH VAI TOMAR NO CU 😡` }
}
});
}

if(budy2.includes("triste")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/depre.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `VAI VIVER MLK 😡` }
}
});
}

if(budy2.includes("e a louca")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/mulher.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `VAI LAVAR A LOUÇA KKKK 😂` }
}
});
}

if(budy2.includes("bct")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/bct.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `FIQUEI DE XERECA 👹` }
}
});
}

if(budy2.includes("kkk")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/risos.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `EU RI KKKKKKKKKKK 😂` }
}
});
}

if(budy2.includes("indio")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/indio.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `ALA O AMAZONENSE KKKKKK 😂` }
}
});
}

if(budy2.includes("mentira")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/fake.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `FAKE TIUS ISSO 😡` }
}
});
}

if(budy2.includes("aff")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/meme.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `JURO MANA 💋` }
}
});
}

if(budy2.includes("clbc")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/macaco.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `CALA A BOCA MACACO 🐒` }
}
});
}

if(budy2.includes("macaco")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/macaco2.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `MACACO FUDIDO 🦧` }
}
});
}

if(budy2.includes("sexo")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/websescsu.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `SEXOOO KKKKKK 😹` }
}
});
}

if(budy2.includes("pai")){
const soundft = fs.readFileSync('./DADOS_TOKITO/data/media/audios/sempai.mp3');
tokito.sendMessage(from, { audio: soundft, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `ALA O SEM PAI 🤣🤣` }
}
});
}

if(budy2.includes("corno")){
tujuh = await fetch(corno).then(v => v.buffer())
await tokito.sendMessage(from, {audio: tujuh, mimetype: "audio/mpeg", contextInfo: DLchanneldl
}, 
{
quoted: {
key: { participant: sender },
message: { conversation: `MUUUUHHH 🐂🐂` }
}
});
}
}

//=[ ANTI PALAVRAS - (🤖) - GRUPOS ]=\\
if(isGroup && isPalavrao && isBotGroupAdmins && !SoDono && !isGroupAdmins) {
if(dataGp[0].antipalavrao.palavras.some(i => budy2.includes(i.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")))) {
setTimeout(() => {
if(!JSON.stringify(groupMembers).includes(sender)) return 
tokito.groupParticipantsUpdate(from, [sender], 'remove');
setTimeout(() => {tokito.sendMessage(from, {delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})}, 500)
}, 2000);
tokito.sendMessage(from, {text: mess.permissionDenied_rUser()}, {quoted: selo});
}
}

if (isGroup && isSimi && budy != undefined) {
if(type == 'imageMessage') return 
if(type == 'audioMessage') return 
if(type == 'stickerMessage') return
if(info.key.fromMe) return 
muehe = await simih(budy);
await tokito.sendMessage(from, {text: muehe}, {quoted: selo}).catch(async(e) => {
reply(mess.errorResponseSimi());
});
}
if (
isTokitoIA &&// recurso ligado
typeof body === "string" &&// garante string
body.trim() &&// não vazio
!body.startsWith(prefix) &&// não comando
!info.key.fromMe// não mensagem do bot
) {

const texto = body.toLowerCase().trim();

// tokito no começo | meio | fim (palavra isolada)
const chamouTokito =
/^tokito\b/.test(texto) ||
/\btokito\b/.test(texto) ||
/\btokito$/.test(texto);

if (!chamouTokito) return;

try {
// reação inicial
await tokito.sendMessage(from, {
react: { text: "🧊", key: info.key }
});

// remove apenas "tokito"
const pergunta = texto
.replace(/\baurora\b/gi, "")
.replace(/\s+/g, " ")
.trim();

// ❌ sem pergunta
if (!pergunta) {
await tokito.sendMessage(
from,
{
text:
`🧊 *TOKITO IA*

Sou uma inteligência criado pelo meu criador YoshGGx para responder com clareza, calma e precisão.
Basta me chamar pelo nome em qualquer parte da mensagem.`,
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: setting.channeldl,
newsletterName: NomeDoBot
},
externalAdReply: {
title: NomeDoBot,
body: `ɴᴏᴍᴇ: ${pushname}`,
previewType: "PHOTO",
thumbnail: fs.readFileSync(
"./DADOS_TOKITO/INFO_TOKITO/LOGOS/fotoselo.jpg"
),
sourceUrl: "https://tokito-apis.site"
}
}
},
{ quoted: info }
);
return;
}

// 🧠 prompt
const prompt = `${pergunta}`;

const data = await fetchJson(
`https://tokito-apis.site/api/gemini-pro?texto=${encodeURIComponent(prompt)}&apikey=${API_KEY_TOKITO}`
);

// 🧠 normalização
let resposta =
typeof data?.resposta === "string"
? data.resposta
: data?.resposta?.candidates?.[0]?.content?.parts
?.map(p => p.text || "")
.join("") ||
data?.candidates?.[0]?.content?.parts
?.map(p => p.text || "")
.join("") ||
"";

resposta = resposta.trim() || "Não consegui responder agora.";

// ✉️ resposta final
await tokito.sendMessage(
from,
{
text:
`🧊 *TOKITO IA*

${resposta}`,
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: setting.channeldl,
newsletterName: NomeDoBot
},
externalAdReply: {
title: NomeDoBot,
body: `ɴᴏᴍᴇ: ${pushname}`,
previewType: "PHOTO",
thumbnail: fs.readFileSync(
"./DADOS_TOKITO/INFO_TOKITO/LOGOS/fotoselo.jpg"
),
sourceUrl: "https://tokito-apis.site"
}
}
},
{ quoted: info }
);

return;

} catch (err) {
console.error("Erro Tokito IA:", err);
return;
}
}

const privateCmd = (id, pc, cmd, porcentagem) => {
reagir(from, "❔");
return `╭─ ͡┄┄───────ׅ─ׅ─ׅ──ׂ─ׅ──────⟡
┃ ┏☆∻∹⋰ ★∻∹⋰ ☆∻∹⋰ ★∻∹⋰┓
┃࣪ ╎—̳͟͞͞ 🧊𖥔࣪ *usuário:* @${sender.split("@")[0]}
┃࣪ ╎—̳͟͞͞ 🧊𖥔࣪ *comando:* ${pc}
┃࣪ ╎—̳͟͞͞ 🧊𖥔࣪ *parecido:* ${cmd || "Nenhum"}
┃࣪ ╎—̳͟͞͞ 🧊𖥔 *semelhança:* ${porcentagem || 0}%
┃࣪ ╎—̳͟͞͞ 🧊𖥔 *ajuda:* digite *${prefix}menu*
┃ ┗☆∻∹⋰ ★∻∹⋰ ☆∻∹⋰ ★∻∹⋰┛
╰─ ͡┄┄───────ׂ─ׅ───ׂ─ׅ─ׅ───ׅ───⟡`;
}


if (budy2.toLowerCase() === 'prefixo') {
try {

await reagir(from, "🧊");


const caminhoVideo = "./DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.mp4";
const caminhoImagem = "./DADOS_TOKITO/INFO_TOKITO/LOGOS/fotomenu.png";

let mediaPrefixo;

// ─── VIDEO OU IMAGEM ───
if (fs.existsSync(caminhoVideo)) {

mediaPrefixo = await prepareWAMessageMedia(
{
video: { url: caminhoVideo },
mimetype: "video/mp4",
gifPlayback: true,
seconds: 8
},
{ upload: tokito.waUploadToServer }
);

} else {

mediaPrefixo = await prepareWAMessageMedia(
{
image: { url: caminhoImagem }
},
{ upload: tokito.waUploadToServer }
);

}

const botoes = [
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "『 🧊 』ᴍᴇɴᴜ 『 🧊 』",
id: `${prefix}menu`
})
},
{
name: "quick_reply",
buttonParamsJson: JSON.stringify({
display_text: "『 🧊 』ᴘɪɴɢ 『 🧊 』",
id: `${prefix}ping`
})
}
];
const carousel = {
cards: [
{
header: {
hasMediaAttachment: true,
...(mediaPrefixo.videoMessage
? { videoMessage: mediaPrefixo.videoMessage }
: { imageMessage: mediaPrefixo.imageMessage })
},
headerType: mediaPrefixo.videoMessage ? "VIDEO" : "IMAGE",
body: {
text:
`*🧊 • ᴘʀᴇғɪxᴏ*
╰┈➤ *ᴇsᴛᴇ ᴇ́ ᴏ ᴍᴇᴜ ᴘʀᴇғɪxᴏ ᴀᴛᴜᴀʟ, ᴄᴏᴍ ᴇʟᴇ ᴠᴏᴄᴇ̂ ᴘᴏᴅᴇ ᴀᴄᴇssᴀʀ ᴍᴇᴜs ᴄᴏᴍᴀɴᴅᴏs ᴀɴᴛɪɢᴏs ᴇ ɴᴏᴠᴏs.* 『 ${prefix} 』`
},
footer: {
text: NomeDoBot
},
nativeFlowMessage: {
buttons: botoes
}
}
]
};
await tokito.relayMessage(
from,
{
interactiveMessage: {
contextInfo: {
quotedMessage: selo.message,
participant: selo.key.participant || selo.key.remoteJid,
stanzaId: selo.key.id,
remoteJid: selo.key.remoteJid
},
body: { text: "*🧊⃞     ᴘʀᴇғɪxᴏ ᴅᴏ ʙᴏᴛ     ⃞🧊*" },
carouselMessage: carousel
}
},
{}
);

} catch (e) {
console.log("Erro prefixo:", e);
reply("*❌ • ᴇʀʀᴏ ᴀᴏ ᴍᴏsᴛʀᴀʀ ᴏ ᴘʀᴇғɪxᴏ.*");
}
}


if (isCmd) {
setTimeout(() => {
}, 1000)

AB = similarityCmd(command)
notcmd = privateCmd(sender, prefix + command, AB[0].comando, AB[0].porcentagem)

tokito.sendMessage(
from,
{
text: notcmd,
footer: `${NomeDoBot}`,
contextInfo: {
 mentionedJid: [sender], // mantém o mention()
 isForwarded: true,
 forwardingScore: 1,
 forwardedNewsletterMessageInfo: {
newsletterJid: `${setting.channeldl}`, // canal
newsletterName: `${NomeDoBot}`,
serverMessageId: "",
 },
},
},
{ quoted: selo }
)
}
}
}
}


//=================

const nmrdn = setting.ownerNumber.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;

async function forTemporaryVip() {
if(vip.length > 0) {
for (y of vip) {
if(y.save != Number(moment.tz('America/Sao_Paulo').format('DD'))) {
y.save = Number(moment.tz('America/Sao_Paulo').format('DD'));
fs.writeFileSync("./DADOS_TOKITO/usuarios/vip.json", JSON.stringify(vip));
if(y.infinito == false) {
if(y.dias > 1) {
y.dias -= 1;
fs.writeFileSync("./DADOS_TOKITO/usuarios/vip.json", JSON.stringify(vip));
} else {
tokito.sendMessage(y.id, {text: `*sᴇᴜs ᴅɪᴀs ᴅᴇ ᴜsᴜᴀʀɪᴏ(ᴀ) ᴠɪᴘ ᴀᴄᴀʙᴀʀᴀᴍ 🙅‍♂️*`});
AB = vip.map(b => b.id).indexOf(y.id);
vip.splice(AB, 1);
fs.writeFileSync("./DADOS_TOKITO/usuarios/vip.json", JSON.stringify(vip));
}
}
}
}
}
}
forTemporaryVip().catch((error) => {console.log(error)});

startFunctionNaga().catch(async(error) => {
if(JSON.stringify(error).includes(API_KEY_TOKITO)) {} else if(String(error).includes("Erro: aborted")) {
fileStart = require.resolve("./ARQUIVES/connect.js");
delete require.cache[fileStart];
require(fileStart);
} else if(String(error).includes("nativeFlowResponseMessage")) {
} else { 
return console.log('O servidor-geral caiu ou não foi possivel executar esta ação.', error);
}
})
}
}
  
fs.watchFile(require.resolve(__filename), () => {
fs.unwatchFile(require.resolve(__filename));
console.log(colors.blue(`Alterações salvas, aguarde que estou carregando :) - '${__filename}'`));
delete require.cache[require.resolve(__filename)]
require(require.resolve(__filename))
})

module.exports = starttokito;