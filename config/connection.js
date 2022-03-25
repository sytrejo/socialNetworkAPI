const { connect, connection } = require (' mongoose ');

//Don't forget to add Atlas connection in Heroku as a config variable
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkAPIDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.export = connection;