import { Component } from 'react';

export default class Footer extends Component {
  getYear(): number {
    return new Date().getFullYear();
  }

  render(): JSX.Element {
    return (
      <div>
        <div>
          &copy; {this.getYear()} The Jamie Smyth Groups, LLC All rights
          reserved
        </div>
      </div>
    );
  }
}
