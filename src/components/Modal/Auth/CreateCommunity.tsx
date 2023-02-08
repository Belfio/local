import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { communityModalState } from "@/src/atoms/communityModalAtom";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/src/firebase/clientApp";

import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import useChat from "@/src/hooks/useChat";

type CreateCommunityProps = {
  //   isModalOpen: boolean;
};

const CreateCommunity: React.FC = () => {
  const [modalState, setOpenModal] = useRecoilState(communityModalState);
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState("");
  const [communityCharsNumberRemaining, setCommunityCharsNumberRemaining] =
    useState(21);
  const handleClose = () => {
    setOpenModal({
      ...modalState,
      open: false,
    });
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { createChannel } = useChat();

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (communityCharsNumberRemaining === 0) return;
    event.target.value = event.target.value.replace(" ", "");
    setCommunityName(event.target.value);
    setCommunityCharsNumberRemaining(21 - event.target.value.length);
  };

  const handleCommunityCreate = async () => {
    if (error) setError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community name must be between 3-21 characters, and can only contain letters and numbers."
      );
      return;
    }
    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      createChannel(communityName, "Description to add");
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await getDoc(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error(`Sorry, ${communityName} has been already taken`);
        }

        // When creating a enw community we need to:
        // 1 - create a new document of CommunityState type in the "communities" collection
        // 2 - create a default channel snippet in the community document containing the main characteristics of the
        // 3 - create a the community snippet in the user profile document
        // 4 - create the channel in Stream

        transaction.set(communityDocRef, {
          // communityId
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberofMembers: 1,
          communityType: communityType,
        });
        transaction.set(
          doc(firestore, `communities/${communityName}/channels`, "general"),
          {
            channelId: "general",
            dateOfCreation: serverTimestamp(),
          }
        );

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error) {
      console.log("handleCommunityCreate error", error);
      setError(error?.message);
    }
    setLoading(false);

    handleClose();
    router.push(`c/${communityName}`);
    setLoading(false);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="10px">
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>What do you want me to write here</Text>
            <Input
              position="relative"
              value={communityName}
              onChange={handleName}
            />
            <Text
              fontSize="9pt"
              color={communityCharsNumberRemaining === 0 ? "red" : "gray.500"}
            >
              {communityCharsNumberRemaining} chars remaining
            </Text>

            <Text fontSize="9pt" color="red">
              {error}
            </Text>
            <Box>
              <Text fontWeight={600} fontSize={15}>
                Community Type
              </Text>
              <Stack spacing={2}>
                <Checkbox
                  name="public"
                  isChecked={communityType === "public"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align="center">
                    <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                    <Text fontSize={10} mr={1}>
                      Open
                    </Text>
                    <Text fontSize={8} pt={1} color="gray.500">
                      Anybody can join
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="restricted"
                  isChecked={communityType === "restricted"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align="center">
                    <Icon as={BsFillEyeFill} color="gray.500" mr={2} />

                    <Text fontSize={10} mr={1}>
                      Restricted
                    </Text>
                    <Text fontSize={8} pt={1} color="gray.500">
                      You can join this community once approved by the admin
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="paid"
                  isChecked={communityType === "paid"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex align="center">
                    <Text fontSize={10} mr={1}>
                      Paid
                    </Text>
                    <Text fontSize={8} pt={1} color="gray.500">
                      You have to subscribe and pay to join this community
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter bg="gray.500" borderRadius="0 0 10px 10px">
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={handleCommunityCreate}
              isLoading={loading}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunity;
