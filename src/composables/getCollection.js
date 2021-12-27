import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query) => {

    const documents = ref(null);
    const error = ref(null);


    // register the firestort collection reference
    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')


    if(query) {
        collectionRef = collectionRef.where(...query);
    }

    const unsub = collectionRef.onSnapshot((snap) => {

        console.log('snapshoot');
        let results = []
        snap.docs.forEach(doc => {
            //must wait for the server to craete the timestamp & send it back
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        });

        // update values
        documents.value = results

        error.value = null
    }, (err) => {
        console.log(err.message);
        documents.value = null
        error.value = 'could not fetch data'
    })


    watchEffect((onInvalidate) => {

        //unsub from prev collection when wathcer is stopped (component unmounted)
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection
