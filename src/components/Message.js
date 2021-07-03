import { useState, useEffect } from 'react'

const Message = ({ variant, children }) => {
    const [show, setShow] = useState(true)

    // On componentDidMount set the timer
    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 15 seconds set the show value to false
            setShow(false)
        }, 15000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);
    if (children === '') {
        return null
    }
    // If show is false the component will return null and stop here
    if (!show) {
        return null;
    }

    // If show is true this will be returned
    return (
        <div className={`${variant}`}>
            <h1 style={{ color: 'green' }}> {children}</h1>
        </div>
    )
}

Message.defaultPros = {
    variant: 'success',
}

export default Message;