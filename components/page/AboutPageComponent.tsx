export interface AboutPageComponentProps {
  content: string;
}

const AboutPageComponent: React.FC<AboutPageComponentProps> = (props) => {
  return (
    <>
      <h2>About</h2>
      <div>{props.content}</div>
    </>
  );
};
export default AboutPageComponent;
