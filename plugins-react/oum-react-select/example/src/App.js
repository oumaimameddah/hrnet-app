import React from 'react'

import ReactSelect from 'oum-react-select'
import 'oum-react-select/dist/index.css'

const App = () => {
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];
  return <ReactSelect id="department"
                      value={'t'}
                      options={departments}
                      onChange={e => {}}
                      listLabel="Chose your department"
                      showListLabel={true}
                      requiredFeedbackEnabled={true} />
}

export default App
