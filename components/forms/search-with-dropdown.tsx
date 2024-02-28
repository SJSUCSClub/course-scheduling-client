import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

import Icon from '@/components/icon';

export default function SearchWithDropdown(
  props: React.HTMLProps<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      className={twMerge('h-[40px] text-body text-text', props.className)}
    >
      <input
        type="text"
        className="animation h-full w-0 flex-1 rounded-l-[12px] default-border bg-border pr-10 focus:border-primary focus:ring-0"
        placeholder="Search"
      />
      <div className="relative h-full">
        <div className="absolute right-4 flex h-full w-[16px] items-center">
          <Icon icon={<MagnifyingGlassIcon />} w="16px" h="16px" />
        </div>
      </div>
      <select className="animation flex h-full w-fit appearance-none items-center rounded-r-[12px] default-border bg-background py-[5px] pl-[16px] pr-[38px] focus:border-primary focus:ring-0">
        <option value="courses">Courses</option>
        <option value="professors">Professors</option>
      </select>
    </div>
  );
}
