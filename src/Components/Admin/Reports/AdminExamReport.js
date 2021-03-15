import React,{useState,useEffect,useContext} from 'react';
import {ShowContext} from '../../../App';
import API from '../../../api';
import InstExamReport from '../../Institute/Reports/InstExamReport';

function AdminExamReport()
{
    const [insts,setInsts]      =   useState([]);
    const {setShow,setMsg}      =   useContext(ShowContext);
    const [value, setValue]     =   useState();

    useEffect(() => {
        getInsts(setInsts,setShow,setMsg);
    },[]);

    return (
      <>
      {insts.length > 0 ?
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Admin Exam Report</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Admin Exam Report</li>
            </ol>
            <div className="row col-lg-12 animate__animated animate__pulse animate_slower">
              <select id="inst_id" name="inst_id" className="form-control" onChange={e => {setValue(e.currentTarget.value);}}>
                <option value="">Select Institute</option>
                {
                  insts.map(inst => 
                  (
                    <option key={inst.uid} value={inst.username}>
                      {inst.name}
                    </option>
                  ))
                }
              </select>
            </div>
        </div>
      </div>
      : null}
      {value !== undefined ?
      <div className="col-lg-12">
            <InstExamReport instId={value} role={'ADMIN'}/>
      </div>
      : null}
      </>
    );
}

async function getInsts(setInsts,setShow,setMsg)
{
  await API.get('/user',{params: {"role":"EADMIN"}})
  .then((res) => {
    if(res.data.status === 'success')
    {
      setInsts(res.data.data);
    }
    else
    {
      setShow(true);
      setMsg('Problem Fetching Data from Server');
    }
  });
}

export default AdminExamReport;
