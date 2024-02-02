
import express from 'express';

import { signin, signup ,resetPassword,clockInOut,getAllAttendence} from '../controllers/user.js';

const RegistrationRouter = express.Router();

RegistrationRouter.post('/signup', signup);
RegistrationRouter.post('/signin', signin);
RegistrationRouter.post('/reset-password', resetPassword);

RegistrationRouter.post('/clock-in-out', clockInOut);
RegistrationRouter.get('/attendence/:id', getAllAttendence);



export default RegistrationRouter;

