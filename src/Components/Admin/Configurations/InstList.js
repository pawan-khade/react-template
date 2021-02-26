import React,{useEffect} from 'react';
import Insts from './Insts';
import API from '../../../api';
import {ItemTypes} from '../../../utils/Items';
import {useDrop} from 'react-dnd';

const InstList = (props) => {
    let style                                   = {};

    const [{isOver}, drop]                      = useDrop({
        accept: ItemTypes.CARD,
        drop(item, monitor) {
            const didDrop = monitor.didDrop();
            if (!didDrop)
            {
                let targetId = props.uid;
                let sourceId = item.uid;
                searchAndUpdate(sourceId,targetId,props.instList,props.setInstList);
            } 
            else
            {
                return;
            }
        },
        collect: monitor => ({
            isOver: !! monitor.isOver(),
        })
    });

    let instList                                = props.instList;
    

    if(isOver)
    {
        style = {backgroundColor:"aqua"};
    }

    return (
        <div className="col-lg-12" style={{overflow:"auto"}}>
            <div className="card mb-4">
                <div className="card-header bg-warning">
                    <i className="fas fa-university mr-1"></i>
                    Institute List
                </div>
                <div className="card-body" style={{height:"350px", ...style}} ref={drop}>
                    {instList.map((institute,index) => {
                        return institute.region === null ?
                        <Insts key={institute.uid} id={institute.uid} username={institute.username} instName={institute.college_name} instList={props.instList} setInstList={props.setInstList}/>
                        :null
                    })}
                </div>
                <div className="card-footer">
                </div>
            </div>
        </div>
    );
};

async function searchAndUpdate(sourceId,targetId,instList,setInstList)
{
    let dummyInstList = [...instList];
    for(let i = 0;i < dummyInstList.length;i++)
    {
        if(sourceId === dummyInstList[i].uid)
        {
            dummyInstList[i].region = targetId;
        }
    }
    setInstList(dummyInstList);

    await API.put('/user/'+sourceId, {'region':targetId})
    .then(function (res) 
    {
        console.log(res.data.data);
    })
    .catch(function (error) 
    {
            
    });
}


export default InstList;