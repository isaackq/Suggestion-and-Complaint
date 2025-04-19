const { auth } = require("./auth");

exports.mail = {
  default: "nodemailer",
  nodemailer: {
    service: process.env.MAIL_SERV, // service provider
    secure: JSON.parse(process.env.MAIL_SECURE), //to handle  the boolean object  that come from the env file
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
};


//change the settigns to sent from and to gmail 
// exports.mail = {
//   default: "nodemailer",
//   nodemailer: {
//     service: 'gmail', 
//     auth: {
//       user: 'isaackamel12345@gmail.com',
//       pass: 'kecj exhq vtzq xtsi',
//     },
//   },
// };