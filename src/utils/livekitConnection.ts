
import { Room, RoomEvent, Track, RemoteTrack, RemoteParticipant } from 'livekit-client';
import { livekitConfig, generateTestToken } from '@/config/livekit';

export class LiveKitConnection {
  private room: Room | null = null;
  private onTranscriptCallback?: (text: string, isUser: boolean) => void;

  constructor() {
    this.room = new Room();
  }

  async connect(roomName: string, participantName: string) {
    if (!this.room) return null;

    try {
      console.log('Connecting to LiveKit room:', roomName);
      
      // Generate token (replace with your backend API call)
      const token = generateTestToken(roomName, participantName);
      
      await this.room.connect(livekitConfig.LIVEKIT_URL, token);
      
      console.log('Connected to LiveKit room successfully');
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Enable camera and microphone
      await this.enableAudioVideo();
      
      return this.room;
    } catch (error) {
      console.error('Failed to connect to LiveKit:', error);
      throw error;
    }
  }

  private setupEventListeners() {
    if (!this.room) return;

    this.room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, publication, participant: RemoteParticipant) => {
      console.log('Track subscribed:', track.kind);
      if (track.kind === Track.Kind.Audio) {
        const audioElement = track.attach();
        document.body.appendChild(audioElement);
      }
    });

    this.room.on(RoomEvent.DataReceived, (payload: Uint8Array, participant, kind) => {
      const message = new TextDecoder().decode(payload);
      console.log('Received message:', message);
      
      // Parse the message and call transcript callback
      try {
        const data = JSON.parse(message);
        if (data.type === 'transcript' && this.onTranscriptCallback) {
          this.onTranscriptCallback(data.text, data.isUser || false);
        }
      } catch (e) {
        console.error('Error parsing message:', e);
      }
    });
  }

  async enableAudioVideo() {
    if (!this.room) return;

    try {
      // Enable microphone
      await this.room.localParticipant.enableCameraAndMicrophone();
      console.log('Camera and microphone enabled');
    } catch (error) {
      console.error('Error enabling camera/microphone:', error);
    }
  }

  setOnTranscript(callback: (text: string, isUser: boolean) => void) {
    this.onTranscriptCallback = callback;
  }

  async sendMessage(message: string) {
    if (!this.room) return;

    const data = JSON.stringify({
      type: 'message',
      text: message,
      timestamp: Date.now()
    });

    await this.room.localParticipant.publishData(new TextEncoder().encode(data));
  }

  disconnect() {
    if (this.room) {
      this.room.disconnect();
      this.room = null;
    }
  }

  getRoom() {
    return this.room;
  }
}
