const express = require('express');
const marked = require('marked');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.post('/convert', (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).send('Markdown content is required.');
  }
  const html = marked.parse(markdown);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Converted HTML</title>
    </head>
    <body>
      <div style="padding: 20px;">
        ${html}
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
