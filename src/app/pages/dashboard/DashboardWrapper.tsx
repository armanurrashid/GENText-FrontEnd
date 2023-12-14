import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {TablesWidget10, CardsWidget20,} from '../../../_metronic/partials/widgets'
import {getAuth} from '../../modules/auth/core/AuthHelpers'
import {useAuth } from '../../modules/auth'


const colors = [
  {
    color: '#50CD89',
    // img: '/media/patterns/vector-1.png',
  },
  {
    color: '#3E97FF',
    // img: '/media/patterns/vector-1.png',
  },
  {
    color: '#F1416C',
    // img: '/media/patterns/vector-1.png',
  },
  {
    color: '#7239EA',
    // img: '/media/patterns/vector-1.png',
  },
];

const DashboardPage: FC <{ data:any,tableData:any}> = ({data,tableData}) => (

  <>
    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
    {Object.entries(data).map(([key, value], index) => (
          <CardsWidget20
            key={index}
            className='h-md-50 mb-5 mb-xl-10'
            description={key}
            count={value as string}
            colors = {colors[index].color}
            // img={toAbsoluteUrl(card.img)}
          />
        ))}
    </div>

    <div className='row gy-5 gx-xl-12'>
      <div className='col-xl-12'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' tableData={tableData}/>
      </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const token= getAuth();
  const {currentUser} = useAuth()
  const [cardsData,setCardsData] = useState(null)
  const [tableData,setTableData] =useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/file/dashboard/${currentUser?.id}/`,{
          headers: {
            Authorization: `Bearer ${token?.api_token}`
          },
        });
        if (response.ok){
          const data = await response.json();
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
        const response = await fetch(`http://localhost:8000/api/file/recent/${currentUser?.id}/`,{
          headers: {
            Authorization: `Bearer ${token?.api_token}`
          },
        });
        if (response.ok){
          const data2 = await response.json();
          setTableData(data2);
        }
        
      }
      catch (error) {
        console.error('Error fetching table data:', error);
      }
    }
    fetchTableData();
  },[]);

  if (cardsData === null) {
    return <div>Loading...</div>;
  }

  if (tableData === null) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage data ={cardsData} tableData={tableData}/>
    </>
  )
}

export {DashboardWrapper}
