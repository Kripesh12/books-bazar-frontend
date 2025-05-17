import { useQuery } from "@tanstack/react-query";
import { axiosPrivateInstance } from "../../../api";

export default function ListSoldBook() {
  async function getSoldBooks() {
    const { data } = await axiosPrivateInstance.get("/book/getall-soldbooks");
    return data;
  }

  const { data } = useQuery({
    queryKey: ["sold-books"],
    queryFn: getSoldBooks,
  });

  console.log(data);
  return <div>ListSoldBook</div>;
}
