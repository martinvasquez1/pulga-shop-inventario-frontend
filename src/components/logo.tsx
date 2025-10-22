import { Link } from "react-router-dom";
import logo from "./../assets/logo.jpeg";
import { cva } from "class-variance-authority";

const logoStyles = cva("aspect-square", {
  variants: {
    size: {
      sm: "w-12",
      md: "w-32",
      lg: "w-40",
      xl: "w-48",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  size?: LogoSize;
  to?: string; // Add a 'to' prop for the link destination
}

const Logo: React.FC<LogoProps> = ({ size = "md", to = "/" }) => {
  return (
    <Link to={to}>
      <div className={logoStyles({ size })}>
        <img src={logo} alt="Logo" />
      </div>
    </Link>
  );
};

export default Logo;
