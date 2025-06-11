
// LiveKit Configuration
// Replace these with your actual LiveKit credentials
export const livekitConfig = {
  LIVEKIT_URL: 'wss://your-livekit-server.livekit.cloud',
  LIVEKIT_API_KEY: 'your-api-key',
  LIVEKIT_SECRET_KEY: 'your-secret-key',
};

// Connection details interface
export interface ConnectionDetails {
  serverUrl: string;
  participantToken: string;
  participantName: string;
  roomName: string;
}
