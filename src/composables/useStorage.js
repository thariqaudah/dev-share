import { storage } from '../firebase/config';
import { ref } from 'vue';
import getUser from './getUser';

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const filePath = ref(null);
  const publicUrl = ref(null);

  const uploadImage = async (file) => {
    error.value = null;
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = storage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      publicUrl.value = await res.ref.getDownloadURL();
      console.log('image is stored');
    } catch (err) {
      console.log(err);
      error.value = err;
    }
  }

  return { error, filePath, publicUrl, uploadImage }
}

export default useStorage;