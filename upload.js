const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const connectDB = require('./db');
const Policy = require('./model').Policy;
const Agent = require('./model').Agent;
const User = require('./model').User;
const UserAccount = require('./model').UserAccount;
const carrier = require('./model').carrier;
const multer = require('multer');

const app = express();

// Connect to MongoDB
connectDB();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// CSV upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file was uploaded.');
    }

    const file = req.file.path;

    fs.createReadStream(file)
      .pipe(csv())
      .on('data', async (data) => {
        const policy = new Policy(data);
        await policy.save();

        const agent = new Agent(data);
        await agent.save()

        const user = new User(data);
        await user.save()

        const userAccount = new UserAccount(data);
        await userAccount.save()

        const carrierData = new carrier(data);
        await carrierData.save()
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        res.send('CSV file successfully processed');
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Policy CRUD endpoints
app.post('/policies', async (req, res) => {
    try {
      const policy = new Policy(req.body);
      await policy.save();
      res.send(policy);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.get('/policies', async (req, res) => {
    try {
      const policy = await Policy.find();
      res.send(policy);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.get('/policies/:id', async (req, res) => {
    try {
      const policy = await Policy.findById(req.params.id);
      if (!policy) {
        return res.status(404).send('Policy not found');
      }
      res.send(policy);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.put('/policies/:id', async (req, res) => {
    try {
      const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!policy) {
        return res.status(404).send('Policy not found');
      }
      res.send(policy);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.delete('/policies/:id', async (req, res) => {
    try {
      const policy = await Policy.findByIdAndDelete(req.params.id);
      if (!policy) {
        return res.status(404).send('Policy not found');
      }
      res.send(policy);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

// User CRUD endpoints
  app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

  // Account CRUD endpoints
  app.post('/accounts', async (req, res) => {
    try {
      const accounts = new UserAccount(req.body);
      await accounts.save();
      res.send(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.get('/accounts', async (req, res) => {
    try {
      const accounts = await UserAccount.find();
      res.send(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.get('/accounts/:id', async (req, res) => {
    try {
      const accounts = await UserAccount.findById(req.params.id);
      if (!accounts) {
        return res.status(404).send('accounts not found');
      }
      res.send(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.put('/accounts/:id', async (req, res) => {
    try {
      const accounts = await UserAccount.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!accounts) {
        return res.status(404).send('accounts not found');
      }
      res.send(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.delete('/accounts/:id', async (req, res) => {
    try {
      const accounts = await UserAccount.findByIdAndDelete(req.params.id);
      if (!accounts) {
        return accounts.status(404).send('accounts not found');
      }
      res.send(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
