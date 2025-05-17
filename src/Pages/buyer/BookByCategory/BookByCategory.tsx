import {
  Box,
  Paper,
  SimpleGrid,
  Text,
  Title,
  Skeleton,
  Center,
  Container,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import Book from "../../../components/Book";
import { axiosPublicInstance } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { BookInterface } from "../../seller/ListBook/ListBook";

export default function BookByCategory() {
  const { id, genre } = useParams();

  // Fetch books by genre
  async function fetchBookByGenre() {
    const res = await axiosPublicInstance.get(`/book/get-by-category/${id}`);
    return res.data;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookByGenre", id],
    queryFn: fetchBookByGenre,
  });

  if (isLoading) {
    return (
      <Container size="xl" py={40}>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing="lg">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={420} radius="md" />
            ))}
        </SimpleGrid>
      </Container>
    );
  }

  if (isError) {
    return (
      <Center py={40}>
        <Text c="red" fw={500}>
          Failed to load books. Please try again.
        </Text>
      </Center>
    );
  }

  return (
    <Container size="xl" py={40}>
      <Box mb="xl">
        <Title order={2} fw={700} mb="sm">
          {genre} Books
        </Title>
        <Text c="dimmed" size="lg">
          Explore our collection of {genre?.toLowerCase()} books
        </Text>
      </Box>

      {data?.length > 0 ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing="lg">
          {data.map((book: BookInterface) => (
            <Book book={book} key={book.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Paper
          withBorder
          p="xl"
          radius="md"
          bg="var(--mantine-color-blue-light)"
        >
          <Text ta="center" c="blue">
            No books found in this category
          </Text>
        </Paper>
      )}
    </Container>
  );
}
