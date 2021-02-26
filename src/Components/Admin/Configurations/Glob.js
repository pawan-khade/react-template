import React from 'react';
import {ItemTypes} from '../../../utils/Items';
import {useDrop} from 'react-dnd';
import Cluster from './Cluster';
import API from '../../../api';

const Glob = (props) => {
    let style                                   = {};
    const [{isOver}, drop]                      = useDrop({
        accept: ItemTypes.CARD,
        drop(item, monitor) {
            const didDrop = monitor.didDrop();
            if (!didDrop)
            {
                let targetId = props.uid;
                let sourceId = item.uid;
                searchAndUpdate(sourceId,targetId,props.clusterList,props.setClusterList);
            } 
        },
        collect: monitor => ({
            isOver: !! monitor.isOver(),
        })
    });


    if(isOver)
    {
        style = {height:"350px",backgroundColor:"aqua",overflow:"auto"};
    }
    else
    {
        style = {height:"350px",overflow:"auto"};
    }

    return (
        <div className="col-lg-6">
            <div className="card" ref={drop}>
                <div className="card-header bg-primary text-white">
                    <i className="fas fa-university mr-1"></i>
                    {props.username} ({props.uid})
                </div>
                <div className="card-body" style={{height:"350px", ...style}}>
                    {props.clusterList.map((cluster,index) => {
                        return  (cluster.region !== null) && (cluster.region === props.uid) ?
                        <Cluster username={cluster.username} uid={cluster.uid} />
                        :null
                    })}
                </div>
                <div className="card-footer">
                </div>
            </div>
        </div>
    );
};

async function searchAndUpdate(sourceId,targetId,rbteList,setRbteList)
{
    let dummyRbteList = [...rbteList];
    for(let i = 0;i < dummyRbteList.length;i++)
    {
        if(sourceId === dummyRbteList[i].uid)
        {
            dummyRbteList[i].region = targetId;
        }
    }
    setRbteList(dummyRbteList);
    await API.put('/user/'+sourceId, {'region':targetId})
    .then(function (res) 
    {
        console.log(res.data.data);
    })
    .catch(function (error) 
    {
            
    });
}

export default Glob;