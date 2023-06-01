import React, { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem, Text } from '@mantine/core';
import {
  IconHome2,
  IconSteeringWheel,
  IconCalendarStats,
  IconUser,
  IconCar,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';

import { useLocation, NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../../../utils/context";
import { logoutUser } from "../../../utils/api"



const useStyles = createStyles((theme) => ({

  main: {
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    // background:
    //   theme.colorScheme === "dark"
    //     ? theme.colors.dark[8]
    //     : theme.colors.orange[8],
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    // color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.orange[8],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.colors.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/', label: 'Главная стриница', icon: IconHome2 },
  { link: '/record', label: 'Запись на шиномонтаж', icon: IconCalendarStats },
  { link: '/about', label: 'О нас', icon: IconSteeringWheel },
  { link: '/products', label: 'Товары для авто', icon: IconCar },
  { link: '/profile', label: 'Личный кабинет', icon: IconUser }
];

export function NavbarSimple({ opened, setOpened }) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const [user, setUser] = React.useContext(UserContext);

  const handleLogout = () => {
    logoutUser().then(() => {
      setUser({ id: "" });
      setOpened((o) => !o);
    });
  };

  const links = data.map((item) => (
    <NavLink
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      to={item.link}
      key={item.label}
      onClick={(event) => {       
        setActive(item.label);
        setOpened((o) => !o);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar
    p="md"
    hiddenBreakpoint="sm"
    hidden={!opened}
    width={{ sm: 200, lg: 300 }}
    className={classes.main}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text>Телефон</Text>
          <Code sx={{ fontWeight: 700 }}>+7(911) 000-00-00</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <NavLink to={"/signin"}
         className={classes.link}
         onClick={() => {       
          setOpened((o) => !o);
        }}
          >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Войти</span>
        </NavLink>

        <NavLink to="/signin"
         className={classes.link}
          onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Выйти</span>
        </NavLink>
      </Navbar.Section>
    </Navbar>
  );
}