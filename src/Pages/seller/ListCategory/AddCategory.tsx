import {
  Button,
  Center,
  Flex,
  Paper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { axiosPrivateInstance } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  description: string;
}

export default function AddCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) => (value ? null : "Name is required"),
      description: (value) => (value ? null : "Description is required"),
    },
  });

  // Add Category
  async function handleSubmit(values: FormValues) {
    await axiosPrivateInstance.post("/category", values);
  }

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.reset();
      navigate("/seller/list-category");
      toast.success("Category added successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
      <Paper bg={"white"} p={40} mt={40} shadow="md" radius={"md"}>
        <Center>
          <Text fz={24} fw={"bold"}>
            Add New Genre
          </Text>
        </Center>
        <Flex direction={"column"} gap={20} mt={20}>
          <TextInput
            label="Genre Name"
            placeholder="e.g., Thriller, Romance, Fantasy"
            withAsterisk
            size="md"
            {...form.getInputProps("name")}
          />

          <Textarea
            label="Description"
            placeholder="Describe this genre"
            withAsterisk
            size="md"
            minRows={3}
            {...form.getInputProps("description")}
          />

          <Button size="md" type="submit" loading={mutation.isPending}>
            Create Genre
          </Button>
        </Flex>
      </Paper>
    </form>
  );
}
