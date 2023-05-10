import HeroBar from './HeroBar/HeroBar';
import GoToPlay from './GoToPlay';

import BetHistory from 'pages/NFTSlot/BetHistory/BetHistory';
import { Toaster } from 'components/ui/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import useDialog from 'hooks/useDialog';
import Signup from 'components/Auth/Signup';
import { UserContext, UserContextProps } from 'App';

const Home = () => {
  const { fetchProfile, loggedInstate } =
    useContext<UserContextProps>(UserContext);
  const [loggedIn] = loggedInstate;
  const { referralId } = useParams();
  const { showDialog, hideDialog } = useDialog();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      hideDialog();
      return navigate('/');
    }
    setTimeout(() => {
      if (referralId && !loggedIn) {
        showDialog(
          <Signup fetchProfile={fetchProfile} referralId={referralId} />,
        );
      }
    }, 10);
  }, [referralId, loggedIn]);

  return (
    <div className="relative flex flex-col gap-[20px]">
      <HeroBar />
      <GoToPlay />
      <BetHistory />
      <Toaster />
    </div>
  );
};

export default Home;
