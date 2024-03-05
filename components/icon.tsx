import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ReactElement;
  w: string;
  h: string;
}

const Icon: React.FC<IconProps> = ({ icon, w, h, ...props }) => {
  return React.cloneElement(icon, {
    strokeWidth: 2,
    ...props,
    style: {
      minWidth: w,
      minHeight: h,
      maxWidth: w,
      maxHeight: h,
      ...props.style,
    },
  });
};

export default Icon;
