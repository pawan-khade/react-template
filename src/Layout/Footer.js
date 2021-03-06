import React, { useState, useEffect, useContext } from 'react';
import API from '../api';
import {FooterContext} from '../App';

function Footer() 
{
    const {footerVal, setFooterVal} = useContext(FooterContext);
    let footerData  = useFooterData(footerVal);
    let d           = new Date();
    let year        = d.getFullYear();
    

    return (
        footerData !=='' ? 
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; {footerData} {year}</div>
            </div>
        </div>
        : null
    );
}




function useFooterData(footerVal)
{
    const [footerData,setFooterData] = useState('');
    useEffect(() => {getFooterData();},[footerVal]);

    async function getFooterData()
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

    return footerData
}

export default Footer;
