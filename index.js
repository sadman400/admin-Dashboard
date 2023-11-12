const express = require('express');
const mongoose = require('mongoose');
const issueRoutes = require('./routes/issueRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sadmanhossain400:RYAgCGAZRRYyYhaU@cluster0.jzhocak.mongodb.net/smartcitycitizen?retryWrites=true&w=majority')
  .then(() => console.log("connection successfully"))
  .catch((err) => console.log(err));

app.use(issueRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
