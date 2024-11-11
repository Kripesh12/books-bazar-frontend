import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Loader,
  Text,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPublicInstance } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import AlertComponent from "../../../utils/AlertComponent";
import useBuyerAuthStore from "../../../providers/useBuyerAuthStore";
import { toast } from "react-toastify";
export default function ProductInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth } = useBuyerAuthStore();

  function handelAddToCart() {
    if (!isAuth) {
      navigate("/login");
      toast.error("User must be logged in");
      return;
    }
  }

  //Fetch Book
  async function fetchBookById() {
    const res = await axiosPublicInstance.get(`/book/${id}`);
    return res.data;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookbyid"],
    queryFn: fetchBookById,
  });

  if (isLoading) {
    return (
      <Center mt={20}>
        <Loader size={"lg"} />
      </Center>
    );
  }

  if (isError) {
    return <AlertComponent message={error.message} title="An error occured" />;
  }

  return (
    <Box mt={60}>
      <Box>
        <Flex gap={40}>
          {/* Product Image */}
          <Image w={400} h={600} src={data.photo} />

          {/* Product Info */}
          <Box mt={20} w={"100%"}>
            <Text fz={40} fw={"bold"}>
              {data.title}
            </Text>
            <Group>
              <Text fz={18} c={"dark"}>
                by
              </Text>
              <Text fz={24}>{data.author}</Text>
            </Group>
            <Divider size={2} mt={10} />

            {/* Sypnosis */}
            <Box mt={20}>
              <Text fz={24} fw={"bold"}>
                Description
              </Text>
              <Text fz={18}>{data.description}</Text>
            </Box>

            {/* Action */}
            <Box mt={20}>
              <Text fz={32} fw={"bold"}>
                Rs {data.price}
              </Text>
              <Button mt={20} size="lg" onClick={handelAddToCart}>
                ADD TO CART
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
