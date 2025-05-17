import { Box } from "@mantine/core";
import HomePageCarousel from "../../../components/HomePage/HomePageCarousel";
import HomePageCategories from "../../../components/HomePage/HomePageCategories";
import AllBooks from "../../../components/HomePage/AllBooks";
export default function HomePage() {
  return (
    <Box>
      <HomePageCarousel />
      <HomePageCategories />
      {/* {isAuth && <JustForYou />} */}
      <AllBooks />
    </Box>
  );
}
