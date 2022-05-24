import { Component } from 'react';

export default class header extends Component {
  render(): JSX.Element {
    return (
      <div>
        <img
          className={'inline-block w-28'}
          src={'assets/images/tsg_icon_large.png'}
          alt={'The Smyth Group logo'}
        />
        <span>The Smyth Group</span>
      </div>
    );
  }
}
