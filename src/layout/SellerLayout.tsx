import {
  AppShell,
  Burger,
  Flex,
  Text,
  NavLink as MantineNavLink,
  ScrollArea,
  rem,
  Avatar,
  Group,
  UnstyledButton,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SellerNavbar from "./SellerNavbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBook, FaTags, FaUser } from "react-icons/fa";

export default function SellerLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();
  const computedColorScheme = useComputedColorScheme("light");
  const [active, setActive] = useState(0);

  // Navlinks List
  const navLinkList = [
    // {
    //   text: "Dashboard",
    //   path: "dashboard",
    //   icon: <FaChartLine size={16} />,
    // },
    // {
    //   text: "Sold Books",
    //   path: "sold-books",
    //   icon: <FaChartLine size={16} />,
    // },
    {
      text: "List Book",
      path: "list-book",
      icon: <FaBook size={16} />,
    },
    {
      text: "Book Categories",
      path: "list-category",
      icon: <FaTags size={16} />,
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header py={10} px={20}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <SellerNavbar />
      </AppShell.Header>

      <AppShell.Navbar
        style={{
          borderRight: `${rem(1)} solid ${
            computedColorScheme === "light" ? "#e0e0e0" : "#373A40"
          }`,
        }}
      >
        <AppShell.Section
          component={ScrollArea}
          grow
          mx="-xs"
          px="xs"
          style={{ overflowY: "auto" }}
        >
          <Flex direction="column" gap={4} p="sm">
            {navLinkList.map((item, index) => (
              <MantineNavLink
                key={index}
                component={NavLink}
                to={item.path}
                label={item.text}
                leftSection={item.icon}
                active={location.pathname.includes(item.path)}
                variant="light"
                onClick={() => {
                  setActive(index);
                  close();
                }}
                style={{
                  borderRadius: "8px",
                  fontWeight: active === index ? 600 : 400,
                }}
                color={computedColorScheme === "light" ? "blue" : "violet"}
              />
            ))}
          </Flex>
        </AppShell.Section>

        <AppShell.Section
          style={{
            borderTop: `${rem(1)} solid ${
              computedColorScheme === "light" ? "#e0e0e0" : "#373A40"
            }`,
          }}
          p="sm"
        >
          <UnstyledButton
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <Group>
              <Avatar
                src={null}
                alt="User"
                color={computedColorScheme === "light" ? "blue" : "violet"}
                radius="xl"
              >
                <FaUser size={14} />
              </Avatar>
              <div>
                <Text size="sm" fw={500}>
                  Seller Account
                </Text>
                <Text size="xs" c="dimmed">
                  seller@example.com
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        bg={computedColorScheme === "light" ? "#f8f9fa" : "dark.8"}
        style={{
          minHeight: "calc(100vh - var(--app-shell-header-height, 0px))",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
