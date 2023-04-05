import { useCallback, useState } from 'react'
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'

import MobileMenu from "./MobileMenu"
import Navbaritem from "./Navbaritem"
import AccountMenu from './AccountMenu'

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const togglAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

    return (<nav className="w-full fixed z-40">
        <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
            <img className='h-4 lg:h-7' src='images/logo.png' alt='logo' />
            <div className="flex-row ml-8 gap-7 hidden lg:flex">
                <Navbaritem label='Home' />
                <Navbaritem label='Series' />
                <Navbaritem label='Films' />
                <Navbaritem label='New & Popular' />
                <Navbaritem label='My List' />
                <Navbaritem label='Browse by languages' />
            </div>
            <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white test-sm">Browse</p>
                <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180': 'rotate-0'}`} />
                <MobileMenu visibile={showMobileMenu} />
            </div>
            <div className='flex flex-row ml-auto gap-7 items-center'>
                <div className='text-gray-200 hover:text-gray-399 cursor-pointer'>
                    <BsBell />
                </div>
                <div className='text-gray-200 hover:text-gray-399 cursor-pointer'>
                    <BsSearch />
                </div>
                <div onClick={togglAccountMenu} className='flex flex-row items-center gap-2 cursor-pointer relative'>
                    <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                        <img src='images/default-blue.png' alt='logo' />
                    </div>
                <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                <AccountMenu visibile={showAccountMenu}/>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Navbar