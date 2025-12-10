const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ye gmail smtp se copy kiya hai google per search karna hai gmail smtp waha per ye show hoga 
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "aashishsingh1542@gmail.com", // yaha per login  id us karni hai 
    pass: "eccdumyhtcltlunn", // ye (sign in with app passwords) website se copy kiya jaya hai app password yaha per google per serach karna hai app password jo password create ka raha hai wo yaha per use karna hai without space ke ok
  },
});

module.exports = {transporter}