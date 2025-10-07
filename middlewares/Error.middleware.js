const error = (err, req, res, next) => {
  //~ deep copy
  let error = { ...err };
  error.message = err.message; // Ensure message is copied
  error.name = err.name;       // Ensure name is copied
  error.code = err.code;       // Ensure code is copied

  console.log("Error caught in middleware:", err); // Debugging

  //! global
  error.message = error.message || 'Internal Server error';
  error.statusCode = error.statusCode || 500;

  // ~ duplicate
  if (err.code === 11000) {
    let message = Object.keys(error.keyValue)[0];
    error.message = `${message} already exits`
    error.statusCode = 409
  }

  //~ CastError
  if (err.name === 'CastError') {
    error.message = `Invalid ${error.kind}, Please provide a valid ${error.path}`;
    error.statusCode = 400;
  }



  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    object: err,
    stack: err.stack,
  });
};

export default error;
