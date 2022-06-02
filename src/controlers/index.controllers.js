const { Pool } = require('pg');
//netifly

const pool = new Pool({
    host: "ec2-54-165-90-230.compute-1.amazonaws.com",
    user: "qkbkeqsjobjgiq",
    port: 5432,
    password: "d693d1b8d929b1c91e9a0148735408a5edd5d3b78ebef678b0fb443556a39780",
    database: "d3bjn19bl5prqr",
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false}
    }
);
pool.connect();

const getUsers = async (req,res) => {
    const resposne = await pool.query("select * from users");
    res.send(resposne.rows);
}

const getCrimes = async (req,res) => {
    const resposne = await pool.query("select * from crimes");
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
    getCrimes,
    post_event
}