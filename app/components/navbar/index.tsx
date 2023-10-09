'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import Image from 'next/image';
import { MenuItem } from 'primereact/menuitem';
import styles from './index.module.scss';
import Button from '../shared/button';
import TimeIcon from '@public/icons/TimeIcon';
import LogoutIcon from '@public/icons/LogoutIcon';
import strings from '@app/consts/strings.json';
import HistoryIcon from '@public/icons/HistoryIcon';
import { useCookies } from 'next-client-cookies';
import cookieKeys from '@app/consts/cookies';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@app/firebase/firebase';
import { useRouter } from 'next/navigation';
import { Routes } from '@app/consts/routes';
import { Toast } from 'primereact/toast';

function NavBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const getIconFill = (index: number) => (activeIndex === index ? '#F9F9FD' : '#C4C5D7');
  let menuItems: MenuItem[] = [];
  const toastRef = useRef<Toast>(null);
  const cookies = useCookies();
  const router = useRouter();
  if (true)
    menuItems = [
      {
        label: strings.navbar.trackers,
        id: 'trackers',
        icon: <TimeIcon fill={getIconFill(0)} />
      },
      {
        label: strings.navbar.history,
        id: 'history',
        icon: <HistoryIcon fill={getIconFill(1)} />
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
