import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPublicInstance } from "../../../api";
import { useState } from "react";

export default function SellerLogin() {
  const navigate = useNavigate();
  const [lodaing, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Password too short"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const res = await axiosPublicInstance.post(
        "/auth/signin",
        { email, password },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const { refreshToken } = res.data;
      if (res?.status === 201) {
        toast.success("Login Successfully");
        sessionStorage.setItem("rToken", refreshToken);
        navigate("/seller");
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
        return;
      }
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center">Seller Login</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/seller-signup")}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Flex mt={"md"} justify={"space-between"} align={"center"}>
            <Link
              to="/forget-password"
              style={{
                fontSize: "14px",
                color: "#387DD6",
              }}
            >
              Forget password
            </Link>
          </Flex>
          <Button fullWidth mt="xl" size="md" type="submit" loading={lodaing}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
