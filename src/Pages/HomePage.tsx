import { Box, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
export default function HomePage() {
  return (
    <Box>
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
    </Box>
  );
}
