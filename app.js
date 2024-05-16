const express = require('express');
const app = express();
const path = require('path');
const userModels = require('./models/user');

app.set("view engine",'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));



app.get('/',function(req,res){
    res.render('index');
})
app.get('/read',async function(req,res){
    let users = await userModels.find();
    res.render('read',{users});
})

app.get('/edit/:id', async function(req, res) {
    let user = await userModels.findOne({ _id: req.params.id });
    res.render('edit', { user }); // Pass a single user object instead of users
})

app.post('/update/:id', async function(req, res) {
    let {image ,name ,email} = req.body;

    let user = await userModels.findOneAndUpdate({ _id: req.params.id },{image ,name ,email},{new : true});
    res.redirect('/read');
})

app.get('/delete/:id',async function(req,res){
    let users = await userModels.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
})

app.post('/create',async function(req,res){
    let {image ,name ,email} = req.body;

    let createdUser = await userModels.create({
        image,
        name,
        email
    })

    res.redirect("/read");
});





app.listen(3000);
