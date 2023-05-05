import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import "@fontsource/lora"
import "@fontsource/montserrat"
import './index.css'
import {ExpandableStateProvider} from "./context";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    fonts: {
        heading: `Lora, sans-serif`,
        body: "Montserrat, sans-serif"
    },
    styles: {
        global: {
            body: {
                bg: '#333344',
                color: 'white',
            },
        },
    },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ExpandableStateProvider>
                <App/>
            </ExpandableStateProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
