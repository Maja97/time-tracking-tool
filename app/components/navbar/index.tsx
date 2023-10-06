'use client';

import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import Image from 'next/image';
import { MenuItem } from 'primereact/menuitem';
import classes from './index.module.scss';
import Button from '../shared/button';
import TimeIcon from '@public/icons/TimeIcon';
import LogoutIcon from '@public/icons/LogoutIcon';

function NavBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const getIconFill = (index: number) => (activeIndex === index ? '#F9F9FD' : '#C4C5D7');
  let menuItems: MenuItem[] = [];
  if (true)
    menuItems = [
      {
        label: 'Trackers',
        id: 'trackers',
        icon: <TimeIcon fill={getIconFill(0)} />
      },
      {
        label: 'History',
        id: 'history',
        icon: <TimeIcon fill={getIconFill(1)} />
      }
    ];

  return (
    <div className={classes.wrapper}>
      <div className={classes.flex}>
        <Image src="/logo.svg" alt="Company logo" width={160} height={44} />
        <h1 className={classes.title}>Tracking tool</h1>
      </div>
      <div className={classes.flex}>
        <TabMenu
          activeIndex={activeIndex}
          onTabChange={(e) => {
            setActiveIndex(e.index);
          }}
          model={menuItems}
        />
        <Button icon={<LogoutIcon />} variant="secondary" className={classes.lastButton}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
