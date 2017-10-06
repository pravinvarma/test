const express = require('express')
const app = express()

var __dirname = 'server';


app.listen(3000, function() { console.log('listening')});

app.get('/test', function (req, res) {
  res.send('Hello World!')
})
