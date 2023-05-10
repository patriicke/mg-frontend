import cx from "classnames";

import Input from "components/Input";
import CopyButton from "components/buttons/CopyButton";
import { UserContext, UserContextProps } from "App";
import React, { useEffect } from "react";
import { Toaster, toastSuccess } from "components/ui/Toast";

const Link: React.FC = () => {
  const { user } = React.useContext<UserContextProps>(UserContext);

  const [inviteLink, setInviteLink] = React.useState<string>("");

  // function to copy the invite link to clipboard
  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = document.createElement("textarea");
    input.value = inviteLink;
    document.body.appendChild(input);
    input.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(input);
    toastSuccess("Copied to clipboard!");
  };

  useEffect(() => {
    if (user) {
      setInviteLink(`${window.location.origin}/referral/${user.referralCode}`);
    }
  }, [user]);
  return (
    <div className="">
      <div className={cx("mb-[7px] text-[15px]", "lg:text-[17px]")}>
        Invite URL:
      </div>
      <div className="flex gap-[14px]">
        <Input
          id="copy-text"
          readonly={true}
          placeholder="https://win100.com"
          handleChange={() => {}}
          value={inviteLink}
        />
        <CopyButton copyCallback={copyToClipboard} />
      </div>
      <Toaster />
    </div>
  );
};

export default Link;
