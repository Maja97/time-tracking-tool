import strings from '@app/_consts/strings.json';
import styles from '@app/_styles/404.module.scss';
import Link from 'next/link';
import Button from './_components/shared/button';
import { Routes } from './_consts/routes';

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
