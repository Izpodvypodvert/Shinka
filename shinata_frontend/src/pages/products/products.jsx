import React from "react";
import { BASE_URL } from "../../utils/constants";
import { getProducts, getProductsCategory } from "../../utils/api";
import {
  Tabs,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
  Container
} from "@mantine/core";
import { FcApproval } from "react-icons/fc";
import { useMediaQuery } from "@mantine/hooks";

export const Products = () => {
  const [categories, setCategory] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("1");
  const largeScreen = useMediaQuery("(min-width: 60em)");  

  React.useEffect(() => {
    getProductsCategory().then((res) => setCategory(res));
  }, []);

  React.useEffect(() => {
    getProducts(activeTab).then((res) => setProducts(res));
  }, [activeTab]);

  return (
    
    <Tabs
      color="orange"
      defaultValue={1}
      radius="md"
      value={activeTab}
      onTabChange={setActiveTab}
    >
      <Tabs.List position="center">
        {categories.map((category) => {
          return (
            <Tabs.Tab
              key={category.title}
              value={category.id.toString()}
              icon={<FcApproval size="0.8rem" />}
            >
              {category.title}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      {categories.map((category) => {
        return (
          <Tabs.Panel
            key={category.title}
            value={category.id.toString()}
            pt="xs"
          >
           <Container>
            <SimpleGrid cols={largeScreen ? 4 : 2} key={category.id}>
              {products.map((product) => {
                return (
                    <Card
                      sx={{
                        "&:hover": {
                          border: "2px solid #3E7DC0",
                          boxShadow: "3px 1px 1px #3E7DC0",
                        },
                      }}
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      key={product.id}
                    >
                      <Card.Section>
                        <Image src={BASE_URL + product.image} alt="автотовар" />
                      </Card.Section>

                      <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>{product.brand}</Text>
                        <Badge color="pink" variant="light">
                          распродажа
                        </Badge>
                      </Group>

                      <Text size="sm" color="dimmed">
                        {product.description}
                      </Text>

                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        mt="md"
                        radius="md"
                      >
                        {product.price} руб.
                      </Button>
                    </Card>
                );
              })}
            </SimpleGrid>
            </Container>
          </Tabs.Panel>
        );
      })}
    </Tabs>
    
  );
};
