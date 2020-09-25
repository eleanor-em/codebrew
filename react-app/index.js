// server file
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const app = express();

// Database setup
// const db = require('./models/db');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Routes set up
const routes = require('./routes/generalRoutes');

app.use('/', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}) 

// port set up
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express servivng at port ${PORT}`);
})

module.exports= app;


