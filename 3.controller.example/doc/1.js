//express如何定义路径

const app = express();
app.get('/users/create',(req,res,next)=>{
   console.log(req.url);
   res.send('ok');
});