'use client';

import React from 'react';
import clsx from 'clsx';

interface PopoverContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined,
);

interface Popover {
  children: React.ReactNode;
}

/**
 * This is the `<Popover />` component. It is used to provide the context for the trigger and dialog elements.
 * @component
 * @example
 * return (
 *  <Popover>
 *   <PopoverTrigger>{({ toggleVisibility }) => <button onClick={toggleVisibility}>Click me</button>}</PopoverTrigger>
 *   <PopoverBox className="left-5 top-8">
 *    <Options />
 *   </PopoverBox>
 *  </Popover>
 * )
 */
export const Popover: React.FC<Popover> = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <PopoverContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  children: (props: { toggleVisibility: () => void }) => React.ReactNode;
}

/**
 * This is the `<PopoverTrigger />` component. It is used to provide the trigger for the dialog element.
 * @component
 * @example
 * return (
 *  <Popover>
 *   <PopoverTrigger>{({ toggleVisibility }) => <button onClick={toggleVisibility}>Click me</button>}</PopoverTrigger>
 *   <PopoverBox className="left-5 top-8">
 *    <Options />
 *   </PopoverBox>
 *  </Popover>
 * )
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  if (typeof children !== 'function') {
    throw new Error(
      'PopoverTrigger children must be a function. Use a render prop pattern.\nExample: <PopoverTrigger>{({ toggleVisibility }) => <button onClick={toggleVisibility}>Click me</button>}</PopoverTrigger>',
    );
  }
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('PopoverTrigger must be used within a Popover');
  }
  const { toggleVisibility } = context;

  return children({ toggleVisibility });
};

/**
 * This is the `<PopoverBox />` component. It is used to provide the dialog element for the popover.
 * @component
 * @example
 * return (
 *  <Popover>
 *   <PopoverTrigger>{({ toggleVisibility }) => <button onClick={toggleVisibility}>Click me</button>}</PopoverTrigger>
 *   <PopoverBox className="left-5 top-8">
 *    <Options />
 *   </PopoverBox>
 *  </Popover>
 * )
 */
export const PopoverBox: React.FC<React.HTMLProps<HTMLDialogElement>> = ({
  children,
  ...props
}) => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('PopoverBox must be used within a Popover');
  }
  const { isVisible } = context;

  return (
    <dialog
      open={isVisible}
      {...props}
      className={clsx(
        '-:rounded-lg -:p-[32px] -:shadow-paper -:default-border',
        props.className,
      )}
    >
      {children}
    </dialog>
  );
};
