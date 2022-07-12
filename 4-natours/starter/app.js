const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1) MIDDLEWARES

const app = express(); //accedemos a todos los métodos de express.

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
/*Aquí está el middleware, básicamente
podemos modificar los datos de la solicitud entrante
se llama middleware porque está en medio de la
solicitud y respuesta. Es un solo paso por el que
pasa la solicitud mientras se procesa*/

//en cada función de middleware, tenemos acceso a la req,res y una funcion llamada next
// este middleware se aplica a cada una de las rutas, ya que no lo especificamos
app.use((req, resp, next) => {
  console.log('Hello from the middleware');
  // si no llamamos a la next function, no pasará al siguiente middleware, se quedará atascado
  next();
});

app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();

  next();
});

//2) ROUTE HANDLRES

//3) ROUTES
app.use('/api/v1/tours', tourRouter); //asi creamos una sub aplicación
app.use('/api/v1/users', userRouter); //montar un nuevo enrutador en una ruta
//4) START THE SERVER

module.exports = app;
