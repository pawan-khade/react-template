import React, {useState,useEffect} from 'react';
import API from '../../../api';
import InstList from './InstList';
import RbteList from './RbteList';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


const InstClusterAlloc = () => {
    const [instList,setInstList]            =   useState([]);
    const [clusterList,setClusterList]      =   useState([]); 
    

    useEffect(() => {
        getInstituteList(setInstList);
        getClusterList(setClusterList);
    },[]);

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
            <div className="container-fluid">
                <h1 className="mt-4">Institutes to Cluster Allocation</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Institutes to Cluster Allocation</li>
                </ol>
                <div className="row animate__animated animate__lightSpeedInLeft animate_slower">
                        <div className="col-lg-4">{instList.length > 0 && 
                        <InstList instList={instList} setInstList={setInstList} uid={null}/>}</div>

                        <div className="col-lg-8 row">{clusterList.length > 0 && instList.length >0 && <RbteList clusterList={clusterList} instList={instList} setInstList={setInstList}/>}</div>
                </div>
            </div>
            </DndProvider>
        </div>
    );
};

async function getInstituteList(setInstList)
{
    await API.get('/user', {params: {'role': 'EADMIN'}})
    .then(function (res) 
    {
        setInstList(res.data.data);
    })
    .catch(function (error) 
    {
       
    });   
}

async function getClusterList(setClusterList)
{
    await API.get('/user', {params: {'role': 'CADMIN'}})
    .then(function (res) 
    {
        setClusterList(res.data.data);
    })
    .catch(function (error) 
    {
       
    });   
}

export default InstClusterAlloc;