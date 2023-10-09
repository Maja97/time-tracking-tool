'use client';
import Button from '@app/components/shared/button';
import { Routes } from '@app/consts/routes';
import { validateEmail } from '@app/helpers/validation';
import useRegister from '@app/hooks/useRegister';
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ControlledInput from '../components/shared/controlledInput';
import strings from '../consts/strings.json';
import styles from './page.module.scss';

export interface FormInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

function Register() {
  const formMethods = useForm<FormInputs>();
  const toastRef = useRef<Toast>(null);
  const { register } = useRegister(toastRef);

  const validatePassword = (val: string) => {
    if (formMethods.watch('password') != val) {
      return strings.register.passwordsMismatch;
    } else if (val.length < 6) return strings.register.passwordTooShort;
  };

  const onSubmit = (data: FormInputs) => {
    register(data);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.title}>Register</h1>
        <FormProvider {...formMethods}>
          <ControlledInput
            type="email"
            className={styles.input}
            label={strings.register.labels.email}
            name="email"
            required
            validate={validateEmail}
          />
          <ControlledInput
            className={styles.input}
            label={strings.register.labels.password}
            name="password"
            type="password"
            validate={validatePassword}
            required
          />
          <ControlledInput
            type="password"
            className={styles.input}
            label={strings.register.labels.repeatPassword}
            name="repeatPassword"
            validate={validatePassword}
            required
          />
          <Button onClick={formMethods.handleSubmit(onSubmit)} className={styles.submitButton}>
            {strings.register.title}
          </Button>
        </FormProvider>
        <p className={styles.linkWrapper}>
          {strings.register.existingAccount}&nbsp;
          <Link className={styles.link} href={Routes.Login}>
            {strings.register.login}
          </Link>
        </p>
      </form>
      <Toast ref={toastRef} position="bottom-center" />
    </div>
  );
}

export default Register;
