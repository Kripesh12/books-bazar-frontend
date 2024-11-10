import { Box, Button, Image, Paper, Text } from "@mantine/core";
import { BookInterface } from "./HomePage/JustForYou";
import { useNavigate } from "react-router-dom";
import useBuyerAuthStore from "../providers/useBuyerAuthStore";
import { toast } from "react-toastify";

interface BookProps {
  book: BookInterface;
}

export default function Book({ book }: BookProps) {
  const navigate = useNavigate();
  const { title, author, price, image } = book;
  const { isAuth } = useBuyerAuthStore();

  function checkIsAuth() {
    if (!isAuth) {
      navigate("/login");
      toast.error("User must be logged in");
    }
  }
  return (
    <Paper mt={24} withBorder display="inline-block" shadow="md" w={210} p={8}>
      <Box
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/product-info")}
      >
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
      </Box>
      <Button fullWidth mt={8} onClick={checkIsAuth}>
        ADD TO CART
      </Button>
    </Paper>
  );
}
