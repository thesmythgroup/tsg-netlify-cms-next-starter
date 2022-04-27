import { Component } from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';

export default class header extends Component {
  render(): JSX.Element {
    return (
      <div className={styles.header}>
        <Image
          src={'/assets/images/tsg_icon_large.png'}
          alt={
            'The Smyth Group logo, a white circle with black and orange text'
          }
          width={150}
          height={150}
        />
        <span className={styles.header_title}>The Smyth Group</span>
      </div>
    );
  }
}
