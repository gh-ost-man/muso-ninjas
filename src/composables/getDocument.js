import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {

    const document = ref(null);
    const error = ref(null);

    // register the firestort collection reference
    let documentRef = projectFirestore.collection(collection).doc(id)

    //realtime
    const unsub = documentRef.onSnapshot(doc => {

        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id }

            error.value = null
        } else {
            error.value = "that document does not exist"
        }
    }, (err) => {
        console.log(err.message);
        error.value = 'could not fetch the document'
    })


    watchEffect((onInvalidate) => {

        //unsub from prev collection when wathcer is stopped (component unmounted)
        onInvalidate(() => unsub())
    })

    return { document, error }
}

export default getDocument
