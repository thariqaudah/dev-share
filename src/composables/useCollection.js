import { db } from '../firebase/config';
import { ref } from 'vue';

const useCollection = (collection) => {
  const error = ref(null);

  let collectionRef = db.collection(collection);

  const addDoc = async (doc) => {
    error.value = null;
    
    try {
      const res = await collectionRef.add(doc);
      return res;
    } catch (err) {
      console.log(err);
      error.value = 'Error adding document';
    }
  }

  return { error, addDoc }
}

export default useCollection;