import React, { useEffect, useCallback } from 'react';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, AnalyticsEvents } from '../services/analytics';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title = '75-sec Overview',
}) => {
  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      trackEvent(AnalyticsEvents.CTA_VIDEO_CLICK, { action: 'modal_open' });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  // Check if we have a video URL
  const hasVideo = videoUrl && videoUrl.trim() !== '';

  // Extract video ID for privacy-friendly embed
  const getEmbedUrl = (url: string): string | null => {
    // YouTube
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    if (ytMatch) {
      // Privacy-enhanced YouTube embed (no cookies)
      return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1&autoplay=1`;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1&autoplay=1`;
    }

    // Return raw URL if it's already an embed URL
    if (url.includes('embed') || url.includes('player')) {
      return url;
    }

    return null;
  };

  const embedUrl = hasVideo ? getEmbedUrl(videoUrl) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <h2
                  id="video-modal-title"
                  className="text-lg font-semibold text-white"
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close video"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative aspect-video bg-slate-800">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  /* Placeholder when no video is available */
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center mb-6">
                      <Play className="text-emerald-400" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Video coming soon
                    </h3>
                    <p className="text-slate-400 max-w-md">
                      A 75-second overview of my architecture and transformation
                      services will be available here shortly.
                    </p>
                    <p className="text-emerald-400 mt-4 text-sm">
                      In the meantime, book a discovery call to learn more.
                    </p>
                    <a
                      href="https://calendly.com/prasad-sgsits/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      onClick={() =>
                        trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, {
                          source: 'video_modal_placeholder',
                        })
                      }
                    >
                      Book Discovery Call
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
