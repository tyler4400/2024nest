const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function (req, res) {
    const publicDir = path.join(__dirname, 'public');
    fs.readdir(publicDir, (err, files) => {
        res.send(`
        <ul>
          ${files.map(file => `<li><a href="${file}">${file}</a></li>`).join('')}
        </ul>
            `);
    })
});
app.listen(8080, () => {
    console.log(`App is runing on port 8080`);
})