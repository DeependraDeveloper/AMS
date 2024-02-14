import cronJob from 'node-cron';
import Attendence from '../models/attendence.js';
import { isValid } from '../utils/common_func.js';

// Every day at 11:30 PM
export const autoClockOut = () => {
    try {
        console.log('Cron Job Started');
        cronJob.schedule('30 23 * * *', async () => {
            try {
                let findAllAttendences = await Attendence.find();

                for (let attendance of findAllAttendences) {
                    if (isValid(attendance?.inTime) && !isValid(attendance?.outTime)) {
                        let currentTime = new Date();
                        // let inTime = new Date(attendance?.inTime);
                        // let diff = currentTime - inTime;
                        // let duration = Math.floor(diff / 1000 / 60);
                        await Attendence.findByIdAndUpdate(attendance._id, { outTime: currentTime, });
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        });

    } catch (error) {
        console.log('Error in autoClockOut', error);
    }
};

