import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TermsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/terms-of-service');
  }, [router]);
  
  return null;
} 