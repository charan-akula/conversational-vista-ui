
import { livekitConfig } from '@/config/livekit';

export const generateConnectionDetails = async (): Promise<any> => {
  try {
    // This would typically call your backend API to generate a token
    // For now, this is a placeholder that you can replace with your actual backend call
    const response = await fetch('/api/connection-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        livekitUrl: livekitConfig.LIVEKIT_URL,
        apiKey: livekitConfig.LIVEKIT_API_KEY,
        secretKey: livekitConfig.LIVEKIT_SECRET_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get connection details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error connecting to LiveKit:', error);
    // Fallback mock data for testing
    return {
      serverUrl: livekitConfig.LIVEKIT_URL,
      participantToken: 'mock-token-' + Math.random().toString(36).substr(2, 9),
      participantName: 'User-' + Math.random().toString(36).substr(2, 5),
      roomName: 'room-' + Math.random().toString(36).substr(2, 8),
    };
  }
};
