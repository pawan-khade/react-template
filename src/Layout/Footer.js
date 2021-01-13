import React from 'react';

function Footer() {
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Your Website 2020</div>
                    <div>
                        <a href="_blank">Privacy Policy</a>&middot;<a href="_blank">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        );
}

export default Footer;
