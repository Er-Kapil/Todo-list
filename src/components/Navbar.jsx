import React from 'react'


const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-900 text-white py-2'>
        <div className="logo ">
            <span>iTask</span>
        </div>
      <ul className="flex gap-8">
        <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all '>Your tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
