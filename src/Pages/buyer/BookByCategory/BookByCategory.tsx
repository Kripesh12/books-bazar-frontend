import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import Book from "../../../components/Book";
import { bookData } from "../../../temp/BookData";
import { IoFilterSharp } from "react-icons/io5";
import { axiosPublicInstance } from "../../../api";
import { useQuery } from "@tanstack/react-query";

export default function BookByCategory() {
  const { id, genre } = useParams();

  //fetch book by genra
  async function fetchBookByGenra() {
    const res = await axiosPublicInstance.get(`/book/get-by-category/${id}`);
    return res.data;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookByGenre"],
    queryFn: fetchBookByGenra,
  });

  return (
    <Box mt={50}>
      <Paper p={20} withBorder={true} shadow="md">
        <Flex justify={"space-between"} align={"center"}>
          <Text fz={18} fw={"bold"} c={"dark"}>
            Selected Genre:{" "}
            <Text span c={"blue"} inherit>
              {genre}
            </Text>
          </Text>
          <Button leftSection={<IoFilterSharp size={25} />} variant="subtle">
            Filter
          </Button>
        </Flex>
        <SimpleGrid cols={6} mt={16}>
          {data?.map((book) => (
            <Book book={book} key={book.id} />
          ))}
        </SimpleGrid>
      </Paper>
    </Box>
  );
}
