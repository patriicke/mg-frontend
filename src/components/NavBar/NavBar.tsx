import React, { PropsWithChildren, useEffect, useState } from 'react';
import cx from 'classnames';

import Logo from './Logo';
import SignUp from './SignUp';
import UserStatus from './UserStatus/UserStatus';
import { UserContext, UserContextProps } from 'App';

type Props = {
  isCollapsed: boolean;
  children?: JSX.Element | JSX.Element[];
};

export interface TriggerContextProps {
  navTrigger: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const TriggerContext = React.createContext<TriggerContextProps>({
  navTrigger: [false, () => {}],
});

const NavBar: React.FC<PropsWithChildren<Props>> = ({
  children,
  isCollapsed,
}) => {
  const { loggedInstate } = React.useContext<UserContextProps>(UserContext);
  const [loggedIn] = loggedInstate;
  // const loggedIn = false
  const [trigger, setTrigger] = useState<boolean>(false);

  return (
    <TriggerContext.Provider
      value={{
        navTrigger: [trigger, setTrigger],
      }}
    >
      <div
        className={cx(
          'fixed top-0 left-0 w-full flex justify-around z-30 bg-primary-bg-color',
          isCollapsed ? 'lg:pl-[102px]' : 'lg:pl-[240px]',
        )}
      >
        <div className="w-full px-[19px] flex justify-around">
          <div className="w-full flex items-center justify-between h-14 md:h-20 shadow-md max-w-[var(--max-width)] p-[19px]">
            <div className="flex flex-row items-center">
              <div className="md:hidden">
                <Logo />
              </div>
            </div>
            <div>{loggedIn ? <UserStatus /> : <SignUp />}</div>
          </div>
        </div>
      </div>
    </TriggerContext.Provider>
  );
};

export default NavBar;
