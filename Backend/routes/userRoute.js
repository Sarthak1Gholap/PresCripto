import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay, getUserById,getMedicalHistory,getPatientProfile} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment',authUser, bookAppointment)
userRouter.get('/appointments',authUser, listAppointment)
userRouter.post('/cancel-appointment',authUser, cancelAppointment)
userRouter.post('/payment-razorpay',authUser, paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser, verifyRazorpay)
userRouter.get('/patient-profile/:userId', authUser, getUserById);
userRouter.get('/medical-history/:userId', authUser, getMedicalHistory); 
// Add this route to userRouter.js
userRouter.get('/patient-profile/:userId', authUser, getPatientProfile);// Add this route
export default userRouter