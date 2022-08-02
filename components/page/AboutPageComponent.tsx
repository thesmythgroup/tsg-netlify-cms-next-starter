export interface AboutPageComponentProps {
  content: string;
}

const AboutPageComponent: React.FC<AboutPageComponentProps> = (props) => {
  return (
    <>
      <div>{props.content}</div>
    </>
  );
};
export default AboutPageComponent;
