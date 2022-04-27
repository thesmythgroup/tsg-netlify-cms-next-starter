import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

export default class Layout extends Component {
  render(): JSX.Element {
    const { children } = this.props;

    return (
      <div className={'container'}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }
}
