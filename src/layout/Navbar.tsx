import {
  Box,
  Flex,
  Text,
  Burger,
  Drawer,
  Modal,
  Button,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Search from "../components/Search";
import { Link, useNavigate } from "react-router-dom";
import useBuyerAuthStore from "../providers/useBuyerAuthStore";
import { useCartStore } from "../providers/useCartStore";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [logoutOpened, { open: openLogout, close: closeLogout }] =
    useDisclosure(false);
  const { isAuth, clearAccessToken, setIsAuth } = useBuyerAuthStore();
  const { clearCart, getTotalItems } = useCartStore();
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    clearAccessToken();
    setIsAuth(false);
    clearCart();
    navigate("/");
  }

  const handleLogout = () => {
    logout();
    closeLogout();
  };

  return (
    <Box component="nav" py="sm" px={{ base: "sm", md: "lg" }}>
      <Flex justify="space-between" align="center" gap="md">
        {/* Logo/Brand */}
        <Text
          component={Link}
          to="/"
          fz={{ base: "xl", md: "xxl" }}
          fw={700}
          c="orange.6"
          style={{ textDecoration: "none" }}
        >
          BooksBazar
        </Text>

        {/* Desktop Search - hidden on mobile */}
        <Box display={{ base: "none", sm: "none", md: "block" }} mx="xl">
          <Search width="100%" />
        </Box>

        {/* Desktop Navigation - hidden on mobile */}
        <Flex
          gap={{ base: "sm", md: "xl" }}
          display={{ base: "none", md: "flex" }}
        >
          {isAuth ? (
            <>
              <Text
                component={Link}
                to="/cart"
                fw={500}
                c="gray.7"
                style={{ textDecoration: "none" }}
              >
                Cart ({getTotalItems()})
              </Text>
              <Text
                component="button"
                fw={500}
                c="red.6"
                style={{
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={openLogout}
              >
                Logout
              </Text>
            </>
          ) : (
            <>
              <Text
                component={Link}
                to="/seller-login"
                fw={500}
                c="gray.7"
                style={{ textDecoration: "none" }}
              >
                Seller
              </Text>
              <Text
                component={Link}
                to="/login"
                fw={500}
                c="gray.7"
                style={{ textDecoration: "none" }}
              >
                Login
              </Text>
              <Text
                component={Link}
                to="/signup"
                fw={500}
                style={{ textDecoration: "none" }}
              >
                Sign Up
              </Text>
            </>
          )}
        </Flex>

        {/* Mobile Search - hidden on desktop */}
        <Box display={{ base: "block", md: "none" }}>
          <Search width={150} />
        </Box>
        {/* Mobile menu button - hidden on desktop */}
        <Burger
          opened={opened}
          onClick={toggle}
          display={{ base: "block", md: "none" }}
          size="sm"
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="80%"
        title="Menu"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Flex pt="xl" direction={"column"} gap="md">
          <Search width="100%" />
          {isAuth ? (
            <>
              <Text
                component={Link}
                to="/cart"
                fz="lg"
                py="sm"
                onClick={close}
                style={{ textDecoration: "none" }}
                c="gray.7"
              >
                My Cart ({getTotalItems()})
              </Text>
              <Text
                component="button"
                fz="lg"
                py="sm"
                onClick={() => {
                  close();
                  openLogout();
                }}
                style={{
                  textDecoration: "none",
                  color: "var(--mantine-color-red-6)",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Group gap="xs">
                  <MdLogout size={18} />
                  Logout
                </Group>
              </Text>
            </>
          ) : (
            <>
              <Text
                component={Link}
                to="/seller-login"
                fz="lg"
                py="sm"
                onClick={close}
                style={{ textDecoration: "none" }}
                c="gray.7"
              >
                Seller Login
              </Text>
              <Text
                component={Link}
                to="/login"
                fz="lg"
                py="sm"
                onClick={close}
                style={{ textDecoration: "none" }}
                c="gray.7"
              >
                User Login
              </Text>
              <Text
                component={Link}
                to="/signup"
                fz="lg"
                py="sm"
                onClick={close}
                style={{
                  textDecoration: "none",
                  color: "var(--mantine-color-orange-6)",
                }}
              >
                Create Account
              </Text>
            </>
          )}
        </Flex>
      </Drawer>

      {/* Logout Confirmation Modal */}
      <Modal
        opened={logoutOpened}
        onClose={closeLogout}
        title="Confirm Logout"
        centered
      >
        <Text mb="xl">Are you sure you want to logout?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={closeLogout}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleLogout}
            leftSection={<MdLogout size={18} />}
          >
            Logout
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
