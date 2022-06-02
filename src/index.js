//archivo que inicia el server
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require("./routes/index"));

// handling errors
//el next permite como saltar a otra funcion y que continue en otro lado
//esto quiere decir que es una funcion que se va a llamar cuando un error ocurra en un post de http
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});
// Settings
app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));


