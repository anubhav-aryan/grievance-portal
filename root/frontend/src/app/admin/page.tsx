'use client'
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const token = router.query?.token;

  return (
    <div>
      <h1>Welcome to the Admin Page</h1>
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default Page;
