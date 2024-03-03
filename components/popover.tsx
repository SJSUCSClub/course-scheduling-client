'use client';

import React from 'react';

interface PopoverContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined,
);

interface PopoverTriggerProps extends React.HTMLProps<HTMLDivElement> {}
interface PopoverContentProps extends React.HTMLProps<HTMLDialogElement> {}

const Popover: React.FC<{ children: React.ReactNode }> & {
  Trigger: React.FC<PopoverTriggerProps>;
  Content: React.FC<PopoverContentProps>;
} = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <PopoverContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </PopoverContext.Provider>
  );
};

const Trigger: React.FC<PopoverTriggerProps> = ({ children, ...props }) => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover.Trigger must be used within a Popover');
  }
  const { toggleVisibility } = context;

  return (
    <div onClick={toggleVisibility} {...props}>
      {children}
    </div>
  );
};

Popover.Trigger = Trigger;

const Content: React.FC<PopoverContentProps> = ({ children, ...props }) => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover.Content must be used within a Popover');
  }
  const { isVisible } = context;

  return (
    <dialog open={isVisible} {...props}>
      {children}
    </dialog>
  );
};

Popover.Content = Content;

export { Popover };
