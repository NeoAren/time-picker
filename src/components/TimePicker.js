import React, { useEffect } from 'react';
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

	// Scroll to selected item in list
	const jumpToSelected = (panel, li) => {
		const container = document.getElementById(id + '-picker-' + panel);
		const target = document.getElementById(li);
		container.scrollTop = (target.offsetTop - 30);
  };

	// Render picker lists
	const renderList = (amount, selectedValue) => {
		const items = [];
		for (let i = 0; i < amount; i++) {
			const cN = selectedValue !== i ? '' : 'neotimepicker--selected';
			items.push(
				<li key={i} id={i} className={cN}>{i < 10 ? '0' + i : i}</li>
			);
		}
		return items;
	};

	// Scroll to selected values
	useEffect(() => {
		jumpToSelected('h', getHours(selected));
		jumpToSelected('m', getMinutes(selected));
		jumpToSelected('s', getSeconds(selected));
	}, [selected]);

	// Render 'TimePicker' component
	return (
		<div id={id + '-picker'} className={className} style={style}>
         <div className={className + '__input-wrapper'}>
            <input className={className + '__input'} autoFocus={true} defaultValue={time} placeholder="hh:mm:ss" />
         </div>
         <div className={className + '__body'}>
				<div id={id + '-picker-h'} className={className + '__body-panel'}>
					<ul>
						{renderList(24, getHours(selected))}
					</ul>
				</div>
				<div id={id + '-picker-m'} className={className + '__body-panel'}>
					<ul>
						{renderList(60, getMinutes(selected))}
					</ul>
				</div>
				<div id={id + '-picker-s'} className={className + '__body-panel'}>
					<ul>
						{renderList(60, getSeconds(selected))}
					</ul>
				</div>
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
