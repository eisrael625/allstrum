// Youtube.js
import React from 'react';

function YouTubeVideo({ videoId }) {
  return (
    <div className="youtube-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?controls=0&rel=0&modestbranding=1&iv_load_policy=3`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubeVideo;
