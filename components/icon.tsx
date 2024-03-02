import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ReactElement;
  w: string;
  h: string;
}

const Icon: React.FC<IconProps> = ({ icon, w, h, ...props }) => {
  return React.cloneElement(icon, {
    strokeWidth: 2,
    ...props,
    style: { ...icon.props.style, width: w, height: h },
  });
};

export default Icon;
