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
  createStyles,
  rem,
} from "@mantine/core";

import { getSearchedProducts } from "../../utils/api";

import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    position: "relative",
    minHeight: "500px",
    minWidth: "250px",
  },

  imageSection: {
    padding: theme.spacing.xs,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  section: {
    position: "absolute",
    bottom: 0,
    marginLeft: "10px",
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  btn: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

export const SearchResults = () => {
  const { classes } = useStyles();
  const [searchedProducts, setSearchedProducts] = React.useState([]);
  const largeScreen = useMediaQuery("(min-width: 60em)");
  const { searchValue } = useParams();
  const searchStringLowerCase = searchValue.toLowerCase();
  const searchStringUpperCase =
    searchStringLowerCase.charAt(0).toUpperCase() +
    searchStringLowerCase.slice(1);

  React.useEffect(() => {
    getSearchedProducts(searchStringLowerCase).then((res) => {
      if (res.length == 0) {
        getSearchedProducts(searchStringUpperCase).then((res) =>
          setSearchedProducts(res)
        );
      } else {
        setSearchedProducts(res);
      }
    });
  }, [searchValue]);

  
  return (
    <Container size="lg">
      {searchedProducts.length == 0 && (
        <h1>По запросу "{searchValue}" ничего не нашлось.</h1>
      )}
      <SimpleGrid
        cols={largeScreen ? 4 : 1}
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {searchedProducts.map((product) => {
          return (
            <Card
              className={classes.card}
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
              <Card.Section className={classes.imageSection}>
                <Image src={product.image} alt="автотовар" height={300} />
              </Card.Section>

              <Text weight={500}>{product.brand}</Text>
              <Card.Section className={classes.section}>
                <Group position="apart" mb="xs">
                  <Badge color="pink" variant="light">
                    распродажа
                  </Badge>

                  <Text size="sm" color="dimmed">
                    {product.description}
                  </Text>
                </Group>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  {product.price} руб.
                </Button>
              </Card.Section>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
