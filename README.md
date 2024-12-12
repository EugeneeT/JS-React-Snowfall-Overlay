# JS-React-Snowfall-Overlay
A lightweight, customizable React snowfall overlay for winter-themed web applications.

## Installation

```bash
npm install js-react-snowfall-overlay
```

## Usage

```jsx
import React from 'react';
import SnowfallOverlay from 'js-react-snowfall-overlay';
import snowflakeSvg from './path/to/snowflake.svg';

function App() {
  return (
    <div>
      <SnowfallOverlay 
        count={150}  // Number of snowflakes
        snowflakeSvg={snowflakeSvg}
      />
      {/* Rest of your app */}
    </div>
  );
}
```

## Props

- `count`: Number of snowflakes (default: 150)
- `snowflakeSvg`: SVG file for snowflakes

## License

MIT
