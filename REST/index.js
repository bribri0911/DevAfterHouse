const fastify = require('fastify')()

const rate_limits = {}; 

const max_requests = 30; 
const time_window = 60_000; 


fastify.register(require('@fastify/cors'), {
    origin: "*", 
});

//the rate timing
fastify.addHook('onRequest', (req, reply, done) => {
    const userId = req.headers['user-id'] || req.ip; 

    if (!rate_limits[userId]) {
        rate_limits[userId] = [];
    }

    rate_limits[userId] = rate_limits[userId].filter(timestamp => Date.now() - timestamp < time_window);

    if (rate_limits[userId].length >= max_requests) {
        return reply.status(429).send({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.'
        });
    }

    rate_limits[userId].push(Date.now());

    done();
});



fastify.register(require('./routes/api'), { prefix: '/api' });

fastify.listen({ port: 5000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        console.log(err)
        process.exit(1)
    } else {
        console.log(`Server is listening on ${address}`);
    }
});
