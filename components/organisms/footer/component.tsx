import Image from 'next/image';
import ACMCSLogo from '@/assets/acm-cs-logo.svg';
import DiscordLogo from '@/assets/discord.svg';
import InstagramLogo from '@/assets/instagram.svg';
import LinkedInLogo from '@/assets/linkedin.svg';
import { LinkBtn } from '@/components/atoms';

export const Footer: React.FC = () => {
  return (
    <footer className="mx-auto flex w-full max-w-content-width items-center justify-between gap-md px-xxl text-neutral max-lg:flex-col max-lg:py-xl lg:py-lg">
      <Image src={ACMCSLogo} alt="acm-cs-logo" />
      <div className="flex flex-col items-center">
        <p className="text-center">
          Brought to you by ACM-CS@SJSU © 2024. All Rights Reserved.
        </p>
        <p className="text-center">Room MQH 227</p>
      </div>
      <div className="flex gap-sm">
        <LinkBtn
          className="rounded-sm !p-0"
          variant="tertiary"
          href="https://discord.gg/8j6Y3ZJ"
        >
          <Image src={DiscordLogo} alt="discord-logo" />
        </LinkBtn>
        <LinkBtn
          className="rounded-sm !p-0"
          variant="tertiary"
          href="https://www.instagram.com/acmcs_sjsu/"
        >
          <Image src={InstagramLogo} alt="instagram-logo" />
        </LinkBtn>
        <LinkBtn
          className="rounded-sm !p-0"
          variant="tertiary"
          href="https://www.linkedin.com/company/acm-cs-sjsu/"
        >
          <Image src={LinkedInLogo} alt="linkedin-logo" />
        </LinkBtn>
      </div>
    </footer>
  );
};
