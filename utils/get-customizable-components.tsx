'use client';

import React from 'react';

type BoxContextType<T> = Omit<T, 'children'>;
type BoxProviderProps<T> = T & { children: React.ReactNode };
type HasChildren<T> = 'children' extends keyof T ? Pick<T, 'children'> : {};
type OverrideChildren<T, K> = Omit<K, 'children'> & HasChildren<T>;

/**
 * This is a utility function to create customizable components.
 *
 * This utility provides a way to create reusable and customizable components, while encapsulating the custom props and the container props seperately.
 * @param box - A function that provides the component with the custom props from context, and returns a component with the container props.
 * @param fallback - A component that will be used if the context or box components are not provided. This should be used to provide only the container component. It is optional.
 * @returns An object containing the Default, Box, and BoxProvider components.
 *
 * Usage:
 * @component
 * @example
 * // CREATING THE CUSTOM ELEMENT:
 * const {
 *  Default: CustomComponent,
 *  Box: CustomComponentBox,
 *  BoxProvider: CustomComponentBoxProvider,
 * } = createCustomComponent<CustomComponentProps, React.HTMLProps<HTMLDivElement>>({
 *  box: ({customProp}) => ({ children, ...props }) => (
 *    <div {...props} className={clsx("-:flex-1",props.className)}>
 *      {children} - {customProp}
 *    </div>
 *  ),
 *  fallback: ({ children, ...props }) => (<div {...props} className={clsx("-:flex-1",props.className)}>{children}</div>),
 * });
 *
 * // USING THE CUSTOM ELEMENT:
 * @example
 * return (
 *  <CustomComponentBoxProvider customProp="customValue">
 *    <CustomComponentBox className="w-full h-fit">
 *     {children}
 *    </CustomComponentBox>
 *  </CustomComponentBoxProvider>
 * )
 *
 * // USING THE DEFAULT ELEMENT:
 * @example
 * return (
 *  <CustomComponent customProp="customValue">
 *   {children}
 *  </CustomComponent>
 * )
 */
const getCustomizableComponents = <T, K>({
  box,
  fallback,
}: {
  box?: (context: BoxContextType<T>) => React.FC<OverrideChildren<T, K>>;
  fallback?: React.FC<K>;
}) => {
  const BoxContext = React.createContext<BoxContextType<T> | undefined>(
    undefined,
  );

  // Provides the custom props to the Box component
  const BoxProvider: React.FC<BoxProviderProps<T>> = ({
    children,
    ...props
  }) => (
    <BoxContext.Provider value={props as BoxContextType<T>}>
      {children}
    </BoxContext.Provider>
  );

  // Customizable container with container props
  const Box: React.FC<OverrideChildren<T, K> | K> = (props) => {
    const context = React.useContext(BoxContext);
    if (!context) {
      if (fallback) {
        return fallback(props as K);
      } else {
        throw new Error(
          'Provide a fallback, otherwise Box must be used within a Provider',
        );
      }
    } else if (!box) {
      if (fallback) {
        return fallback(props as K);
      } else {
        throw new Error('Provide a Box, otherwise provide a fallback.');
      }
    }
    return box(context)(props as OverrideChildren<T, K>);
  };

  // This is the default element. Use this if you don't want to customize the componenent container props.
  const Default: React.FC<T> = (props) => {
    const { children, ...rest } = props as T & { children: React.ReactNode };
    return (
      <BoxProvider {...(rest as T)}>
        {children ? (
          <Box {...({} as OverrideChildren<T, K>)}>{children}</Box>
        ) : (
          <Box
            {...({} as OverrideChildren<T, K> & React.JSX.IntrinsicAttributes)}
          />
        )}
      </BoxProvider>
    );
  };

  return { Default, Box, BoxProvider };
};

export default getCustomizableComponents;
