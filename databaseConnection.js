const mongoose = require('mongoose');

const DEFAULT_LOCAL_DATABASE_URL = 'mongodb://127.0.0.1:27017/library-mangement-system';

async function connectToDatabase() {
    const candidateUrls = [];

    if (process.env.MONGO_URI) {
        candidateUrls.push(process.env.MONGO_URI);
    }

    candidateUrls.push(DEFAULT_LOCAL_DATABASE_URL);

    const connectionErrors = [];

    for (const databaseUrl of candidateUrls) {
        try {
            await mongoose.connect(databaseUrl, {
                serverSelectionTimeoutMS: 5000,
                retryWrites: true,
                w: 'majority'
            });

            console.log('Connected to MongoDB successfully');
            return;
        } catch (error) {
            connectionErrors.push({ databaseUrl, message: error.message });
        }
    }

    const detailedMessage = connectionErrors
        .map(({ databaseUrl, message }) => `- ${databaseUrl}: ${message}`)
        .join('\n');

    throw new Error(`Failed to connect to MongoDB.\n${detailedMessage}\nCheck your Atlas whitelist or make sure MongoDB is running locally.`);
}

module.exports = connectToDatabase;