import { ref } from 'vue';
import { auth } from '../firebase/config';

const error = ref(null);

const join = async (name, email, password) => {
  error.value = null;

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);

    if (!res.user) {
      throw new Error('Sign up is failed');
    }

    await res.user.updateProfile({
      displayName: name,
    });

    return res;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
};

const useJoin = () => {
  return { error, join };
};

export default useJoin;
