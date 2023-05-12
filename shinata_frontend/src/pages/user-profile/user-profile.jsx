import React from "react";
import { UserContext } from "../../utils/context";

import { useNavigate, NavLink } from "react-router-dom";

import { updateUser, getRecord, deleteRecord } from "../../utils/api";
import logoIcon from "../../images/logo.svg";
import {
  ThemeIcon,
  MediaQuery,
  useMantineColorScheme,
  ActionIcon,
  Button,
  Box,
  PasswordInput,
  Group,
  Text,
  Center,
  Space,
  TextInput,
  Paper,
  Card
} from "@mantine/core";

export const UserProfile = ({ extraClass = "" }) => {
  const [userData, setUserData] = React.useContext(UserContext);
  const [record, setRecord] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    getRecord().then((res) => {
      setRecord(res);
    });
  }, []);

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    updateUser(userData).then((res) => {
      if (res && res.username) {
        navigate("/");
      }
    });
  };

  function handleDeleteRecord(client) {
    deleteRecord(client);
    setRecord({});
  }

  return (
    <Box maw={450}  mx="auto">
      <Paper shadow="md" radius="lg" p="xl" withBorder>
      <Center h={150}>
        <ThemeIcon color="white" size={90}>
          <img src={logoIcon} alt="Логотип." width={90} height={90} />
        </ThemeIcon>
      </Center>
      {record.appointment && (
        <Paper shadow="md" radius="lg" p="xl" withBorder>
          <Group position="right" mt="md">
            <Text fz={25} weight={500}>
              Вы записаны на шиномонтаж:
              <br/>
              {record.appointment.replace("T", " ").slice(0, -3)}
            </Text>
            <Space h={50}/>
            <Button color="red" size="xs" compact onClick={() => handleDeleteRecord(record.client)}>
              Отменить запись
            </Button>
          </Group>
          </Paper>
      )}
      <Space h={30}/>
      <Text color="dimmed">
        В личном кабинете можно актуализировать предоставленные данные
      </Text>

      <TextInput
        mt="sm"
        label="Имя пользователя:"
        placeholder="Имя пользователя"
        onChange={onChangeInput}
        name="username"
        id={1}
        value={userData.username || ""}
      />
      <TextInput
        label="Номер телефона:"
        placeholder="Номер телефона"
        onChange={onChangeInput}
        name="phone"
        id={4}
        value={userData.phone || ""}
      />
      <TextInput
        label="Электронная почта:"
        placeholder="Электронная почта"
        onChange={onChangeInput}
        name={"email"}
        id={5}
        value={userData.email || ""}
      />
      <TextInput
        label="Марка авто:"
        placeholder="Марка авто"
        onChange={onChangeInput}
        name={"car_brand"}
        id={6}
        value={userData.car_brand || ""}
      />
      <TextInput
        label="Модель авто:"
        placeholder="Модель авто"
        onChange={onChangeInput}
        name={"car_model"}
        id={7}
        value={userData.car_model || ""}
      />
      <Group position="right" mt="md">
        <Button onClick={handleSubmit}>Изменить учётные данные</Button>
      </Group>
      </Paper>
    </Box>
  );
};
