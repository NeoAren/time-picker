import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { getHours, setHours, getMinutes, setMinutes, getSeconds, setSeconds } from 'date-fns';
import { startOfDay, startOfToday, startOfSecond, isEqual, getTime } from 'date-fns';

import './styles/Wrapper.scss';

import InputField from './InputField';
import TimePicker from './TimePicker';

const Wrapper = ({ id, defaultValue, onChange, placeholder }) => {

	// Save status of the picker and the selected time in the state
	const [open, setOpen] = useState(false);
	const defaultSelected = defaultValue ? startOfSecond(defaultValue) : null;
	const [selected, setSelected] = useState(defaultSelected);

	// Create getNode function
	const getNode = node => document.querySelector(node);

   // Select a new time, update values in state, close picker
   const select = ({ h, m, s }, clear) => {
		const timestamp = selected || startOfToday();
		if (!Number.isInteger(h)) h = getHours(timestamp);
		if (!Number.isInteger(m)) m = getMinutes(timestamp);
		if (!Number.isInteger(s)) s = getSeconds(timestamp);

		const time = setHours(setMinutes(setSeconds(startOfDay(timestamp), s), m), h);

		if (onChange) {
			if (!isEqual(time, selected)) {
				onChange(clear ? null : {
					date: time,
					dateInMs: getTime(time),
					ms: getTime(time) - startOfDay(time)
				});
			}
		}

		setSelected(clear ? null : time);
   };

   // Open or close the picker on click events
   useEffect(() => {
      const openCloseTimePicker = e => {
         const inputElement = getNode('#' + id + '-input');
         const pickerElement = getNode('#' + id + '-picker');
         if (!open && inputElement.contains(e.target)) {
            if (window.getSelection().toString() !== '') return;
            if (!inputElement.childNodes[1].contains(e.target)) setOpen(true);
			}
         if (open && !pickerElement.contains(e.target)) setOpen(false);
      };
      document.addEventListener('click', openCloseTimePicker);
      return () => document.removeEventListener('click', openCloseTimePicker);
   });

   // Close the picker when the window is resized
   useEffect(() => {
      window.onresize = () => open && setOpen(false);
   });

   // Add container element if it doesn't exist
   useEffect(() => {
      if (getNode('#neotimepicker-container')) return;
      const containerElement = document.createElement('div');
      containerElement.setAttribute('id', 'neotimepicker-container');
      getNode('body').appendChild(containerElement);
   }, []);

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
               value={selected}
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
