import mongoose from "mongoose";

const attendenceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'absent',
        enum: ['present', 'absent', 'leave', 'holiday', 'halfday']
    },
    inTime: {
        type: String,
        default: ''
    },
    outTime: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 0
    },
    isUpdated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});


const Attendence = mongoose.model('Attendence', attendenceSchema);

export default Attendence;