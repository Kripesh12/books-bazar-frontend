import { Box, Group, Image, Paper, Text, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { BookInterface } from "../Pages/seller/ListBook/ListBook";

interface BookProps {
  book: BookInterface;
  close: () => void;
}

export default function SearchResult({ book, close }: BookProps) {
  const navigate = useNavigate();
  const { title, author, price, photo, id } = book;

  return (
    <Paper
      p="sm"
      radius="md"
      withBorder
      shadow="xs"
      style={{
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "var(--mantine-shadow-md)",
        },
      }}
      onClick={() => {
        close();
        navigate(`/product-info/${id}`);
      }}
    >
      <Group wrap="nowrap" align="flex-start" gap="md">
        <Image
          src={photo}
          w={90}
          h={120}
          alt={title}
          radius="sm"
          fit="contain"
          style={{ border: "1px solid var(--mantine-color-gray-2)" }}
        />

        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text fz={{ base: "md", sm: "lg" }} fw={600} lineClamp={1} mb={4}>
            {title}
          </Text>

          <Text c="dimmed" fz="sm" lineClamp={1} mb={8}>
            by {author}
          </Text>

          <Group justify="space-between" align="flex-end">
            <Text fz="xl" fw={700} c="blue">
              Rs. {price}
            </Text>
            <Badge variant="light" color="green" size="sm">
              In Stock
            </Badge>
          </Group>
        </Box>
      </Group>
    </Paper>
  );
}
