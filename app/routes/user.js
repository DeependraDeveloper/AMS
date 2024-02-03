
import express from 'express';

import { signin, signup ,resetPassword,clockInOut,getAllAttendence,addLeaveRequest,getAllLeaveRequests} from '../controllers/user.js';

const UserRouter = express.Router();

UserRouter.post('/signup', signup);
UserRouter.post('/signin', signin);
UserRouter.post('/reset-password', resetPassword);

UserRouter.post('/clock-in-out', clockInOut);
UserRouter.get('/attendence/:id', getAllAttendence);
UserRouter.post('/leave-request', addLeaveRequest);
UserRouter.get('/leave-request/:id', getAllLeaveRequests);



export default UserRouter;

