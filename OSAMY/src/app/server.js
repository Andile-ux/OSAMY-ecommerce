const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: [' http://localhost:4200']
}))
const secretKey = '1234';

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  console.log('Received Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  const tokenWithoutBearer = token.replace('Bearer ', '');

  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      console.error('Token Verification Error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log('Decoded Token Payload:', decoded);

    req.user = decoded;
    next();
  });
}


app.post('users', (req, res) => {
  const { email } = req.body;

  const user = { email };

  if (user) {
    // Create a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
    console.log(token)
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const jsonServerRouter = jsonServer.router(path.join(__dirname, '.OSAMY', 'database', 'db.json'));
app.use('/api', authenticateToken, jsonServerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
