require('./Config/config')
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('<h1> Bienvenido a mi Servidor REST</h1>')
})

app.use(require('./Routes/usuario'));
app.use(require('./Routes/categoria'));
app.use(require('./Routes/login'));
app.use(require('./Routes/producto'));

mongoose.connect('mongodb+srv://admin:Cada1DeNosotros@cluster0.y2dx1.mongodb.net/cafeteria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos Online');
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea por el puerto', process.env.PORT);
})