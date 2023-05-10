import { UserContextProps, UserContext } from 'App';
import SignIn from 'components/Auth/SignIn';
import useDialog from 'hooks/useDialog';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const { loggedInstate, fetchProfile } =
      useContext<UserContextProps>(UserContext);
    const [loggedIn] = loggedInstate;
    const { showDialog } = useDialog();

    useEffect(() => {
      const getData = setTimeout(() => {
        if (!loggedIn) {
          navigate('/');
          showDialog(<SignIn fetchProfile={fetchProfile} />);
        }
      }, 1000);

      return () => clearTimeout(getData);
    }, [loggedIn]);

    // useEffect(() => {
    //   if (!loggedIn) {
    //     navigate('/');
    //     showDialog(<SignIn fetchProfile={fetchProfile} />);
    //   }
    // }, [loggedIn]);
    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};

export default withAuth;
