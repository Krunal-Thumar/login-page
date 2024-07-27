const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'evalexpertsDB',
    password: 'tiger',
    port: 5432,
});

// API endpoint to validate login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM instructor WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            const professorName = result.rows[0].ins_name; // Assuming 'ins_name' is the column for professor's name
            res.json({ message: `Hello ${professorName}` });
        } else {
            res.status(401).json({ message: 'Sorry! Login Incorrect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});