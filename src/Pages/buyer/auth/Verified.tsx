/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Anchor,
  TextInput,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosPublicInstance } from "../../../api";

export default function Verified() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least two letters" : null,
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters long" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  async function handleSubmit() {
    try {
      setLoading(true);
      await axiosPublicInstance.post(
        `/auth/create-customer`,
        {
          name: form.getValues().name,
          password: form.getValues().password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User created successfully");
      navigate("/login");
    } catch (e: any) {
      toast.error(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create a new account</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Reenter Password"
            placeholder="Reenter Password"
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Signup
          </Button>
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate("/login")}
            mt="lg"
          >
            Go back to login
          </Anchor>
        </form>
      </Paper>
    </Container>
  );
}
