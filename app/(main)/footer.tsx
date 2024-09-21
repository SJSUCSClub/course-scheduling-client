import Link from 'next/link';
import React from 'react';

import ACMLogo from '@/components/acm-logo';
import Discord from '@/components/discord';
import Instagram from '@/components/instagram';
import LinkedIn from '@/components/linkedin';

const Socials: React.FC = () => {
  return (
    <>
      <Link href="https://discord.gg/4cXE636ax4">
        <Discord />
      </Link>
      <Link href="https://www.instagram.com/sjsuacm/">
        <Instagram />
      </Link>
      <Link href="https://www.linkedin.com/company/sjsu-computer-science-club/about/">
        <LinkedIn />
      </Link>
    </>
  );
};

const Footer: React.FC<{}> = () => {
  return (
    <footer className="mx-auto flex flex-col items-center justify-between gap-y-[16px] max-width max-lg:px-[16px] max-lg:py-[26px] lg:flex-row">
      {/* Logo */}
      <div className="py-[10px]">
        <ACMLogo />
      </div>

      {/* Mobile Socials */}
      <div className="flex h-min flex-row gap-[5px] lg:hidden">
        <Socials />
      </div>

      {/* Location */}
      <div className="flex flex-col justify-center gap-[10px] text-center text-neutral">
        <div className="max-lg:hidden">
          Room MQH 227, San Jose State University 1 Washington Sq, San Jose, CA
          95192
        </div>
        <div className="lg:hidden">Room MQH 227, San Jose State University</div>
        <div className="lg:hidden">1 Washington Sq, San Jose, CA 95192</div>
        <div>Brought to you by ACM-CS@SJSU © 2024</div>
      </div>

      {/* Desktop Socials */}
      <div className="flex h-min flex-row gap-[5px] max-lg:hidden">
        <Socials />
      </div>
    </footer>
  );
};

export default Footer;
