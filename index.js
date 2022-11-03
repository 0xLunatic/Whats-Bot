const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

const client = new Client({
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  },
});

let sessionData;

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  if (!sessionData) {
    qrcode.generate(qr, { small: true });
  } else {
    print("Continuing session");
  }
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const url = "http://178.128.51.171:6969/";
const key = "jD2Hr2IK";

client.on("message", (msg) => {
  if (msg.body == "!help") {
    msg.reply(
      "Berikut adalah list command!\n- !help\n- !jadwal\n- !quotes\n- !motivasi\n- !bijak"
    );
  }
  if (msg.body == "!quotes") {
    urlAPI = url + "api/quotes?apikey=" + key;
    fetch(urlAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        msg.reply('"' + data.quotes + '"');
      });
  }
  if (msg.body == "!bijak") {
    urlAPI = url + "api/bijak?apikey=" + key;
    fetch(urlAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        msg.reply('"' + data.result + '"');
      });
  }
  if (msg.body == "!motivasi") {
    urlAPI = url + "api/motivasi?apikey=" + key;
    fetch(urlAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        msg.reply('"' + data.result + '"');
      });
  }
  if (msg.body == "!jadwal") {
    var jadwal =
      "Jadwal Mata Kuliah Kelas A\n\nSenin : Logika Informatika (07:00-08:40 | G.1 L.5 R.57)\n\nSelasa : Libur Coy\n\nRabu : Kalkulus (15:15-17:50 | G.1 L.5 R.55)\n\nKamis : Pancasila (08:45-10:25 | Daring)\n\nJum'at : MDI (07:00-09:35 | G.1 L.5 R.59)\n\nSabtu : DSK (07:00-08:40 | G.1 L.4 R.54)\n\t    DDP (09:35-12:10 | G.1 L.5 R.59)\n\t    Qurdist (12:30-14:10 | Daring)";
    msg.reply(jadwal);
  }
});

client.initialize();
