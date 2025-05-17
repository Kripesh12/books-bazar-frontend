import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Alert,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../providers/useCartStore";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import { axiosBuyerPrivateInstance } from "../../../api";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, getTotalItems, getTotalPrice } =
    useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      shipping_address: "",
      phone: "",
    },
    validate: {
      shipping_address: (value) =>
        value.trim().length < 5
          ? "Address must be at least 5 characters"
          : null,
      phone: (value) =>
        /^[0-9]{10}$/.test(value)
          ? null
          : "Invalid phone number (10 digits required)",
    },
  });

  const handleSubmit = async (values: {
    shipping_address: string;
    phone: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const orderItems = cartItems.map((item) => ({
        price: item.price,
        bookId: item.id,
      }));

      const requestBody = {
        shipping_address: values.shipping_address,
        phone: values.phone,
        orderItem: orderItems,
      };
      const response = await axiosBuyerPrivateInstance.post(
        "/order",
        requestBody
      );
      console.log(response.data);
      if (response.status === 201) {
        navigate(`/checkout/${response.data?.orderId}`);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to create order. Please try again."
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (getTotalItems() === 0) {
    return (
      <Container py={40}>
        <Paper radius="md" p="xl" withBorder>
          <Stack align="center" gap="sm">
            <FaShoppingCart size={60} color="var(--mantine-color-gray-5)" />
            <Title order={3} fw={500}>
              Your cart is empty
            </Title>
            <Text c="dimmed" ta="center">
              Browse our collection and add some books to get started
            </Text>
            <Button mt="md" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container py={40} size="lg">
      <Title order={2} mb="xl">
        Your Cart ({getTotalItems()} {getTotalItems() === 1 ? "item" : "items"})
      </Title>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              {cartItems.map((book) => (
                <Card key={book.id} withBorder radius="md" p="md">
                  <Flex gap="md" direction={{ base: "column", sm: "row" }}>
                    <Image
                      src={typeof book.photo === "string" ? book.photo : ""}
                      alt={book.title}
                      width={120}
                      height={160}
                      radius="sm"
                      fit="contain"
                      style={{
                        border: "1px solid var(--mantine-color-gray-2)",
                      }}
                    />

                    <Box style={{ flex: 1 }}>
                      <Text fz="lg" fw={600} lineClamp={1}>
                        {book.title}
                      </Text>
                      <Text c="dimmed" fz="sm">
                        by {book.author}
                      </Text>
                      <Text fz="sm" mt={4}>
                        {book.publisher} • {book.condition} condition
                      </Text>

                      <Group justify="space-between" mt="md">
                        <Text fz="xl" fw={700} c="blue">
                          Rs. {book.price}
                        </Text>
                        <Button
                          variant="light"
                          color="red"
                          size="sm"
                          leftSection={<FaTrash size={16} />}
                          onClick={() => removeFromCart(book.id)}
                        >
                          Remove
                        </Button>
                      </Group>
                    </Box>
                  </Flex>
                </Card>
              ))}

              <Paper withBorder p="lg" radius="md">
                <Title order={4} mb="md">
                  Shipping Information
                </Title>
                <Stack gap="md">
                  <TextInput
                    label="Shipping Address"
                    placeholder="Enter your complete shipping address"
                    {...form.getInputProps("shipping_address")}
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="Enter your 10-digit phone number"
                    {...form.getInputProps("phone")}
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper withBorder p="lg" radius="md" pos="sticky" top={20}>
              <Title order={4} mb="md">
                Order Summary
              </Title>

              <Stack gap="xs">
                <Group justify="space-between">
                  <Text c="dimmed">Subtotal</Text>
                  <Text fw={500}>Rs. {getTotalPrice()}</Text>
                </Group>
                <Group justify="space-between">
                  <Text c="dimmed">Delivery</Text>
                  <Text fw={500}>Free</Text>
                </Group>
                <Group justify="space-between">
                  <Text c="dimmed">Tax</Text>
                  <Text fw={500}>Rs. 0</Text>
                </Group>

                <Divider my="sm" />

                <Group justify="space-between">
                  <Text fw={700}>Total</Text>
                  <Text fz="xl" fw={700}>
                    Rs. {getTotalPrice()}
                  </Text>
                </Group>

                <Button
                  type="submit"
                  size="lg"
                  radius="md"
                  mt="md"
                  loading={loading}
                  fullWidth
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  color="red"
                  size="sm"
                  onClick={clearCart}
                  fullWidth
                  mt="xs"
                >
                  Clear Cart
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
