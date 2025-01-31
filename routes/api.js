const { connectToDb } = require('../db');

async function routes(fastify, options) {

    fastify.post('/users', async (req, res) => {
        let { name, email } = req.body; 


        if (!name || !email) {
            return res.status(400).send({ error: "Name and email are required." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: "Invalid email format" });
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


    fastify.post('/tasks', async (req, res) => {

        let { title, is_finish , user_id } = req.body; 


        if (!title  || !user_id) {
            return res.status(400).send({ error: "Title and user_id are required." });
        }

        if(is_finish === undefined){
            is_finish = false
        }

        if (typeof is_finish !== 'boolean') {
            return res.status(400).send({ error: "'is_finish' must be a boolean" });
        }

        try {
            const connection = await connectToDb();
            

            const [rows] = await connection.execute(
                'SELECT COUNT(id) AS count FROM users WHERE id = ?',
                [user_id]
            );

            
            if (rows[0].count == 0) {
                console.error("Database Error: user id unknow");
                connection.end();
                return res.status(400).send({ error: 'user isn\'t existing' });
            }

            
            await connection.execute(
                'INSERT INTO tache (titre, est_terminee , user_id) VALUES (?, ?, ?)', 
                [title, is_finish, user_id]
            );

            connection.end();

            res.send({
                message: 'Task add with success',
                is_add: true
            });

        } catch (error) {
            console.error("Database Error:", error);
            res.status(500).send({ error: 'Error while adding task to database' });
        }
    });
    

    fastify.get('/users', async(req, res)=>{
        try {
            const connection = await connectToDb();
            
            const [rows] = await connection.execute('SELECT name FROM users');


            connection.end();

            res.send({
                message: 'list of all users',
                allUser: rows
            });

        } catch (error) {
            console.error("Database Error:", error);
            res.status(500).send({ error: 'Error with get all user' });
        }
    })


    fastify.get('/users/:id/tasks', async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ error: "User ID is required." });
        }

        try {
            const connection = await connectToDb();

            
            const [rows] = await connection.execute(
                'SELECT * FROM tache WHERE user_id = ?',
                [id]
            );

            connection.end();

            
            if (rows.length === 0) {
                return res.status(404).send({ message: "No tasks found for this user." });
            }

            res.send({
                message: `Tasks for user with ID ${id}`,
                tasks: rows
            });

        } catch (error) {
            console.error("Database Error:", error);
            res.status(500).send({ error: 'Error retrieving tasks from database' });
        }
    })

}

module.exports = routes;
