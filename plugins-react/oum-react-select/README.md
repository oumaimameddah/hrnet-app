# oum-react-select

> Duplicates and extends the functionality of a native HTML select element, allowing it to be customizable in behavior and appearance far beyond the limitations of a native select.

[![NPM](https://img.shields.io/npm/v/oum-react-select.svg)](https://www.npmjs.com/package/oum-react-select) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save oum-react-select
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactSelect from 'oum-react-select'
import 'oum-react-select/dist/index.css'

class Example extends Component {
  render() {
    const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];
    return <ReactSelect id="department"
                        value={'t'}
                        options={departments}
                        onChange={e => {}}
                        listLabel="Chose your department"
                        showListLabel={true}
                        requiredFeedbackEnabled={true} />
  }
}
```

## License

MIT © [Oumaima MEDDAH](https://github.com/oumaimameddah/hrnet-app/tree/master/plugins-react/oum-react-select)
