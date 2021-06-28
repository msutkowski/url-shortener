import { Helmet } from "react-helmet";
import { Container, HStack, Box, Heading, Text } from "@chakra-ui/react";
import Navigation from "../components/navigation/Navigation";

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Navigation />
      <Container maxW="4xl">
        <HStack spacing={4} h="300px">
          <Box>
            <Heading fontSize={{ base: "3xl", lg: "5xl" }}>
              These aren't the droids you were looking for.
            </Heading>
            <Text color="gray.500" mt={2}>
              This is a 404 error, which means you've clicked on a bad link or
              entered an invalid URL. Maybe what you are looking for can be
              found at Bitly.com. P.S. links are case sensitive.
            </Text>
          </Box>
        </HStack>
      </Container>
    </>
  );
};

export default NotFound;
