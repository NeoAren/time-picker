import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './styles/InputField.scss';

import { Clock as ClockIcon, Close as CloseIcon } from '../icons';

const InputField = ({ id, selected, clear, placeholder }) => {

	// Set formatted time and base classname
   const time = !selected ? '' : format(selected, 'HH:mm:ss');
   const className = 'neotimepicker-input';

   // Render 'InputField' component
   return (
      <div id={id + '-input'} className={className}>
         <input readOnly className={className + '__field'} value={time} placeholder={placeholder} />
         <i className={className + '__close-icon'} onClick={clear}><CloseIcon /></i>
         <i className={className + '__clock-icon'}><ClockIcon /></i>
      </div>
   );

};

InputField.propTypes = {
   id: PropTypes.PropTypes.string.isRequired,
   selected: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
   clear: PropTypes.func.isRequired,
   placeholder: PropTypes.string
};

export default InputField;
