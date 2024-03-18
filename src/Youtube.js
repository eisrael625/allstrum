import React from 'react';
import YouTube from 'react-youtube';
import './Youtube.css';

const YouTubeVideo = () => {
  // YouTube video options
  const opts = {
    height: '440',
    width: '650',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const optsMobile = {
      width: '350',
      height: '300',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // YouTube video ID
  const videoId = 'Vy46onQp99c';

  return (
    <div>
          <YouTube className = 'web' videoId={videoId} opts={opts} />
          <YouTube className = 'mobile section' videoId={videoId} opts={optsMobile} />
    </div>
  );
};

export default YouTubeVideo;
