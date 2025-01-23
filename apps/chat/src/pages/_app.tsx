import { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from 'theme'

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} key={rest.router.asPath} />
    </ChakraProvider>
  )
}

export default MyApp;
