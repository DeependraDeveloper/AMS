import cronJob from 'cron';
import List from '../models/list.js';
   
// Every 2 hours
const cron = cronJob.job('0 */2 * * *', async () => {
    try{

        let getRecentList = await List.find({});
        // [ role ,department,designation ]

        let recentList = getRecentList.list; // 3

        for(let i=0;i<recentList.length;i++){
            let list = recentList[i];
            let { role ,department,designation } = list;
            
           
        }






    }catch(err){
        console.log(err.message);
    }
});