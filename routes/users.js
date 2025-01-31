const { connectToDb } = require('../db');

async function routes(fastify, options) {

    fastify.post('/addUser', async (req, res) => {
        let { name, email } = req.body; 

        console.log(name, email);

        if (!name || !email) {
            return res.status(400).send({ error: "Name and email are required." });
        }

        try {
            const connection = await connectToDb();
            
            
            const [rows] = await connection.execute(
                'SELECT COUNT(id) AS count FROM users WHERE email = ?',
                [email]
            );

            
            if (rows[0].count > 0) {
                console.error("Database Error: email is already taken");
                connection.end();
                return res.status(400).send({ error: 'Email is already taken' });
            }

            
            await connection.execute(
                'INSERT INTO users (name, email) VALUES (?, ?)', 
                [name, email]
            );

            connection.end();

            res.send({
                message: 'User added successfully!',
                is_add: true
            });

        } catch (error) {
            console.error("Database Error:", error);
            res.status(500).send({ error: 'Error while adding user to database' });
        }
    });
}

module.exports = routes;
