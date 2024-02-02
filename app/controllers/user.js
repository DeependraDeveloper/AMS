import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isEmail, isPhone, isValid, isValidRequestBody } from '../utils/common_func.js';
import Attendence from '../models/attendence.js';


// signup
export const signup = async (req, res) => {
    /*
       enum: ['admin', 'employee'], role - > radio button
       enum: ['IT', 'HR', 'Marketing', 'Sales', 'Finance', 'Operations', 'Design', 'Others'], -> dropdown and custom input
       enum: ['Manager', 'Team Lead', 'Developer', 'Designer', 'Tester', 'Others'], -> dropdown and custom input


    */
    try {
        let {
            name,
            email,
            password,
            phone,

            department,
            designation,
            organization,
        } = req.body;

        if (!isValidRequestBody(req.body)) throw new Error('Invalid values.Please try again!');
        if (!isValid(name)) throw new Error('Name is required');
        if (!isValid(email)) throw new Error('Email is required');
        if (!isEmail(email)) throw new Error('Invalid email.');
        if (!isValid(password)) throw new Error('Password is required');
        if (!isValid(phone)) throw new Error('Phone is required');
        if (!isPhone(phone)) throw new Error('Invalid phone number.');
        if (!isValid(department)) throw new Error('Department is required');
        if (!isValid(designation)) throw new Error('Designation is required');
        if (!isValid(organization)) throw new Error('Organization is required');


        // CHECK PHONE AND EMAIL IS ALREADY REGISTERED OR NOT

        let isPhoneRegistered = await User.findOne({ phone: phone });
        if (isPhoneRegistered) throw new Error('Phone is already registered');


        let isEmailRegistered = await User.findOne({ email: email });
        if (isEmailRegistered) throw new Error('Email is already registered');

        let hassedPassword = await bcrypt.hash(password, 10);

        req.body.password = hassedPassword;

        const newUser = new User(req.body);


        let user = await User.create(newUser);

        let token = jwt.sign({ id: user._id, role: user.role }, 'SECRET101', { expiresIn: '50d' });
        // COPY USER OBJECT AND ADD TOKEN TO IT
        let copyOfUser = user.toObject();
        copyOfUser.token = token;

        return res.status(200).json(copyOfUser);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


// singnin
export const signin = async (req, res) => {
    try {
        let { phone, password } = req.body;

        if (!isValidRequestBody(req.body)) throw new Error('Invalid values.Please try again!');

        if (!isValid(phone)) throw new Error('Phone is required.');
        if (!isPhone(phone)) throw new Error('Invalid phone number.');
        if (!isValid(password)) throw new Error('Password is required.');


        let user = await User.findOne({ phone: phone });
        if (!user) throw new Error('User not found');

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        // lets create jwt token for the user
        let token = jwt.sign({ id: user._id, role: user.role }, 'SECRET101', { expiresIn: '50d' });

        let copyOfUser = user.toObject();
        copyOfUser.token = token;

        return res.status(200).json(copyOfUser);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

};


// reset password
export const resetPassword = async (req, res) => {
    try {
        let { phone, password, confirmPassword } = req.body;

        if (!isValidRequestBody(req.body)) throw new Error('Invalid values.Please try again!');

        if (!isValid(phone)) throw new Error('Phone is required.');
        if (!isPhone(phone)) throw new Error('Invalid phone number.');
        if (!isValid(password)) throw new Error('Password is required.');
        if (!isValid(confirmPassword)) throw new Error('Confirm Password is required.');

        if (password !== confirmPassword) throw new Error('Password and Confirm Password must be same.');

        let hassedPassword = await bcrypt.hash(password, 10);

        let user = await User.findOneAndUpdate({ phone: phone }, { password: hassedPassword }, { new: true });
        if (!user) throw new Error('User not found');

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


// clock in and out
export const clockInOut = async (req, res) => {
    try {
        let { id, time } = req.body;

        if (!isValidRequestBody(req.body)) throw new Error('Invalid values.Please try again!');

        let user = await User.findOne({ _id: id });
        if (!user) throw new Error('User not found');

        // findTodayAttendence
        let startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        let todayAttendence = await Attendence.findOne({ user: id, createdAt: { $gte: startOfDay, $lt: endOfDay } });

        if (todayAttendence) {
            let clockOut = await Attendence.findOneAndUpdate({ user: id, createdAt: { $gte: startOfDay, $lt: endOfDay } }, { outTime: time }, { new: true });
            return res.status(200).json({ message: 'Clocked out successfully' });
        }

        let clockIn = await Attendence.create({ user: id, inTime: time, status: 'present' });

        return res.status(200).json({ message: 'Clocked in successfully' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


// Get all attendence of user
export const getAllAttendence = async (req, res) => {
    try {
        const id = req.params.id;
        // findTodayAttendence
        let startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        let todayAttendence = await Attendence.findOne({ user: id, createdAt: { $gte: startOfDay, $lt: endOfDay } });

        if (!todayAttendence) throw new Error('Attendence not found')
        return res.status(200).json(todayAttendence);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};




