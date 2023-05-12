import React from "react";
import { getComplexServices } from "../../utils/api";
import coomplex1 from "../../images/complex1.png";
import coomplex2 from "../../images/complex2.png";
import coomplex3 from "../../images/complex3.png";
import Slider from "react-slick";
import { Card, Image, Text, Button, Group, List, Space, Container, Paper } from "@mantine/core";
import { GiCartwheel } from "react-icons/gi";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {settings} from "../../utils/constants"



export const MainPage = () => {
  const [complexServices, setComplexServices] = React.useState([]);
  const complexServiesImages = [coomplex1, coomplex2, coomplex3];

  React.useEffect(() => {
    getComplexServices().then((res) => setComplexServices(res));
  }, []);



  function importAll(r) {
    return r.keys().map(r);
  }
  const images = importAll(require.context('../../images/gallery/', false, /\.(png|jpe?g|svg)$/));

  
  return (
    
      <Container>
      <Space h={10} />
      <h1>3 ВИДА КОМПЛЕКСНЫХ РАБОТ. ВЫБЕРИТЕ СВОЙ:</h1>
      <Group position="center" spacing="xs">
      
        {complexServices.map((complexService, index) => {
          return (
            <Card
              sx={{ width: "300px", height: "550px" }}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={complexService.id}
            >
              <Card.Section>
                <Image src={complexServiesImages[index]} alt="complex" />
              </Card.Section>
              <Text weight={500}>{complexService.title}</Text>
              <Text size="sm" color="dimmed">
                {complexService.description}
              </Text>
              <Space h={20}/>
              <List spacing="xs" size="sm" icon={<GiCartwheel />}>
                {complexService.services.map((service) => {
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
                {complexService.price} руб.
              </Button>
            </Card>
          );
        })}
      </Group>
      
      <Paper shadow="md" radius="lg" p="xl" withBorder>
      <h2 style={{textAlign: "center"}}>Shinata фото</h2>
      <Slider {...settings}>
        {images.map((image) => {
          return <img  src={image} key={image}></img>;
        })}
      </Slider>
      </Paper>
      </Container>
  );
};
