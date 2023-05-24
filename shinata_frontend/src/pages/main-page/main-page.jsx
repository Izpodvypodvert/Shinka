import React from "react";
import { NavLink } from "react-router-dom";
import { getServiceGroups, getServices } from "../../utils/api";
import coomplex1 from "../../images/complex1.png";
import coomplex2 from "../../images/complex2.png";
import coomplex3 from "../../images/complex3.png";
import Slider from "react-slick";
import {
  Card,
  Modal,
  Text,
  Button,
  Group,
  Table,
  Space,
  Container,
  Paper,
  NativeSelect,
  Checkbox,
} from "@mantine/core";
import { GiCartwheel } from "react-icons/gi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../../utils/constants";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

export const MainPage = () => {
  const [groups, setGroups] = React.useState([]);
  const complexServiesImages = [coomplex1, coomplex2, coomplex3];
  const [runflat, setRunflat] = React.useState(false);
  const [bigProfile, setBigProfile] = React.useState(false);

  const [carType, setCarType] = React.useState("Легковой автомобиль");
  const [wheelDiameter, setWheelDiameter] = React.useState("R13");
  const [services, setServices] = React.useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const largeScreen = useMediaQuery("(min-width: 60em)");

  React.useEffect(() => {
    getServiceGroups().then((res) => setGroups(res));
  }, []);

  // function importAll(r) {
  //   return r.keys().map(r);
  // }
  // const images = importAll(
  //   require.context("../../images/gallery/", false, /\.(png|jpe?g|svg)$/)
  // );

  function handleRecord(carType, wheelDiameter) {
    getServices(carType, wheelDiameter)
      .then((res) => setServices(res))
      .catch((err) => {
        console.error(err);
      });
    open();
  }

  const rows = services.map((service) => (
    <tr key={service.id}>
      <td>{service.title}</td>
      <td>{service.description}</td>
      {(() => {
        if (
          service.title.includes("Демонтаж") ||
          service.title.includes("Монтаж")
        ) {
          if (runflat && bigProfile)
            return <td>{Number(service.price) + 425}</td>;
          else if (runflat) return <td>{Number(service.price) + 300}</td>;
          else if (bigProfile) return <td>{Number(service.price) + 125}</td>;
          else return <td>{service.price}</td>;
        } 
        else if (service.title.includes("Сумма")) {
          if (runflat && bigProfile)
            return <td>{Number(service.price) + 1700}</td>;
          else if (runflat) return <td>{Number(service.price) + 1200}</td>;
          else if (bigProfile) return <td>{Number(service.price) + 500}</td>;
          else return <td>{service.price}</td>;
        } 
        else {
          return <td>{service.price}</td>;
        }
      })()}
    </tr>
  ));

  return (
    <Container>
      <Space h={10} />
      <h1>ЦЕНЫ НА ШИНОМОНТАЖ:</h1>
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <NativeSelect
          data={groups.map((group) => group.title)}
          value={carType}
          onChange={(event) => setCarType(event.currentTarget.value)}
          label="Тип автомобиля"
          // description="Тип автомобиля"
          radius="md"
          size={largeScreen ? "xl" : "xs"}
          withAsterisk
        />
      </Paper>
      <Space h={10} />
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <NativeSelect
          data={Array.from({ length: 12 }, (_, i) => "R" + (i + 13))}
          label="Диаметр колеса"
          value={wheelDiameter}
          onChange={(event) => setWheelDiameter(event.currentTarget.value)}
          radius="md"
          size={largeScreen ? "xl" : "xs"}
          withAsterisk
        />
      </Paper>
      <Space h={10} />
      <Paper shadow="md" radius="lg" p="xl" withBorder>
        <Checkbox
          label="Run Flat"
          color="red"
          radius="md"
          size={largeScreen ? "xl" : "sm"}
          checked={runflat}
          onChange={(event) => setRunflat(event.currentTarget.checked)}
        />
        <Checkbox
          label="Профиль больше 60"
          color="red"
          radius="md"
          size={largeScreen ? "xl" : "sm"}
          checked={bigProfile}
          onChange={(event) => setBigProfile(event.currentTarget.checked)}
        />
      </Paper>
      <Space h={10} />
      <Group position="center">
        <Button
          onClick={() => handleRecord(carType, wheelDiameter)}
          // leftIcon=<GiNotebook />
          color="red"
          size="xl"
          radius="lg"
        >
          Узнать цену
        </Button>
      </Group>

      <Modal
        opened={opened}
        onClose={close}
        radius="xl"
        withCloseButton={false}
        centered
      >
        <Table>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Диаметр колеса</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Space h={10} />
        <Group position="center">
          <NavLink to="/record">
            <Button color="red">Записаться на шиномонтаж</Button>
          </NavLink>
        </Group>
      </Modal>
    </Container>
  );
};

{
  /* <Group position="center" spacing="xs">
      
      {groups.map((group, index) => {
        return (
          <Card
            sx={{ width: "300px", height: "550px" }}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={group.id}
          >
            <Card.Section>
              <Image src={complexServiesImages[index]} alt="complex" />
            </Card.Section>
            <Text weight={500}>{group.title}</Text>
            <Text size="sm" color="dimmed">
              {group.description}
            </Text>
            <Space h={20}/>
            <List spacing="xs" size="sm" icon={<GiCartwheel />}>
              {group.services.map((service) => {
                return (
                  <div style={{textAlign:'left', padding: '0 20px 10px'}} key={service.id}>
                  <List.Item key={service.id}>{service.title}</List.Item>
                  </div>
                );
              })}
            </List>
           
            <Button
              sx={{ position: "absolute", bottom: 0 }}
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
            >
              {/* {complexService.price} руб. */
}
//         </Button>
//       </Card>
//     );
//   })}
// </Group>

// <Paper shadow="md" radius="lg" p="xl" withBorder>
// <h2 style={{textAlign: "center"}}>Shinata фото</h2>
// <Slider {...settings}>
//   {images.map((image) => {
//     return <img  src={image} key={image}></img>;
//   })}
// </Slider>
// </Paper> */}
