import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import "@fontsource/milonga"
import "@fontsource/montserrat"
import './index.css'
import {ExpandableStateProvider} from "./context";

const theme = extendTheme({
    fonts: {
        heading: `Lora, sans-serif`,
        body: "Montserrat, sans-serif"
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
