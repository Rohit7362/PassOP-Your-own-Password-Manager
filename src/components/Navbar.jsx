import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white w-full'>
            <div className='mycontainer flex justify-around items-center px-4 py-5 h-12'>

                <div className='logo font-bold text-xl sm:text-2xl' >
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </div>

                <button className=' text-white bg-green-700 flex rounded-full justify-between items-center my-5 mx-2 ring-white ring-1'>
                    <img className='invert w-7 sm:w-9 p-1' src="/icons/github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>
                </button>
            </div>
        </nav>

    )
}

export default Navbar
