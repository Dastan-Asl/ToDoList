import React from "react";
import ReactDOM from "react-dom";
import ListFunc from "./Functional";
import ListClass from "./Class";
import { HashRouter, Route, NavLink } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, HStack, Button } from "@chakra-ui/react";

const List = () => {
  return (
    <Box p={5} borderRadius="lg">
      <HStack spacing={3}>
        <NavLink to="/functional">
          <Button>Functional</Button>
        </NavLink>
        <NavLink to="/class">
          <Button>Class</Button>
        </NavLink>
      </HStack>
    </Box>
  );
};

ReactDOM.render(
  <HashRouter>
    <ChakraProvider>
      <List />
      <Route path="/functional" component={ListFunc} />
      <Route path="/class" component={ListClass} />
    </ChakraProvider>
  </HashRouter>,
  document.getElementById("root")
);
