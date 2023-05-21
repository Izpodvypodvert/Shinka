import { useState } from "react";
import {
  AppShell,
  Footer,
  Aside,
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
        // <DoubleNavbar
        // opened={opened}
        // setOpened={setOpened}
        //   />

        <NavbarSimple opened={opened} setOpened={setOpened} />
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       {/* <Text>Application sidebar</Text> */}
      //     </Aside>
      //   </MediaQuery>
      // }
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
        // <Header height={{ base: 50, md: 70 }} p="md">
        //   <div
        //     style={{ display: "flex", alignItems: "center", height: "100%" }}
        //   >
        //     <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        //       <Burger
        //         opened={opened}
        //         onClick={() => setOpened((o) => !o)}
        //         size="sm"
        //         color={theme.colors.gray[6]}
        //         mr="xl"
        //       />
        //     </MediaQuery>

        //     <Text>Application header</Text>
        //   </div>
        // </Header>
        // <HeaderTabsColored user={user} tabs={tabs}/>
        <HeaderSearch opened={opened} setOpened={setOpened}/>
      }
    >
      {children}
    </AppShell>
  );
}
