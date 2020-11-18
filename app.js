const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

// mongo db
mongoose.connect('mongodb://localhost:27017/wikiDB', {
    useNewUrlParser: true
}, {
    useUnifiedTopology: true
});

// mongoose schema
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.get('/articles', (req, res)=>{
	Article.find( (err, foundArticles) => {
		if(!err){
			res.send(foundArticles);
		} else {
			res.send(err);
		}
	});
});

app.post('/articles', (req, res) => {

	const newArticle = new Article({
		title: req.body.title,
		content: req.body.content
	});

	newArticle.save((err) => {
		if(!err){
			res.send('Successfully added a new article.');
		}else{
			res.send(err);
		}
	});
});

app.delete('/articles', (req,res) => {
	Article.deleteMany( (err) =>{
		if(!err){
			res.send('Successfuly deleted all articles');
		}
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});