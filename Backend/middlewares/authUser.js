import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging: Check if JWT_SECRET is loaded

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        // Debugging: Log the token
        console.log('Token:', token);

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Debugging: Log the decoded token
        console.log('Decoded Token:', token_decode);

        // Attach the user ID to the request object
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log('JWT Error:', error); // Debugging: Log the error
        res.json({ success: false, message: error.message });
    }
};

export default authUser;