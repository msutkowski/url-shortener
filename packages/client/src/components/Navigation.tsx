import * as React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  // IoMdAdd,
  IoMdClose,
} from "react-icons/io";
import { ShrtnrIcon } from "../theme";

// Feel free to add some more paths for all of the cool pages you could make!
const pathToTitle: Record<string, string> = {
  "/": "Home",
};

const NavLink = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: React.ComponentProps<typeof Link>["to"];
}) => {
  const { pathname } = useLocation();

  const activeStyles = {
    color: "purple.500",
    fontWeight: "bold",
  };

  const isActivePath = pathname === to;

  return (
    <Link
      href={to}
      px={4}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
        ...activeStyles,
      }}
      {...(isActivePath ? activeStyles : {})}
    >
      {children}
    </Link>
  );
};

const NavLinks = () => {
  return (
    <>
      {Object.keys(pathToTitle).map((path) => (
        <NavLink key={path} to={path}>
          {pathToTitle[path]}
        </NavLink>
      ))}
    </>
  );
};

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Button
          size="md"
          icon={isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </Button>
        <HStack spacing={8} alignItems="center">
          <HStack>
            <Box as={ShrtnrIcon} color="purple.500" />{" "}
            <Text fontWeight="bold">SHRTNR</Text>
          </HStack>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLinks />
          </HStack>
        </HStack>
        {/* Leaving as a placeholder for the inevitable log in / sign up
        
        <Flex alignItems="center">
          <Button
            variant="solid"
            colorScheme="purple"
            size="sm"
            mr={4}
            leftIcon={<IoMdAdd />}
          >
            Action
          </Button>
        </Flex> */}
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <NavLinks />
          </Stack>
        </Box>
      )}
    </Box>
  );
}
