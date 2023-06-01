import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./utils/context";
import { MainPage } from "./pages/main-page/main-page";
import { SignIn } from "./pages/sign-in/sign-in";
import { SignUp } from "./pages/sign-up/sign-up";
import { UserProfile } from "./pages/user-profile/user-profile";
import { Record } from "./pages/record/record";
import { SearchResults } from "./pages/search-results/search-results";

import { getUser } from "./utils/api";
import { Products } from "./pages/products/products";
import { About } from "./pages/about/about";
import { MyAppShell } from "./components/my-appshell/my-appshell";
import {
  Paper,
  MantineProvider,
  ColorSchemeProvider,
} from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';


function App() {
  const [userState, setUserState] = React.useState({});

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

 

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  React.useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      getUser().then((res) => {
        if (res && res.id) {
          setUserState({
            id: res.id,
            username: res.username,
            phone: res.phone,
            car_brand: res.car_brand,
            car_model: res.car_model,
            email: res.email,
          });
        }
      });
    }
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{colorScheme}}
        withGlobalStyles
        withNormalizeCSS

      >
        <UserContext.Provider value={[userState, setUserState]}>
          <Paper>
            <BrowserRouter>
              <MyAppShell>
                <Routes>
                  <Route exact path="/" element={<MainPage />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/record" element={<Record />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/search-results/:searchValue" element={<SearchResults/>} />
                </Routes>
              </MyAppShell>
            </BrowserRouter>
          </Paper>
        </UserContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
