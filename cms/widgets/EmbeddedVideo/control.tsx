import React from 'react';
import { CmsWidgetControlProps } from 'netlify-cms-core';

const control: React.FC<CmsWidgetControlProps> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <input
      type='text'
      onChange={(e) => handleChange(e)}
      value={props.value ?? 'https://www.youtube.com/embed/SCCffOscgoc'}
      id={props.forID}
      placeholder='https://www.youtube.com/embed/SCCffOscgoc'
      className={props.classNameWrapper}
    />
  );
};

export default control;
