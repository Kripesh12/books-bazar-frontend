import { Box, Button, Image, Paper, Text } from "@mantine/core";
import { BookInterface } from "./HomePage/JustForYou";

interface BookProps {
  book: BookInterface;
}

export default function Book({ book }: BookProps) {
  const { title, author, price, image } = book;

  return (
    <Paper mt={24} withBorder display="inline-block" p={10} shadow="md" w={210}>
      <Image src={image} width={200} height={300} alt={title} />
      <Box w={180}>
        <Text fz={20} mt={10} fw="bold" truncate="end">
          {title}
        </Text>
        <Text c="dark">{author}</Text>
      </Box>
      <Text fz={24} fw="bold" mt={8}>
        Rs. {price}
      </Text>
      <Button fullWidth mt={8} variant="outline">
        ADD TO CART
      </Button>
    </Paper>
  );
}
