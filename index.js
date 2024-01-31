import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';

import RegistrationRouter from './app/routes/registration.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use((req, res, next) => {
    console.log(chalk.yellow(`\nREQUEST 🚀 [Method : ${req.method}] [Date: ${new Date().toLocaleDateString()}] [Time: ${new Date().toLocaleTimeString()}] [URL: ${req.url}]  [IP: ${req.ip}] [Body: ${JSON.stringify(req.body)}] [Host: ${JSON.stringify(req.headers.host)}] [Location: ${JSON.stringify(req.headers.location)}] [Authorization: ${JSON.stringify(req.headers.authorization)}]`));

    req.on('error', (err) => {
        console.log(chalk.red(`\n 🙈 error in ${err.stack}`));
    });

    req.on('data', (chunk) => {
        console.log(chalk.magenta(`\n 🪂 BODY: ${chunk}`))
    });

    res.on('finish', () => {
        console.log(chalk.blue(`\nRESPONSE 🌈 [Date: ${new Date().toLocaleDateString()}] [Time: ${new Date().toLocaleTimeString()}] [status: ${JSON.stringify(res.statusCode)}] [statusMessage: ${JSON.stringify(res.statusMessage)}] `));
    });

    req.on('end', () => {
        console.log(chalk.cyan(`\n 🥂 No more data in response.`));
    });
    next();
});

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Welcome to AMS API' });
});

//! write your routes here
app.use('/api/v1/registration', RegistrationRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found 🕵🏽‍♂️\n' });
    next();
});

mongoose.connect('mongodb+srv://Deependra1999:Z1ZWVlMvcAFQsu2u@cluster0.4nkid.mongodb.net/ams')
    .then(() => app.listen(5000, () => console.log('DB CONNECTED 📘 \nSERVER RUNNING ON PORT 5000 🔥')))
    .catch((error) => console.log(error.message));
