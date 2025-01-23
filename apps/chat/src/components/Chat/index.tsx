import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    VStack,
    HStack,
    Text,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

interface Message {
    text: string;
    clientId: string;
}

const socket = io('http://localhost:3005');

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [clientId, setClientId] = useState<string | null>(null);

    useEffect(() => {
        socket.on('connect', () => {
            setClientId(socket.id);
        });

        socket.on('user-joined', (data: { message: string, clientId: string }) => {
            const joinMessage = { text: data.message, clientId: data.clientId };
            setMessages((prevMessages) => [...prevMessages, joinMessage]);
        });

        socket.on('user-left', (data: { message: string, clientId: string }) => {
            const leaveMessage = { text: data.message, clientId: data.clientId };
            setMessages((prevMessages) => [...prevMessages, leaveMessage]);
            setClientId(null);
        });

        socket.on('message', (message: { text: string, sender: string, clientId: string }) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('connect');
            socket.off('user-joined');
            socket.off('user-left');
            socket.off('message');
        };
    }, []);

    useEffect(() => {
        if (clientId === null) {
            setClientId(socket.id);
        }
    }, [clientId]);

    const handleSendMessage = () => {
        if (!inputValue) return;

        const newMessage = { text: inputValue, clientId: clientId! };

        socket.emit('newMessage', newMessage);

        setInputValue('');
    };

    return (
        <VStack justifyContent={"space-between"} spacing={4} align="stretch" p={4} borderRadius="lg">
            <Box flex="1" overflowY="hidden">
                {messages.map((message, index) => (
                    <HStack key={index} justifyContent={message.clientId === clientId ? 'flex-end' : 'flex-start'}>
                        <Box
                            bg={message.clientId === clientId ? 'blue.400' : 'gray.700'}
                            color={message.clientId === clientId ? 'white' : 'gray.200'}
                            py={2}
                            px={4}
                            borderRadius="lg"
                            boxShadow="md"
                            maxWidth="80%"
                            mt={2}
                            textAlign={message.clientId === clientId ? 'right' : 'left'}
                        >
                            <Text fontSize="sm" fontWeight="bold" mb={1}>{message.clientId === clientId ? 'You' : message.clientId}</Text>
                            <Text fontSize="md">{message.text}</Text>
                        </Box>
                    </HStack>
                ))}
            </Box>
            <InputGroup>
                <Input
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    bg="gray.700"
                    color="white"
                    borderRadius="lg"
                    _focus={{ boxShadow: 'none' }}
                />
                <InputRightElement>
                    <IconButton
                        icon={<FaPaperPlane />}
                        aria-label="Send message"
                        onClick={handleSendMessage}
                        variant="ghost"
                        colorScheme="blue"
                        borderRadius="lg"
                        _hover={{ bg: 'blue.500', color: 'white' }}
                        _active={{ bg: 'blue.600', color: 'white' }}
                    />
                </InputRightElement>
            </InputGroup>
        </VStack>
    );
};

export default Chat;
