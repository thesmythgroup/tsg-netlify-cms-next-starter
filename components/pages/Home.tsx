import { Component } from 'react';

export interface HomeComponentProps {
  title: string;
  intro: string;
}

export default class Home extends Component<HomeComponentProps> {
  render(): JSX.Element {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.props.intro}</div>
      </div>
    );
  }
}
