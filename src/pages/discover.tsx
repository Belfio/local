import React, { useState } from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import CreateCommunity from "../components/Modal/Auth/CreateCommunity";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityModalState } from "../atoms/communityModalAtom";
import { communityListState, CommunityState } from "../atoms/communityState";
import NextLink from "next/link";
import GameLoop from "../components/Map/GameLoop";
import TileView from "../components/Map/TileView";
import TileMap from "../components/TileMap/TileMap";

type discoverProps = {};

const Discover: React.FC<discoverProps> = () => {
  const [modalState, setOpenModal] = useRecoilState(communityModalState);
  const { communities } = useRecoilValue(communityListState);
  return (
    <Flex align="center" w="100%" h="100vh" justify="center">
      <CreateCommunity />
      {/* <GameLoop>
        <TileView />
      </GameLoop> */}
      <TileMap />
      {0 && (
        <Box bg="white" p={4}>
          <Text>List of communities</Text>

          <Text>
            {communities?.map((c: CommunityState) => (
              <Link as={NextLink} href={`/c/${c?.id}`} key={c?.id}>
                ${c?.id} <ExternalLinkIcon mx="2px" />
              </Link>
            ))}
          </Text>
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
            onClick={() =>
              setOpenModal({
                ...modalState,
                open: true,
              })
            }
          >
            <AddIcon fontSize={24} />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
export default Discover;
