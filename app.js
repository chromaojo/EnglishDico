const express = require('express');
const app = express();
const fs = require('fs');
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use( express.static( path.join(__dirname, 'statics')));
app.use(express.json());

app.set('view engine', 'ejs'); // Assuming you are using EJS as the template engine




app.get('/',(req,res)=>{

  res.render('index');
})

// app.get('/result', (req, res)=>{
//   res.render('result');
// })

app.post('/result', (req, res) => {
  const { keyToSearch } = req.body;
  const lowercaseKeyToSearch = keyToSearch.toLowerCase();
  // To Read the JSON file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);
      const value = jsonData[lowercaseKeyToSearch];

      if (value) {
        res.render('result', { keyToSearch, value }); // Render index.html with data
      } else {
        res.render('result', { keyToSearch, value }); // Render index.html with data
      }
    } catch (error) {
      res.status(500).json({ error: 'Invalid JSON format in the file' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
