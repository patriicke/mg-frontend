import logoImg from "assets/images/logo/logo.png";
import { useNavigate } from "react-router-dom";

const Logo:React.FC = () => {
  const navigate = useNavigate()
  return (
      <div className="flex justify-around items-center hover:cursor-pointer" onClick={() => {navigate('/')}}>
        <img src={logoImg} className="w-[56px] lg:w-[94px]" alt="logo" />
      </div>
  );
};

export default Logo;
