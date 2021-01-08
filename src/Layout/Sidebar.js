import React from 'react';
function Sidebar() {
        return (
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Menu</div>
                                <a className="nav-link" href="/">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Home
                                </a>
                            </div>
                        </div>
                    </nav>
        );
}

export default Sidebar;