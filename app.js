
const express= require("express");
const bodyParser=require("body-parser");
const nodemailer=require("nodemailer");
const app=express();

// app.use(express.static("views"));

//view engine setup
// app.engine('handlebars',exphbs());
// app.set('view engine','handlebars');

//Static folder
//app.use('/public',express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Body Parser Middleware
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get("/", function(req, res){
    res.render("contact");
});

app.post('/send',function(req,res){
    const output=`
    <p> you have a new contact request</p>
    <h3>contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    "use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'perfectp335@gmail.com', // generated ethereal user
      pass: 'Per@bestof3' // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "perfectp335@gmail.com", // list of receivers
    subject: "Node contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.render('contact');
}

main().catch(console.error);
});
app.listen(3000,  function(){
    console.log("the server has started");
 });