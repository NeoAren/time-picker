import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, getHours, getMinutes, getSeconds, getTime, startOfToday } from 'date-fns';

import './styles/TimePicker.scss';

const TimePicker = ({ id, select, selected }) => {

	// Set the position of the time picker
   const inputElement = document.querySelector('#' + id + '-input');
   const style = inputElement && { top: inputElement.offsetTop, left: inputElement.offsetLeft };

   // Set formatted time, today's date and base classname
   const time = !selected ? '' : format(selected, 'HH:mm:ss');
	const className = 'neotimepicker-picker';
	const today = startOfToday();

	// Scroll to selected item in list
	const jumpToSelected = (panel, li) => {
		const container = document.getElementById(id + '-picker-' + panel);
		const target = document.getElementById(li);
		container.scrollTop = (target.offsetTop - 30);
  };

  // Scroll to selected values
  useEffect(() => {
	  jumpToSelected('h', getHours(selected || today));
	  jumpToSelected('m', getMinutes(selected || today));
	  jumpToSelected('s', getSeconds(selected || today));
  });

	// Render picker lists
	const renderList = (amount, selectedValue, onClick) => {
		const items = [];
		for (let i = 0; i < amount; i++) {
			const cN = className + '__body-item' + (selectedValue !== i ? '' : ' neotimepicker--selected');
			const handler = onClick && (() => onClick(Number(i < 10 ? '0' + i : i)));
			items.push(
				<li key={i} id={i} className={cN} onClick={handler}>{i < 10 ? '0' + i : i}</li>
			);
		}
		return items;
	};

	// Render 'TimePicker' component
	return (
		<div id={id + '-picker'} className={className} style={style}>
         <div className={className + '__input-wrapper'}>
            <input className={className + '__input'} autoFocus={true} defaultValue={time} placeholder="HH:mm:ss" />
         </div>
         <div className={className + '__body'}>
				<div id={id + '-picker-h'} className={className + '__body-panel'}>
					<ul>
						{renderList(24, getHours(selected || today), val => select({ h: val }))}
					</ul>
				</div>
				<div id={id + '-picker-m'} className={className + '__body-panel'}>
					<ul>
						{renderList(60, getMinutes(selected || today), val => select({ m: val }))}
					</ul>
				</div>
				<div id={id + '-picker-s'} className={className + '__body-panel'}>
					<ul>
						{renderList(60, getSeconds(selected || today), val => select({ s: val }))}
					</ul>
				</div>
			</div>
      </div>
	);

};

TimePicker.propTypes = {
   id: PropTypes.string.isRequired,
   select: PropTypes.func.isRequired,
   selected: PropTypes.instanceOf(Date)
};

export default TimePicker;
