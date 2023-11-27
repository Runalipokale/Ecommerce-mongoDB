// const mouse = require('node-mouse');

// Create a new mouse listener
const listener = mouse.createListener();

// Listen for mouse events
listener.on('mousedown', (event) => {
  console.log('Mouse button pressed:', event.button);
});

listener.on('mouseup', (event) => {
  console.log('Mouse button released:', event.button);
});

listener.on('click', (event) => {
  console.log('Mouse button clicked:', event.button);
});

// Keep the application running until interrupted
console.log('Listening for mouse events...');
console.log('Press Ctrl + C to exit.');
