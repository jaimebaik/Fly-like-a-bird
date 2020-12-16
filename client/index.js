import React from 'react';
import ReactDom from 'react-dom';
import App from './Components/App.jsx';
import { ChakraProvider } from "@chakra-ui/react";



// render app.jsx app component
ReactDom.render(<ChakraProvider>
                  <App />
                </ChakraProvider>, 
                document.getElementById("contents"));