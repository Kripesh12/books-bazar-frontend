import { Box, Center, Image, Input, Loader, Modal, Text } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { axiosPublicInstance } from "../api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "./SearchResult";
import { BookInterface } from "../Pages/seller/ListBook/ListBook";
import AlertComponent from "../utils/AlertComponent";

interface SearchProps {
  width?: string | number;
}

export default function Search({ width }: SearchProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [debouncedSearch] = useDebouncedValue(searchTerm, 500);
  const [isSearchActive, setIsSearchActive] = useState(false);

  async function searchBook(query: string) {
    try {
      if (!query) return;
      const res = await axiosPublicInstance.get("/book/search", {
        params: { query },
      });
      console.log(res.data);
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
    if (debouncedSearch) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false); // Reset search when input is cleared
    }
  }, [debouncedSearch]);

  if (isError) {
    return (
      <AlertComponent
        title="An error occured in search"
        message={error.message}
      />
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        closeOnEscape
        size={500}
        withCloseButton={false}
      >
        <Input
          placeholder="Search in booksbazar"
          size="md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isSearchActive ? (
          <Box mt="md">
            {isLoading ? (
              <Loader size="lg" mx="auto" />
            ) : isSearchActive && data?.length ? (
              data.map((book: BookInterface) => (
                <SearchResult book={book} key={book.id} />
              ))
            ) : (
              <Text ta={"center"}>No product found</Text>
            )}
          </Box>
        ) : (
          <Box>
            <Center>
              <Image src={"src/assets/image/search.png"} w={400} />
            </Center>
          </Box>
        )}
      </Modal>
      <Box>
        <Input
          placeholder="Search in booksbazar"
          w={width}
          leftSection=<FaSearch />
          onClick={open}
        />
      </Box>
    </>
  );
}
