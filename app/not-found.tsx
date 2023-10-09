import strings from '@app/consts/strings.json';
import styles from '@app/styles/404.module.scss';
import Link from 'next/link';
import Button from './components/shared/button';
import { Routes } from './consts/routes';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h1 className={styles.title}>{strings.notFound.title}</h1>
        <p className={styles.message}>{strings.notFound.message}</p>
      </div>
      <Button className={styles.button} variant="secondary">
        <Link href={Routes.Home}>{strings.notFound.link}</Link>
      </Button>
    </div>
  );
}
