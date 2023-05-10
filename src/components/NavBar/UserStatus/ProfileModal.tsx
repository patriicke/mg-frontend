import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import useDialog from 'hooks/useDialog';
import { BiChevronLeft } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import closeIcon from 'assets/images/auth/close.png';
import { FileUploader } from 'react-drag-drop-files';
import { errorParser } from 'utils/error.utils';
import { Toaster, toastError, toastSuccess } from 'components/ui/Toast';
import { getDefaultPics, updateUserProfile } from 'services/auth.service';
import { UserContext, UserContextProps } from 'App';

// import DefaultImg from "assets/images/profile/default-img.png";

const fileTypes = ['JPG', 'PNG', 'JPEG'];

const ProfileModal = () => {
  const { user, fetchProfile } =
    React.useContext<UserContextProps>(UserContext);
  const { hideDialog } = useDialog();

  const [isVisible, setIsVisible] = useState(true);
  const [checked, setChecked] = useState(!user?.showUsername);
  const [imageSrc, setImageSrc] = useState<any>(user?.avatar);
  const [avatar, setAvatar] = useState<any>();
  const [email, setEmail] = useState<string>(user?.email);
  const [username, setUsername] = useState<string>(user?.username);
  const [defaultPics, setDefaultPics] = useState<
    {
      id: number;
      image: string;
    }[]
  >([{ id: 0, image: '' }]);
  const [selectedPic, setSelectedPic] = useState<{
    id: number;
    image: string;
    dummy: string;
  }>({
    id: 0,
    image: '',
    dummy: '',
  });

  const getDefaultProfilePics = async () => {
    const [response, error] = await getDefaultPics();
    if (response) {
      setDefaultPics(response.data.data);
      const selectedDefaultPic = response.data.data.filter(
        (pic: any) => pic.image === user?.avatar,
      )[0];
      setSelectedPic({ ...selectedDefaultPic, dummy: '' });
    }
    if (error) {
      errorParser(error);
    }
  };

  const updateProfile = async (image: string) => {
    const formData = new FormData();
    if (image === 'avatar') {
      formData.append('avatar', avatar);
    }
    if (image === 'defaultPic' && selectedPic.id) {
      formData.append('defaultPicId', selectedPic.id?.toString());
    }
    formData.append('email', email);
    formData.append('username', username);
    formData.append('showUsername', checked ? 'false' : 'true');
    const [response, error] = await updateUserProfile(formData);
    if (response) {
      toastSuccess('You profile has been updated successfully');
      fetchProfile();
      hideDialog();
    }
    if (error) {
      errorParser(error);
    }
  };

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked((prev: boolean) => !prev);
  }

  // const changeImageToBinary = (file: any) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const binaryString = reader.result;
  //     console.log(typeof binaryString);
  //     console.log(binaryString);
  //     setAvatar(binaryString);
  //   };
  //   reader.readAsBinaryString(file);
  // };

  const handleFileChange = (file: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      setAvatar(file);
    };

    reader.readAsDataURL(file);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const closeClickHandler = () => {
    hideDialog();
    toggleVisibility();
  };

  useEffect(() => {
    getDefaultProfilePics();
  }, []);

  //checkbox toggle is not working on its own, hence this update of an unused state is being updated in order to render the updated checkbox state => needs to be updated
  useEffect(() => {
    setSelectedPic({ ...selectedPic, dummy: selectedPic.dummy + 's' });
  }, [checked]);

  return (
    <div
      className={cx(
        'fixed inset-y-0 right-0 transition-transform transform duration-300 ease-in-out translate-x-0 h-[100%] sm:h-[90%] p-4 sm:p-7 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:w-[650px] z-[100] overflow-x-hidden overflow-y-auto bg-[#15171B] rounded-lg text-white',
        { 'translate-x-full': !isVisible },
      )}
    >
      <div className="flex items-center">
        <div
          className="hidden sm:inline-block w-max p-[4px] md:p-[9px] rounded border border-[#484848] hover:border-white cursor-pointer"
          onClick={closeClickHandler}
        >
          <BiChevronLeft color={'#FFF'} size={20} />
        </div>
        <div
          className="sm:hidden w-max p-[4px] md:p-[9px] rounded cursor-pointer bg-[#15171B]" //border border-[#484848] hover:border-white
          onClick={closeClickHandler}
        >
          <IoClose color={'#FFF'} size={20} onClick={closeClickHandler} />
        </div>
        <div className="w-full flex justify-center sm:justify-start">
          {/* <div className="w-max p-[4px] mx-3 md:p-[9px] rounded border border-[#484848]">
                            <img src={walletMobild} alt="wallet" className="h-5 w-6" />
                        </div> */}
          <h1 className="font-[20px] md:text-2xl font-bold ml-2">
            User settings
          </h1>
        </div>
      </div>
      <form className="w-full mt-10 flex flex-col items-center">
        <div className="w-full mb-[20px] sm:mb-[40px]">
          <div className="mb-[18px]">
            <label
              htmlFor="username"
              className="text-[#858585] text-[16px] md:text-[20px] block leading-[26px] md-[0] md:mb-[10px] font-graphit"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="text-white py-[16px] px-[30px] md:px-[20px] md:py-[27px] border border-[#484848] backdrop-blur-[25px] bg-[#15171B] rounded-[10px] w-full text-[15px] md:text-[20px] leading-[17px]"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-[18px]">
            <label
              htmlFor="email"
              className="text-[#858585] text-[16px] md:text-[20px] block leading-[26px] md-[0] md:mb-[10px] font-graphit"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              className="text-white py-[16px] px-[30px] md:px-[20px] md:py-[27px] border border-[#484848] backdrop-blur-[25px] bg-[#15171B] rounded-[10px] w-full text-[15px] md:text-[20px] leading-[17px]"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-[33px]">
            <label className="text-[#858585] text-[16px] md:text-[20px] block leading-[26px] mb-[10px] md:mb-[10px] font-graphit">
              Upload
            </label>
            <FileUploader
              handleChange={handleFileChange}
              name="file"
              types={fileTypes}
              onSizeError={() =>
                toastError('You have exceeded the file size limit')
              }
              onTypeError={() =>
                toastError('You can only upload .jpg,.jpeg and .png images')
              }
            >
              <div className="py-[18px] flex flex-col items-center justify-center cursor-pointer border border-dashed md:border-solid border-[#484848] hover:border-white backdrop-blur-[25px] bg-[#15171B] rounded-[10px]">
                {imageSrc ? (
                  <div className="w-1/2 aspect-square my-2">
                    <img
                      src={imageSrc}
                      alt="avatar"
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover object-center rounded"
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-[18px]">
                      <svg
                        width="70"
                        height="61"
                        viewBox="0 0 70 61"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M35.9863 14.2463C35.8481 14.7123 36.1118 15.2031 36.5765 15.3426L36.6691 15.3703L36.6731 15.3657C37.109 15.4447 37.5404 15.1819 37.668 14.7485C38.8328 10.8114 42.5021 8.06184 46.5892 8.06184C47.0745 8.06184 47.4666 7.66612 47.4666 7.1801C47.4666 6.69407 47.0745 6.29836 46.5892 6.29836C41.5639 6.29836 37.3419 9.66402 35.9863 14.2463ZM35.9863 14.2463L36.1301 14.2889M35.9863 14.2463C35.9863 14.2463 35.9863 14.2463 35.9863 14.2464L36.1301 14.2889M36.1301 14.2889C36.0153 14.6762 36.2346 15.0834 36.6196 15.1989L36.1301 14.2889Z"
                          fill="white"
                          stroke="#F9FFF9"
                          stroke-width="0.3"
                        />
                        <path
                          d="M56.7721 43.0351H52.4077C52.0061 43.0351 51.6803 42.7074 51.6803 42.3034C51.6803 41.8993 52.0061 41.5716 52.4077 41.5716H56.7721C62.7882 41.5716 67.6831 36.6476 67.6831 30.5957C67.6831 24.5438 62.7882 19.6197 56.7721 19.6197H56.6671C56.4562 19.6197 56.2556 19.5277 56.1174 19.3673C55.9792 19.2068 55.9169 18.9941 55.947 18.784C56.012 18.3282 56.0447 17.8704 56.0447 17.4245C56.0447 12.1796 51.8023 7.91199 46.5884 7.91199C44.56 7.91199 42.6256 8.54964 40.9941 9.75646C40.6356 10.0215 40.1264 9.90386 39.9191 9.50714C35.2986 0.656379 23.2303 -0.532189 16.9734 7.16721C14.3377 10.4108 13.3021 14.6303 14.1319 18.7427C14.2234 19.1969 13.8779 19.6203 13.4191 19.6203H13.1276C7.11152 19.6203 2.21659 24.5443 2.21659 30.5962C2.21659 36.6481 7.11152 41.5722 13.1276 41.5722H17.4919C17.8936 41.5722 18.2194 41.8999 18.2194 42.3039C18.2194 42.7079 17.8936 43.0357 17.4919 43.0357H13.1276C6.3092 43.0357 0.761719 37.4552 0.761719 30.5962C0.761719 23.9296 6.00208 18.4709 12.5566 18.1698C11.9409 13.9033 13.1182 9.59963 15.847 6.24105C22.5458 -2.00292 35.3836 -1.07888 40.8105 8.11375C42.5417 7.0219 44.5228 6.44912 46.5882 6.44912C52.9051 6.44912 57.9107 11.8577 57.4727 18.1766C63.9668 18.543 69.1376 23.973 69.1376 30.5956C69.1376 37.4552 63.5901 43.0351 56.7717 43.0351L56.7721 43.0351Z"
                          fill="white"
                        />
                        <path
                          d="M16.517 41.8902C16.517 52.0593 24.7413 60.3336 34.8522 60.3336C44.9633 60.3336 53.1875 52.0591 53.1875 41.8902C53.1875 31.7211 44.9633 23.4467 34.8522 23.4467C24.7411 23.4467 16.517 31.7212 16.517 41.8902ZM18.2721 41.8902C18.2721 32.6924 25.7109 25.2105 34.8522 25.2105C43.9934 25.2105 51.4323 32.6923 51.4323 41.8902C51.4323 51.0879 43.9934 58.5698 34.8522 58.5698C25.7111 58.5698 18.2721 51.088 18.2721 41.8902Z"
                          fill="white"
                          stroke="#F9FFF9"
                          stroke-width="0.3"
                        />
                        <path
                          d="M34.5023 49.2545C34.5023 49.6322 34.8072 49.9402 35.1849 49.9402C35.5625 49.9402 35.8674 49.6327 35.8674 49.2545V35.3259C35.8674 34.9481 35.5626 34.6402 35.1849 34.6402C34.8072 34.6402 34.5023 34.9481 34.5023 35.3259V49.2545Z"
                          fill="white"
                          stroke="white"
                          stroke-width="0.3"
                        />
                        <path
                          d="M35.1845 36.2976L38.9619 40.0974C39.0949 40.2312 39.2702 40.2985 39.4448 40.2985L35.1845 36.2976ZM35.1845 36.2976L31.4073 40.0973C31.4073 40.0973 31.4072 40.0974 31.4072 40.0974C31.1408 40.3658 30.7079 40.3656 30.4413 40.0974C30.175 39.8296 30.175 39.3961 30.4413 39.1283L30.547 39.2333L30.4413 39.1283L34.7015 34.8427L35.1845 36.2976ZM35.6675 34.8426C35.4008 34.5744 34.968 34.5742 34.7016 34.8426L39.4448 40.2985C39.6192 40.2985 39.7946 40.2318 39.9279 40.0973C40.194 39.8294 40.1939 39.396 39.9278 39.1283L35.6675 34.8426Z"
                          fill="white"
                          stroke="white"
                          stroke-width="0.3"
                        />
                      </svg>
                    </div>
                    <p className="text-[#757575] text-[16px] md:text-[22px] leading-[33px] font-graphit font-normal">
                      Drag & drop files or{' '}
                      <label
                        htmlFor="upload"
                        className="underline text-[#B1B1B1]"
                      >
                        Browse
                      </label>
                    </p>
                  </>
                )}
              </div>
            </FileUploader>
          </div>

          <button
            className="w-full  py-[15px] md:py-[18px] bg-[#B0D512] rounded-lg text-[#0F1012] font-bold md:font-medium text-[16px] md:text-[18px] uppercase"
            onClick={() => updateProfile('avatar')}
          >
            Upload
          </button>
        </div>
        <div className="mb-[30px] w-full">
          <h5 className="text-[20px] md:text-[25px] leading-[31px] mb-[19px] font-normal text-[#A9A9A9] md:text-[#fff]">
            Default Image
          </h5>
          <div className="flex flex-wrap gap-[17px]">
            {defaultPics.map((pic) => (
              <img
                key={pic.id}
                src={pic.image}
                alt=""
                crossOrigin="anonymous"
                className={cx(
                  'cursor-pointer w-[51px] h-[51px] md:w-[124px] md:h-[124px] rounded-[5px]',
                  {
                    'border-2 border-[#B0D512]':
                      selectedPic.image === pic.image,
                  },
                )}
                onClick={() => setSelectedPic({ ...pic, dummy: '' })}
              />
            ))}
          </div>
        </div>
        <div className="mb-[30px] w-full">
          <h5 className="text-[20px] md:text-[25px] leading-[31px] mb-[19px] font-normal text-[#A9A9A9] md:text-[#fff]">
            Privacy Settings
          </h5>
          <div className="flex items-baseline gap-[10px]">
            <label className="flex items-baseline gap-[10px]">
              <input
                type="checkbox"
                className={`border border-[#484848] cursor-pointer backdrop-blur-[25px] min-w-[21px] min-h-[21px] rounded-[3px]`}
                onChange={handleCheckboxChange}
                checked={checked}
              />
              <p className="text-[#878787] text-[16px] md:text-[22px] leading-[19px] md:leading-[33px] ">
                If hidden, no one can view your username on public rankings or
                bets list.
              </p>
            </label>
          </div>
        </div>
        <div className="flex justify-center w-full gap-[20px]">
          <button
            className=" w-[140px] md:w-[240px] py-[15px] md:py-[18px] bg-[#B0D512] rounded-lg text-[#0F1012] font-bold md:font-medium text-[16px] md:text-[18px] uppercase"
            onClick={() => updateProfile('defaultPic')}
          >
            Save
          </button>
          <button
            onClick={closeClickHandler}
            className="w-[140px] md:w-[240px] py-[15px] md:py-[18px] bg-[transparent] rounded-lg text-[#fff] font-bold md:font-medium text-[16px] md:text-[18px] uppercase"
          >
            Cancel
          </button>
        </div>
      </form>
      <div
        className={cx(
          'fixed top-[10px] right-[10px] w-[40px] hover:cursor-pointer hidden sm:block',
          'md:top-[25px] md:right-[25px] md:w-[45px]',
        )}
        onClick={closeClickHandler}
      >
        <img src={closeIcon} alt="close" />
      </div>
      <Toaster forModal />
    </div>
  );
};

export default ProfileModal;
