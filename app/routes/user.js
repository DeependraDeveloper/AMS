
import express from 'express';

import { signin, signup ,resetPassword,clockInOut,getTodayAttendence,addLeaveRequest,getAllLeaveRequests,addUser,getAllAttendence,getAllUsers,updateUser,getUser,approveRejectLeave,attendenceCsv} from '../controllers/user.js';

const UserRouter = express.Router();

UserRouter.post('/signup', signup);
UserRouter.post('/signin', signin);
UserRouter.post('/reset-password', resetPassword);
UserRouter.post('/update-user', updateUser);

UserRouter.post('/clock-in-out', clockInOut);
UserRouter.get('/attendence/:id', getTodayAttendence);
UserRouter.post('/leave-request', addLeaveRequest);
UserRouter.get('/leave-request/:id', getAllLeaveRequests);
UserRouter.post('/add-employee', addUser);

UserRouter.get('/attendences/:id', getAllAttendence);

UserRouter.get('/users/:organization', getAllUsers);
UserRouter.get('/:id', getUser);
UserRouter.post('/approve-reject-leave', approveRejectLeave);

UserRouter.get('/attendence-csv/:id', attendenceCsv);



export default UserRouter;

