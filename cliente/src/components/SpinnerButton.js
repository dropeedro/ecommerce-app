import React from 'react'
const SpinnerButton = () => {
  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    </>
  )
}

export default SpinnerButton