import { useAuth } from "components/Auth/AuthContainer";
import Button from "components/Design/Button";
import { useAdmin} from "core/hooks/useAdmin";
import { PossibleRoutes, route } from "core/routing";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";


const Nav = () => {

  const [background, setBackground] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () =>{
      setHamburgerOpen(!hamburgerOpen)
  }

  const changeBackground = () => {
    if(window.scrollY >= 80) {
      setBackground(true)
    } else {
      setBackground(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
        document.removeEventListener("keydown", changeBackground);
    };
  },[])

  const user = useAuth();
  const admin = useAdmin();

  return (
    <>
      <nav className={background ? "mainNav headerBg" : "mainNav" }>
        <div id="menuToggle" onClick={toggleHamburger}>
          <input type="checkbox"/>
          <Hamburger isOpen={hamburgerOpen}/>
          <ul>
            <div>
              <Link to={PossibleRoutes.Home}><li className="logo">Home</li></Link>
            </div>
            <div className="navRoutes" style={{justifyContent:"center"}}>
              <li><Link to={PossibleRoutes.Builder}>Builder</Link></li>
              <li><Link to={PossibleRoutes.Builds}>Completed builds</Link></li>
            {user?.user && <li><Link to={route(PossibleRoutes.UserBuilds, {id: user.user.idUser})}>My builds</Link></li>}
              {admin && <li><Link to={PossibleRoutes.Crud}>CRUD</Link></li>}
            </div>
            <div style={{justifyContent:"flex-end"}}>
              {!user?.user &&<li> <Link to={PossibleRoutes.Login}>Login</Link></li>}
              {user?.user && <li> <Button onClick={user.logout} color="outline-light">Sign out</Button></li>}
            </div>
          </ul>
        </div>
      </nav>
    </>

  )
}

export default Nav