import React from "react";
import { ChakraProvider as CProvider } from "@chakra-ui/react";
import { theme } from "./";

export const ChakraProvider: React.FC = ({ children }) => (
  <CProvider theme={theme}>{children}</CProvider>
);
