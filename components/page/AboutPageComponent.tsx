import ReactMarkdown from 'react-markdown';

export interface AboutPageComponentProps {
  title: string;
  content: string;
}

const AboutPageComponent: React.FC<AboutPageComponentProps> = (props) => {
  return (
    <div className={'prose'}>
      <h1>{props.title}</h1>
      <article>
        <ReactMarkdown children={props.content} />
      </article>
    </div>
  );
};
export default AboutPageComponent;
