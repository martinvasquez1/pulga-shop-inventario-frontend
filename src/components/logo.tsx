import { Link } from "react-router-dom";
import LogoSVG from "./../assets/logo.svg";
import { cva } from "class-variance-authority";

const logoStyles = cva("", {
  variants: {
    size: {
      sm: "w-28",
      md: "w-28",
      lg: "w-28",
      xl: "w-28",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: LogoSize;
  to?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", to = "/" }) => {
  return (
    <Link to={"/"}>
      <img src={LogoSVG} className={logoStyles({ size })} />
    </Link>
  );
};

export default Logo;
