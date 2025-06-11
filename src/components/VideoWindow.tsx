
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Room, Track } from 'livekit-client';

interface VideoWindowProps {
  room?: Room | null;
}

const VideoWindow = ({ room }: VideoWindowProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [hasLocalVideo, setHasLocalVideo] = useState(false);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);

  useEffect(() => {
    if (!room) return;

    // Handle local video
    const setupLocalVideo = async () => {
      const localVideoTrack = room.localParticipant.getTrackPublication(Track.Source.Camera)?.track;
      if (localVideoTrack && localVideoRef.current) {
        localVideoTrack.attach(localVideoRef.current);
        setHasLocalVideo(true);
      }
    };

    // Handle remote video
    const handleTrackSubscribed = (track: any) => {
      if (track.kind === Track.Kind.Video && remoteVideoRef.current) {
        track.attach(remoteVideoRef.current);
        setHasRemoteVideo(true);
      }
    };

    room.on('trackSubscribed', handleTrackSubscribed);
    setupLocalVideo();

    return () => {
      room.off('trackSubscribed', handleTrackSubscribed);
    };
  }, [room]);

  return (
    <div className="w-full h-full bg-slate-900/50 rounded-xl flex flex-col gap-4 min-h-[300px] p-4">
      {/* Remote Video (Main) */}
      <div className="flex-1 bg-slate-800/50 rounded-lg flex items-center justify-center relative">
        {hasRemoteVideo ? (
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            playsInline
          />
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 bg-slate-600 rounded-full animate-pulse" />
            </div>
            <p className="text-slate-400">Waiting for remote video...</p>
          </motion.div>
        )}
      </div>

      {/* Local Video (Picture-in-Picture) */}
      <div className="w-32 h-24 bg-slate-800/50 rounded-lg flex items-center justify-center relative">
        {hasLocalVideo ? (
          <video
            ref={localVideoRef}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className="text-center">
            <div className="w-8 h-8 bg-slate-600 rounded-full mx-auto animate-pulse" />
            <p className="text-xs text-slate-400 mt-1">You</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoWindow;
