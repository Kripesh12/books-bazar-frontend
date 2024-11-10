import { AppShell, Burger, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SellerNavbar from "./SellerNavbar";
import { NavLink, Outlet } from "react-router-dom";

export default function SellerLayout() {
  const [opened, { toggle }] = useDisclosure();

  //Navlinks List
  const navLinkList = [
    {
      text: "Dashboard",
      path: "dashboard",
    },
    {
      text: "List Book",
      path: "list-book",
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header py={10} px={20}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <SellerNavbar />
      </AppShell.Header>

      <AppShell.Navbar bg={"blue"}>
        <Flex direction={"column"} gap={10} style={{ overflow: "auto" }}>
          {navLinkList.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={toggle}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "white" : "",
                  textDecoration: "none",
                  color: "black",
                })}
              >
                <Flex align={"center"} gap={10} p={10}>
                  <Text fz={18}>{item.text}</Text>
                </Flex>
              </NavLink>
            );
          })}
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main bg="#f0f0fa">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
