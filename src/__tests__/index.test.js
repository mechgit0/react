// src/__tests__/index.test.js
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css'; // Remove or comment this line
import App from '../App'; // Adjust the path if needed
import reportWebVitals from '../reportWebVitals'; // If you're using reportWebVitals (optional)

describe('index.js', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);  // This renders the App component into a div
    ReactDOM.unmountComponentAtNode(div);  // Clean up after the test
  });

  test('calls reportWebVitals', () => {
    const reportVitalsSpy = jest.spyOn(console, 'log'); // Assuming reportWebVitals logs to the console
    reportWebVitals();
    expect(reportVitalsSpy).toHaveBeenCalled();
    reportVitalsSpy.mockRestore(); // Restore original function
  });
});

