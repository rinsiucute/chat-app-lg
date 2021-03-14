// "use strict";
const nodemailer = require("nodemailer");

async function guimail(data) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mmun6060@gmail.com",
      pass: "hoahong4869"
    },
    
  });

await transporter.sendMail({
    from: " WEB CHAT ", // sender address
    to: data.email ,
    subject: data.tieu_de, // Subject line// tiêu đề thư
    text: "Hello world?", // plain text body
    html: data.noi_dung, // html body
  });
}

module.exports = guimail;