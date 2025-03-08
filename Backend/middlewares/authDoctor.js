import jwt from 'jsonwebtoken';

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    // Verify the token
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    // Decode the token for debugging purposes
    const token_decoded = jwt.decode(dtoken);
    console.log('Decoded Token:', token_decoded);

    // Attach the decoded doctor ID to the request object
    req.body.docId = token_decode.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
    }

    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export default authDoctor;