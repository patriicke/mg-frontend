import logoExpandImg from "assets/images/logo/logo.desktop.png";
import logoCollapsedImg from "assets/images/logo/logo.collapsed.png";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  isCollapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ isCollapsed }) => {
  const navigate = useNavigate()
  return (
    <div className="h-[64px] flex items-center cursor-pointer" onClick={() => {navigate('/')}}>
      {isCollapsed ? (
        <img
          src={logoCollapsedImg}
          className="w-[40px] h-[40px] object-contain"
          alt="logo"
        />
      ) : (
        <img src={logoExpandImg} alt="logo" />
      )}
    </div>
  );
};

export default Logo;
