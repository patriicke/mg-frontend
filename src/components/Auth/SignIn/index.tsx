import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import cx from "classnames";

import NormalButton from "components/buttons/NormalButton";
import SignupWith from "../Signupwith";

import closeIcon from "assets/images/auth/close.png";
import useDialog from "../../../hooks/useDialog";
import { ISignIn } from "interface/auth/auth";
import { UserSignIn } from "services/auth.service";
import { Toaster, toastError, toastSuccess } from "components/ui/Toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLocalStorage } from "hooks/useLocalstorage";

interface IFormDataInterface {
  email: string;
  password: string;
}

interface SignInProps {
  fetchProfile: () => void;
}

const Login: React.FC<SignInProps> = ({ fetchProfile }) => {
  const [betHistory, setBetHistory] = useLocalStorage("betHistory", []);
  const isMobile = useMediaQuery({ maxWidth: 1280 });
  const { hideDialog } = useDialog();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<IFormDataInterface | any>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<IFormDataInterface | any>({
    email: "",
    password: "",
  });

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
   * SignUp
   */
  const handleSiginForm = async () => {
    const fields = ["email", "password"];
    let customError: any = {};
    for (const field of fields) {
      if (!formData[field]) {
        customError[field] = `${field.toLocaleUpperCase()} is required.`;
      }
      if (field === "email" && formData[field]) {
        if (!checkEmail(formData[field])) {
          customError[field] = `Please enter valid email.`;
        }
      }
    }

    if (Object.keys(customError).length) {
      setErrors(customError);
      return;
    }

    const { email, password } = formData;
    const body: ISignIn = {
      email,
      password,
    };
    setSubmitLoading(true);
    const [response, error] = await UserSignIn(body);
    setSubmitLoading(false);
    if (error) {
      return handleServerError(error);
    }
    if (response) {
      setBetHistory([]);
      toastSuccess("Login successfully");
      fetchProfile();
      hideDialog();
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
                  <div className="relative">
                    <label
                      className="block mb-3 px-3 uppercase"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      className={`text-[15px] border focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B] ${
                        errors.email ? "border-red-400" : "border-[#484848]"
                      }`}
                      type="text"
                      placeholder="youremail@domain.com"
                      value={formData.email}
                      name={"email"}
                      onChange={OnFormInputChange}
                    />
                    <small className="text-red-400">{errors.email}</small>
                  </div>
                  <div className="">
                    <label
                      className="block mb-3 px-3 uppercase"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className={`text-[15px] border  focus:outline-none w-full rounded-[10px] px-6 py-4 md:py-3 bg-[#15171B] ${
                        errors.password ? "border-red-400" : "border-[#484848]"
                      }`}
                      type="password"
                      placeholder="******************"
                      name={"password"}
                      value={formData.password}
                      onChange={OnFormInputChange}
                    />
                    <small className="text-red-400">{errors.password}</small>
                  </div>
                  <div className="">
                    <NormalButton
                      onClick={() => {
                        handleSiginForm();
                      }}
                      disabled={submitLoading}
                      className="flex justify-center w-100"
                    >
                      <span>Sign In</span>
                      <>
                        {submitLoading && (
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

export default Login;
