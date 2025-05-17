import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
  Alert,
  Grid,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useCartStore } from "../../../providers/useCartStore";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { axiosPublicInstance } from "../../../api";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(id);

  const paymentRequestBody = {
    orderId: id,
    amount: getTotalPrice(),
  };

  const initiateEsewaPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPublicInstance.post(
        "/payment/initiate",
        paymentRequestBody
      );
      console.log(response);
      if (response.status === 201) {
        clearCart();
        window.location.href = `${response.data?.url}`;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Payment initiation failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  //   if (paymentInitiated) {
  //     return (
  //       <Container py={40}>
  //         <Center h="50vh">
  //           <Loader size="xl" />
  //           <Text ml="md">Redirecting to eSewa...</Text>
  //         </Center>
  //       </Container>
  //     );
  //   }

  return (
    <Container py={40} size="lg">
      <Button
        variant="subtle"
        leftSection={<FaArrowLeft size={18} />}
        onClick={() => navigate(-1)}
        mb="xl"
      >
        Back to Cart
      </Button>

      <Title order={2} mb="xl">
        Complete Your Purchase
      </Title>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper withBorder radius="md" p="xl" mb="md">
            <Stack gap="md">
              {cartItems.map((item) => (
                <Flex key={item.id} gap="md" align="center">
                  <Image
                    src={typeof item.photo === "string" ? item.photo : ""}
                    width={80}
                    height={100}
                    fit="contain"
                    alt={item.title}
                    radius="sm"
                  />
                  <Box style={{ flex: 1 }}>
                    <Text fw={600} lineClamp={1}>
                      {item.title}
                    </Text>
                    <Text c="dimmed" size="sm">
                      by {item.author}
                    </Text>
                    <Text size="sm">Rs. {item.price}</Text>
                  </Box>
                  <FaCheck color="var(--mantine-color-green-6)" />
                </Flex>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder radius="md" p="xl" pos="sticky" top={20}>
            <Title order={4} mb="md">
              Payment Summary
            </Title>

            <Stack gap="xs">
              <Group justify="space-between">
                <Text c="dimmed">Subtotal</Text>
                <Text>Rs. {getTotalPrice()}</Text>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">Shipping</Text>
                <Text>Free</Text>
              </Group>
              <Group justify="space-between">
                <Text c="dimmed">Tax</Text>
                <Text>Rs. 0</Text>
              </Group>
              <Divider my="sm" />
              <Group justify="space-between">
                <Text fw={700}>Total</Text>
                <Text fz="xl" fw={700}>
                  Rs. {getTotalPrice()}
                </Text>
              </Group>

              <Box mt="md">
                <Text fw={600} mb="sm">
                  Payment Method
                </Text>
                <Paper withBorder p="md" radius="sm" mb="md">
                  <Group>
                    <Image
                      src="https://imgs.search.brave.com/oEEGiawvdwfjZPWzcFh5Qyv0p4xG9d_p1-lH-M1eJMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mMXNv/ZnQuY29tL2ltYWdl/cy9vcmdhbml6YXRp/b25zLzE2ODgyNzc2/NDZfZXNld2EucG5n"
                      width={80}
                      alt="eSewa"
                    />
                    <Text fw={500}>Pay with eSewa</Text>
                  </Group>
                </Paper>
                <Text c="dimmed" size="sm">
                  You'll be redirected to eSewa's secure payment page
                </Text>
              </Box>

              <Button
                size="lg"
                mt="md"
                onClick={initiateEsewaPayment}
                loading={loading}
                fullWidth
              >
                Pay Rs. {getTotalPrice()}
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
