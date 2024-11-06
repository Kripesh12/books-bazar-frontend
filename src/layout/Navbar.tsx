import { Box, Flex, Text } from "@mantine/core";
import Search from "../components/Search";

export default function Navbar() {
  return (
    <Box mt={10}>
      <Flex justify={"space-between"} align={"center"}>
        <Text>BooksBazar</Text>
        <Search width={250} />
        <Flex gap={20}>
          <Text>Seller</Text>
          <Text>Login</Text>
          <Text>Signup</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
