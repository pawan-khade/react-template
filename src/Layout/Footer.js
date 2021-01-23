import React, { useState, useEffect } from 'react';
import API from '../api';

function Footer() 
{
    const [footerData,setFooterData] = useState('');
    let d       = new Date();
    let year    = d.getFullYear();

    useEffect(() => {getFooterData(setFooterData);},[]);

    return (
        footerData !=='' ? 
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; {footerData} {year}</div>
                <div>
                    <a href="_blank">Privacy Policy</a>&middot;<a href="_blank">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
        : null
    );
}

async function getFooterData(setFooterData)
{
    await API.get('/configurations',{params :{"type":"footerconfig"}})
    .then(function (res) 
    {
        if(res.data.status === 'success')
        {
            setFooterData(res.data.footer);
        }
        else
        {
            setFooterData('GudExams');
        }
    })
    .catch(function (error) 
    {
        setFooterData('GudExams');
    })
}

export default Footer;
