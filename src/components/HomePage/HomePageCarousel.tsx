import { Carousel } from "@mantine/carousel";
import { Box, Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function HomePageCarousel() {
  const autoplay = useRef<any>(Autoplay({ delay: 2000 }));
  return (
    <Box>
      <Carousel
        mt={40}
        withControls={false}
        loop={true}
        plugins={[autoplay.current]}
      >
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
