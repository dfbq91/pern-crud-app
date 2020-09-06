/** Contain the logic of the backend of the application */

// Set of connections that users will start using as they make requests
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'api',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const createUser = async (req, res) => {
    const { name, dad, mom } = req.body;
    const response = await pool.query('INSERT INTO users (name, dad, mom) VALUES ($1, $2, $3)', [name, dad, mom]);
    res.json({
        message: 'A new person was created',
        body: {
            user: {name, dad, mom}
        }
    })
};

module.exports = {
    getUsers,
    createUser,
};