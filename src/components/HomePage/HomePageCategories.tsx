import { Box, Center, Group, Loader, Paper, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../api";
import { CategoryInterface } from "../../Pages/seller/ListBook/ListNewBook";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../utils/AlertComponent";

export default function HomePageCategories() {
  const navigate = useNavigate();

  //Fetch all the category information
  async function fetchGenre() {
    const res = await axiosPublicInstance.get("/category");
    console.log(res.data);
    return res.data;
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["genre"],
    queryFn: fetchGenre,
  });

  if (isLoading) {
    return (
      <Center mt={30}>
        <Group>
          <Loader />
          <Text>Loading Genre</Text>
        </Group>
      </Center>
    );
  }

  if (isError) {
    return <AlertComponent title="Error occured" message={error.message} />;
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
          <Carousel.Slide key={genre.id}>
            <Paper
              p={20}
              withBorder={true}
              shadow="md"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/books/${genre.name}/${genre.id}`)}
            >
              <Text ta={"center"}>{genre.name}</Text>
            </Paper>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
