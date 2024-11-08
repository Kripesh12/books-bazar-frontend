import { Box } from "@mantine/core";
import HomePageCarousel from "../components/HomePage/HomePageCarousel";
import HomePageCategories from "../components/HomePage/HomePageCategories";
import JustForYou from "../components/HomePage/JustForYou";
export default function HomePage() {
  return (
    <Box>
      <HomePageCarousel />
      <HomePageCategories />
      <JustForYou />
    </Box>
  );
}
