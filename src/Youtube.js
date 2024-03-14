import React from 'react';
import YouTube from 'react-youtube';

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

  // YouTube video ID
  const videoId = 'Vy46onQp99c';

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubeVideo;
