import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, getHours, getMinutes, getSeconds, startOfToday } from 'date-fns';

import './styles/TimePicker.scss';

const TimePicker = ({ id, select, value }) => {

	// Set the position of the time picker and the base classname
   const inputElement = document.querySelector('#' + id + '-input');
   const style = inputElement && { top: inputElement.offsetTop, left: inputElement.offsetLeft };
	const className = 'neotimepicker-picker';

	// Save the selected date in the state
	const [selected, setSelected] = useState({});

	// Update the selected state, set the value of the input box
	useEffect(() => {
		const selectedValues = { h: getHours(value), m: getMinutes(value), s: getSeconds(value) };
		const input = document.querySelector('.' + className + '__input');
		if (input) input.value = !value ? '' : format(value, 'HH:mm:ss');
		setSelected(selectedValues);
	}, [value]);

	// Scroll to selected item in list
	const scrollToItem = (panel, step = 10, scroll = true) => {
		if (!selected[panel]) return;
		const container = document.getElementById(`${id}-picker-${panel}`);
		const target = document.getElementById(`${id}-${panel}-${selected[panel]}`);
		const offsetOfTargetItem = target.offsetTop - 31;
		if (scroll) {
			const interval = setInterval(() => {
				const distanceFromTargetItem = offsetOfTargetItem - container.scrollTop;
				if (distanceFromTargetItem < 0) {
					if ((distanceFromTargetItem + step) < 0) {
						container.scrollBy(0, -step);
					} else {
						container.scrollBy(0, distanceFromTargetItem);
					}
				} else if (distanceFromTargetItem > 0) {
					if ((distanceFromTargetItem - step) > 0) {
						container.scrollBy(0, step);
					} else {
						container.scrollBy(0, distanceFromTargetItem);
					}
				} else {
					clearInterval(interval);
				}
			}, 5);
		} else {
			container.scrollTop = offsetOfTargetItem;
		}
	};

	// Scroll to selected time values
	useEffect(() => { scrollToItem('h'); }, [selected.h]);
	useEffect(() => { scrollToItem('m'); }, [selected.m]);
	useEffect(() => { scrollToItem('s'); }, [selected.s]);

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
