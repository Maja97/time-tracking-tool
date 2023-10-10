import cookieKeys from '@app/_consts/cookies';
import { Routes } from '@app/_consts/routes';
import { auth } from '@app/_firebase/firebase';
import { FormInputs } from '@app/login/page';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

const useLogin = (toastRef: RefObject<Toast>) => {
  const router = useRouter();
  const cookies = useCookies();
  const login = (data: FormInputs) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        cookies.set(cookieKeys.TOKEN, userCredential.user.uid);

        router.push(Routes.Home);
      })
      .catch((error) => {
        if (toastRef && toastRef.current)
          toastRef.current.show({
            severity: 'error',
            summary: 'Failed to login',
            detail: error.code,
            life: 3000
          });
      });
  };

  return { login };
};

export default useLogin;
