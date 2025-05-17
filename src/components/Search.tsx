import {
  Box,
  Center,
  Image,
  Input,
  Loader,
  Modal,
  Text,
  Paper,
  Stack,
  Title,
  rem,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import { axiosPublicInstance } from "../api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "./SearchResult";
import { BookInterface } from "../Pages/seller/ListBook/ListBook";

interface SearchProps {
  width?: string | number;
}

export default function Search({ width }: SearchProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchTerm, 500);
  const [isSearchActive, setIsSearchActive] = useState(false);

  async function searchBook(query: string) {
    try {
      if (!query) return;
      const res = await axiosPublicInstance.get("/book/search", {
        params: { query },
      });
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(
          err.response?.data?.message ?? "Failed to fetch the books"
        );
      }
      throw err;
    }
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`searchof${debouncedSearch}`],
    queryFn: () => searchBook(debouncedSearch),
    enabled: isSearchActive && debouncedSearch.trim() !== "",
  });

  useEffect(() => {
    setIsSearchActive(debouncedSearch.trim() !== "");
  }, [debouncedSearch]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        closeOnEscape
        size={600}
        withCloseButton={false}
        padding="xl"
        radius="md"
        transitionProps={{ transition: "slide-down" }}
      >
        <Stack gap="md">
          <Input
            placeholder="Search books by title, author or ISBN..."
            size="lg"
            radius="md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            leftSection={
              <FaSearch style={{ width: rem(18), height: rem(18) }} />
            }
          />

          <Box mih={300}>
            {isLoading ? (
              <Center h={300}>
                <Loader size="xl" type="dots" />
              </Center>
            ) : isError ? (
              <Paper bg="var(--mantine-color-red-light)" p="md" radius="md">
                <Text c="red" ta="center">
                  Failed to search: {error.message}
                </Text>
              </Paper>
            ) : isSearchActive && data?.length ? (
              <Stack gap="sm">
                <Text c="dimmed" size="sm">
                  Found {data.length} {data.length === 1 ? "result" : "results"}
                </Text>
                {data.map((book: BookInterface) => (
                  <SearchResult book={book} key={book.id} close={close} />
                ))}
              </Stack>
            ) : isSearchActive ? (
              <Center h={300}>
                <Stack align="center" gap="xs">
                  <FaBookOpen size={48} style={{ opacity: 0.5 }} />
                  <Title order={4} fw={500}>
                    No books found
                  </Title>
                  <Text c="dimmed" ta="center">
                    Try different search terms
                  </Text>
                </Stack>
              </Center>
            ) : (
              <Center h={300}>
                <Stack align="center" gap="xs">
                  <Image
                    src="src/assets/image/search.png"
                    w={300}
                    alt="Search books"
                    style={{ opacity: 0.8 }}
                  />
                  <Title order={4} fw={500}>
                    Search our book collection
                  </Title>
                  <Text c="dimmed" ta="center">
                    Find books by title, author or ISBN
                  </Text>
                </Stack>
              </Center>
            )}
          </Box>
        </Stack>
      </Modal>

      <Box>
        <Input
          placeholder="Search books..."
          w={width}
          radius="md"
          onClick={open}
          leftSection={<FaSearch style={{ width: rem(16), height: rem(16) }} />}
          readOnly
          styles={{
            input: {
              cursor: "pointer",
            },
          }}
        />
      </Box>
    </>
  );
}
