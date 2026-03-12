const express = require('express');
const app = express();
const port = 3000;

// 1. MIDDLEWARE (Must come first)
app.use(express.json()); // Essential for POST requests

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 2. STATIC FILES
app.use(express.static('public'));

// 3. DATA
const items = ['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc'];

// 4. ROUTES
app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (newItem) {
        items.push(newItem);
    }
    res.json(items);
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

// 5. ERROR HANDLING (Must come last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});