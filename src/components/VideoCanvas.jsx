import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

function removeEdgeBlackPixels(ctx, width, height) {
  if (!width || !height) return;

  const frame = ctx.getImageData(0, 0, width, height);
  const { data } = frame;
  const visited = new Uint8Array(width * height);
  const stack = [];
  const threshold = 12;

  const isBlack = (index) => (
    data[index] <= threshold &&
    data[index + 1] <= threshold &&
    data[index + 2] <= threshold &&
    data[index + 3] > 0
  );

  const pushIfBlack = (pixel) => {
    if (visited[pixel]) return;
    const index = pixel * 4;
    if (!isBlack(index)) return;
    visited[pixel] = 1;
    stack.push(pixel);
  };

  for (let x = 0; x < width; x += 1) {
    pushIfBlack(x);
    pushIfBlack((height - 1) * width + x);
  }

  for (let y = 1; y < height - 1; y += 1) {
    pushIfBlack(y * width);
    pushIfBlack(y * width + width - 1);
  }

  while (stack.length) {
    const pixel = stack.pop();
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    data[pixel * 4 + 3] = 0;

    if (x > 0) pushIfBlack(pixel - 1);
    if (x < width - 1) pushIfBlack(pixel + 1);
    if (y > 0) pushIfBlack(pixel - width);
    if (y < height - 1) pushIfBlack(pixel + width);
  }

  ctx.putImageData(frame, 0, 0);
}

const VideoCanvas = forwardRef(function VideoCanvas(
  { src, loop, preload = 'metadata', style },
  ref
) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  const drawFrame = useCallback(() => {
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
    removeEdgeBlackPixels(ctx, canvas.width, canvas.height);
  }, []);

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
    load: () => videoRef.current?.load(),
    drawFrame,
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
    video.addEventListener('loadedmetadata', drawIfPaused);
    video.addEventListener('loadeddata', drawIfPaused);
    video.addEventListener('canplay', drawIfPaused);

    if (!video.paused) start();
    else if (video.readyState >= 2) drawFrame();
    else video.load();

    return () => {
      video.removeEventListener('play', start);
      video.removeEventListener('pause', stop);
      video.removeEventListener('ended', stop);
      video.removeEventListener('seeked', drawIfPaused);
      video.removeEventListener('loadedmetadata', drawIfPaused);
      video.removeEventListener('loadeddata', drawIfPaused);
      video.removeEventListener('canplay', drawIfPaused);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, src]);

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
      <canvas ref={canvasRef} style={{ background: 'transparent', ...style }} />
    </>
  );
});

export default VideoCanvas;
