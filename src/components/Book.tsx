import { Box, Image, Paper, Text, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { BookInterface } from "../Pages/seller/ListBook/ListBook";

interface BookProps {
  book: BookInterface;
}

export default function Book({ book }: BookProps) {
  const navigate = useNavigate();
  const { title, author, price, photo, id } = book;

  return (
    <Paper
      withBorder
      radius="md"
      shadow="sm"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/product-info/${id}`)}
    >
      <Box>
        <Image
          src={photo}
          alt={title}
          fit="cover"
          radius="md"
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        />

        <Box p="md">
          <Text fz="lg" fw={600} lineClamp={1} mb={4}>
            {title}
          </Text>

          <Text c="dimmed" fz="sm" mb={8}>
            by {author}
          </Text>

          <Group justify="space-between" mt="md">
            <Text fz="xl" fw={700}>
              Rs. {price}
            </Text>
          </Group>
        </Box>
      </Box>
    </Paper>
  );
}
