import React from 'react'

function InputType({value, onChange, name, inputType, lableText}) {
  return (
    <div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">{lableText}</label>
            <input 
            type={inputType}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            />
        </div>
      
    </div>
  )
}   

export default InputType
