import { Box, SimpleGrid, Text, Skeleton, Paper, Center } from "@mantine/core";
import Book from "../Book";
import { useQuery } from "@tanstack/react-query";
import { axiosBuyerPrivateInstance } from "../../api";
import { BookInterface } from "../../Pages/seller/ListBook/ListBook";

export default function AllBooks() {
  async function fetchRecommendations() {
    const { data } = await axiosBuyerPrivateInstance.get("/book");

    return data;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allBooks"],
    queryFn: fetchRecommendations,
  });

  return (
    <Box p={"md"}>
      <Text size="xl" fw={600} mb="xl">
        All Books
      </Text>

      {isError ? (
        <Paper
          withBorder
          p="lg"
          radius="md"
          bg="var(--mantine-color-red-light)"
        >
          <Text c="red" fw={500} ta="center">
            Failed to load Books. Please refresh the page.
          </Text>
        </Paper>
      ) : isLoading ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} h={420} w="100%" radius="md" />
          ))}
        </SimpleGrid>
      ) : data?.length > 0 ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
          {data.map((book: BookInterface) => (
            <Book book={book} key={book.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Center>
          <Paper
            withBorder
            p="lg"
            radius="md"
            bg="var(--mantine-color-blue-light)"
          >
            <Text c="blue" fw={500} ta="center">
              No books available yet. Check back later!
            </Text>
          </Paper>
        </Center>
      )}
    </Box>
  );
}
