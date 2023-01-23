import React, {FC} from "react";

import logoImage from '../../assets/images/logo.png'

const Header:FC = () => {
  return(
      <nav className='bg-gradient-to-r from-[#06160E] to-[#365043] px-4 py-1 shadow-2xl'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ' >
              <a href="http://localhost:3000/main" className="flex items-center">
                  <img src={logoImage} alt="Logo" className='mr-3 h-6 sm:h-9' width='28' height='50'/>
                  <span className='self-center text-xs text-white'>Комплек для решения <br/> задачи химической кинетики</span>
              </a>
              <div>
                  <span className='self-center text-xs text-white'>История</span>
              </div>
          </div>
      </nav>

  )
}

export default Header
