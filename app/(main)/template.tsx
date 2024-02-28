import Navbar from '@/components/navbar';
import Session from '@/components/session-wrapper';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Session>
        <Navbar />
      </Session>
      {children}
    </>
  );
}
