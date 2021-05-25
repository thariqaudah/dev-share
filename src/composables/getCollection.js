import { db } from '../firebase/config';
import { ref } from 'vue';

const getCollection = (collection, query) => {
  const error = ref(null);
  const documents = ref([]);

  let collectionRef = db.collection(collection);

  if (query) {
    collectionRef = collectionRef.where(...query);
  }

  const getDocs = async () => {
    error.value = null;

    try {
      const res = await collectionRef.get();
      res.docs.forEach((doc) => {
        documents.value.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return res;
    } catch (err) {
      console.log(err);
      error.value = 'Error fetching documents';
    }
  };

  return { error, documents, getDocs };
};

export default getCollection;
