const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/vendor', express.static(__dirname + 'public/vendor'));

app.set('views', './views');
app.set('view engine', 'ejs');
app.get('', (req, res) => {
  res.render('index', { text: 'This is EJS' });
});

app.get('/meetings', (req, res) => {
  res.render('meetings', { text: 'Meetings Page' });
});

app.get('/meeting-details', (req, res) => {
  res.render('meeting-details', { text: 'Meeting Details Page' });
});

const server = app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});

module.exports = server; // Export the server for testing
