import { Flex } from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

type CommunityNavProps = {};

const CommunityNav: React.FC<CommunityNavProps> = () => {
  return (
    <Flex justify="center" w="100%" pt={4}>
      <Link as={NextLink} href="/discover">
        <Flex
          bg="white"
          borderRadius={5}
          w={50}
          h={50}
          justify="center"
          align="center"
          _hover={{
            bg: "gray.50",
          }}
        >
          <AddIcon fontSize={24} />
        </Flex>
      </Link>
    </Flex>
  );
};
export default CommunityNav;
