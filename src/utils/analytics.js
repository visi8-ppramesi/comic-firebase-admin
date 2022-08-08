import fb from '../firebase/firebase.js'
import { logEvent as fbLogEvent, setUserProperties as fbSetUserProperties } from 'firebase/analytics'

// export default function(logName, logParam = null){
//     if(logParam){
//         logEvent(fb.analytics, logName, logParam)
//     }else{
//         logEvent(fb.analytics, logName)
//     }
// }

export default {
    logEvent: function(logName, logParam = null){
        if(logParam){
            fbLogEvent(fb.analytics, logName, logParam)
        }else{
            fbLogEvent(fb.analytics, logName)
        }
    },
    setUserProperties: function(prop){
        fbSetUserProperties(fb.analytics, prop)
    }
}