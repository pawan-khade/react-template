import React, {useState,useEffect} from 'react';
import API from '../../../api';
import ClusterList from './ClusterList';
import GlobList from './GlobList';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const GlobClusterAlloc = () => {
    const [globList,setGlobList]            =   useState([]);
    const [clusterList,setClusterList]      =   useState([]); 
    

    useEffect(() => {
        getGlobList(setGlobList);
        getClusterList(setClusterList);
    },[]);

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
            <div className="container-fluid">
                <h1 className="mt-4">Global to Cluster Admin Allocation</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Global to Cluster Admin Allocation</li>
                </ol>
                <div className="row animate__animated animate__pulse animate_slower">
                        <div className="col-lg-4">{clusterList.length > 0 > 0 && 
                        <ClusterList clusterList={clusterList} setClusterList={setClusterList} uid={null}/>}</div>

                        <div className="col-lg-8">{globList.length > 0 && clusterList.length >0 && <GlobList clusterList={clusterList} setClusterList={setClusterList} setGlobList={setGlobList} globList={globList}/>}</div>
                </div>
            </div>
            </DndProvider>
        </div>
    );
};

async function getGlobList(setGlobList)
{
    await API.get('/user', {params: {'role': 'GADMIN'}})
    .then(function (res) 
    {
        setGlobList(res.data.data);
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

export default GlobClusterAlloc;