
import express from 'express';

import { signin, signup ,resetPassword} from '../controllers/user.js';

const RegistrationRouter = express.Router();

RegistrationRouter.post('/signup', signup);
RegistrationRouter.post('/signin', signin);
RegistrationRouter.post('/reset-password', resetPassword);

export default RegistrationRouter;

