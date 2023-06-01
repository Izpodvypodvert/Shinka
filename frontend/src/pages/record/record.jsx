import "dayjs/locale/ru";
import React, { useState } from "react";

import {
  Group,
  Space,
  Button,
  Modal,
  Container,
  Paper,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { UserContext } from "../../utils/context";
import { getAppointments } from "../../utils/api";
import {
  formatDateTimeToTime,
  formatDateTimeToRuDate,
} from "../../utils/utils";
import { makeRecord } from "../../utils/api";

import { MdAlarmOn, MdAlarmOff } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";


export const Record = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = React.useState([]);
  const [appointmentId, setAppointmentId] = React.useState("");
  const [appointmentTime, setAppointmentTime] = React.useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [message, setMessage] = React.useState("");

  const largeScreen = useMediaQuery("(min-width: 60em)");
  const navigate = useNavigate();

  React.useEffect(() => {
    getAppointments(date)
      .then((res) => {
        setAppointments(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [date, appointmentId]);

  function handleSelectTime(appointmentId, appointmentTime) {
    setAppointmentId(appointmentId);
    setAppointmentTime(formatDateTimeToTime(appointmentTime));
  }

  function handleRecord(userId, appointmentId) {
    if (!userId) {
      setMessage("Необходимо войти в систему или зарегистрироваться.");
      open();
      return;
    }

    makeRecord(userId, appointmentId).catch((err) => setMessage(err?.[0]));

    if (message?.length == 0) {
      setMessage("Вы успешно записаны на шиномонтаж.");
      navigate('/profile')
    }
    open();
  }

  return (
    <Container>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        {message}
      </Modal>
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <Title
          align="center"
          order={3}
          variant="gradient"
          gradient={{ from: "red", to: "blue", deg: 138 }}
          size="h3"
        >
          Выберите день: {formatDateTimeToRuDate(date)}
        </Title>
        <Space h={10} />
        <Group position="center">
          <DatePicker
            numberOfColumns={largeScreen ? 2 : 1}
            locale="ru"
            size={largeScreen ? "lg" : "md"}
            value={date}
            onChange={setDate}
            minDate={new Date()}
          />
        </Group>
      </Paper>
      <Space h="xl" />
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <Title
          align="center"
          order={3}
          variant="gradient"
          gradient={{ from: "red", to: "blue", deg: 138 }}
          size="h3"
        >
          Выберите время: {appointmentTime}
        </Title>
        <Space h={10} />
        <Group position="apart" spacing="xs">
          {appointments.map((appoint, index) => {
            return appoint.reserved || appoint.expired ? (
              <Button
                disabled
                key={appoint.id}
                radius="md"
                leftIcon=<MdAlarmOff />
                size={largeScreen ? "sm" : 16}
              >
                {formatDateTimeToTime(appoint.dt)}
              </Button>
            ) : (
              <Button
                key={appoint.id}
                leftIcon=<MdAlarmOn />
                radius="md"
                size={largeScreen ? "sm" : 16}
                onClick={() => handleSelectTime(appoint.id, appoint.dt)}
              >
                {formatDateTimeToTime(appoint.dt)}
              </Button>
            );
          })}
        </Group>
      </Paper>
      <Space h={25} />
      <Group position="center">
        <Button
          onClick={() => handleRecord(user.id, appointmentId)}
          leftIcon=<GiNotebook />
          color="red"
          size="xl"
          radius="lg"
          uppercase
        >
          Записаться
        </Button>
      </Group>
    </Container>
  );
};
