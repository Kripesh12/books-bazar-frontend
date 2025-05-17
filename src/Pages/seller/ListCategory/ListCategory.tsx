import {
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  Table,
  Text,
  Loader,
  Center,
  Box,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { axiosPrivateInstance } from "../../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertComponent from "../../../utils/AlertComponent";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete, MdCategory } from "react-icons/md";

export interface CategoryInterface {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
}

export default function ListCategories() {
  const headers = ["Name", "Description", "Created At", "Action"];
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Edit Category
  function handleEditCategory(category: CategoryInterface) {
    navigate("/seller/edit-category", { state: { category } });
  }

  // Delete Category
  function deleteModal(id: string) {
    open();
    setSelectedId(id);
  }

  async function handleDelete(id: string) {
    await axiosPrivateInstance.delete(`category/${id}`);
  }

  const deleteMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      close();
      toast.success("Category deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  // Fetch Categories
  async function fetchCategories() {
    const res = await axiosPrivateInstance.get("/category");
    return res.data;
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
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
          Are you sure you want to delete this category? This action cannot be
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
            <MdCategory size={24} />
            <Text fw={600} fz="xl">
              Book Categories
            </Text>
            <Badge color="blue" variant="light" size="lg">
              {data?.length || 0} genres
            </Badge>
          </Group>
          <Button
            leftSection={<FaPlus size={18} />}
            onClick={() => navigate("/seller/add-category")}
            radius="md"
          >
            Add New Genre
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
            <MdCategory size={48} color="#adb5bd" />
            <Text mt="md" c="dimmed" fz="lg">
              No categories found
            </Text>
            <Text mb="md" c="dimmed" fz="sm">
              Start by adding your first book genre
            </Text>
            <Button
              onClick={() => navigate("/seller/add-category")}
              leftSection={<FaPlus size={16} />}
              radius="md"
            >
              Add First Genre
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
              {data?.map((category: CategoryInterface) => (
                <Table.Tr key={category.id}>
                  <Table.Td>
                    <Text fw={500}>{category.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed" lineClamp={1}>
                      {category.description}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    {new Date(category.createdAt).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>
                    <Flex gap="sm">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleEditCategory(category)}
                      >
                        <FaEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => deleteModal(category.id)}
                      >
                        <MdDelete size={18} />
                      </ActionIcon>
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
