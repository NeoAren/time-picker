import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, getHours, getMinutes, getSeconds } from 'date-fns';

import scrollToItem from '../helpers/scrollToItem';

import './styles/TimePicker.scss';

const TimePicker = ({ id, select, value }) => {

	// Set the position of the time picker and the base classname
   const inputElement = document.querySelector('#' + id + '-input');
   const style = inputElement && { top: inputElement.offsetTop, left: inputElement.offsetLeft };
	const className = 'neotimepicker-picker';

	// Save the selected date in the state
	const [selected, setSelected] = useState({});

   // Jump to selected values on first opening of the picker
   useEffect(() => {
      if (value) scrollToItem(`${id}-picker-h`, `${id}-h-${getHours(value)}`, true);
      if (value) scrollToItem(`${id}-picker-m`, `${id}-m-${getMinutes(value)}`, true);
      if (value) scrollToItem(`${id}-picker-s`, `${id}-s-${getSeconds(value)}`, true);
   }, []);

	// Update the selected state, set the value of the input box
	useEffect(() => {
		const selectedValues = value ? { h: getHours(value), m: getMinutes(value), s: getSeconds(value) } : {};
		const input = document.querySelector('.' + className + '__input');
		if (input) input.value = !value ? '' : format(value, 'HH:mm:ss');
		setSelected(selectedValues);
	}, [value]);

	// Scroll to selected time values
	useEffect(() => {
      if (selected.h) scrollToItem(`${id}-picker-h`, `${id}-h-${selected.h}`);
   }, [selected.h]);
	useEffect(() => {
      if (selected.m) scrollToItem(`${id}-picker-m`, `${id}-m-${selected.m}`);
   }, [selected.m]);
	useEffect(() => {
      if (selected.s) scrollToItem(`${id}-picker-s`, `${id}-s-${selected.s}`);
   }, [selected.s]);

	// Render picker lists
	const renderList = (amount, panel, onClick) => {
		const items = [];
		for (let i = 0; i < amount; i++) {
			const cN = className + '__body-item' + (selected[panel] !== i ? '' : ' neotimepicker--selected');
			const handler = onClick && (() => onClick(i));
			items.push(
				<li key={i} id={`${id}-${panel}-${i}`} className={cN} onClick={handler}>{i < 10 ? '0' + i : i}</li>
			);
		}
		return items;
	};

	// Render 'TimePicker' component
	return (
		<div id={id + '-picker'} className={className} style={style}>
         <div className={className + '__input-wrapper'}>
            <input className={className + '__input'} autoFocus={true} placeholder="HH:mm:ss" />
         </div>
         <div className={className + '__body'}>
				<div id={id + '-picker-h'} className={className + '__body-panel'}>
					<ul>
						{renderList(24, 'h', val => select({ h: val }))}
					</ul>
				</div>
				<div id={id + '-picker-m'} className={className + '__body-panel'}>
					<ul>
						{renderList(60, 'm', val => select({ m: val }))}
					</ul>
				</div>
				<div id={id + '-picker-s'} className={className + '__body-panel'}>
					<ul>
						{renderList(60, 's', val => select({ s: val }))}
					</ul>
				</div>
			</div>
      </div>
	);

};

TimePicker.propTypes = {
   id: PropTypes.string.isRequired,
   select: PropTypes.func.isRequired,
   value: PropTypes.instanceOf(Date)
};

export default TimePicker;
