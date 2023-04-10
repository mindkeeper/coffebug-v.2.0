const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const { google } = require("googleapis");
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const user = process.env.GOOGLE_CLIENT_USER;

const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2({
  clientId,
  clientSecret,
  redirectUri: "https://developers.google.com/oauthplayground",
});

OAuth2Client.setCredentials({ refresh_token: refreshToken });

const sendEmail = (userData, subject) =>
  new Promise((resolve, reject) => {
    const accessToken = OAuth2Client.getAccessToken;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });
    const p = path.join(__dirname, "..", "views", "forgot-password.ejs");
    ejs.renderFile(p, { data: userData, subject }, (err, data) => {
      if (err) {
        console.log(err);
        return reject({ err });
      }

      const mailOptions = {
        from: "Coffebug <fcb.nyak@gmail.com>",
        subject,
        to: userData.user.email,
        html: data,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return reject({ err });
        }
        return resolve({ msg: "Success", info: info.accepted });
      });
    });
  });

module.exports = sendEmail;
