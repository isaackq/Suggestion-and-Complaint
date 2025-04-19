const nodemailer = require("nodemailer");
const { mail } = require("../../../config/mail");

module.exports = class NodeMailer {
  #transporter = null;

  static #instance = null;

  static get instance() {
    return (this.#instance ??= new NodeMailer());
  }

  constructor() {
    this.#setup();
  }

  #setup() {
    this.#transporter = nodemailer.createTransport(mail.nodemailer);
  }

  async send(emailSettings) {
    try {
      const info = await this.#transporter.sendMail({
        from: emailSettings["from"], // sender address
        to: emailSettings["to"], // list of receivers
        subject: emailSettings["subject"], // Subject line
        text: emailSettings["text"], // plain text body
        html: `<b> <a>${emailSettings["message"]}</a></b>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Failed to send email:", error.message);
      if (
        error.responseCode === 550 ||
        error.response?.includes("User unknown")
      ) {
        console.error("⚠️ Invalid or non-existent email address");
      }
    }
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
};
