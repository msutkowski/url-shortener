import {
  Flex,
  Text,
  Box,
  Link,
  Button,
  BoxProps,
  useBreakpointValue,
  useClipboard,
} from "@chakra-ui/react";

interface RecentLinkItemProps extends BoxProps {
  long_url: string;
  link: string;
  hash: string;
}
export function RecentLinkItem({
  long_url,
  link,
  hash,
  ...rest
}: RecentLinkItemProps) {
  const { hasCopied, onCopy } = useClipboard(link);
  const alignItems = useBreakpointValue({ base: undefined, md: "baseline" });
  const linkTextAlign = useBreakpointValue({
    base: undefined,
    md: "right",
  }) as "right"; // Very hacky typing, but there are conflicts between some of the styled system + these hooks types

  return (
    <Flex
      p={5}
      direction={{ base: "column", md: "row" }}
      border={0}
      justifyContent="space-between"
      as="li"
      alignItems={alignItems}
      borderBottom="1px solid #eee"
      _last={{
        borderBottom: "none",
      }}
      {...rest}
    >
      <Text flex="auto" isTruncated maxW="460" pb={1}>
        {long_url}
      </Text>
      <Box flex="1" textAlign={linkTextAlign} pr={5} pb={1}>
        <Link href={link} color="purple.500" isExternal>
          {link}
        </Link>
      </Box>
      <Button colorScheme="purple" variant="ghost" onClick={onCopy}>
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </Flex>
  );
}

export default RecentLinkItem;
