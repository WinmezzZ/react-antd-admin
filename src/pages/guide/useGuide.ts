import 'driver.js/dist/driver.css';
import './index.less';

import { driver } from 'driver.js';
import { useRef } from 'react';

import { useLocale } from '@/locales';
import { useAppDispatch } from '@/stores/hooks';
import { setUserItem } from '@/stores/user.store';

export const useGuide = () => {
  const { formatMessage } = useLocale();
  const dispatch = useAppDispatch();

  const driverInstance = useRef(
    driver({
      allowKeyboardControl: false,
      allowClose: false,
      prevBtnText: formatMessage({ id: 'app.guide.driverjs.prevBtnText' }),
      nextBtnText: formatMessage({ id: 'app.guide.driverjs.nextBtnText' }),
      doneBtnText: formatMessage({ id: 'app.guide.driverjs.doneBtnText' }),
    }),
  );

  const driverStart = () => {
    setTimeout(() => {
      driverInstance.current.setSteps([
        {
          element: '#sidebar-trigger',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.sidebarTrigger.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.sidebarTrigger.description' }),
            side: 'bottom',
          },
        },
        {
          element: '#notice-center',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.notices.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.notices.description' }),
            side: 'bottom',
          },
        },
        {
          element: '#language-change',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.switchLanguages.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.switchLanguages.description' }),
            side: 'bottom',
          },
        },
        {
          element: '#pageTabs .ant-tabs-nav.ant-tabs-nav-animated',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.pageTabs.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.pageTabs.description' }),
            side: 'bottom',
          },
        },
        {
          element: '#pageTabs-actions svg',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.pageTabsActions.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.pageTabsActions.description' }),
            side: 'left',
          },
        },
        {
          element: '#switchTheme span',
          popover: {
            title: formatMessage({ id: 'app.guide.driverStep.switchTheme.title' }),
            description: formatMessage({ id: 'app.guide.driverStep.switchTheme.description' }),
            side: 'left',
          },
        },
      ]);

      localStorage.setItem('newUser', 'false');
      dispatch(
        setUserItem({
          newUser: false,
        }),
      );
      driverInstance.current.drive();
      console.log('guide started');
    }, 1000);
  };

  return {
    driverStart,
  };
};

export default useGuide;
