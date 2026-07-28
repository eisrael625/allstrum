// Youtube.js — lightweight facade: renders only the video thumbnail until the
// visitor clicks play, so the heavy YouTube player never blocks first paint.
import React, { useState } from 'react';
import './Youtube.css';

function YouTubeVideo({ videoId, title = 'AllStrum demo video' }) {
  const [activated, setActivated] = useState(false);
  const [thumbQuality, setThumbQuality] = useState('maxresdefault');

  if (activated) {
    return (
      <div className="youtube-responsive">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="youtube-responsive">
      <button
        type="button"
        className="youtube-facade"
        onClick={() => setActivated(true)}
        aria-label={`Play video: ${title}`}
      >
        <img
          className="youtube-facade__thumb"
          src={`https://i.ytimg.com/vi/${videoId}/${thumbQuality}.jpg`}
          alt=""
          loading="eager"
          decoding="async"
          onLoad={(e) => {
            // maxresdefault falls back to a 120px gray placeholder when missing
            if (thumbQuality === 'maxresdefault' && e.currentTarget.naturalWidth <= 120) {
              setThumbQuality('hqdefault');
            }
          }}
          onError={() => setThumbQuality('hqdefault')}
        />
        <span className="youtube-facade__button" aria-hidden="true">
          <svg viewBox="0 0 68 48" width="68" height="48">
            <path d="M66.52 7.74a8 8 0 0 0-5.6-5.66C55.79.13 34 .13 34 .13s-21.79 0-26.92 1.95a8 8 0 0 0-5.6 5.66C-.5 12.88-.5 24-.5 24s0 11.12 1.98 16.26a8 8 0 0 0 5.6 5.66C12.21 47.87 34 47.87 34 47.87s21.79 0 26.92-1.95a8 8 0 0 0 5.6-5.66C68.5 35.12 68.5 24 68.5 24s0-11.12-1.98-16.26z" fill="#f00" />
            <path d="M45 24 27 14v20z" fill="#fff" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default YouTubeVideo;
