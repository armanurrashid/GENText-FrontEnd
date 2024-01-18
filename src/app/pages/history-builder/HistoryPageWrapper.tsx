import {FC, useEffect, useState} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {CardsWidget20, TablesWidget11,} from '../../../_metronic/partials/widgets'
import {getAuth} from '../../modules/auth/core/AuthHelpers'
import {useAuth } from '../../modules/auth'
import { URL } from '../../modules/auth/core/_requests'
import nohistory from '../../../../src/_metronic/assets/images/nohistory.png'

const colors = [
  {color: '#50CD89',},
  {color: '#3E97FF',},
  {color: '#F1416C',},
  {color: '#7239EA',},
];

const HistoryPage: FC <{ data:any,historytableData:any,total:any}> = ({data,historytableData,total}) => (
  <>
    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
    {Object.entries(data).map(([key, value], index) => (
          <CardsWidget20
            key={index}
            className='h-md-50 mb-5 mb-xl-10'
            description={key}
            count={value as number}
            total = {total as number}
            colors = {colors[index].color}
          />
        ))}
    </div>

    <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12'>
          <TablesWidget11 className='card-xxl-stretch mb-5 mb-xl-8' tableData={historytableData} />
        </div>
      </div>
  </>
)

const HistoryPageWrapper: FC = () => {
  const token= getAuth();
  const {currentUser} = useAuth()
  const [cardsData,setCardsData] = useState({"complete":0,"pending":0,"incomplete":0,"total":0})
  const [historytableData,setHistoryTableData] =useState(0)
  const [total,setTotal] =useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/api/file/dashboard/${currentUser?.id}/`,{
          headers: {
            Authorization: `Bearer ${token?.api_token}`
          },
        });
        if (response.ok){
          const data = await response.json();
          setTotal(data.data.Total)
          setCardsData(data.data);
        }
        
      }
      catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData();
  },[]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(`${URL}/api/file/info/${currentUser?.id}/`, {
          headers: {
            Authorization: `Bearer ${token?.api_token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setHistoryTableData(data)
        }
      } catch (error) {
        console.error('Error fetching table data:', error)
      }
    }
    fetchTableData()
  }, [])
  if (cardsData === null) {
    return <div>Loading...</div>;
  }

  if (historytableData === null) {
    return (
      <div>
        <div className='card'>
          <div className='card-body py-3 d-flex justify-content-center'>
            <img src={nohistory} width='200px' alt='' />
          </div>
          <div className='card-body py-3 d-flex justify-content-center'>
            <h2 className='text-muted mt-5'>No History</h2>
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      <PageTitle breadcrumbs={[]}>History</PageTitle>
      <HistoryPage data ={cardsData} historytableData={historytableData} total={total}/>
    </>
  )
}

export {HistoryPageWrapper}