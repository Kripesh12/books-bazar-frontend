import {
  Button,
  Center,
  Flex,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import DropZone from "../../../utils/DropZone";
import { axiosPrivateInstance } from "../../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AlertComponent from "../../../utils/AlertComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { BookInterface } from "./ListBook";

interface FormValues {
  title: string;
  description: string;
  author: string;
  publisher: string;
  edition: string;
  condition: string;
  photo: File | null | string;
  price: number;
  categoryIds: CategoryInterface[];
}

export interface CategoryInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
}

export default function EditBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book as BookInterface;
  const [imagePreview, setImagePreview] = useState<string | null>(
    book.photo as string
  );

  const form = useForm<FormValues>({
    initialValues: {
      title: book.title,
      description: book.description,
      author: book.author,
      publisher: book.publisher,
      edition: book.edition,
      condition: book.condition,
      photo: book.photo,
      price: book.price,
      categoryIds: book.categoryIds,
    },
    validate: {
      title: (value) => (value ? null : "Title is required"),
      description: (value) => (value ? null : "Description is required"),
      author: (value) => (value ? null : "Author is required"),
      publisher: (value) => (value ? null : "Publisher is required"),
      edition: (value) => (value ? null : "Edition is required"),
      condition: (value) => (value ? null : "Condition is required"),
      photo: (value) => (value ? null : "Please select Image"),
      price: (value) => (value > 0 ? null : "Price must be a positive number"),
      categoryIds: (value) =>
        value.length === 0 ? "Please select a category" : null,
    },
  });

  //Image Handeling
  const handleDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setImagePreview(URL.createObjectURL(selectedFile));
    form.setFieldValue("photo", selectedFile);
  };

  const handleDeleteIcon = () => {
    form.setFieldValue("image", null);
    setImagePreview(null);
  };

  //Fetch all the category
  async function fetchCategory() {
    const res = await axiosPrivateInstance.get("/category");
    return res.data;
  }
  const {
    data: fetchedCategory,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  const categoryData = fetchedCategory?.map((category: CategoryInterface) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  //Add the book
  async function handleEdit() {
    const data = form.getValues();
    console.log(data.categoryIds);
    const res = await axiosPrivateInstance.patch(`book/${book.id}`, {
      title: data.title,
      description: data.description,
      author: data.author,
      publisher: data.publisher,
      edition: data.edition,
      condition: data.condition,
      price: data.price,
      categoryIds: data.categoryIds,
    });
    console.log("Data from be: ", res.data);
    if (data.photo instanceof File) {
      const formData = new FormData();
      formData.append("photo", data.photo);
      await axiosPrivateInstance.patch(
        `book/updatePhoto/${book.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  }

  const mutation = useMutation({
    mutationFn: handleEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-book"] });
      form.reset();
      navigate("/seller/list-book");
      toast.success("Book edited successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  //Error Handeling
  if (isError) {
    return <AlertComponent title="Error Occurred" message={error.message} />;
  }
  return (
    <form
      onSubmit={form.onSubmit(() => {
        mutation.mutate();
      })}
    >
      <Paper bg={"white"} p={40} mt={40} shadow="md" radius={"md"}>
        <Center>
          <Text fz={24} fw={"bold"}>
            List New Book
          </Text>
        </Center>
        <Flex direction={"column"} gap={20} mt={20}>
          <TextInput
            label="Title"
            placeholder="Enter book's title"
            withAsterisk
            size="md"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />

          <Textarea
            label="Description"
            placeholder="Enter book's description"
            withAsterisk
            size="md"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />

          <TextInput
            label="Author"
            placeholder="Enter the author's name"
            withAsterisk
            size="md"
            key={form.key("author")}
            {...form.getInputProps("author")}
          />

          <TextInput
            label="Publisher"
            placeholder="Enter the publisher's name"
            withAsterisk
            size="md"
            key={form.key("publisher")}
            {...form.getInputProps("publisher")}
          />

          <TextInput
            label="Edition"
            placeholder="Enter the edition of the book"
            withAsterisk
            size="md"
            key={form.key("edition")}
            {...form.getInputProps("edition")}
          />
          <Select
            label="Condition"
            placeholder="Enter the condition of the book"
            data={[
              "New",
              "Like New",
              "Very Good",
              "Good",
              "Acceptable",
              "Poor",
            ]}
            size="md"
            withAsterisk
            key={form.key("condition")}
            {...form.getInputProps("condition")}
          />
          <NumberInput
            label="Price"
            placeholder="Enter the price"
            withAsterisk
            size="md"
            key={form.key("price")}
            {...form.getInputProps("price")}
          />

          <MultiSelect
            label="Genre"
            placeholder={isLoading ? "Loading the genre" : "Select Genre"}
            disabled={isLoading}
            searchable
            data={categoryData}
            size="md"
            withAsterisk
            clearable
            key={form.key("categoryIds")}
            {...form.getInputProps("categoryIds")}
          />
          <DropZone
            onDrop={handleDrop}
            currentImageUrl={imagePreview}
            onDelete={handleDeleteIcon}
          />
          {form.errors.photo && <Text c={"red"}>{form.errors.photo}</Text>}
          <Button size="md" type="submit" loading={mutation.isPending}>
            Submit
          </Button>
        </Flex>
      </Paper>
    </form>
  );
}
