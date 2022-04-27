import { Component } from 'react';
import styles from './Footer.module.scss';

export default class Footer extends Component {
  getYear(): number {
    return new Date().getFullYear();
  }

  render(): JSX.Element {
    return (
      <div className={styles.main_footer}>
        <div>All rights reserved {this.getYear()}</div>
      </div>
    );
  }
}
