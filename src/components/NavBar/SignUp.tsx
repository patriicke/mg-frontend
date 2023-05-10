import SignButton from "components/buttons/SignButton";

import useDialog from "hooks/useDialog";
import SignIn from "components/Auth/SignIn";
import Signup from "components/Auth/Signup";
import React, { useContext, useEffect } from "react";
import { UserContext, UserContextProps } from "App";

const SignUp: React.FC = () => {
  const { fetchProfile } =
    useContext<UserContextProps>(UserContext);

  const { showDialog } = useDialog();

  return (
    <div className="flex items-center gap-[7px]">
      <div>
        <SignButton
          primary
          onClick={() => {
            showDialog(
              <SignIn
                fetchProfile={fetchProfile}
              />
            );
          }}
        >
          Sign IN
        </SignButton>
      </div>
      <div>
        <SignButton
          onClick={() => {
            showDialog(<Signup fetchProfile={fetchProfile} />);
          }}
        >
          SIGN UP
        </SignButton>
      </div>
    </div>
  );
};

export default SignUp;
