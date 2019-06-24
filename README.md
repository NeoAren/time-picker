# Time Picker

[![NPM](https://img.shields.io/npm/v/@neoaren/time-picker.svg)](https://www.npmjs.com/package/@neoaren/time-picker) [![NPM Minzipped size](https://img.shields.io/bundlephobia/minzip/@neoaren/time-picker.svg)](https://www.npmjs.com/package/@neoaren/time-picker) [![NPM Download Week](https://img.shields.io/npm/dw/@neoaren/time-picker.svg)](https://www.npmjs.com/package/@neoaren/time-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![NPM License](https://img.shields.io/npm/l/@neoaren/time-picker.svg)](https://www.npmjs.com/package/@neoaren/time-picker)

> ⏰ A modern and easy-to-use React time picker component

## Install
Install the time picker
```bash
npm install --save @neoaren/time-picker
```

### Peer dependencies
This component uses React `>=16.8.0` and React DOM `>=16.8.0` as peer dependencies.

Install them using [npm](https://www.npmjs.com/)
```bash
npm install --save react react-dom
```

## Usage

```jsx
import React from 'react';
import TimePicker from '@neoaren/time-picker';

const App = () => {

  return (
    <TimePicker id="my-timepicker" />
  );

};
```

## Component API

| Name         	|       Type      	| Required 	| Description                                                                                                                                        	|
|--------------	|:---------------:	|:--------:	|----------------------------------------------------------------------------------------------------------------------------------------------------	|
| id           	|     `String`    	|  `true`  	| The unique identifier of the time-picker element.                                                                                                  	|
| defaultValue 	| `Number` `Date` 	|  `false` 	| The default value of the time-picker.                                                                                                              	|
| onChange     	|    `Function`   	|  `false` 	| This function runs when the selected time changes. The only parameter to be passed is an object containing the selected time in different formats. 	|
| placeholder  	|     `String`    	|  `false` 	| The text to be displayed when no time is selected.                                                                                                 	|

## License

MIT © [NeoAren](https://github.com/NeoAren)
