import { Box, Center, Group, Loader, Paper, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { axiosPublicInstance } from "../../api";
import { CategoryInterface } from "../../Pages/seller/ListBook/ListNewBook";
import { Carousel } from "@mantine/carousel";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../utils/AlertComponent";

export default function HomePageCategories() {
  const navigate = useNavigate();

  async function fetchGenre() {
    const res = await axiosPublicInstance.get("/category");
    return res.data;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["genre"],
    queryFn: fetchGenre,
  });

  if (isLoading) {
    return (
      <Center mt={30}>
        <Group gap="xs">
          <Loader size="sm" />
          <Text size="sm">Loading categories...</Text>
        </Group>
      </Center>
    );
  }

  if (isError) {
    return <AlertComponent title="Error" message={error.message} />;
  }

  return (
    <Box mt={40} p="md">
      <Text size="xl" fw={600} mb="xl">
        Browse by Genre
      </Text>

      <Carousel
        slideSize="160px"
        slideGap="md"
        align="start"
        slidesToScroll={4}
        withControls
        loop
      >
        {data?.map((genre: CategoryInterface) => (
          <Carousel.Slide key={genre.id}>
            <Paper
              p="lg"
              radius="md"
              withBorder
              onClick={() => navigate(`/books/${genre.name}/${genre.id}`)}
            >
              <Text size="sm" fw={500} ta="center">
                {genre.name}
              </Text>
            </Paper>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}
