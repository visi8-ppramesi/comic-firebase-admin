import emitter from './emitter.js'
import app from '../main.js'

export default function(err, type){
    switch(type){
        case 'loginError':
            console.log(app)
            emitter.emit('loginError')
            break;
        case 'registerError':
            emitter.emit('registerError')
            break;
        case 'uploadFileError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        case 'getDocumentError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        case 'updateDocumentError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        case 'deleteDocumentError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        case 'getDocumentsError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        case 'generateDocumentsError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        case 'favoriteError':
            app._instance.proxy.$toast.open({
                message: "Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        case 'deleteCommentError':
            app._instance.proxy.$toast.open({
                message: "Can't delete comment! Something went wrong!",
                type: "error",
                duration: 5000,
                dismissible: true,
                position: 'bottom'
            })
            break;
        default:
            break;
    }
    return err
}
