import React from 'react';
import {useDrag} from 'react-dnd';
import {ItemTypes} from '../../../utils/Items';

const Cluster = (props) => {

    const [{ isDragging }, drag] = useDrag({
        item: {
            type:ItemTypes.CARD,
            uid:props.uid,
            instId:props.username,
        },
        collect: monitor => ({
            isDragging : !!monitor.isDragging()
        }),
    });
    return (
        <div className="alert alert-danger" role="alert"  ref={drag}>
            {props.username} <b>({props.uid})</b>
        </div>
    );
};

export default Cluster;