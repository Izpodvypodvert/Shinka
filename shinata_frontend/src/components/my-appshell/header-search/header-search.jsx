import React from "react";
import {
  createStyles,
  Header,
  Autocomplete,
  Burger,
  rem,
  Center,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconSun, IconMoonStars } from "@tabler/icons-react";
import {
  ThemeIcon,
  MediaQuery,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import logo from "../../../images/logo.svg";

import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    }`,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.red[9],
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  //   search: {
  //     [theme.fn.smallerThan("xs")]: {
  //       display: "none",
  //     },
  //   },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export function HeaderSearch({ opened, setOpened }) {
  const [openedBurger, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const [searchValue, setSearchValue] = React.useState("");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue == "") {
      return
    } else if (searchValue.toLowerCase().match("запись")) {
      navigate("/record");
      setSearchValue("");
    } else {
      navigate(`/search-results/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Center inline>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              mr="xl"
            />
          </MediaQuery>
          <ThemeIcon color="white" size={45}>
            <img src={logo} alt="Логотип." width={45} height={45} />
          </ThemeIcon>
        </Center>
        <Space w="xs" />
        <Center inline>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
          <Space w="xs" />
          <Autocomplete
            value={searchValue}
            onChange={setSearchValue}
            className={classes.search}
            placeholder="Поиск по сайту"
            data={["Запись на шиномонтаж", "Хранение шин", "Масло моторное"]}
          />
          <Space w="xs" />
          <ActionIcon
            variant="outline"
            onClick={handleSearch}
            title="Toggle color scheme"
          >
            <IconSearch size="1rem" stroke={1.5} />
          </ActionIcon>
        </Center>
      </div>
    </Header>
  );
}
