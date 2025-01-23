import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import dynamic from "next/dynamic";

const ChatApp = dynamic(
  () => import("chat/App").then((m) => m.App),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  return (
    <Center display={"flex"} flexDirection="column">
      <Box px={4} py={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading color="white" size="lg">
            My APP
          </Heading>
        </Flex>
      </Box>
      <Box maxW='lg' width={'100%'} borderRadius="md" boxShadow="md">
        <ChatApp />
      </Box>
    </Center>
  );
}
