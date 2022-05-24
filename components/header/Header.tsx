import { Component } from 'react';
import styles from './Header.module.scss';

export default class header extends Component {
  render(): JSX.Element {
    return (
      <div className={styles.header}>
        <img
          src={'assets/images/tsg_icon_large.png'}
          alt={'The Smyth Group logo'}
        />
        <span className={styles.header_title}>The Smyth Group</span>
      </div>
    );
  }
}
