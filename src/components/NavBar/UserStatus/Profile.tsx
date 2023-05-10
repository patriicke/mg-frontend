import { UserContext, UserContextProps } from 'App';
import profileImg from 'assets/images/header/profile.desktop.avif';
import React, { useContext, useState } from 'react';
import { logoutUser } from 'services/auth.service';
import { TriggerContext, TriggerContextProps } from '../NavBar';
import useDialog from 'hooks/useDialog';
import ProfileModal from './ProfileModal';
import { useLocalStorage } from 'hooks/useLocalstorage';

const Profile: React.FC = () => {
  const [betHistory, setBetHistory] = useLocalStorage("betHistory", []);
  const { navTrigger } = useContext<TriggerContextProps>(TriggerContext);
  const { user, fetchProfile, loggedInstate } =
    React.useContext<UserContextProps>(UserContext);
  const [loggedIn, setLoggedIn] = loggedInstate;
  const [trigger, setTrigger] = navTrigger;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const { showDialog } = useDialog();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const logout = async () => {
    const [_response, error] = await logoutUser();
    if (!error) {
      setBetHistory([]);
      setTrigger(!trigger);
      window.localStorage.removeItem('');
      setLoggedIn(false);
    }
  };

  return (
    <div className="flex flex-row items-center rounded-full overflow-hidden justify-center">
      <img
        src={user?.avatar || profileImg}
        crossOrigin='anonymous'
        className="w-[33px] h-[33px] md:w-[47px] md:h-[47px] cursor-pointer"
        alt="profile"
        onClick={handleToggle}
      />
      {isOpen && (
        <div className="absolute z-10 top-full mr-16 w-max">
          <div className="py-2 px-4 bg-[#0f1012] rounded-lg shadow-lg border-2 border-[#343434]">
            <div
              className="m-2 px-2 py-1 cursor-pointer text-[13px] font-normal hover:text-[#B0D412]"
              onClick={() => {
                handleToggle();
                showDialog(
                  <UserContext.Provider
                    value={{
                      loggedInstate: loggedInstate,
                      user: user,
                      fetchProfile: fetchProfile,
                    }}
                  >
                    <ProfileModal />
                  </UserContext.Provider>,
                );
              }}
            >
              Profile
            </div>
            <div
              className="m-2 px-2 py-1 cursor-pointer text-[13px] font-normal hover:text-[#B0D412]"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      )}
      {/* <span
        className="cursor-pointer"
        onClick={() => {
          logout();
        }}
      >
        logout
      </span> */}
    </div>
  );
};

export default Profile;
