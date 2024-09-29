import Image from 'next/image';
import ACMCSLogo from '@/assets/acm-cs-logo.svg';
import { ColorModePicker } from '@/components/molecules';

export const Footer: React.FC = () => {
  return (
    <footer className="mx-auto flex w-full max-w-content-width items-center justify-between gap-md px-xxl text-neutral max-lg:flex-col max-lg:py-xl lg:py-lg">
      <Image
        src={ACMCSLogo}
        className="dark:brightness-[10]"
        alt="acm-cs-logo"
      />
      <div className="flex flex-col items-center">
        <p className="text-center">
          Brought to you by ACM-CS@SJSU © 2024. All Rights Reserved.
        </p>
        <p className="text-center">Room MQH 227</p>
      </div>
      <ColorModePicker />
    </footer>
  );
};
