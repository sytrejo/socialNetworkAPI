const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Almost there go to Insomnia to test the API!'));

module.exports = router;