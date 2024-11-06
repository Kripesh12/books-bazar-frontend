import { Box, Input } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  width?: string | number;
}

export default function Search({ width }: SearchProps) {
  return (
    <Box>
      <Input
        placeholder="Search for product"
        w={width}
        leftSection=<FaSearch />
      />
    </Box>
  );
}
