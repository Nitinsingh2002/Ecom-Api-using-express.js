// import fs from 'fs'


// //read or write data in file asynchronosuly without using callback so we used promise
// const fsPromise = fs.promises;


// async function log(logData) {
//     try {
//         //append log data with current time stamp
//         const currentDate = new Date().toString();
//         logData = `\n${currentDate} - ${logData}`;

//         await fsPromise.appendFile('log.txt', logData)
//     } catch (error) {
//         console.log(error)
//     }
// }


// const loggerMiddleware = async (req, res, next) => {
//     //dont log sign in and signup because it contain password
//     if (req.url.includes("signIn")) {
//         next();
//     }
//     //pass req.body to to log function that we created ahead    
//     // req.body in json so we convert itto  string using strinigfy
//     const logData = `${req.url} - ${JSON.stringify(req.body)}`
//     await log(logData)
//     next();
// }



// export default loggerMiddleware;





// *********************************** using winston library *********************************************
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports: [
        new winston.transports.File({ filename: 'log.txt' }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'error.log' }) // Log errors separately
    ]
});

const loggerMiddleware = (req, res, next) => {
    // Skip logging sensitive routes (e.g., signIn and signUp)
    if (req.url.includes('signIn') || req.url.includes('signUp')) {
        return next();
    }

    const logData = `${req.url} - ${JSON.stringify(req.body)}`
    logger.info(logData)
    next();

};


export default loggerMiddleware;

