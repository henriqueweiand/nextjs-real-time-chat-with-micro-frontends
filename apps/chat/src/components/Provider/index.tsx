import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { theme } from "theme";

export const Provider: React.FC<any> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            {children}
        </ChakraProvider>
    );
}
