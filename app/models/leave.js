import mongoose, { Mongoose } from "mongoose";

const leaveSchema = mongoose.Schema({
    leaveType: {
        type: String,
        required: true,
        enum: ['Casual Leave', 'Sick Leave', 'Privilege Leave', 'Maternity Leave', 'Paternity Leave', 'Compensatory Leave', 'Others'],
        trim: true,
    },
    leaveReason: {
        type: String,
        required: true,
        trim: true,
    },
    leaveFrom: {
        type: Date,
        required: true,
        trim: true,
    },
    leaveTo: {
        type: Date,
        required: true,
        trim: true,
    },
    leaveStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        trim: true,
    },
    leaveAppliedOn: {
        type: Date,
        required: true,
        trim: true,
    },
    leaveAppliedBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
        trim: true,
    },
    leaveApprovedBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: false,
        trim: true,
    },
    leaveApprovedOn: {
        type: Date,
        required: false,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;