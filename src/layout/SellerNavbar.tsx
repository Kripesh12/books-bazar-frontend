import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSellerAuthStore from "../providers/useSellerAuthStore";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #202020;
  font-weight: bold;
  &:hover {
    color: #ff7349;
  }
`;

export default function SellerNavbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const { clearAccessToken } = useSellerAuthStore();
  const navigate = useNavigate();

  const logout = () => {
    window.sessionStorage.removeItem("rToken");
    window.localStorage.removeItem("rToken");
    clearAccessToken();
    navigate("/");
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Confirm Action">
        <Text>Do you want to logout?</Text>
        <Group mt={"md"}>
          <Button color="red" onClick={logout}>
            Confirm
          </Button>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Box>
        <Flex justify={"space-between"} align={"center"}>
          <StyledLink to={"/seller"}>BooksBazar - Seller</StyledLink>

          <Menu>
            <Group gap={8}>
              <Menu.Target>
                <Avatar size={40} style={{ cursor: "pointer" }} />
              </Menu.Target>
              <Menu.Dropdown p={20}>
                <Text c={"red"} onClick={open} style={{ cursor: "pointer" }}>
                  Logout
                </Text>
              </Menu.Dropdown>
              <Text>Kripesh</Text>
            </Group>
          </Menu>
        </Flex>
      </Box>
    </>
  );
}
