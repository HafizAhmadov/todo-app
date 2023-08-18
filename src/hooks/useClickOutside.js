import React from "react"

export default function useClickOutside(elementRef, callback) {
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (elementRef && elementRef.current && !elementRef.current.contains(event.target)) {
                // Call Callback only if event happens outside element or descendent elements
                callback()
            }
            return
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [elementRef, callback])
}