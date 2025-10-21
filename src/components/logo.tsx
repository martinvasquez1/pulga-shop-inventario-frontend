import logo from "./../assets/logo.jpeg";
import { cva } from "class-variance-authority";

const logoStyles = cva("aspect-square", {
  variants: {
    size: {
      sm: "w-24",
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
}

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  return (
    <div className={logoStyles({ size })}>
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
