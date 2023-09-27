
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDoubleRight } from 'react-icons/ai';

import AuthorizedNavLink from '../utils/AuthorizedNavLinks';

interface Props {
  sideNav: boolean;
}

const SideNav: React.FC<Props> = ({ sideNav }: Props) => {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const [openENavs, setOpenENavs] = React.useState(false);
  const [one, setOne] = React.useState(true);
  const [isEActive, setIsEActive] = React.useState(false);

  const handleENavs = () => {
    setOne(true);
    if (isEActive === true) {
      setOpenENavs(!openENavs);
    } else {
      setOpenENavs(true);
    }
  };

  return (
    <div className={`relative ${sideNav === true ? 'l' : 'hidden'} sm:block transition-all box shadow-md min-h-[91.3vh] w-[150px] sm:min-w-[200px] md:[250px] bg-ligtDark`}>
      <div className='text-white flex flex-col py-3 space-y-2 ml-2'>

        <AuthorizedNavLink to="/company/" roles={['admin']} className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'} >
          Dashboard
        </AuthorizedNavLink>

        <AuthorizedNavLink to="/company/Member" roles={['admin', 'manager' ]} className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>
          Members
        </AuthorizedNavLink>

        <AuthorizedNavLink to="/company/addKpi" roles={['admin','manager']} className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>
          Add Kpi
        </AuthorizedNavLink>

        <AuthorizedNavLink to="/company/evaluation" roles={['admin', 'manager', ]} onClick={handleENavs} className={({isActive})=>{ isActive===true? setIsEActive(true):setIsEActive(false) ;return(isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95')}}>
          <div className='flex justify-between pr-1'>
            <div>Evaluation</div>
            <AiOutlineDoubleRight className={`${openENavs === true ? 'transition-all rotate-90 ' : 'transition-all rotate-0'}  text-xl opacity-95`} />
          </div>
        </AuthorizedNavLink>

        {openENavs ? (
          <>
          <AuthorizedNavLink to="/company/evaluation" roles={['admin', 'manager',]} onClick={() => setOne(true)} className={({isActive})=> isActive===true && one===true? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-5 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>
            Projects
          </AuthorizedNavLink>
            <AuthorizedNavLink to="/company/evaluation/timeBase" roles={['admin', 'manager',]} onClick={() => setOne(false)} className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': '  hover:bg-black hover:bg-opacity-20 pl-5 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>
                  TimeBase
                </AuthorizedNavLink>
            </>

        ) : null}

        <NavLink to="/company/chat" className={({isActive})=> isActive? 'bg-darkRed pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-95': ' hover:bg-black hover:bg-opacity-20 pl-2 py-1 rounded-lg rounded-r-none text-md font-semibold opacity-80 hover:opacity-95'}>Chat</NavLink>
      </div>
    </div>
  );
};

export default SideNav;
