import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import List from "./Function";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <List />
  </ChakraProvider>,
  document.getElementById("root")
);
