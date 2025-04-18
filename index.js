import express from "express";
import bodyParser from "body-parser";
import moment from "moment";

const app = express();
const port = 3000;

var posts = [];
var editIndex = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function showTopPage(res) {
    if (posts.length === 0) {
        res.render("index.ejs");
    } else {
        const index = posts.length - 1;
        const post = posts[index]
        res.render("index.ejs", {title: post.title, content: post.text, date: post.date, posts: posts});
    }
}

app.post("/action/:index", (req, res) => {
    const action = req.body.action;
    const index =req.params.index;
    editIndex = index;

    if (action === "edit") {
        const post = posts[index];
        res.render("write.ejs", {title: post.title, content: post.text});
    } else if (action === "delete") {
        posts.splice(index, 1);
        res.render("edit.ejs", { posts: posts});
    }

});

app.get("/edit", (req, res) => {
    var post = posts[req.params.index];
    res.render("edit.ejs", { posts: posts});
});

app.post("/submit", (req, res) => {
    const action = req.body.action;
    const index =req.params.index;
    console.log(action, index);

    if (action === "submit") {
        var now = new Date();
        var dateString = moment(now).format('LL');
        req.body.date = dateString;
        posts.push(req.body);
        res.render("index.ejs", {title: req.body.title, content: req.body.text, date: dateString, posts: posts});
    } else if (action === "edit") {
        posts[editIndex].title = req.body.title;
        posts[editIndex].text = req.body.text;
        showTopPage(res);
    }

});

app.get("/post/:index", (req, res) => {
    var post = posts[req.params.index];
    res.render("index.ejs", {title: post.title, content: post.text, date: post.date, posts: posts});
});

app.get("/write", (req, res) => {
    res.render("write.ejs");
});

app.get("/", (req, res) => {
    showTopPage(res);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});