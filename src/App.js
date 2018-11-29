import React, { PureComponent } from 'react'
import TreeFile from './TreeFile'

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <h1>Drag and drop multiple level HTML5 DEMO</h1>
        <TreeFile />
      </div>
    )
  }
}

export default App
