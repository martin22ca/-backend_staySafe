const { Pool } = require('pg');
//netifly

const pool = require('../db')
pool.connect();

const getUsers = async (req, res) => {
    const resposne = await pool.query("select * from users");
    res.send(resposne.rows);
}

const getCrimesLoc = async (req, res) => {
    const resposne = await pool.query("select latitude as lat, longitude as lng from crimes");
    res.send(resposne.rows);
}

const getCrimesTypes = async (req, res) => {
    var id = req.query.id;
    id = ("'"+id+"'");
    const resposne = await pool.query("select crime_type, count(id),max(time_of_crime) from crimes where time_of_crime < date_trunc('day', current_date-interval $1 day) group by crime_type ",
        [id]
    );
    res.send(resposne.rows);
}

const post_event = async (req, res, next) => {
    try {
        const { userid, latitude, longitude, description, address, type } = req.body;

        console.log(req.body)

        const resposne = await pool.query(
            "INSERT INTO crimes(userid, latitude, longitude, description, address, crime_type) VALUES($1, $2, $3, $4, $5, $6)",
            [userid, latitude, longitude, description, address, type]
        );
        res.header("Access-Control-Allow-Origin", "*");
        res.send(resposne.rows);
        console.log(resposne.rows)

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getCrimesLoc,
    getCrimesTypes,
    post_event
}