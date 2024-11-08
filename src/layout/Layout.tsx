import { Container } from "@mantine/core";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Container maw={1370}>
      <Navbar />
      <Outlet />
    </Container>
  );
}
