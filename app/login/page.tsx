'use client';
import Button from '@app/_components/shared/button';
import { Routes } from '@app/_consts/routes';
import { validateEmail } from '@app/_helpers/validation';
import useLogin from '@app/_hooks/useLogin';
import Image from 'next/image';
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ControlledInput from '../_components/shared/controlledInput';
import strings from '../_consts/strings.json';
import styles from './page.module.scss';

export interface FormInputs {
  email: string;
  password: string;
}

function Login() {
  const formMethods = useForm<FormInputs>();
  const toastRef = useRef<Toast>(null);
  const { login } = useLogin(toastRef);

  const validatePassword = (val: string) => {
    if (val.length < 6) return strings.login.passwordTooShort;
  };

  const onSubmit = (data: FormInputs) => {
    login(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className={styles.title}>Login</h1>
          <FormProvider {...formMethods}>
            <ControlledInput
              type="email"
              className={styles.input}
              label={strings.login.labels.email}
              name="email"
              required
              validate={validateEmail}
            />
            <ControlledInput
              className={styles.input}
              label={strings.login.labels.password}
              name="password"
              type="password"
              validate={validatePassword}
              required
            />
            <Button onClick={formMethods.handleSubmit(onSubmit)} className={styles.submitButton}>
              {strings.login.title}
            </Button>
          </FormProvider>
        </form>
        <section className={styles.bottomSection}>
          <Image src="/user.svg" alt={strings.login.userImageAlt} width={95} height={95} />
          <div className={styles.bottomTextWrapper}>
            <p className={styles.bottomText}>{strings.login.newUser}</p>
            <Link className={styles.bottomTextLink} href={Routes.Register}>
              {strings.login.register}
            </Link>
          </div>
        </section>
      </div>
      <Toast ref={toastRef} position="bottom-center" />
    </div>
  );
}

export default Login;
