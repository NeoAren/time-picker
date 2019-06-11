import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { getHours, setHours, getMinutes, setMinutes, getSeconds, setSeconds, getTime } from 'date-fns';
import { startOfDay, startOfToday, isEqual } from 'date-fns';

import './styles/Wrapper.scss';

import InputField from './InputField';
import TimePicker from './TimePicker';

const Wrapper = ({ id, defaultValue, onChange, placeholder }) => {

	// Save state of the picker, seconds, minutes and hours in the state
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(defaultValue || null);

	// Create getNode function
	const getNode = node => document.querySelector(node);

	const parse = time => ({ h: getHours(time), m: getMinutes(time), s: getSeconds(time) });

   // Select a new time, update values in state, close picker
   const select = ({ h, m, s }, clear) => {
		const timestamp = selected ? selected : startOfToday();
		if (!Number.isInteger(h)) h = getHours(timestamp);
		if (!Number.isInteger(m)) m = getMinutes(timestamp);
		if (!Number.isInteger(s)) s = getSeconds(timestamp);

		const time = setHours(setMinutes(setSeconds(startOfDay(timestamp), s), m), h);

		if (onChange) {
			if (!clear) {
				if (!isEqual(time, selected)) onChange({ date: time, ms: getTime(time) });
			} else {
				onChange(null);
			}
		}

		setSelected(clear ? null : time);
		setOpen(false);
   };

   // Open or close the picker
   useEffect(() => {
      const openCloseTimePicker = e => {
         const inputElement = getNode('#' + id + '-input');
         const pickerElement = getNode('#' + id + '-picker');
         if (!open && inputElement.contains(e.target)) {
            if (window.getSelection().toString() !== '') return;
            if (!inputElement.childNodes[1].contains(e.target)) setOpen(true);
         }
         // if (open && typeof e.target.className === 'string') {
         //    if (e.target.className.includes('neotimepicker-picker__body-item')) return;
         // }
         if (open && !pickerElement.contains(e.target)) select(parse(selected));
      };
      document.addEventListener('click', openCloseTimePicker);
      return () => document.removeEventListener('click', openCloseTimePicker);
   });

   // Close the picker when the window is resized
   useEffect(() => {
      window.onresize = () => open && select(parse(selected));
   });

   // Add container element if it doesn't exist
   useEffect(() => {
      if (getNode('#neotimepicker-container')) return;
      const containerElement = document.createElement('div');
      containerElement.setAttribute('id', 'neotimepicker-container');
      getNode('body').appendChild(containerElement);
   }, []);

   // Validate input in picker__input
   useEffect(() => {
      const validateInput = e => {
         /*const input = getNode('.neodatepicker-picker__input');
         const picker = getNode('#' + id + '-picker');
         if (!open || !picker || !input || e.key !== 'Enter' || !picker.contains(e.target)) return;
         const value = input.value;
         if (value.match(/^(\d{4})-(\d{2})-(\d{2})$/) && value === format(parse(value), 'YYYY-MM-DD')) {
            select(parse(value));
         }*/
      };
      document.addEventListener('keyup', validateInput);
      return () => document.removeEventListener('keyup', validateInput);
   });

	// Render the 'InputField' and the 'TimePicker'
	return (
		<>
         <InputField
            id={id}
            selected={selected}
            clear={() => select({}, true)}
            placeholder={placeholder}
         />
         {open && createPortal((
            <TimePicker
               id={id}
               select={select}
               selected={selected}
            />
         ), getNode('#neotimepicker-container'))}
      </>
	);

};

Wrapper.propTypes = {
   id: PropTypes.PropTypes.string.isRequired,
   defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
	onChange: PropTypes.func,
   placeholder: PropTypes.string
};

export default Wrapper;
