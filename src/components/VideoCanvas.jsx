import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const VideoCanvas = forwardRef(function VideoCanvas(
  { src, loop, preload = 'metadata', style },
  ref
) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  function drawFrame() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!video || !canvas || !ctx || video.readyState < 2) return;

    if (video.videoWidth !== sizeRef.current.w || video.videoHeight !== sizeRef.current.h) {
      sizeRef.current.w = canvas.width = video.videoWidth;
      sizeRef.current.h = canvas.height = video.videoHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0);
  }

  useImperativeHandle(ref, () => ({
    get readyState() {
      return videoRef.current?.readyState ?? 0;
    },
    get currentTime() {
      return videoRef.current?.currentTime ?? 0;
    },
    set currentTime(value) {
      if (videoRef.current) {
        videoRef.current.currentTime = value;
      }
    },
    play: () => videoRef.current?.play(),
    pause: () => {
      cancelAnimationFrame(rafRef.current);
      videoRef.current?.pause();
    },
    addEventListener: (...args) => videoRef.current?.addEventListener(...args),
  }));

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return undefined;

    ctxRef.current = canvas.getContext('2d');

    const loopFrames = () => {
      drawFrame();
      rafRef.current = requestAnimationFrame(loopFrames);
    };

    const start = () => {
      cancelAnimationFrame(rafRef.current);
      loopFrames();
    };
    const stop = () => cancelAnimationFrame(rafRef.current);
    const drawIfPaused = () => {
      if (video.paused) drawFrame();
    };

    video.addEventListener('play', start);
    video.addEventListener('pause', stop);
    video.addEventListener('ended', stop);
    video.addEventListener('seeked', drawIfPaused);
    video.addEventListener('loadeddata', drawIfPaused);

    if (!video.paused) start();
    else if (video.readyState >= 2) drawFrame();

    return () => {
      video.removeEventListener('play', start);
      video.removeEventListener('pause', stop);
      video.removeEventListener('ended', stop);
      video.removeEventListener('seeked', drawIfPaused);
      video.removeEventListener('loadeddata', drawIfPaused);
      cancelAnimationFrame(rafRef.current);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop={loop}
        preload={preload}
        style={{ display: 'none' }}
      />
      <canvas ref={canvasRef} style={style} />
    </>
  );
});

export default VideoCanvas;
