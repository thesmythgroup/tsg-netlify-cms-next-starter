import React, { Component } from 'react';
import Footer from '../components/footer/footer';
import Header from '../components/nav/header';

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
