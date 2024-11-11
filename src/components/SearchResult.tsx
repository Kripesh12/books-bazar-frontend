import { Box, Flex, Image, Paper, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { BookInterface } from "../Pages/seller/ListBook/ListBook";

interface BookProps {
  book: BookInterface;
}

export default function SearchResult({ book }: BookProps) {
  const navigate = useNavigate();
  const { title, author, price, photo, id } = book;

  return (
    <Paper
      py={10}
      px={20}
      withBorder={true}
      shadow="md"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/product-info/${id}`)}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Image src={photo} w={80} alt={title} />
        <Box>
          <Text fz={20} fw="bold" truncate="end" c={"#404040"}>
            {title}
          </Text>
          <Text c={"#696969"} fz={12}>
            by{" "}
            <Text span c={"dark"}>
              {author}
            </Text>
          </Text>
          <Text fz={18} mt={8}>
            Rs.{" "}
            <Text span fz={24} fw={"bold"} c="#33333">
              {price}
            </Text>
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
}
