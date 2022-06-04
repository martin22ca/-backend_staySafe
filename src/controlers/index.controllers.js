const { Pool } = require('pg');
//netifly

const pool = require('../db')
pool.connect();

const getUsers = async (req,res) => {
    const resposne = await pool.query("select * from users");
    res.send(resposne.rows);
}

const getCrimesLoc = async (req,res) => {
    const resposne = await pool.query("select latitude as lat, longitude as lng from crimes");
    res.send(resposne.rows);
}

const getCrimesTypes = async (req,res) => {
    const resposne = await pool.query("select crime_type, count(id) from crimes group by crime_type ");
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