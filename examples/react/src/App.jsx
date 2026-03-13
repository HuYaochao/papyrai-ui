import React from 'react'
import 'papyrai-ui'

function App() {
  return (
    <div>
      <h1>papyrai-ui React Demo</h1>
      
      <h2>AI Components</h2>
      <ai-thinking></ai-thinking>
      <ai-stream text="Hello from React!"></ai-stream>
      <ai-message role="assistant" model="GPT-4">Hello from React!</ai-message>
      <ai-prompt placeholder="Ask AI..."></ai-prompt>
      
      <h2>Base Components</h2>
      <p-button>Click Me</p-button>
      <p-input label="Name" placeholder="Enter name"></p-input>
      <p-checkbox label="Agree"></p-checkbox>
    </div>
  )
}

export default App
