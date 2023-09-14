const express = require('express');
const app = express();
const cors = require('cors');
const converterRoute = require('./routes/converterRoute');
require('dotenv').config();

app.use(express.json());
app.use(cors())
app.use('/code', converterRoute);

const PORT = process.env.port || 3000;

app.get('/', async(req, res) => {
    try {
        res.send('Homepage');
    } catch (error) {
        res.send({msg : error.message});
    }
})


app.listen(PORT, () => {
    console.log(`Server is running at the port ${PORT}`);
})