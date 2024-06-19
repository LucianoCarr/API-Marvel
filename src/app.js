const express = require('express');
const cors = require('cors')
const indexRouter = require('./routes/index.Routes')

const app = express();
const port = 3000;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors());
app.use(express.json());


// Middleware para archivos estáticos
app.use(express.static(__dirname + '/../public'));

// Rutas
app.use('/', indexRouter)



app.listen(port, () => {
  console.log(`Servidor de Marvel ==> http://localhost:${port}`);
});
