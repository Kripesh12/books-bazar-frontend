import { Carousel } from "@mantine/carousel";
import { Box, Image } from "@mantine/core";

export default function HomePageCarousel() {
  return (
    <Box>
      <Carousel mt={40} withControls={false} loop={true}>
        <Carousel.Slide>
          <Image src="src/assets/image/Book-Banner.jpg" />
        </Carousel.Slide>
        <Carousel.Slide>
          <Image src="src/assets/image/Card-Discount.jpg" />
        </Carousel.Slide>
      </Carousel>
    </Box>
  );
}
