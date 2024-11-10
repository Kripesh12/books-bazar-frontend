import { Box, Flex } from "@mantine/core";
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

export default function SellerNavbar() {
  return (
    <Box>
      <Flex justify={"space-between"} align={"center"}>
        <StyledLink to={"/seller"}>BooksBazar - Seller</StyledLink>
        <Flex gap={20}>
          <StyledLink to={"#"}>Logout</StyledLink>
        </Flex>
      </Flex>
    </Box>
  );
}
