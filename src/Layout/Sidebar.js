import React, { useContext } from 'react';
import {UserContext} from '../App';
import { Link } from 'react-router-dom';

function Sidebar() 
{
    const {currentUser, setCurrentUser}   = useContext(UserContext);

    if(currentUser && currentUser.role === 'STUDENT')
    {
        return (
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Main Menu</div>
                            <Link className="nav-link" to={{pathname: "/studenthome"}}>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Home
                            </Link>
                        </div>
                    </div>
                </nav>
        );
    }
    else if(currentUser && currentUser.role === 'ADMIN')
    {
        return (
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Main Menu</div>
                        <Link  className="nav-link" to={{pathname: "/adminhome"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Home
                        </Link>
                        <Link  className="nav-link" to={{pathname: "/clearsession"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-address-card"></i></div>
                            Clear Session
                        </Link>

                        <a className="nav-link collapsed" data-toggle="collapse" data-target="#collapseConfigurations" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cogs"></i></div>
                                Configurations
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseConfigurations" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to={{pathname: "/configHeader"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-tools"></i></div>
                                    Configure Header
                                </Link>
                                <Link className="nav-link" to={{pathname: "/configFooter"}}>
                                    <div className="sb-nav-link-icon"><i className="fas fa-tools"></i></div>
                                    Configure Footer
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    else if(currentUser && currentUser.role === 'EADMIN')
    {
        return (
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Main Menu</div>
                        <Link  className="nav-link" to={{pathname: "/insthome"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Home
                        </Link>
                        <Link  className="nav-link" to={{pathname: "/clearsession"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-address-card"></i></div>
                            Clear Session
                        </Link>
                        <Link  className="nav-link" to={{pathname: "/instreports"}}>
                            <div className="sb-nav-link-icon"><i class="fas fa-clipboard-list" aria-hidden="true"></i></div>
                            Reports
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
    else
    {
        return (
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Main Menu</div>
                        <Link  className="nav-link" to={{pathname: "/"}}>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Home
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Sidebar;