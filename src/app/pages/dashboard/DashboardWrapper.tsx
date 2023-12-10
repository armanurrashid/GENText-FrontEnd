import {FC} from 'react'
import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {TablesWidget10, CardsWidget20,} from '../../../_metronic/partials/widgets'

const cardsData = [
  {
    description: 'Successful',
    color: '#50CD89',
    // img: '/media/patterns/vector-1.png',
  },
  {
    description: 'Unsuccessful',
    color: '#3E97FF',
    // img: '/media/patterns/vector-1.png',
  },
  {
    description: 'Processing',
    color: '#F1416C',
    // img: '/media/patterns/vector-1.png',
  },
  {
    description: 'Total',
    color: '#7239EA',
    // img: '/media/patterns/vector-1.png',
  },
];

const DashboardPage: FC = () => (
  
  <>
    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4'>
    {cardsData.map((card, index) => (
          <CardsWidget20
            key={index}
            className='h-md-50 mb-5 mb-xl-10'
            description={card.description}
            color={card.color}
            // img={toAbsoluteUrl(card.img)}
          />
        ))}
    </div>

    <div className='row gy-5 gx-xl-12'>
      <div className='col-xl-12'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div>
  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
