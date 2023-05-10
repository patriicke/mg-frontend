import bs58 from "bs58";
import MetaMaskSDK from "@metamask/sdk";
import detectEthereumProvider from "@metamask/detect-provider";
import { useGoogleLogin } from "@react-oauth/google";
import { Items } from "./Auth.constants";

import cx from "classnames";
import { useEffect, useState } from "react";
import { toastError } from "components/ui/Toast";
import {
  GetIdentifier,
  GoogleLoginFunc,
  VerifySignature,
} from "services/auth.service";
import {
  PhantomProvider,
  WindowWithSolana,
} from "interface/solana/solana.interface";
import { useLocalStorage } from "hooks/useLocalstorage";

interface SignupWithProps {
  className?: string;
  referralCode?: string;
  fetchProfile: () => void;
  hideDialog?: () => void;
}

const MMSDK = new MetaMaskSDK({});

const SignupWith: React.FC<SignupWithProps> = ({
  className,
  fetchProfile,
  hideDialog,
  referralCode,
}) => {
  const [betHistory, setBetHistory] = useLocalStorage("betHistory", []);
  const [ethereumProvider, setEthereumProvider] = useState<any>(
    MMSDK.getProvider()
  );

  const [phantomProvider, setPhantomProvider] = useState<
    PhantomProvider | undefined
    // @ts-ignore
  >();

  const [walletKey, setWalletKey] = useState<string>("");

  const [account, setAccount] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [signinMethod, setSigninMethod] = useState<string>("");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const [response, err] = await GoogleLoginFunc({
        token: tokenResponse.access_token,
        referralCode,
      });
      if (err) {
        toastError(err.message);
        return clearUser();
      }
      if (response) {
        fetchProfile();
        if (hideDialog) hideDialog();
      }
    },
    onError: (error: any) => {
      toastError(error.message || "Something went wrong");
    },
  });

  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectPhantomWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
      } catch (err: any) {
        toastError(err.message || "User rejected the request.");
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  const checkIfMetamaskInstalled = async () => {
    const provider = await detectEthereumProvider();
    if (provider) return true;
    return false;
  };

  const toHex = (stringToConvert: string) => {
    return stringToConvert
      .split("")
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
  };

  const personalSignatureMetamask = async () => {
    if (!checkIfMetamaskInstalled()) {
      return toastError("Please install MetaMask");
    }
    if (!account) return toastError("Account is not available.");
    if (!identifier) return toastError("Data is not available.");
    try {
      const signedPayload = await ethereumProvider.request({
        method: "personal_sign",
        params: [`0x${toHex(identifier)}`, ethereumProvider.selectedAddress],
      });
      setSignature(signedPayload);
    } catch (err: any) {
      clearUser();
      toastError(err.message);
    }
  };

  const personalSignaturePhantom = async () => {
    if (!phantomProvider) {
      return toastError("Please install Phantom Wallet");
    }
    if (!walletKey) return toastError("Account is not available.");
    if (!identifier) return toastError("Data is not available.");
    try {
      const { signature, publicKey } = (await phantomProvider.signMessage(
        new TextEncoder().encode(identifier),
        "utf8"
      )) as any;

      setWalletKey(publicKey.toBase58());
      setSignature(bs58.encode(signature));
    } catch (err: any) {
      clearUser();
      toastError(err.message);
    }
  };

  const clearUser = () => {
    setAccount("");
    setIdentifier("");
  };

  const postSignature = async () => {
    const payload = {
      signature,
      ...(signinMethod === "metamask" && { address: account }),
      ...(signinMethod === "phantom" && { address: walletKey }),
      type: signinMethod,
      ...(referralCode && { referralCode }),
    };
    try {
      const [response, err] = await VerifySignature(payload);
      if (err) {
        return clearUser();
      }
      if (response) {
        setBetHistory([]);
        fetchProfile();
        if (hideDialog) hideDialog();
      }
    } catch (error) {
      clearUser();
      toastError("Cannot authenticate with metamask.Please try again later.");
    }
  };

  const getAccounts = async (
    { requestPermission } = { requestPermission: false }
  ) => {
    try {
      const accounts = await ethereumProvider.request({
        method: requestPermission ? "eth_requestAccounts" : "eth_accounts",
        params: [],
        timeout: 5000,
      });

      if (accounts.length) {
        setAccount(accounts[0]);
      }
      return accounts;
    } catch (error: any) {
      let errorMessage = error.message;
      toastError(errorMessage);
    }
  };

  const clickHandler = async (type: string) => {
    setSigninMethod(type);
    switch (type.trim()) {
      case "metamask":
        if (!checkIfMetamaskInstalled()) {
          return toastError("Please install MetaMask");
        }
        await getAccounts({ requestPermission: true });
        break;
      case "phantom":
        if (!phantomProvider) {
          return toastError("Please install Phantom Wallet");
        }
        await connectPhantomWallet();
        break;
      case "google":
        googleLogin();
        break;
      default:
        break;
    }
  };

  const getIdentifier = async () => {
    try {
      const walletAddress = signinMethod === "metamask" ? account : walletKey;
      const [profile, error] = (await GetIdentifier(
        walletAddress,
        signinMethod
      )) as any;
      setIdentifier(profile?.data?.data?.identifier);
    } catch (error) {
      toastError("Something went wrong.Please try again later.");
    }
  };

  useEffect(() => {
    if (account || walletKey) {
      getIdentifier();
    }
  }, [account, walletKey]);

  useEffect(() => {
    if (identifier) {
      switch (signinMethod) {
        case "metamask":
          personalSignatureMetamask();
          break;
        case "phantom":
          personalSignaturePhantom();
          break;
        case "google":
          break;
        default:
          break;
      }
    }
  }, [identifier]);

  useEffect(() => {
    if (signature) {
      postSignature();
    }
  }, [signature]);

  useEffect(() => {
    if (ethereumProvider) {
      ethereumProvider.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length) {
          setAccount(accounts[0]);
        }
      });
    }
    if ("solana" in window) {
      const solWindow = window as WindowWithSolana;
      if (solWindow?.solana?.isPhantom) {
        setPhantomProvider(solWindow.solana);
      }
    }
  }, []);

  return (
    <div
      className={cx("flex gap-[29px] justify-center items-center", className)}
    >
      {Items.map((item) => {
        return (
          <button
            onClick={() => clickHandler(item.name)}
            key={item.name}
            className="w-[34px] h-[34px] flex justify-center items-center"
          >
            <img src={item.imgSrc} alt="item" />
          </button>
        );
      })}
    </div>
  );
};

export default SignupWith;
