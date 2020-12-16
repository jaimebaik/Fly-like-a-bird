const express = require('express');
const path = require('path');

const app = express();

//serve the bundle file
app.use('/build', express.static(path.join(__dirname, '../build/')) )

//serve the index page at /
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
});

app.use('/*', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));

app.listen(3000, ()=>{
  console.log('listening on 3000')
})