import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

let server: Server;

// eslint-disable-next-line no-unused-vars
process.on('uncaughtException', err => {
  console.log(
    'uncaught exception is detected we are shutting down our server',
    err,
  );

  process.exit(1); // Exit with a 'failure' code
});

async function connectDatabase() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connection established');
  } catch (error) {
    errorLogger.error('Failed to connect to database', error);
    throw error; // Rethrow to be caught in bootstrap
  }
}

function startServer() {
  server = app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
}

async function bootstrap() {
  try {
    await connectDatabase();
    startServer();
  } catch (error) {
    errorLogger.error('Server initialization failed', error);
    process.exit(1);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gracefulShutdown(error?: any) {
  if (error) errorLogger.error('Unhandled Rejection or Error', error);

  logger.info('Shutting down server...');
  server.close(async () => {
    logger.info('Server closed');
    // Additional cleanup if needed
    await mongoose.disconnect();
    process.exit(error ? 1 : 0);
  });

  setTimeout(() => {
    logger.warn('Forcibly shutting down');
    process.exit(1);
  }, 10000);
}

// Signal Handling for graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('unhandledRejection', gracefulShutdown);

bootstrap();
