const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {//allows access to request that is coming to the server or response that we are sending out
    res.send('send this string');
})

app.listen(8080, () => {
    console.log('server listening on port 8080');
});//starts server and has it listen for requests that come in