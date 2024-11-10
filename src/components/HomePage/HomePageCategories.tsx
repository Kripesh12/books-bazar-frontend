import { Box, Paper, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../api";
import { CategoryInterface } from "../../Pages/seller/ListBook/ListNewBook";
import { Carousel } from "@mantine/carousel";

export default function HomePageCategories() {
  //Fetch all the category information
  async function fetchGenre() {
    const res = await axiosPublicInstance.get("/category");
    console.log(res.data);
    return res.data;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["genre"],
    queryFn: fetchGenre,
  });

  if (isLoading) {
    return <Text>Loading Genre...</Text>;
  }

  return (
    <Box mt={24}>
      <Text fz={24}>Genre</Text>
      <Carousel
        mt={40}
        withControls
        loop={true}
        slideSize={"20%"}
        slideGap={"lg"}
      >
        {data?.map((genre: CategoryInterface) => (
          <Carousel.Slide>
            <Paper
              key={genre.id}
              p={20}
              withBorder={true}
              shadow="md"
              style={{ cursor: "pointer" }}
            >
              <Text ta={"center"}>{genre.name}</Text>
            </Paper>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
