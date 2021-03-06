import { db } from '../firebase/config';
import { ref } from 'vue';

const useDocument = (collection, id) => {
  const error = ref(null);

  let documentRef = db.collection(collection).doc(id);

  const updateDoc = async (doc) => {
    error.value = null;

    try {
      const res = await documentRef.update(doc);
      return res;
    } catch (err) {
      console.log(err);
      error.value = 'Error update document';
    }
  };

  const deleteDoc = async () => {
    error.value = null;

    try {
      await documentRef.delete();
    } catch (err) {
      console.log(err);
      error.value = 'Error remove document';
    }
  };

  return { error, updateDoc, deleteDoc };
};

export default useDocument;
