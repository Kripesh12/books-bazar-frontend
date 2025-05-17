import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Loader,
  Text,
  Paper,
  Stack,
  Container,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPublicInstance } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import AlertComponent from "../../../utils/AlertComponent";
import useBuyerAuthStore from "../../../providers/useBuyerAuthStore";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";
import { useCartStore } from "../../../providers/useCartStore";

export default function ProductInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth } = useBuyerAuthStore();
  const { addToCart, isInCart } = useCartStore();

  function handleAddToCart() {
    if (!isAuth) {
      navigate("/login");
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart(data);
    toast.success("Added to cart successfully");
  }

  async function fetchBookById() {
    const res = await axiosPublicInstance.get(`/book/${id}`);
    return res.data;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookbyid", id],
    queryFn: fetchBookById,
  });

  if (isLoading) {
    return (
      <Center h="60vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <AlertComponent message={error.message} title="Error loading product" />
    );
  }

  return (
    <Container size="lg" py={40}>
      <Paper withBorder radius="lg" p={{ base: "md", md: "xl" }} shadow="sm">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "md", md: "xl" }}
          align="flex-start"
        >
          <Box w={{ base: "100%", md: "40%" }}>
            <Image
              src={data.photo}
              radius="md"
              fit="contain"
              height={500}
              alt={data.title}
            />
          </Box>

          {/* Product Info */}
          <Stack w={{ base: "100%", md: "60%" }} gap="md">
            <Box>
              <Text fz={{ base: 28, md: 36 }} fw={700} lh={1.2}>
                {data.title}
              </Text>
              <Text fz={{ base: 18, md: 20 }} c="dimmed">
                by {data.author}
              </Text>
            </Box>

            <Divider />

            {/* Price Section */}
            <Box>
              <Text fz={28} fw={700} c="blue">
                Rs {data.price}
              </Text>
              <Text fz="sm" c="green">
                Inclusive of all taxes
              </Text>
            </Box>

            {/* Description */}
            <Box>
              <Text fz={20} fw={600} mb="sm">
                Description
              </Text>
              <Text fz={16} lh={1.6}>
                {data.description}
              </Text>
            </Box>

            {/* Action Buttons */}
            <Group mt="md" grow>
              {isInCart(data.id) ? (
                <Button
                  disabled
                  size="lg"
                  radius="md"
                  leftSection={<FaCartPlus />}
                  variant="filled"
                >
                  Already in cart
                </Button>
              ) : (
                <Button
                  size="lg"
                  radius="md"
                  leftSection={<FaCartPlus />}
                  onClick={handleAddToCart}
                  variant="filled"
                >
                  Add to Cart
                </Button>
              )}
            </Group>
          </Stack>
        </Flex>
      </Paper>
    </Container>
  );
}
