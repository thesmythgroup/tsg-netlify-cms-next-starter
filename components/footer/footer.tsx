import { Component } from 'react';

export default class Footer extends Component {
  getYear(): number {
    return new Date().getFullYear();
  }

  render(): JSX.Element {
    return (
      <div>
        <div>
          All rights reserved {this.getYear()}
        </div>
      </div>
    );
  }
}
