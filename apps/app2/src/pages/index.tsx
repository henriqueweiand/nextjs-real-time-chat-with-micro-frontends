import {
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton,
  useDisclosure
} from '@chakra-ui/react';
import dynamic from "next/dynamic";
import React, { useEffect } from 'react';
import { FaComments } from 'react-icons/fa';

const ChatApp = dynamic(
  () => import("chat/App").then((m) => m.App),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const ChatDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen(true)
  }, [])

  return (
    <>
      <IconButton
        aria-label="Open chat"
        icon={<FaComments />}
        onClick={onOpen}
        position="fixed"
        bottom="4"
        right="4"
        zIndex="1"
        bg="gray.800"
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.900' }}
      />
      <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Chat</DrawerHeader>
          <DrawerBody p={0}>
            <ChatApp />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
