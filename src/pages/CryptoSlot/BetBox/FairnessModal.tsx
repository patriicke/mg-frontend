import React, { useEffect, useState } from "react";
import cx from "classnames";
import useDialog from "hooks/useDialog";

import { BiChevronLeft } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import closeIcon from "assets/images/auth/close.png";
import "../../../../node_modules/highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import { marked } from "marked";
import { toastSuccess } from "components/ui/Toast";
import { useLocalStorage } from "hooks/useLocalstorage";

interface IFairnessModal {
  serverSeedHash?: string;
  hashLoading?: boolean;
  // setState: React.Dispatch<React.SetStateAction<string>>;
  setSeed: React.Dispatch<React.SetStateAction<string>>;
}
const codeMarkDown = `
  \`\`\`python
  import pyblake2

  round_seed = b"0d3b4fab34b02f634229bb609ac13635"
  box_id = b"9b851d04-5a25-4425-b8ad-5b70e1ed07f0"

  box_id = "nftbox"
  user_seed = b"abc"

  round_hash = pyblake2.blake2b(round_seed, digest_size=32).digest()
  print("Hash of round seed:", round_hash.hex())
  round_hash = pyblake2.blake2b(round_seed + box_id + user_seed, digest_size=32).digest()
  outcome = int.from_bytes(round_hash[:8], byteorder="little", signed=False) / float(
      2**64 - 1
  )
  print("Outcome:", outcome)
  \`\`\`
`;

const bashMarkDown = `
\`\`\`bash
Hash of round seed: 9e2a0e3227932496138d3be7d12f10ef71
Outcome: 0.8267399606298815
\`\`\`
`;

const FairnessModal: React.FC<IFairnessModal> = ({ setSeed }) => {
  const [fairness, setFairness] = useLocalStorage<{
    clientSeed: string;
    serverSeed: string;
    currentServerSeed?: string;
    loading?: boolean;
  }>("cryptoFairness", {
    clientSeed: "",
    serverSeed: "",
    currentServerSeed: "[]",
    loading: false,
  });
  const { hideDialog } = useDialog();
  const [isVisible, setIsVisible] = useState(true);
  const [clientSeed, setClientSeed] = useState("");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const closeClickHandler = () => {
    hideDialog();
    toggleVisibility();
  };

  const useNewSeedHandler = async () => {
    setFairness({
      ...fairness,
      clientSeed,
    });
    setSeed(clientSeed);

    toastSuccess("New seeds set successfully");
  };

  useEffect(() => {
    if (fairness.clientSeed) {
      setClientSeed(fairness.clientSeed);
    }
  }, [fairness]);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <div
        className={cx(
          "fixed inset-y-0 right-0 transition-transform transform duration-300 ease-in-out translate-x-0 h-[100%] sm:h-[90%] p-7 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:w-[650px] z-[100] overflow-x-hidden overflow-y-auto bg-[#15171B] rounded-lg text-white",
          { "translate-x-full": !isVisible }
        )}
      >
        <div className="flex items-center">
          <div
            className="hidden sm:inline-block w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer"
            onClick={closeClickHandler}
          >
            <BiChevronLeft color={"#FFF"} size={20} />
          </div>
          <div
            className="sm:hidden w-max p-[4px] md:p-[9px] rounded cursor-pointer bg-[#15171B]" //border border-[#484848] hover:border-white
            onClick={closeClickHandler}
          >
            <IoClose color={"#FFF"} size={20} onClick={closeClickHandler} />
          </div>
          <div className="w-full flex justify-center sm:justify-start">
            {/* <div className="w-max p-[4px] mx-3 md:p-[9px] rounded border border-[#484848]">
                            <img src={walletMobild} alt="wallet" className="h-5 w-6" />
                        </div> */}
            <h1 className="font-[20px] md:text-2xl font-bold ml-2">
              Game Fairness
            </h1>
          </div>
        </div>
        <div className="w-full mt-10 flex flex-col items-center">
          <div className="border border-[#DEFC5C] p-[15px] md:pt-[14px] md:pr-[16px] md:pb-[22px] md:pl-[15px] rounded-[15px] mb-[14px] md:mb-[20px]">
            <p className=" md:text-[18px] text-[14px] text-[#DEFC5C] leading-[22px]">
              You may use this function to set a new server seed + a new client
              seed, they can be randomly generated or customized
            </p>
          </div>
          <div className="rounded-[15px] w-full border border-[#484848] backdrop-blur-[25px] pt-[16px] pr-[16px] pb-[23px] pl-[21px]">
            <p className="text-[#A9A9A9] leading-[30px] mb-[5px]">
              PROVABLY FAIR
            </p>
            <form>
              <input
                onChange={(e) => setClientSeed(e.target.value)}
                value={clientSeed}
                type="text"
                className="px-[20px] py-[16px] border border-[#484848] backdrop-blur-[25px] bg-[#15171B] rounded-[10px] w-full text-[#696969] text-[15px] leading-[17px]"
                placeholder="Your Custom Client Seed"
              />
              <div className="mt-[20px] text-center">
                <button
                  onClick={useNewSeedHandler}
                  className=" w-[128px] md:w-[267px] py-[8px] md:py-[18px] bg-[#B0D512] rounded-lg text-[#0F1012] font-bold md:font-medium text-[11px] md:text-[18px] uppercase"
                >
                  Use new seeds
                </button>
              </div>
            </form>
          </div>
          <div className="mt-[20px] md:mt-[30px] w-full">
            <div className="mb-[20px] md:mb-[30px] text-[#A6A5A5] text-[18px] leading-[22px] font-normal font-graphit break-all">
              <p>
                <p>Server Seed:</p>{" "}
                <p className="break-all">
                  {fairness.loading
                    ? "Loading..."
                    : fairness.serverSeed || "[]"}
                </p>
              </p>
            </div>
            <div className="mb-[10px] md:mb-[30px] text-[#A6A5A5] text-[18px] leading-[22px] font-normal font-graphit">
              <p>Current Server Seed Hash:</p>
              <p className="break-all">
                {fairness.loading ? "Loading..." : fairness.currentServerSeed}
              </p>
            </div>

            <div className=" mb-[20px] md:mb-[30px] text-[#DEFC5C] text-[18px] leading-[22px] font-normal font-graphit">
              <p className="mb-[30px]">PROVABLY FAIR</p>
              <p className="mb-[30px]">What does it mean?</p>
              <p className="mb-[30px]">
                The outcome of each NFT Slot round is calculated in a
                deterministic way given a random seed for each round and an
                optional user-provided seed. A cryptographic hash of the random
                seed is shown at the beginning of each round, before a user
                places a bet or
                <br />
                <br />
                provides his seed. The purpose of the hash is to allow the user
                to verify that we do not change the random seed after the round
                begins. By allowing the user to also provide a seed, we are
                ensuring that outcomes can not be precalculated by usliminating
                the possibility of bias.
              </p>
            </div>
            <div className="mb-[30px] text-[#A6A5A5] text-[18px] leading-[22px] font-normal font-graphit">
              <p className="mb-[30px]">ALGORITHM</p>
              <p className="mb-[30px]">
                At the beginning each NFT slot round, a new 32-byte seed is
                randomly chosen. The seed is kept private until the round is
                over, but its hash is calculated using the BLAKE2b hash function
                with a digest size of 256 bits and shown to the user before any
                bet is placed.
              </p>
              <p className="mb-[30px]">
                The user is then able to provide an arbitrary string seed, which
                is concatenated with the internal random seed. The BLAKE2b hash
                function is used again on the combined seed to produce an
                outcome hash.
              </p>
              <p className="mb-[30px]">
                The user is then able to provide an arbitrary string seed, which
                is concatenated with the internal random seed. The BLAKE2b hash
                function is used again on the combined seed to produce an
                outcome hash.
              </p>
              <p className="mb-[30px]">
                The first 8 bytes of the outcome hash are converted to an
                unsigned 64-bit integer assuming a little-endian encoding. This
                integer value is converted to a floating point number in the
                unit range, which will be uniformly distributed.{" "}
              </p>
              <p className="mb-[30px]">
                This numeric value represents the outcome of a round and is
                mapped to a specific item in the NFT slot by ordering all items
                from highest price to lowest price, and then selecting the item
                with the highest price whose cumulative probability exceeds the
                outcome value.
              </p>
              <p className="mb-[30px]">
                If the outcome value is greater than all cumulative
                probabilities, then no item is won.
              </p>
            </div>
            <div className="mb-[30px] text-[#A6A5A5] text-[18px] leading-[22px] font-normal font-graphit">
              <p className="mb-[30px]">VERIFICATION EXAMPLE</p>
              <p className="mb-[30px]">
                Anyone can verify an outcome after the round's seed has been
                revealed. As an example, the following python code calculates
                the round's hash and outcome given the round's seed and the
                user- provided seed:
              </p>
              <div className="bg-[#040405] rounded rounded-[5px] p-[15px]">
                <div
                  dangerouslySetInnerHTML={{ __html: marked(codeMarkDown) }}
                ></div>
              </div>
            </div>
            <div className="text-[#A6A5A5] text-[18px] leading-[22px] font-normal font-graphit">
              <p className="mb-[20px] text-fill-transparent">THE OUTPUT IS :</p>
              <div className="bg-[#040405] rounded rounded-[5px] p-[15px] break-all">
                <div
                  dangerouslySetInnerHTML={{ __html: marked(bashMarkDown) }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cx(
            "fixed top-[10px] right-[10px] w-[40px] hover:cursor-pointer hidden sm:block",
            "md:top-[25px] md:right-[25px] md:w-[45px]"
          )}
          onClick={closeClickHandler}
        >
          <img src={closeIcon} alt="close" />
        </div>
      </div>
    </>
  );
};

export default FairnessModal;
