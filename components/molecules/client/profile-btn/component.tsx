'use client';

import { LinkBtn } from '@/components/atoms';
import { cn } from '@/utils/cn';
import { useSession } from '@/wrappers/session-provider';
import { UserIcon } from '@heroicons/react/20/solid';

interface Props
  extends Omit<
    React.ComponentProps<typeof LinkBtn>,
    'variant' | 'children' | 'href'
  > {}

export const ProfileBtn: React.FC<Props> = ({ className, ...props }) => {
  const session = useSession();
  if (session) {
    return (
      <LinkBtn
        className={cn('!text-neutral', className)}
        {...props}
        href="/profile"
        variant="tertiary"
      >
        <UserIcon width={20} height={20} /> Profile
      </LinkBtn>
    );
  }
  return null;
};
