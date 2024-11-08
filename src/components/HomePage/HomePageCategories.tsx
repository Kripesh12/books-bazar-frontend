import { Box, Flex, Paper, Text } from "@mantine/core";

export default function HomePageCategories() {
  return (
    <Box mt={24}>
      <Text fz={24}>Genre</Text>
      <Flex mt={16} gap={20}>
        <Paper p={20} withBorder={true} shadow="md">
          Action
        </Paper>
        <Paper p={20} withBorder={true} shadow="md">
          Action
        </Paper>
        <Paper p={20} withBorder={true} shadow="md">
          Action
        </Paper>
        <Paper p={20} withBorder={true} shadow="md">
          Action
        </Paper>
        <Paper p={20} withBorder={true} shadow="md">
          Action
        </Paper>
        <Paper p={20} withBorder={true} shadow="md">
          Action
        </Paper>
        <Paper p={20} withBorder={true} shadow="md">
          Action
        </Paper>
      </Flex>
    </Box>
  );
}
