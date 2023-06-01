import { useState } from "react";
import {
  AppShell,
  Footer,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";

import { NavbarSimple } from "./navbar-simple/navbar-simple";
import { HeaderSearch } from "./header-search/header-search";

export function MyAppShell({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      fixed
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <NavbarSimple opened={opened} setOpened={setOpened} />
      }
      footer={
        <Footer
          height={20}
          p="lg"
          sx={{
            position: "relative",
            bottom: 0,
            borderTop: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[4]
            }`,
          }}
        >
          <Text
            align="center"
            color="dimmed"
          >{`Shinka ${new Date().getFullYear()}`}</Text>
        </Footer>
      }
      header={
        <HeaderSearch opened={opened} setOpened={setOpened}/>
      }
    >
      {children}
    </AppShell>
  );
}
