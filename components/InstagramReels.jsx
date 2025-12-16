"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Play, Pause, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

const InstagramReels = () => {
  const bagsData = [
    {
      id: 1,
      title: "Premium Collection Showcase",
      videoUrl: "/videos/reel.mp4",
      likes: 1245,
      views: 5678,
      comments: 89,
      instagramLink: "https://www.instagram.com/searchbag.in/?igsh=MWdwdjZudzRuODY0OQ%3D%3D#",
      username: "lainabags",
    },
    {
      id: 2,
      title: "Elegant Travel Essentials",
      videoUrl: "/videos/reels.mp4",
      likes: 987,
      views: 4321,
      comments: 56,
      instagramLink: "https://www.instagram.com/searchbag.in/?igsh=MWdwdjZudzRuODY0OQ%3D%3D#",
      username: "lainabags",
    },
    {
      id: 3,
      title: "Craftsmanship Behind Every Stitch",
      videoUrl: "/videos/reels.mp4",
      likes: 2345,
      views: 8765,
      comments: 134,
      instagramLink: "https://www.instagram.com/searchbag.in/?igsh=MWdwdjZudzRuODY0OQ%3D%3D#",
      username: "lainabags",
    },
    {
      id: 4,
      title: "Luxury Meets Functionality",
      videoUrl: "/videos/reels.mp4",
      likes: 876,
      views: 3456,
      comments: 42,
      instagramLink: "https://www.instagram.com/searchbag.in/?igsh=MWdwdjZudzRuODY0OQ%3D%3D#",
      username: "lainabags",
    },
  ];

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const videoRefs = useRef({});

  const formatNumber = (num) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num;
  };

  useEffect(() => {
    const generateThumbnail = async (videoUrl, id) => {
      try {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.src = videoUrl;
        video.muted = true;

        video.onloadedmetadata = () => {
          const seekTime = Math.min(0.5, video.duration * 0.25);
          video.currentTime = seekTime;

          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const thumbnailUrl = canvas.toDataURL("image/jpeg");
            setVideoThumbnails((prev) => ({
              ...prev,
              [id]: thumbnailUrl,
            }));

            video.remove();
          };
        };

        video.onerror = () => {
          setVideoThumbnails((prev) => ({
            ...prev,
            [id]: "/images/search.png",
          }));
        };

        video.load();
      } catch (error) {
        setVideoThumbnails((prev) => ({
          ...prev,
          [id]: "/images/search.png",
        }));
      }
    };

    bagsData.forEach((reel) => {
      generateThumbnail(reel.videoUrl, reel.id);
    });
  }, []);

  const toggleVideo = (id) => {
    if (playingVideo === id) {
      videoRefs.current[id]?.pause();
      setPlayingVideo(null);
    } else {
      if (playingVideo) {
        videoRefs.current[playingVideo]?.pause();
      }
      videoRefs.current[id]?.play();
      setPlayingVideo(id);
    }
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 320;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black">
              <span className="text-slate-900">Follow Us on</span>{" "}
              <span className="text-sky-600">Instagram</span>
            </h2>
          </div>
          <p className="max-w-2xl mx-auto text-slate-600">
            Discover our latest premium collections and behind-the-scenes moments
          </p>
        </div>

        {/* Reels Container */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-white rounded-xl shadow-xl border border-slate-200 items-center justify-center text-slate-700 hover:text-sky-600 hover:border-sky-300 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-white rounded-xl shadow-xl border border-slate-200 items-center justify-center text-slate-700 hover:text-sky-600 hover:border-sky-300 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            onMouseDown={(e) => {
              setIsDragging(true);
              setStartX(e.pageX - containerRef.current.offsetLeft);
              setScrollLeft(containerRef.current.scrollLeft);
            }}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (!isDragging) return;
              e.preventDefault();
              const x = e.pageX - containerRef.current.offsetLeft;
              const walk = (x - startX) * 2;
              containerRef.current.scrollLeft = scrollLeft - walk;
            }}
          >
            {bagsData.map((reel) => (
              <div
                key={reel.id}
                className="group flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 snap-center cursor-pointer"
                onClick={() => toggleVideo(reel.id)}
              >
                {/* Video Container */}
                <div className="relative aspect-[9/16] bg-slate-900">
                  {playingVideo !== reel.id && (
                    <Image
                      src={videoThumbnails[reel.id] || "/images/search.png"}
                      alt={reel.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  <video
                    ref={(el) => el && (videoRefs.current[reel.id] = el)}
                    src={reel.videoUrl}
                    className={`absolute inset-0 w-full h-full object-cover ${
                      playingVideo === reel.id ? "opacity-100" : "opacity-0"
                    }`}
                    playsInline
                    loop
                    muted
                  />

                  {/* Header */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 flex items-center justify-center border border-white/30">
                        <Instagram className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{reel.username}</p>
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    {playingVideo !== reel.id ? (
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    ) : (
                      <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                        <Pause className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="font-bold">{formatNumber(reel.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-bold">{formatNumber(reel.comments)}</span>
                        </div>
                      </div>
                      <div className="text-white/80 font-medium">{formatNumber(reel.views)} views</div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-white">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 line-clamp-2">{reel.title}</h3>
                  <a
                    href={reel.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white rounded-lg text-xs font-bold hover:shadow-lg transition-all duration-200"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>View on Instagram</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default InstagramReels;
