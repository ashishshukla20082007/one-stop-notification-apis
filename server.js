const express = require('express');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notification/notificationRoutes');
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const { createQueues } = require('./queue/notificationQueue');

const app = express();

connectDB(); // Connect to MongoDB

// Initialize Queues
createQueues();

app.use(express.json());
// Routes
app.use('/notify', notificationRoutes);
// Error handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));