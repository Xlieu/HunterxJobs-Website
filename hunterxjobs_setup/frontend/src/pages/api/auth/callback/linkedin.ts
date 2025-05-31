import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * LinkedIn OAuth callback handler
 * 
 * This API route receives the callback from LinkedIn's OAuth flow
 * and forwards it to our backend API.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the code and state parameters from the query
  const { code, state, error, error_description } = req.query;

  // Check if there was an error from LinkedIn
  if (error) {
    console.error('LinkedIn OAuth error:', error, error_description);
    return res.redirect(`/login?linkedin=error&message=${encodeURIComponent(error_description as string || 'Authorization failed')}`);
  }

  // If we have a code, forward it to our backend
  if (code) {
    try {
      // Redirect to our backend callback endpoint
      const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/linkedin/callback`;
      const redirectUrl = `${backendUrl}?code=${code}&state=${state}`;
      
      console.log('Redirecting to backend:', redirectUrl);
      return res.redirect(redirectUrl);
    } catch (err) {
      console.error('Error forwarding LinkedIn callback to backend:', err);
      return res.redirect('/login?linkedin=error&message=Failed to connect to backend');
    }
  }

  // If there's no code, return an error
  res.redirect('/login?linkedin=error&message=Authorization code is missing');
} 