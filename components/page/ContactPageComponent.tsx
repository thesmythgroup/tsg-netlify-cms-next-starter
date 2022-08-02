export interface ContactPageComponentProps {
  intro: string;
}

const ContactPageComponent: React.FC<ContactPageComponentProps> = (props) => {
  return (
    <>
      <h2>Contact</h2>
      <div>{props.intro}</div>

      <div>Name:</div>
      <input type='text' />

      <div>Subject:</div>
      <input type='text' />

      <div>Message:</div>
      <input type='text' />
    </>
  );
};
export default ContactPageComponent;
