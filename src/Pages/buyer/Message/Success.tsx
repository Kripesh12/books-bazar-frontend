import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  ActionIcon,
} from "@mantine/core";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <Container size="sm" py={40}>
      <Paper radius="md" p="xl" withBorder shadow="sm">
        <Stack align="center" gap="md">
          <ActionIcon
            size={72}
            radius="xl"
            variant="light"
            color="green"
            mb="md"
          >
            <FaCheck size={48} />
          </ActionIcon>

          <Title order={2} fw={700} ta="center">
            Payment Successful!
          </Title>

          {orderId && (
            <Text c="dimmed" ta="center">
              Order #{orderId} has been placed successfully
            </Text>
          )}

          <Text ta="center" mt="sm">
            Thank you for your purchase. We've sent a confirmation email with
            your order details.
          </Text>

          <Group mt="xl" justify="center">
            <Button
              variant="outline"
              leftSection={<FaArrowLeft size={18} />}
              onClick={() => navigate("/")}
              size="md"
            >
              Back to Shop
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
