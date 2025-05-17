/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Center,
  Flex,
  Group,
  Paper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivateInstance } from "../../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  description: string;
}

interface LocationState {
  category: {
    id: string;
    name: string;
    description: string;
  };
}

export default function EditCategory() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state as LocationState;

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

  useEffect(() => {
    if (category) {
      form.setValues({
        name: category.name,
        description: category.description,
      });
    }
  }, [category]);

  // Update Category
  async function handleSubmit(values: FormValues) {
    await axiosPrivateInstance.patch(`/category/${category.id}`, values);
  }

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
      navigate("/seller/list-category");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
      <Paper bg={"white"} p={40} mt={40} shadow="md" radius={"md"}>
        <Center>
          <Text fz={24} fw={"bold"}>
            Edit Genre
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

          <Group justify="space-between" mt="md">
            <Button
              variant="outline"
              onClick={() => navigate("/seller/categories")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={mutation.isPending}>
              Update Genre
            </Button>
          </Group>
        </Flex>
      </Paper>
    </form>
  );
}
