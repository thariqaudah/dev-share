import { db } from '../firebase/config';
import { ref } from 'vue';

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

  let documentRef = db.collection(collection).doc(id);

  const getDoc = async () => {
    error.value = null;

    try {
      const res = await documentRef.get();
      if (!res.exists) {
        throw new Error('That document does not exist');
      }
      document.value = {
        id: res.id,
        ...res.data(),
      };
      return res;
    } catch (err) {
      console.log(err);
      error.value = 'Error fetching document';
    }
  };

  return { error, document, getDoc };
};

export default getDocument;
