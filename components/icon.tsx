'use client';

import React from 'react';

import getCustomizableComponents from '@/utils/get-customizable-components';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ReactElement;
  w: string;
  h: string;
}

const {
  Default: Icon,
  Box: IconBox,
  BoxProvider: IconBoxProvider,
} = getCustomizableComponents<IconProps, React.SVGProps<SVGSVGElement>>({
  box:
    ({ icon, w, h }) =>
    ({ ...props }) =>
      React.cloneElement(icon, {
        strokeWidth: 2,
        ...props,
        style: {
          minWidth: w,
          minHeight: h,
          maxWidth: w,
          maxHeight: h,
          ...props.style,
        },
      }),
});
export { IconBox, IconBoxProvider };
export default Icon;
