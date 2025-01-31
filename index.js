const fastify = require('fastify')()

fastify.register(require('./routes/users'), {prefix:'/users'})



fastify.listen({ port: 5000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        console.log(err)
        process.exit(1)
    } else {
        console.log(`Server is listening on ${address}`);
    }
})

