import { Component } from 'react';
import styles from './Home.module.scss';

export interface HomeComponentProps {
  title: string;
  intro: string;
}

export default class Home extends Component<HomeComponentProps> {
  render(): JSX.Element {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div className={styles.home_intro}>{this.props.intro}</div>
      </div>
    );
  }
}
