import { Helmet } from "react-helmet";
import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text,
  Fade,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { UrlGeneratorForm } from "../components/UrlGeneratorForm";
import { useCreateLinkMutation } from "../services/api";
import { Link as LinkModel } from "../services/api.generated";
import { RecentLinkItem } from "../components/RecentLinkItem";

const getHashesFromLocalStorage = () => {
  let currentHashes = [];
  const hashesFromStorage = localStorage.getItem("hashes");
  if (hashesFromStorage) {
    currentHashes = JSON.parse(hashesFromStorage);
  }
  return currentHashes;
};

export const Home = () => {
  const toast = useToast();
  const [createLink] = useCreateLinkMutation();
  const [recentHashes, setRecentHashes] = useState<LinkModel[]>(
    getHashesFromLocalStorage()
  );

  // Let's just show the most recent 3. Just a note: if you're developing and reseting the
  // database, this won't work as expected. You'll probably want to clear local storage in that case.
  const filterAndSortedHashes = [
    ...recentHashes.sort((a, b) => b.id - a.id).slice(0, 3),
  ];

  return (
    <>
      <Helmet>
        <title>Generate a link</title>
      </Helmet>
      <Container maxW="4xl">
        <Center>
          <HStack spacing={4} h="300px">
            <Box>
              <Heading fontSize={{ base: "3xl", lg: "5xl" }}>
                Tiny links, huge results!
              </Heading>
              <Text color="gray.500" mt={2}>
                A URL shortener built to help you have a blast while surfin{"'"}{" "}
                the webs for fun!
              </Text>
            </Box>
          </HStack>
        </Center>
      </Container>
      <Box bg="purple.800" p={[0, 2, 6]}>
        <Container maxW="6xl" p={[2, 2, 6]}>
          <UrlGeneratorForm
            onSubmit={async ({ url }) => {
              try {
                const result = await createLink({
                  createLinkRequest: {
                    long_url: url,
                  },
                }).unwrap();
                const updatedHashes = [...getHashesFromLocalStorage(), result];
                setRecentHashes((prev) => [...prev, result]);
                localStorage.setItem("hashes", JSON.stringify(updatedHashes));
              } catch (err) {
                toast({
                  status: "error",
                  description: err.message || "There was an error, try again.",
                });
              }
            }}
          />
          <Fade in={recentHashes.length > 0}>
            <Box as="ul" bg="white" p={4} borderRadius="md" mt={4}>
              {filterAndSortedHashes.map((entry) => (
                <RecentLinkItem
                  key={entry.hash}
                  hash={entry.hash}
                  long_url={entry.long_url}
                  link={entry.link}
                />
              ))}
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default Home;
