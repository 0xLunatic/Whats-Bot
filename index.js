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
    const help =
      "Berikut adalah list command!\n" +
      "- !help\n" +
      "- !jadwal\n" +
      "- !jadwaluts\n" +
      "- !quotes\n" +
      "- !motivasi\n" +
      "- !bijak\n" +
      "\n" +
      "Contact\n" +
      "Discord : 0xLunatic#1100\n" +
      "Github : github.com/DreamerDotID";
    msg.reply(help);
  }
  if (msg.body == "!jadwaluts") {
    const jadwalUjian =
      "- Logika Informatika | 07/11/2022 | 12:30-14:00 | R. Lab. Inf. |\n" +
      "\n" +
      "- Al Quran dan Hadits | 09/11/2022 | 14:15-15:45 | R. Lab. Inf. |\n" +
      "\n" +
      "- Pancasila | 11/11/2022 | 12:30-14:00 | R. Lab. Inf. |\n" +
      "\n" +
      "- Kalkulus Informatika | 16/11/2022 | 08:00-09:30 | R.4.1.5.55 |\n" +
      "\n" +
      "- Dasar Pemrograman | 18/11/2022 | 08:00-09:30 | R.4.1.5.55 |\n" +
      "\n" +
      "- Dasar Sistem Komputer | 19/11/2022 | 08:00-09:30 | R.4.1.5.55 |\n" +
      "\n" +
      "- Manajemen Data dan Informasi | 19/11/2022 | 14:15-15:45 | R.4.1.5.55 |\n";
    msg.reply(jadwalUjian);
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
      "Jadwal Mata Kuliah Kelas A\n" +
      "\n" +
      "- Senin : Logika Informatika (07:00-08:40 | G.1 L.5 R.57)\n" +
      "\n" +
      "- Selasa : Libur Coy\n" +
      "\n" +
      "- Rabu : Kalkulus (15:15-17:50 | G.1 L.5 R.55)\n" +
      "\n" +
      "- Kamis : Pancasila (08:45-10:25 | Daring)\n" +
      "\n" +
      "- Jum'at : MDI (07:00-09:35 | G.1 L.5 R.59)\n" +
      "\n" +
      "- Sabtu : DSK (07:00-08:40 | G.1 L.4 R.54)\n" +
      "             : DDP (09:35-12:10 | G.1 L.5 R.59)\n" +
      "             : Qurdist (12:30-14:10 | Daring)";
    msg.reply(jadwal);
  }
});

client.initialize();
