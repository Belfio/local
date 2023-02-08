import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
const OAuthButton: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction="column" mb={4} width="100%">
      <Button
        mb={2}
        variant="oauth"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          alt="google ouath"
          src="/images/googleLogo.png"
          height="20px"
          pr={2}
        />
        Login with Google
      </Button>
      <Button>Continue with Google</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButton;
