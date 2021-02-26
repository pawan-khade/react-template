import React from 'react';
import {useDrag} from 'react-dnd';
import {ItemTypes} from '../../../utils/Items';

const Insts = (props) => {

    const [{ isDragging }, drag] = useDrag({
        item: {
            type:ItemTypes.CARD,
            uid:props.id,
            instId:props.username,
            instName:props.instName,
        },
        collect: monitor => ({
            isDragging : !!monitor.isDragging()
        }),
    });

    return (
        <div className="alert alert-danger" role="alert"  ref={drag} style={{fontSize:"10px"}}>
            ({props.username}) <b>{props.instName}</b>
        </div>
    );
};

export default Insts;