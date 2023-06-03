# oum-react-modal

> A simple & lightweight method of displaying modal windows with React and published.

[![NPM](https://img.shields.io/npm/v/oum-react-modal.svg)](https://www.npmjs.com/package/oum-react-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save oum-react-modal
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactModal from 'oum-react-modal'
import 'oum-react-modal/dist/index.css'

class Example extends Component {
  render() {
    return <ReactModal id="id-modal"
                       modalContent="React Modal Pluging Example 😄 !"
                       isModalOpened={true}
                       onClose={() => {console.log('Close Modal')}}/>
  }
}
```

## License

MIT © [Oumaima MEDDAH](https://github.com/oumaimameddah/hrnet-app/tree/master/plugins-react/oum-react-modal)
