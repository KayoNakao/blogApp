import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/submit", (req, res) => {
    posts.push(req.body);
    res.render("index.ejs", {title: req.body.title, content: req.body.text, posts: posts});
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
        res.render("index.ejs", {title: post.title, content: post.text, posts: posts});
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});