import mongoose from "mongoose";

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
        type: String,
        required: true,
        trim: true,
    },
    leaveTo: {
        type: String,
        required: true,
        trim: true,
    },
    leaveStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        trim: true,
        default : 'Pending'
    },
    leaveAppliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
    },
    leaveApprovedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
       
    },
    leaveApprovedOn: {
        type: String,
        required: false,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;