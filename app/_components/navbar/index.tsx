'use client';

import cookieKeys from '@app/_consts/cookies';
import { Routes } from '@app/_consts/routes';
import strings from '@app/_consts/strings.json';
import { auth } from '@app/_firebase/firebase';
import HistoryIcon from '@public/icons/HistoryIcon';
import LogoutIcon from '@public/icons/LogoutIcon';
import TimeIcon from '@public/icons/TimeIcon';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useCookies } from 'next-client-cookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import Button from '../shared/button';
import styles from './index.module.scss';

function NavBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const getIconFill = (index: number) => (activeIndex === index ? '#F9F9FD' : '#C4C5D7');
  let menuItems: MenuItem[] = [];
  const toastRef = useRef<Toast>(null);
  const cookies = useCookies();
  const router = useRouter();

  menuItems = [
    {
      label: strings.navbar.trackers,
      id: 'trackers',
      icon: <TimeIcon fill={getIconFill(0)} />,
      url: Routes.Trackers
    },
    {
      label: strings.navbar.history,
      id: 'history',
      icon: <HistoryIcon fill={getIconFill(1)} />,
      url: Routes.History
    }
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (uid) setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.replace(Routes.Login);
        cookies.remove(cookieKeys.TOKEN);
      })
      .catch((error) => {
        toastRef?.current?.show({
          severity: 'error',
          summary: 'Failed to logout, try again',
          detail: error.code,
          life: 3000
        });
      });
  };

  return (
    <div className={`${styles.wrapper} ${!showMenu ? styles.wrapperPadding : ''}`}>
      <div className={styles.flex}>
        <Image src="/logo.svg" alt="Company logo" width={160} height={44} />
        <h1 className={styles.title}>{strings.navbar.title}</h1>
      </div>
      {showMenu ? (
        <div className={styles.flex}>
          <TabMenu
            activeIndex={activeIndex}
            onTabChange={(e) => {
              setActiveIndex(e.index);
            }}
            model={menuItems}
          />
          <Button
            icon={<LogoutIcon />}
            variant="secondary"
            onClick={logout}
            className={styles.lastButton}
            textStyle={styles.lastButtonText}>
            {strings.navbar.logout}
          </Button>
        </div>
      ) : null}
      <Toast ref={toastRef} position="bottom-center" />
    </div>
  );
}

export default NavBar;
