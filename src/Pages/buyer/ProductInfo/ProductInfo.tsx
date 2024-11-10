import { Box, Button, Divider, Flex, Group, Image, Text } from "@mantine/core";
import { useState } from "react";
export default function ProductInfo() {
  const [count, setCount] = useState(1);
  return (
    <Box mt={60}>
      <Box>
        <Flex gap={40}>
          {/* Product Image */}
          <Image
            w={400}
            h={600}
            src={
              "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg"
            }
          />

          {/* Product Info */}
          <Box mt={20}>
            <Text fz={40} fw={"bold"}>
              Subtle Art of not giving a fuck
            </Text>
            <Group>
              <Text fz={18} c={"dark"}>
                by
              </Text>
              <Text fz={24}>Kripesh Sharma</Text>
            </Group>
            <Divider size={2} mt={10} />

            {/* Sypnosis */}
            <Box mt={20}>
              <Text fz={24} fw={"bold"}>
                Sypnosis
              </Text>
              <Text fz={18}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus officiis commodi quidem hic cumque optio velit ullam
                suscipit perspiciatis impedit ex laboriosam, fugit inventore
                eaque quos dolor voluptatem quis voluptatibus?
              </Text>
            </Box>

            {/* Action */}
            <Box mt={20}>
              <Text fz={32} fw={"bold"}>
                Rs 1234
              </Text>
              <Group mt={10}>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (count == 1) return;
                    setCount((prev) => prev - 1);
                  }}
                >
                  -
                </Button>
                <Text fz={18}>{count}</Text>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCount((prev) => prev + 1);
                  }}
                >
                  +
                </Button>
              </Group>
              <Button mt={20} size="lg">
                ADD TO CART
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
