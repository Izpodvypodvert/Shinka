import React from 'react'
import { AspectRatio, Container, Text, Code, Group } from '@mantine/core';

export const About = () => {
  return (<Container>
    <AspectRatio ratio={16 / 13} maw={900} mx="auto">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Acf43dd8b6147a68bbd1c5e76b6f78f0aea7936a261c49b3999f613fc866e46b1&amp;source=constructor"
        title="Yandex map"
        frameBorder="0"
      />
    </AspectRatio>
    <Group sx={{paddingTop: '30px'}}>
    <Text>Мы находимся по адресу: </Text>
    <Code sx={{ fontWeight: 700 }}> Привольная ул., 33, корп. 1, Москва</Code>
    </Group>
    </Container>
  );
}