/* eslint-disable */
import firebase from '../firebase.js'
import { ref, uploadBytes } from "firebase/storage";
import { updateDoc, collection, setDoc, addDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

export class Subdoc{}

export class LongText{}

export class ProfilePicture{
  //eslint-disable-next-line no-unused-vars
  async uploadField(fieldName, path, file){
      const pathArray = path.split('/')
      pathArray.push(file.name)
      pathArray.unshift('uploads')
      const fileRef = ref(firebase.storage, pathArray.join('/'))
      try{
          const { ref } = await uploadBytes(fileRef, file, { cacheControl: 'public,max-age=86400' })
          return await setDoc(this.doc.ref, {
              [fieldName]: firebase.buildGsPath(ref.fullPath)
          }, {merge: true})
      }catch(err){
          console.error(err)
          throw err
      }
  }
}

export class StorageLink{
  async adminUploadField(fieldName, path, file){
    console.log(this.doc)
    const tempPathArray = []
    tempPathArray.push(file.name)
    tempPathArray.unshift('temporary_files')

    const pathArray = path.split('/')
    pathArray.push(file.name)
    const fileRef = ref(firebase.storage, tempPathArray.join('/'))
    try{
        const { ref } = await uploadBytes(fileRef, file, { cacheControl: 'public,max-age=86400' })

        const tempDocRef = collection(firebase.db, 'temporary_files')
        const tempDoc = await addDoc(tempDocRef, {
          temporary_path: tempPathArray.join('/'),
          move_path: pathArray.join('/')
        })
        const moverFunction = httpsCallable(firebase.functions, 'moveTemporaryFile-moveTemporaryFile')
        const { path } = await moverFunction({
          temporaryId: tempDoc.id
        })
        return await setDoc(this.doc.ref, {
            [fieldName]: firebase.buildGsPath(path.split('/'))
        }, {merge: true})
    }catch(err){
        console.error(err)
        throw err
    }
  }
}

export class InstanceData{
    constructor(fields){
        this.fields = fields
    }

    get keys(){
        return Object.keys(this.fields)
    }
}

export default {Subdoc, LongText, ProfilePicture, StorageLink, InstanceData}
