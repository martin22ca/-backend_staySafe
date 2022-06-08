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
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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


