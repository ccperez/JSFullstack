import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';

export default function InputForm({ form, field, type, value, onFocus, onChange, onBlur, icon, placeholder, error }) {
  switch(type) {
    case 'area': return (
      <div className="col-md-offset-2 col-md-8">
        <div className="form-group">
          <textarea className="form-control" id={field} name={field} rows="5" value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}></textarea>
          { error && <span className="help-block text-danger" data-placeholder={icon ? he.decode(icon) : ""}>{error}</span> }
        </div>
      </div>
    )
    default:
      switch(form) {
        case 'login': return (
          <div className={"wrap-input100 validate-input"+(error ? " alert-validate" : "")} data-validate={error}>
            <input className="input100" id={field} name={field} type={type} value={value} onFocus={onFocus} onChange={onChange} onBlur={onBlur} placeholder={placeholder}/>
            <span className="focus-input100" data-placeholder={he.decode(icon)}></span>
          </div>
        )
        default: return (
          <div className="col-md-offset-2 col-md-8">
            <div className="form-group">
              <input className="form-control" id={field} name={field} type={type} value={value} onFocus={onFocus} onChange={onChange} onBlur={onBlur} placeholder={placeholder}/>
              { error && <span className="help-block text-danger" data-placeholder={icon ? he.decode(icon) : ""}>{error}</span> }
            </div>
          </div>
        )
     }
  }
}

InputForm.propTypes = {
  form        : PropTypes.string.isRequired,
  field       : PropTypes.string.isRequired,
  type        : PropTypes.string.isRequired,
  value       : PropTypes.string,
  onFocus     : PropTypes.func.isRequired,
  onChange    : PropTypes.func.isRequired,
  onBlur      : PropTypes.func,
  icon        : PropTypes.string,
  placeholder : PropTypes.string.isRequired,
  error       : PropTypes.string
}

InputForm.defaultProps = { type: 'text' }
