import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { axiosPublicInstance } from "../../../api";
import { toast } from "react-toastify";
export default function SellerSignup() {
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  async function handelConfirmEmail() {
    const userData = {
      email: form.getValues().email,
    };
    try {
      setIsloading(true);
      await axiosPublicInstance.post("/auth/verify-seller", userData);
      toast.success("Confirmation email sent");
      form.reset();
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create a Seller Account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/seller-login")}
        >
          Sign In
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() => {
            handelConfirmEmail();
          })}
        >
          <TextInput
            label="Email"
            placeholder="you@example.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Confirm Email
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
