import React from 'react';
import TimePicker from '@neoaren/time-picker';
import './App.css';

const App = () => {

	return (
		<div id="neo-time-picker-demo">
			<span>Start time:</span>
			<TimePicker
				id="demo-1"
				onChange={value => console.log(value)}
				defaultValue={1001800800000}
				placeholder="Select time"
			/>
			<span>End time:</span>
			<TimePicker
				id="demo-2"
				onChange={value => console.log(value)}
				defaultValue={new Date()}
				placeholder="Select time"
			/>
		</div>
	);
};

export default App;
