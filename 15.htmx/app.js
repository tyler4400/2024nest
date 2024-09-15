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
const upload = multer({ storage })
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
app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    console.log(filePath)
    return `<b>上传成功</b>:${filePath}`;
});
app.get('/files', upload.single('file'), (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        res.send(files.map(file => `<li>${file}</li>`));
    });
});
app.post('/validate', (req, res) => {
    setTimeout(() => {
        res.send('验证成功');
    }, 6000);
});
app.post('/store', (req, res) => {
    setTimeout(() => {
        res.send('表单保存成功');
    }, 3000);
});
app.get('/firstRequest', (req, res) => {
    setTimeout(() => {
        res.send('firstRequestResponse');
    }, 6000);
});
app.get('/secondRequest', (req, res) => {
    setTimeout(() => {
        res.send('secondRequestResponse');
    }, 3000);
});
app.get('/oob', (req, res) => {
    res.send(`
    <span>这是我返回的主要内容1</span>
    <span>这是我返回的主要内容2</span>
    <div id="otherTarget" hx-swap-oob="true">其它目标内容</div>
    `);
});
app.get('/select', (req, res) => {
    res.send(`
      <span>这是我返回的主要内容</span>
      <div id="otherTarget">其它内容</div>
      `);
});
app.get('/bigger', (req, res) => {
    res.send(`<div id="circle" class="circle" hx-get="/bigger" hx-swap="outerHTML" style="width:200px;height:200px;"></div>`);
});
app.get('/req', (req, res) => {
    console.log(req.headers)
    console.log(req.query)
    res.send(new Date().toLocaleString())
});
app.listen(8080, () => {
    console.log(`App is runing on port 8080`);
})