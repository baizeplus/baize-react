import { FC, memo } from "react";

interface SvgIconProps {
  name: string;
  className?: string;
}

const SvgIcon: FC<SvgIconProps> = memo(({ name, className = "" }) => {
  const iconHref = `#icon-${name}`;
  return (
    <svg className={`svg-icon ${className}`} aria-hidden="true">
      <use href={iconHref}></use>
    </svg>
  );
});

export default SvgIcon;
