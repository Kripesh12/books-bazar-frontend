import { Box, SimpleGrid, Text } from "@mantine/core";
import Book from "../Book";
import { bookData } from "../../temp/BookData";

export default function JustForYou() {
  return (
    <Box mt={24}>
      <Text fz={24}>Just for you</Text>
      <SimpleGrid cols={6}>
        {bookData.map((book: any) => (
          <Book book={book} key={book.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
