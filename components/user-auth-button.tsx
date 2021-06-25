import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { googleLogin, logout } from "../lib/firebase";
import { Button } from "@chakra-ui/react";

const UserAuthButton = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) {
    return (
      <Button>
        <p>Loading..</p>
      </Button>
    );
  }
  if (error) {
    return (
      <Button>
        <p>Error!</p>
      </Button>
    );
  }
  if (user) {
    return <Button onClick={logout}>Log out {user.displayName}?</Button>;
  }
  return <Button onClick={googleLogin}>Log in with google</Button>;
};

export default UserAuthButton;
