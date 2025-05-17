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
import { FaArrowLeft } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentError() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <Container size="sm" py={40}>
      <Paper radius="md" p="xl" withBorder shadow="sm">
        <Stack align="center" gap="md">
          <ActionIcon size={72} radius="xl" variant="light" color="red" mb="md">
            <MdCancel size={48} />
          </ActionIcon>

          <Title order={2} fw={700} ta="center" c="red.7">
            Payment Failed
          </Title>

          {orderId && (
            <Text c="dimmed" ta="center">
              Order #{orderId}
            </Text>
          )}

          <Text ta="center" mt="sm">
            You can try the payment again or contact support for assistance.
          </Text>

          <Group mt="xl" justify="center" wrap="nowrap">
            <Button
              variant="outline"
              leftSection={<FaArrowLeft size={18} />}
              onClick={() => navigate(-1)}
              size="md"
            >
              Back to Checkout
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
