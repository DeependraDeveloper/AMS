
import express from 'express';

import { signin, signup } from '../controllers/user.js';

const RegistrationRouter = express.Router();

RegistrationRouter.post('/signup', signup);
RegistrationRouter.post('/signin', signin);

export default RegistrationRouter;

