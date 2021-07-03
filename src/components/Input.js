import React from 'react'

const Input = ({ className, onChange, labelClassName, label, name, value, type, placeholder }) => {
    return (
        <>
            <label className={labelClassName}  >{label}</label>
            <input
                className={className}
                name={name}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
        </>
    )
}

export default Input
