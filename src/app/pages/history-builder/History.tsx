import { useEffect, useState } from 'react';
import {TablesWidget11} from '../../../_metronic/partials/widgets'
import { getAuth, useAuth } from '../../modules/auth';

const History: React.FC = () => {
  const token= getAuth()
  const {currentUser} = useAuth()
  const [historytableData,setHistoryTableData] =useState(null)
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/file/info/${currentUser?.id}/`,{
          headers: {
            Authorization: `Bearer ${token?.api_token}`
          },
        });
        if (response.ok){
          const data = await response.json();
          setHistoryTableData(data);
        }
        
      }
      catch (error) {
        console.error('Error fetching table data:', error);
      }
    }
    fetchTableData();
  },[]);

  
  if (historytableData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12'>
          <TablesWidget11 className='card-xxl-stretch mb-5 mb-xl-8' tableData={historytableData}/>
        </div>
      </div>
    </>
  )
}

export {History}
