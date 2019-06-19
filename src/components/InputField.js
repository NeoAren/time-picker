import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Clock, Close } from '../icons';

import './styles/InputField.scss';

const InputField = ({ id, selected, clear, placeholder }) => {

	// Set formatted time and base classname
   const time = !selected ? '' : format(selected, 'HH:mm:ss');
   const className = 'neotimepicker-input';

   // Render 'InputField' component
   return (
      <div id={id + '-input'} className={className}>
         <input readOnly className={className + '__field'} value={time} placeholder={placeholder} />
         <i className={className + '__close-icon'} onClick={clear}><Close /></i>
         <i className={className + '__clock-icon'}><Clock /></i>
      </div>
   );

};

InputField.propTypes = {
   id: PropTypes.string.isRequired,
   selected: PropTypes.instanceOf(Date),
   clear: PropTypes.func.isRequired,
   placeholder: PropTypes.string
};

export default InputField;
