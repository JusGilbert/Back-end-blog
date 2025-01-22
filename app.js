
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const posts = [];

// Home route to display all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Route to create new post
app.get('/new', (req, res) => {
    res.render('new-post');
});

app.post('/new', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1; // Assign an incremental ID
    posts.push({ id, title, content });
    res.redirect('/');
});

// Route to edit a post
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.render('edit-post', { post });
});

app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id == id);
    if (postIndex === -1) return res.status(404).send('Post not found');
    posts[postIndex] = { ...posts[postIndex], title, content };
    res.redirect('/');
});

// Route to delete a post
app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id == id);
    if (postIndex === -1) return res.status(404).send('Post not found');
    posts.splice(postIndex, 1); // Remove post from array
    res.redirect('/');
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
