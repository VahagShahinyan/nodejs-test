const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const { User } = require('./models/user');
const bodyParser = require('body-parser');
const { sequelize } = require('../config/config');
const { StatusCodes } = require('http-status-codes');
app.use(bodyParser.json());

app.put('/user/:userId', async (req, res) => {
  try {
    const userId = +req.params.userId;
    const amount = req.body.amount;

    if (amount <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Amount can not be 0 or less' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found' });
    }

    if (user.balance >= amount) {
      user.balance -= amount;
      await user.save();
      return res.json({ message: 'Balance updated successfully' });
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Insufficient funds on balance' });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'An error has occurred' });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully');
    app.listen(port, () => {
      console.info(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
