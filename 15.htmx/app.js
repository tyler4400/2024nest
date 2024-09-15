const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');//指定上传的目录
    },
    filename: (req, file, cb) => {//指定保存的文件名
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage})
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
app.get('/get', (req, res) => {
    res.send('get响应')
});
app.post('/post', (req, res) => {
    res.send('post响应')
});
app.get('/time', (req, res) => {
    res.send(new Date().toLocaleString())
});
app.get('/search', (req, res) => {
    res.send(req.query.keyword + '的搜索结果')
});
app.get('/revealed', (req, res) => {
    res.send('revealed')
});
app.get('/intersect', (req, res) => {
    res.send('intersect')
});
let count = 1;
app.get('/load_polling', (req, res) => {
    if (count++ < 10) {
        res.send(`<div hx-get="/load_polling" hx-trigger="load delay:1s" hx-swap="outerHTML">已加载${count}0%</div>`);
    } else {
        res.send('加载完成');
    }
});
app.get('/delay', (req, res) => {
    setTimeout(() => {
        res.send('delay')
    }, 3000)
});
app.post('/payload', (req, res) => {
    const user = req.body;
    user.id = Date.now();
    res.send(`
        <p>用户名:${user.name}</p>
        <p>邮箱:${user.email}</p>
    `);
})
app.post('/upload',upload.single('file'),(req,res)=>{
    const filePath = req.file.path;
    console.log(filePath)
    return `<b>上传成功</b>:${filePath}`;
});
app.get('/files',upload.single('file'),(req,res)=>{
    fs.readdir('./uploads',(err,files)=>{
        res.send(files.map(file=>`<li>${file}</li>`));
    });
});
app.listen(8080, () => {
    console.log(`App is runing on port 8080`);
})