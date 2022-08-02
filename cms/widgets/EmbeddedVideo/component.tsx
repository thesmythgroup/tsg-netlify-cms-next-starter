import React from 'react';

interface EmbeddedVideoProps {
  url: string;
}

const EmbeddedVideoComponent: React.FC<EmbeddedVideoProps> = ({ url }) => {
  return (
    <>
      <iframe
        className='aspect-video w-full'
        src={url}
        title='Embedded Video'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </>
  );
};

export default EmbeddedVideoComponent;
