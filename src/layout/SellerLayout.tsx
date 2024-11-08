import { Container } from "@mantine/core";
import SellerNavbar from "./SellerNavbar";
import { Outlet } from "react-router-dom";

export default function SellerLayout() {
  return (
    <Container maw={1370}>
      <SellerNavbar />
      <Outlet />
    </Container>
  );
}
