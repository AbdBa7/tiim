const express = require('express');
const app = express();
app.use(express.static('./dist/star-tech'));
app.get('/*', function (req, res) {
 res.sendFile(__dirname + '/dist/star-tech/index.html');
});
app.listen(process.env.PORT || 8080);