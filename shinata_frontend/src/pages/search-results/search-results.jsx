import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  SimpleGrid,
  Container,
} from "@mantine/core";

import { getSearchedProducts } from "../../utils/api";

import { useMediaQuery } from "@mantine/hooks";

export const SearchResults = () => {
  const [searchedProducts, setSearchedProducts] = React.useState([]);
  const largeScreen = useMediaQuery("(min-width: 60em)");
  const { searchValue } = useParams();
  const searchStringLowerCase = searchValue.toLowerCase();
  const searchStringUpperCase =
    searchStringLowerCase.charAt(0).toUpperCase() +
    searchStringLowerCase.slice(1);
 

  React.useEffect(() => {
    getSearchedProducts(searchStringLowerCase).then(
      (res) => {
        if (res.length == 0) {
          getSearchedProducts(searchStringUpperCase).then((res) => setSearchedProducts(res))
        } else {
        setSearchedProducts(res)}
      }
        )
    
  }, [searchValue]);

  

  // React.useEffect(() => {
  //   getSearchedProducts(searchValue).then((res) => setSearchedProducts(res));

  // }, [searchValue])
  console.log(searchedProducts);
  return (
    <Container>
      {searchedProducts.length == 0 && (
        <h1>По запросу "{searchValue}" ничего не нашлось.</h1>
      )}
      <SimpleGrid cols={largeScreen ? 4 : 2}>
        {searchedProducts.map((product) => {
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
                <Image src={product.image} alt="автотовар" />
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
  );
};
