const express=require('express');
const bodyParser=require('body-parser');
const  cors=require('cors');
const nodemailer=require('nodemailer');

const app=express();
const port=3000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(process.cwd()+"/public/"));
app.get('/', (req, res)=> {
    res.sendFile(process.cwd()+"/public/index.html");
});

app.post('/envio', (req, res)=> {
    const correo=req.body.email;
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const mensaje=req.body.mensaje
    console.log(correo);
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'escapetours20@gmail.com',
            pass:'okwlvxvmndbdcdum'
        }
    });

    const mailOptions= {
        from:'escapetours20@gmail.com',
        to:'escapetours20@gmail.com',
        subject:'Recibiste un mensaje de contacto.',
        html:`<h3>Un usuario desea contactarse a Escape Tours.</h3>
        <p>A continuación, la información de contacto del usuario: </p>
        <p>Nombre: ${nombre}</p>
        <p>Apellido: ${apellido}</p>
        <p>Correo: ${correo}</p>
        <p>Mensaje: ${mensaje}</p>`
    };

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error) {
            console.log(error);
            res.status(500).send('Error enviar el email');
        } else {
            console.log('Email enviado:', info.response);
            res.status(200).send('Email enviado con éxito');
        }
    });
});


app.listen(port, ()=> {
    console.log('Servidor escuchando en http://localhost:${port}');
});