import Navbar from '@/app/(main)/navbar';
import { SWRProvider } from '@/app/(main)/swr-provider';
import Session from '@/components/session-wrapper';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Session>
        <Navbar />
      </Session>
      <SWRProvider>{children}</SWRProvider>
    </>
  );
}
