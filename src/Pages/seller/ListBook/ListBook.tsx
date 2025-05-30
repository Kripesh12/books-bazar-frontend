import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  Paper,
  Table,
  Text,
  Loader,
  Center,
  Box,
  Badge,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { axiosPrivateInstance } from "../../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertComponent from "../../../utils/AlertComponent";
import { CategoryInterface } from "./ListNewBook";
import { MdBook, MdDelete } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export interface BookInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
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

export default function ListBook() {
  const headers = [
    "Title",
    "Image",
    "Author",
    "Price",
    "Publisher",
    "Status",
    "Action",
  ];
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //Edit Product
  function handleEditBook(book: BookInterface) {
    navigate("/seller/edit-book", { state: { book } });
  }

  //Delete Product
  function deleteModal(id: string) {
    open();
    setSelectedId(id);
  }

  async function handelDelete(id: string) {
    await axiosPrivateInstance.delete(`book/${id}`);
  }

  const deleteMutation = useMutation({
    mutationFn: handelDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-book"] });
      close();
      toast.success("Book deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  //Fetch the product
  async function fetchProduct() {
    const res = await axiosPrivateInstance.get("/book/getAll");
    return res.data;
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["list-book"],
    queryFn: fetchProduct,
  });

  if (isError) {
    return <AlertComponent title="Error Occurred" message={error.message} />;
  }

  if (isLoading) {
    return (
      <Center h={300}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirm Deletion" centered>
        <Text mb="md">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </Text>
        <Group mt={"md"}>
          <Button
            color="red"
            loading={deleteMutation.isPending}
            onClick={() => {
              if (selectedId) {
                deleteMutation.mutate(selectedId);
              }
            }}
          >
            Delete
          </Button>
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <Paper bg={"white"} p="lg" mt="xl" shadow="sm" radius={"md"} withBorder>
        <Flex justify={"space-between"} align={"center"} mb="xl">
          <Group>
            <MdBook size={24} />
            <Text fw={600} fz="xl">
              Your Books
            </Text>
            <Badge color="blue" variant="light" size="lg">
              {data?.length || 0} items
            </Badge>
          </Group>
          <Button
            leftSection={<FaPlus size={18} />}
            onClick={() => navigate("/seller/list-new-book")}
            radius="md"
          >
            Add New Book
          </Button>
        </Flex>

        {data?.length === 0 ? (
          <Box
            p="xl"
            style={{
              border: "1px dashed #e0e0e0",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <MdBook size={48} color="#adb5bd" />
            <Text mt="md" c="dimmed" fz="lg">
              You haven't listed any books yet
            </Text>
            <Text mb="md" c="dimmed" fz="sm">
              Start by adding your first book to sell
            </Text>
            <Button
              onClick={() => navigate("/seller/list-new-book")}
              leftSection={<FaPlus size={16} />}
              radius="md"
            >
              List Your First Book
            </Button>
          </Box>
        ) : (
          <Table
            striped
            highlightOnHover
            verticalSpacing="md"
            horizontalSpacing="lg"
          >
            <Table.Thead>
              <Table.Tr>
                {headers.map((header) => (
                  <Table.Th key={header}>{header}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((book: BookInterface) => (
                <Table.Tr key={book.id}>
                  <Table.Td>
                    <Text fw={500}>{book.title}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Image
                      src={book.photo}
                      width={60}
                      height={80}
                      fit="contain"
                      fallbackSrc="https://placehold.co/60x80?text=No+Image"
                      radius="sm"
                    />
                  </Table.Td>
                  <Table.Td>{book.author}</Table.Td>
                  <Table.Td>
                    <Badge color="green" variant="light">
                      Rs {book.price.toFixed(2)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{book.publisher}</Table.Td>
                  <Table.Td>
                    <Badge color="teal" variant="dot">
                      Active
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Flex gap="sm">
                      <Button
                        variant="subtle"
                        color="blue"
                        size="compact-sm"
                        leftSection={<FaEdit size={14} />}
                        onClick={() => handleEditBook(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="subtle"
                        color="red"
                        size="compact-sm"
                        leftSection={<MdDelete size={16} />}
                        onClick={() => deleteModal(book.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Paper>
    </>
  );
}
