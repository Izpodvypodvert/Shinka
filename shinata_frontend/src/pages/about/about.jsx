import React from 'react'
import { AspectRatio, Container, Text, Code, Group } from '@mantine/core';

export const About = () => {
  return (<Container>
    <AspectRatio ratio={16 / 13} maw={900} mx="auto">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A433915d778660c2e8d3bc375bac243a1f1119d412b5c1206fb60799a0e4cb091&amp;source=constructor"
        title="Yandex map"
        frameBorder="0"
      />
    </AspectRatio>
    <Group sx={{paddingTop: '30px'}}>
    <Text>Мы находимся по адресу: </Text>
    <Code sx={{ fontWeight: 700 }}> Спасская ул., 333, корп. 11, Москва</Code>
    </Group>
    </Container>
  );
}



// https://yandex.ru/map-widget/v1/?um=constructor%3Acf43dd8b6147a68bbd1c5e76b6f78f0aea7936a261c49b3999f613fc866e46b1&amp;source=constructor