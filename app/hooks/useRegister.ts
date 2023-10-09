import cookieKeys from '@app/consts/cookies';
import { Routes } from '@app/consts/routes';
import { auth } from '@app/firebase/firebase';
import { FormInputs } from '@app/register/page';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { RefObject } from 'react';

const useRegister = (toastRef: RefObject<Toast>) => {
  const router = useRouter();
  const cookies = useCookies();
  const register = (data: FormInputs) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((authUser) => {
        cookies.set(cookieKeys.TOKEN, authUser.user.uid);

        router.push(Routes.Home);
      })
      .catch((error) => {
        if (toastRef && toastRef.current)
          toastRef.current.show({
            severity: 'error',
            summary: 'Failed to register user',
            detail: error.code,
            life: 3000
          });
      });
  };

  return { register };
};

export default useRegister;
