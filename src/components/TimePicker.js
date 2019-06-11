import React from 'react';
import PropTypes from 'prop-types';
import { format, getHours, getMinutes, getSeconds } from 'date-fns';

import './styles/TimePicker.scss';

const TimePicker = ({ id, select, selected }) => {

	// Set the position of the time picker
   const inputElement = document.querySelector('#' + id + '-input');
   const style = inputElement && { top: inputElement.offsetTop, left: inputElement.offsetLeft };

   // Set formatted time and base classname
   const time = !selected ? '' : format(selected, 'HH:mm:ss');
	const className = 'neotimepicker-picker';

	// Render picker lists
	const renderList = (amount, selectedValue) => {
		const items = [];
		for (let i = 0; i < amount; i++) {
			const cN = className + '__body-list-item' + (selectedValue !== i ? '' : ' neotimepicker--selected');
			items.push(
				<div key={i} className={cN}>{i < 10 ? '0' + i : i}</div>
			);
		}
		return items;
	};

	// Render 'TimePicker' component
	return (
		<div id={id + '-picker'} className={className} style={style}>
         <div className={className + '__input-wrapper'}>
            <input className={className + '__input'} autoFocus={true} defaultValue={time} placeholder="hh:mm:ss" />
         </div>
         <div className={className + '__body'}>
				<div className={className + '__body-list'}>{renderList(24, getHours(selected))}</div>
				<div className={className + '__body-list'}>{renderList(60, getMinutes(selected))}</div>
				<div className={className + '__body-list'}>{renderList(60, getSeconds(selected))}</div>
			</div>
      </div>
	);

};

TimePicker.propTypes = {
   id: PropTypes.PropTypes.string.isRequired,
   select: PropTypes.func.isRequired,
   selected: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
};

export default TimePicker;
