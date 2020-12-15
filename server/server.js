const express = require('express');
const path = require('path');

const app = express();

//serve the bundle file
app.use('/build', express.static(path.join(__dirname, '../build/')) )

//serve the index page at /
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'))
});


//404 if client goes to incorrect route
app.use((req, res) => {
  res.sendStatus(404); //sends not found
})


app.listen(3000, ()=>{
  console.log('listening on 3000')
})