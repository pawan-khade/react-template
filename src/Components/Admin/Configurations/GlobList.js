import React from 'react';
import Glob from './Glob';
const GlobList = (props) => {
    let globList =  props.globList;

    return (
        <div>
            {globList.map((admin,index) => (
                <div className="col-lg-12 row" style={{overflow:"auto"}} key={admin.uid}>
                    <Glob username={admin.username} uid={admin.uid} clusterList={props.clusterList} setClusterList={props.setClusterList} />
                </div>
            ))}
        </div>
    );
};

export default GlobList;