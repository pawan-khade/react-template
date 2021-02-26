import React from 'react';
import Cluster from './Cluster';
import {ItemTypes} from '../../../utils/Items';
import {useDrop} from 'react-dnd';
import API from '../../../api';

const ClusterList = (props) => {
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

    let clusterList  = props.clusterList;
    return (
        <div className="col-lg-12">
            <div className="card mb-4">
                <div className="card-header bg-warning">
                    <i className="fas fa-university mr-1"></i>
                    Cluster List
                </div>
                <div className="card-body" style={{height:"350px", ...style}} ref={drop}>
                    {clusterList.map((rbte,index) => {
                        return rbte.region === null ?
                            <Cluster username={rbte.username} uid={rbte.uid} />
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


export default ClusterList;