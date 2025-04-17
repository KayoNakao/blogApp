import express from "express";
import bodyParser from "body-parser";
import moment from "moment";

const app = express();
const port = 3000;

var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/submit", (req, res) => {
    var now = new Date();
    var dateString = moment(now).format('LL');
    req.body.date = dateString;
    posts.push(req.body);
    res.render("index.ejs", {title: req.body.title, content: req.body.text, date: dateString, posts: posts});
});

app.get("/post/:index", (req, res) => {
    var post = posts[req.params.index];
    res.render("index.ejs", {title: post.title, content: post.text, date: post.date, posts: posts});
});

app.get("/write", (req, res) => {
    res.render("write.ejs");
});

app.get("/", (req, res) => {
    if (posts.length === 0) {
        res.render("index.ejs");
    } else {
        const index = posts.length - 1;
        const post = posts[index]
        res.render("index.ejs", {title: post.title, content: post.text, date: post.date, posts: posts});
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});