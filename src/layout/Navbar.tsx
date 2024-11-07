import { Box, Flex, Text } from "@mantine/core";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #202020;
  font-weight: bold;
  &:hover {
    color: #ff7349;
  }
`;

export default function Navbar() {
  return (
    <Box mt={10}>
      <Flex justify={"space-between"} align={"center"}>
        <StyledLink to={"/"}>BooksBazar</StyledLink>
        <Search width={250} />
        <Flex gap={20}>
          <Text>Seller</Text>
          <StyledLink to={"/login"}>Login</StyledLink>
          <StyledLink to={"/signup"}>Signup</StyledLink>
        </Flex>
      </Flex>
    </Box>
  );
}
