interface SourceProps {
  resolution: string;
  width: string;
  src: string;
}

interface ImgaeProps {
  defaultSrc: string;
  alt?: string;
  sources: SourceProps[];
}

const Image: React.FC<ImgaeProps> = ({
  defaultSrc, 
  alt,
  sources
}) => {
  return (
    <picture>
      {sources.map((source, index) => {
        return (
          <source media={`(min-width:${source.resolution}px)`} srcSet={source.src}></source>
        )
      })}
      <img src={defaultSrc} alt={alt} style={{width: '21px'}} />
    </picture>
  )
}

export default Image;