import { Helmet } from "react-helmet";
import {
  Container,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Navigation />
      <Container maxW="3xl" pt={24}>
        <VStack spacing={6} h="300px">
          <Heading fontSize={{ base: "3xl", lg: "5xl" }}>
            These aren't the droids you were looking for.
          </Heading>
          <Text color="gray.500" mt={2}>
            This is a 404 error, which means you've clicked on a bad link or
            entered an invalid URL. Maybe what you are looking for can be found
            at Bitly.com. P.S. links are case sensitive.
          </Text>
          <ChakraLink as={Link} to="/" color="purple.500" alignSelf="baseline">
            Generate a new link
          </ChakraLink>
        </VStack>
      </Container>
    </>
  );
};

export default NotFound;
