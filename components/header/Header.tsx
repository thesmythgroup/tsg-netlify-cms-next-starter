import { Component } from 'react';

export default class header extends Component {
  render(): JSX.Element {
    return (
      <div className={'py-8 flex flex-row justify items-center'}>
        <img
          className={'inline-block w-24 rounded-full border border-gray-light'}
          src={'assets/images/tsg_icon_large.png'}
          alt={'The Smyth Group logo'}
        />
        <span className={'px-8 text-3xl font-bold'}>The Smyth Group</span>
      </div>
    );
  }
}
