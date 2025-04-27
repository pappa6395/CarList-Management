import { ZodError } from 'zod';

export function errorMiddleware(err, req, res, next) {

  console.error('Error caught:', err);

  if (err instanceof ZodError) {
    // Handle Zod validation errors
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Database validation failed',
      errors: err.errors,
    });
  }

  // Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // Other unhandled errors
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
}
