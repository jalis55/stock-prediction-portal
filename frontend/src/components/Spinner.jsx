import React from 'react'

const Spinner = ({children}) => {
    return (
        <>

            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center h-screen">
                    {children}
                </div>

            </div>
        </>

    )
}

export default Spinner;
