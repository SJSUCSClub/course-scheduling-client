import clsx from 'clsx';

interface TagContainerFactoryProps {
  size: 'sm' | 'lg';
  children: React.ReactNode;
}

const TagContainerFactory: React.FC<TagContainerFactoryProps> = ({
  size,
  children,
}) =>
  size === 'sm' ? (
    <TagButtonElementSm>{children}</TagButtonElementSm>
  ) : (
    <TagButtonElementLg>{children}</TagButtonElementLg>
  );

/**
 * This is a styled button element for the large tag component.
 * You can use this component along with `<TagBase />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <TagButtonElementLg className="w-full h-fit">
 *    <TagBase size='lg' count={count}>
        {children}
      </TagBase>
 *  </TagButtonElementLg>
 * )
 */
export const TagButtonElementLg: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
  <button
    {...props}
    className={clsx(
      '-:flex -:gap-[5px] -:rounded-lg -:bg-border -:px-[20px] -:py-[10px] -:text-tag -:text-neutral -:hover:opacity-50 -:active:opacity-25',
      props.className,
    )}
  >
    {children}
  </button>
);

/**
 * This is a styled button element for the small tag component.
 * You can use this component along with `<TagBase />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <TagButtonElementSm className="w-full h-fit">
 *    <TagBase size='sm' count={count}>
        {children}
      </TagBase>
 *  </TagButtonElementSm>
 * )
 */
export const TagButtonElementSm: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
  <button
    {...props}
    className={clsx(
      '-:flex -:gap-[5px] -:rounded-lg -:bg-border -:px-[15px] -:py-[5px] -:text-caption -:hover:opacity-50 -:active:opacity-25',
      props.className,
    )}
  >
    {children}
  </button>
);

interface TagBaseProps extends TagContainerFactoryProps {
  count?: number;
}

/**
 * This is the base tag component.
 * You can use this component along with `<TagButtonElementLg />` or `<TagButtonElementSm />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <TagButtonElementLg className="w-full h-fit">
 *   <TagBase size='lg' count={count}>
 *    {children}
 *   </TagBase>
 *  </TagButtonElementLg>
 * )
 */
export const TagBase: React.FC<TagBaseProps> = ({ size, count, children }) => (
  <>
    {children}
    {count ? (
      <span
        className={clsx({
          'text-caption text-neutral': size === 'sm',
          'text-tag text-text': size === 'lg',
        })}
      >
        {count}
      </span>
    ) : null}
  </>
);

interface TagProps extends TagBaseProps {}

/**
 * This is the default tag component.
 * @component
 * @example
 * return (
 *  <Tag size={size} count={count}>
 *   {children}
 *  </Tag>
 * )
 */
const Tag: React.FC<TagProps> = ({ size, count, children }) => {
  return (
    <TagContainerFactory size={size}>
      <TagBase size={size} count={count}>
        {children}
      </TagBase>
    </TagContainerFactory>
  );
};

export default Tag;
