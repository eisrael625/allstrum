import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCanvas from '../components/VideoCanvas';
import videoChords from '../assets/project-33842367-bc19-4967-b1f4-72be01e43a70.webm';
import videoSongs from '../assets/project-9bc73e8c-82b5-4e34-a9dc-56453af258ef (1).webm';
import videoCompose from '../assets/project-c674e169-2061-4759-82f0-2627b5a4d0d4.webm';
import videoTempo from '../assets/project-c7cb1b81-243a-4989-8f16-c1bde6634fed.webm';

const playlist = [videoChords, videoSongs, videoCompose, videoTempo];

const slides = [
  {
    lines: ['Master', 'Every Chord'],
    sub: 'Choose a chord from the app and AllStrum holds it for you automatically.',
  },
  {
    lines: ['Play What', 'You Love'],
    sub: 'Your saved songs are always one click away.',
  },
  {
    lines: ['Compose', 'New Songs'],
    sub: 'Build chord progressions from scratch and make your own music.',
  },
  {
    lines: ['Play at', 'Your Own Pace'],
    sub: 'Adjust the tempo to fit any song and play at the right pace for you.',
  },
];

export default function FeaturesPage() {
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const sectionRefs = useRef([]);
  const [active, setActive] = useState(new Set());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const replayVideo = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.play()?.catch(() => {});
    setActive((prev) => new Set([...prev, index]));
  };

  useEffect(() => {
    const observers = sectionRefs.current.map((section, i) => {
      if (!section) return null;

      const observer = new IntersectionObserver(([entry]) => {
        const video = videoRefs.current[i];
        if (!video) return;

        const rect = entry.boundingClientRect;
        const viewportMid = window.innerHeight / 2;
        const sectionContainsViewportMid = rect.top <= viewportMid && rect.bottom >= viewportMid;

        if (!entry.isIntersecting || !sectionContainsViewportMid) {
          video.pause();
          video.currentTime = 0;
          setActive((prev) => {
            const next = new Set(prev);
            next.delete(i);
            return next;
          });
          return;
        }

        setActive((prev) => new Set([...prev, i]));

        const play = () => video.play()?.catch(() => {});
        if (video.readyState >= 3) play();
        else video.addEventListener('canplay', play, { once: true });
      }, { threshold: [0, 0.35, 0.5, 0.65, 1] });

      observer.observe(section);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <div className="fp-scroll">
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

      {slides.map((slide, i) => (
        <section
          key={slide.lines.join('-')}
          className="fp-section"
          ref={(el) => { sectionRefs.current[i] = el; }}
        >
          <div className={`fp-grid${i % 2 === 1 ? ' fp-grid--rev' : ''}`}>
            <div className="fp-text">
              <h1 className="phone-headline">
                {slide.lines.map((line, j) => (
                  <span key={line} className={`phone-line phone-line-${j + 1}`}>{line}</span>
                ))}
              </h1>
              <p className="phone-subtext">{slide.sub}</p>
            </div>

            <div className="fp-video">
              <div className={`video-reveal${active.has(i) ? ' active' : ''}`}>
                <VideoCanvas
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={playlist[i]}
                  preload="metadata"
                />
                <button className="replay-btn replay-btn--feature" onClick={() => replayVideo(i)} type="button">
                  Replay
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
