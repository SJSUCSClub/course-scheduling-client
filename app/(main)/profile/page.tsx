import fetcher from '@/utils/fetcher';
import { cookies } from 'next/headers';

export default async function Page() {
  const data = await fetcher(process.env.BASE_API_URL + '/core/users/profile', {
    headers: {
      Cookie: cookies().toString(),
    },
  });
  console.log(data);
  return <div>Page</div>;
}
