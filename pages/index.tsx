import { Component } from 'react';
import Home from '../components/pages/Home';
import { attributes } from '../_content/home.md';

export default class HomePage extends Component {
  render(): JSX.Element {
    const { title, intro } = attributes;
    return (
      <div>
        <Home
            title={title}
            intro={intro}
        />
      </div>
    );
  }
}
