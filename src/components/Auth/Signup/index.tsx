import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import cx from "classnames";
import {
  GoogleLogin,
  useGoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import NormalButton from "components/buttons/NormalButton";
import SignupWith from "../Signupwith";
import closeIcon from "assets/images/auth/close.png";
import useDialog from "../../../hooks/useDialog";
import { IEmail, ISignup } from "interface/auth/auth";
import { SendEmailToken, UserSignUp } from "services/auth.service";
import { Toaster, toastError, toastSuccess } from "components/ui/Toast";

interface IFormDataInterface {
  email: string;
  code: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignUpProps {
  fetchProfile: () => void;
  referralId?: string;
}

const Signup: React.FC<SignUpProps> = ({ fetchProfile, referralId }) => {
  const isMobile = useMediaQuery({ maxWidth: 1280 });
  const { hideDialog } = useDialog();

  const [stepLoading, setStepLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [activeStep, setActiveStep] = useState<number>(0);

  const [formData, setFormData] = useState<IFormDataInterface | any>({
    email: "",
    code: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<IFormDataInterface | any>({
    email: "",
    code: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  /**
   *  Check Email
   */
  const checkEmail = (value: string) => {
    const valid = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
      ? true
      : false;
    return valid;
  };

  const handleServerError = (error: any) => {
    if (error) {
      if (error?.response?.status === 422 && error?.response?.data?.errors) {
        error?.response?.data?.errors.forEach((errs: any, index: number) => {
          setErrors({
            ...errors,
            [errs.property]: errs.messages,
          });
        });
      } else {
        toastError(error?.response?.data?.errors.detail);
      }
    }
  };

  /**
   * Sent Email
   */
  const handleSentEmail = async () => {
    const { email } = formData;
    const body: IEmail = {
      sendToken: true,
      email: email,
    };
    setStepLoading(true);
    const [response, error] = await SendEmailToken(body);
    setStepLoading(false);
    if (error) {
      return handleServerError(error);
    }
    if (response) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  /**
   * Netxt Step
   */
  const handleNext = () => {
    const { email } = formData;
    if (!email) {
      setErrors({
        ...errors,
        email: "Email is required.",
      });
      return;
    } else {
      if (!checkEmail(email)) {
        setErrors({
          ...errors,
          email: "Email is not valid.",
        });
        return;
      }
    }
    handleSentEmail();
  };

  /**
   * SignUp
   */
  const handleSignupForm = async () => {
    const fields = ["username", "email", "password", "confirmPassword", "code"];
    let customError: any = {};
    for (const field of fields) {
      if (!formData[field]) {
        customError[field] = `${field.toLocaleUpperCase()} is required.`;
      }
      // check password length validation if field is password
      if (field === "password" && formData[field].length < 6) {
        customError[field] = "Password must be at least 6 characters.";
      }
      // check password match validation if field is confirmPassword
      if (
        field === "confirmPassword" &&
        formData[field] !== formData["password"]
      ) {
        customError[field] = "Password does not match.";
      }
    }

    if (Object.keys(customError).length) {
      setErrors(customError);
      return;
    }
    const { email, code, username, password, confirmPassword } = formData;
    const body: ISignup = {
      sendToken: false,
      username,
      email,
      password,
      confirmPassword,
      token: code,
      ...(referralId && { referralCode: referralId }),
    };
    setSubmitLoading(true);
    const [response, error] = await UserSignUp(body);
    setSubmitLoading(false);
    if (error) {
      return handleServerError(error);
    }
    if (response) {
      toastSuccess("Signup successful");
      setTimeout(() => {
        hideDialog();
        setFormData({
          email: "",
          code: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        fetchProfile();
      }, 1000);
    }
  };

  const OnFormInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="relative">
            <label className="block mb-3 px-3"> Email Address</label>
            <input
              placeholder="youremail@domain.com"
              className={`text-[15px] border focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B] ${
                errors.email ? "border-red-400" : "border-[#484848]"
              }`}
              type="email"
              name="email"
              value={formData.email}
              onChange={OnFormInputChange}
            />
            <small className="text-red-400">{errors.email}</small>
          </div>
        );
      case 1:
        return (
          <div className="relative flex flex-col gap-[24px] text-[#858585] text-[16px]">
            <div className="relative">
              <label className="block mb-3 px-3" htmlFor="Username">
                Username
              </label>
              <input
                className={`text-[15px] border focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B] ${
                  errors.username ? "border-red-400" : "border-[#484848]"
                }`}
                type="text"
                placeholder="Username"
                value={formData.username}
                name="username"
                onChange={OnFormInputChange}
              />
              <small className="text-red-400">{errors.username}</small>
            </div>
            <div className="relative">
              <label className="block mb-3 px-3">Email</label>
              <input
                readOnly
                placeholder="youremail@domain.com"
                className="text-[15px] border border-[#484848] focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B]"
                type="email"
                value={formData.email}
                name="email"
                onChange={OnFormInputChange}
              />
            </div>
            <div className="">
              <label className="block mb-3 px-3 uppercase" htmlFor="password">
                Password
              </label>
              <input
                className={`text-[15px] border focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B] ${
                  errors.password ? "border-red-400" : "border-[#484848]"
                }`}
                type="password"
                placeholder="******************"
                value={formData.password}
                name="password"
                onChange={OnFormInputChange}
              />
              <small className="text-red-400">{errors.password}</small>
            </div>
            <div className="">
              <label className="block mb-3 px-3 uppercase" htmlFor="password">
                Confirm Password
              </label>
              <input
                className={`text-[15px] border focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B] ${
                  errors.confirmPassword ? "border-red-400" : "border-[#484848]"
                }`}
                type="password"
                placeholder="******************"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={OnFormInputChange}
              />
              <small className="text-red-400">{errors.confirmPassword}</small>
            </div>
            <div className="">
              <label className="block mb-3 px-3">
                {" "}
                Enter Confirmation Code
              </label>
              <input
                placeholder="XXXXX"
                className="text-[15px] border border-[#484848] focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B]"
                type="text"
                value={formData.code}
                name="code"
                onChange={OnFormInputChange}
              />
              <small className="text-red-400">{errors.code}</small>
            </div>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
    >
      <div className="fixed top-0 left-0 w-full h-full z-[100] overflow-x-hidden overflow-y-auto font-GeogrotesqueWide">
        <div
          className={cx(
            "p-[16px] bg-[#10121b99] min-h-full flex justify-center items-center",
            "md:p-[50px]"
          )}
        >
          <div
            className={cx(
              "inline-block relative w-full align-middle max-w-[758px] rounded-[10px] bg-[#1a1d29]",
              "md:rounded-[20px]"
            )}
          >
            <div className="w-full flex flex-col">
              <div className={cx("w-full h-[30px]", isMobile ? "" : "")}></div>
              <div className="px-[25px] py-[30px]">
                <div className="relative flex flex-col gap-[24px] text-[#858585] text-[16px]">
                  {getStepContent(activeStep)}
                  <div className="">
                    <NormalButton
                      disabled={submitLoading || stepLoading}
                      className="flex justify-center w-100"
                      onClick={() => {
                        activeStep === 1 ? handleSignupForm() : handleNext();
                      }}
                    >
                      <>{activeStep === 1 ? "Send" : "Next"}</>
                      <>
                        {(submitLoading || stepLoading) && (
                          <svg
                            className="w-5 h-5 ml-3  text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </>
                    </NormalButton>
                  </div>
                </div>
                <div className="text-center my-[15px] text-[#858585] font-[400] text-[14px]">
                  Log in to Direct With
                </div>
                <div className="flex justify-around">
                  <SignupWith
                    referralCode={referralId}
                    fetchProfile={fetchProfile}
                    hideDialog={hideDialog}
                    className="px-[20px] py-[14px] bg-[#15171B] rounded-[30px] border border-[#000]"
                  />
                </div>
              </div>
            </div>
            <div
              className={cx(
                "absolute top-[10px] right-[10px] w-[40px] hover:cursor-pointer",
                "md:top-[25px] md:right-[25px] md:w-[45px]"
              )}
              onClick={() => {
                hideDialog();
              }}
            >
              <img src={closeIcon} alt="close" />
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
