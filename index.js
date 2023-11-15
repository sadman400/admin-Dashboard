const express = require('express');
const mongoose = require('mongoose');
const issueRoutes = require('./routes/issueRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://sadmanhossain400:RYAgCGAZRRYyYhaU@cluster0.jzhocak.mongodb.net/smartcitycitizen?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connection successfully'))
  .catch((err) => console.log(err));

app.use(issueRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
