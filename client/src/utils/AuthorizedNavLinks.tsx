import React from 'react';
import { NavLink } from 'react-router-dom';


interface AuthorizedNavLinkProps {
  to: string;
  roles: string[];
  children: React.ReactNode;
  onClick?: () => void;
  className: ((props: {
    isActive: boolean;
    isPending: boolean;
}) => string | undefined) | undefined;
}

const AuthorizedNavLink: React.FC<AuthorizedNavLinkProps> = ({ to, roles, children,className ,onClick }) => {
    const user=JSON.parse(localStorage.getItem('user')||"")

    if(roles.includes(user.systemRole)){
    return( <NavLink to={to} className={className}  onClick={onClick}>
      {children}
     </NavLink>)

      }
      else{
        return <></>
      }
}
  

export default AuthorizedNavLink;
