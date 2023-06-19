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
      value={props.value ?? ''}
      id={props.forID}
      className={props.classNameWrapper}
    />
  );
};

export default control;
