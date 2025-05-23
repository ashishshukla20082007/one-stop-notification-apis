const Queue = require('bull');

// Redis connection configuration
const redisConfig = {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD || 'Admin@123',
    tls: undefined,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
};

// Queue options
const queueOptions = {
    redis: redisConfig,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        },
        removeOnComplete: true,
        removeOnFail: false
    }
};

// Initialize queues
const emailQueue = new Queue('emailQueue', queueOptions);
const smsQueue = new Queue('smsQueue', queueOptions);

emailQueue.on('ready', () => {
    console.log('Redis connection established successfully');
}).on('error', (error) => {
    console.error('Redis connection error:', error);
});

// Error handling
emailQueue.on('error', (error) => {
    console.error('Email queue error:', error);
});

smsQueue.on('error', (error) => {
    console.error('SMS queue error:', error);
});

// Queue events for monitoring
emailQueue.on('completed', (job) => {
    console.log(`Email job ${job.id} completed`);
});

smsQueue.on('completed', (job) => {
    console.log(`SMS job ${job.id} completed`);
});

module.exports = { 
    emailQueue, 
    smsQueue,
    redisConfig 
};