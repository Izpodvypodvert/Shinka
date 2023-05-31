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
  Container,
  createStyles,
  rem,
} from "@mantine/core";
import { FcApproval } from "react-icons/fc";
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
    marginLeft:"10px",
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

export const Products = () => {
  const { classes } = useStyles();

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
            <Container size="lg">
              <SimpleGrid
                cols={largeScreen ? 4 : 1}
                key={category.id}
                breakpoints={[
                  { maxWidth: "62rem", cols: 3, spacing: "md" },
                  { maxWidth: "48rem", cols: 2, spacing: "sm" },
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}
              >
              
                {products.map((product) => {
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
                        <Image
                          src={BASE_URL + product.image}
                          alt="автотовар"
                          height={300}
                        />
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
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
};
