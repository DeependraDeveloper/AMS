import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isEmail, isPhone, isValid, isValidRequestBody } from '../utils/common_func.js';


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
            role,
            email,
            password,
            phone,
            address,
            department,
            designation,
            organization,
        } = req.body;

        if (!isValidRequestBody(req.body)) throw new Error('Invalid values.Please try again!');
        if (!isValid(name)) throw new Error('Name is required');
        if (!isValid(role)) throw new Error('Role is required');
        if (!isValid(email)) throw new Error('Email is required');
        if (!isEmail(email)) throw new Error('Invalid email.');
        if (!isValid(password)) throw new Error('Password is required');
        if (!isValid(phone)) throw new Error('Phone is required');
        if (!isPhone(phone)) throw new Error('Invalid phone number.');
        if (!isValid(address)) throw new Error('Address is required');
        if (!isValid(department)) throw new Error('Department is required');
        if (!isValid(designation)) throw new Error('Designation is required');
        if (!isValid(organization)) throw new Error('Organization is required');

        let hassedPassword = await bcrypt.hash(password, 10);

        req.body.password = hassedPassword;

        const newUser = new User(req.body);


        let user = await User.create(newUser);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ err: err.message });
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
        return res.status(400).json({ err: err.message });
    }

};