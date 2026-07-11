import React from 'react'

const CheckDebounce = () => {

    function debounce(func, delay) {
        let timer;
        return function () {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func();
            }, delay)
        }
    }
    const search = debounce(() => {
        console.log("Helllo")
    }, 1000)

    return (
        <div className='mt-50'>
            <input type="text" onChange={search} className='border text-black' placeholder='ENter' />
        </div>
    )
}

export default CheckDebounce