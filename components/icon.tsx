import React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ReactElement;
  w: string;
  h: string;
}

export default function Icon({ icon, w, h, ...props }: IconProps) {
  return React.cloneElement(icon, {
    strokeWidth: 2,
    ...props,
    style: { ...icon.props.style, width: w, height: h },
  });
}
