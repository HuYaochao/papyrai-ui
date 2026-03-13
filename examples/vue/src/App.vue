<template>
  <div>
    <h1>papyrai-ui Vue Demo</h1>
    
    <h2>AI Components</h2>
    <ai-thinking></ai-thinking>
    <ai-stream text="Hello from Vue!"></ai-stream>
    <ai-message role="assistant" model="GPT-4">Hello from Vue!</ai-message>
    <ai-prompt placeholder="Ask AI..."></ai-prompt>
    
    <h2>Base Components</h2>
    <p-button>Click Me</p-button>
    <p-input label="Name" placeholder="Enter name"></p-input>
    <p-checkbox label="Agree"></p-checkbox>
  </div>
</template>

<script setup>
</script>
