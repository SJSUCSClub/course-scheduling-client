import { LastNameDisplay } from '@/app/(main)/professors/(page)/@name/lastname';
import SWRConfigProvider from '@/wrappers/swr-config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professors',
};

export default function Page() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const components = [];

  for (const letter of letters) {
    components.push(<LastNameDisplay startswith={letter} key={letter} />);
  }
  return (
    <>
      <div className="py-lg text-h2-mobile lg:text-h2-desktop">
        Professors <span className="text-primary">by Last Name</span>
      </div>

      <div className="flex flex-col">
        <SWRConfigProvider>
          <div className="flex flex-col gap-[20px]">{components}</div>
        </SWRConfigProvider>
      </div>
    </>
  );
}
