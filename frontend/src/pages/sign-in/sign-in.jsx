import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { getUser, loginUser } from "../../utils/api";
import { UserContext } from "../../utils/context";

import logoIcon from "../../images/logo.svg";

import {
  ThemeIcon,
  Paper,
  Button,
  Box,
  PasswordInput,
  Group,
  Text,
  Center,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";


export const SignIn = ({ extraClass = "" }) => {
  const [userData, setUserData] = React.useState({});
  const [user, setUser] = React.useContext(UserContext);
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState("");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });


  const handleSubmit = (values) => {
    errorLogin && setErrorLogin("");
    errorPassword && setErrorPassword("");
    loginUser(values.username, values.password)
      .then((res) => {
        if (res && res.auth_token) {
          getUser().then((res) => {
            if (res && res.id) {
              setUser({
                id: res.id,
                username: res.username,
                phone: res.phone,
                car_brand: res.car_brand,
                car_model: res.car_model,
                email: res.email,
              });
              navigate("/");
            }
          });
        }
      })
      .catch((err) => {
        if (err.non_field_errors) {
          setErrorPassword("Неправильный логин или пароль");
        } else {
          setErrorPassword("Ошибка сервера");
        }
      });
  };

  return (
    <Box maw={340} mx="auto">
      <Paper shadow="md" radius="lg" p="xl" withBorder>
      <Center h={150}>
        <ThemeIcon color="white" size={90}>
          <img src={logoIcon} alt="Логотип." width={90} height={90} />
        </ThemeIcon>
      </Center>
      <Text color="dimmed">
        Войдите для получения доступа к записи на шиномонтаж!
      </Text>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          mt="sm"
          label="Имя пользователя:"
          placeholder="Имя пользователя"
          {...form.getInputProps("username")}
          error={errorPassword}
        />

        <PasswordInput
          label="Пароль:"
          placeholder="Пароль"
          {...form.getInputProps("password")}
          error={errorPassword}
        />

        <Group position="right" mt="md">
          <Button type="submit">Войти</Button>
        </Group>
      </form>

      <Space h={30} />
      <Text color="dimmed">или</Text>
      <NavLink to="/signup">Ещё не зарегистрированы? Зарегистрируйтесь</NavLink>
      </Paper>
    </Box>
  );
};
