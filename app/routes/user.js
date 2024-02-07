
import express from 'express';

import { signin, signup ,resetPassword,clockInOut,getTodayAttendence,addLeaveRequest,getAllLeaveRequests,addUser,getAllAttendence,getAllUsers} from '../controllers/user.js';

const UserRouter = express.Router();

UserRouter.post('/signup', signup);
UserRouter.post('/signin', signin);
UserRouter.post('/reset-password', resetPassword);

UserRouter.post('/clock-in-out', clockInOut);
UserRouter.get('/attendence/:id', getTodayAttendence);
UserRouter.post('/leave-request', addLeaveRequest);
UserRouter.get('/leave-request/:id', getAllLeaveRequests);
UserRouter.post('/add-employee', addUser);

UserRouter.get('/attendences/:id', getAllAttendence);

UserRouter.get('/users/:organization', getAllUsers);



export default UserRouter;

