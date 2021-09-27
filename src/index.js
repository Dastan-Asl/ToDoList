import React from "react";
import ReactDOM from "react-dom";
import List from "./Functional";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <List />
  </ChakraProvider>,
  document.getElementById("root")
);
