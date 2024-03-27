import React from 'react';
import YouTube from 'react-youtube';
import './Youtube.css';

const YouTubeVideo = ({ videoId }) => {
  // Calculate dimensions based on viewport size
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  // YouTube video options
  const opts = {
    height: `${vh * 0.67}`, // 67vh
    width: `${vw * 0.55}`, // 55vw
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const optsMobile = {
    width: `${vw * .9}`, // 95
    height: `${vw * 0.7}`, // 25vh
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube className='web' videoId={videoId} opts={opts} />
      <YouTube className='mobile' videoId={videoId} opts={optsMobile} />
    </div>
  );
};

export default YouTubeVideo;
