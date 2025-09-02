import { useRouter } from 'next/router';

export default function PropertyPage() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <div>
      {address}
      <h1>Property Page</h1>
      <p>This is a placeholder for the property details page.</p>
    </div>
  );
}