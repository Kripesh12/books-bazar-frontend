import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { axiosPrivateInstance } from "../../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertComponent from "../../../utils/AlertComponent";
import { CategoryInterface } from "./ListNewBook";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
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
  const headers = ["Title", "Image", "Author", "Price", "Publisher", "Action"];
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
    console.log(res.data);
    return res.data;
  }

  const { data, isError, error } = useQuery({
    queryKey: ["list-book"],
    queryFn: fetchProduct,
  });

  if (isError) {
    return <AlertComponent title="Error Occurred" message={error.message} />;
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirm Action">
        <Text>Do you want to delete the listed book?</Text>
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
            Confirm
          </Button>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Paper bg={"white"} p={20} mt={40} shadow="md" radius={"md"}>
        <Flex justify={"space-between"} align={"center"}>
          <Text fw={"bold"} fz={18}>
            Total Books : {data?.length}
          </Text>
          <Button onClick={() => navigate("/seller/list-new-book")}>
            List Book
          </Button>
        </Flex>
        <Table mt={30}>
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
                <Table.Td>{book.title}</Table.Td>
                <Table.Td>
                  <Image src={book.photo} w={50} />
                </Table.Td>
                <Table.Td>{book.author}</Table.Td>
                <Table.Td>{book.price}</Table.Td>
                <Table.Td>{book.publisher}</Table.Td>
                <Table.Td>
                  <Flex gap={8}>
                    <FaEdit
                      cursor={"pointer"}
                      size={20}
                      onClick={() => {
                        handleEditBook(book);
                      }}
                    />
                    <MdDelete
                      cursor={"pointer"}
                      size={20}
                      color="red"
                      onClick={() => deleteModal(book.id)}
                    />
                  </Flex>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </>
  );
}
