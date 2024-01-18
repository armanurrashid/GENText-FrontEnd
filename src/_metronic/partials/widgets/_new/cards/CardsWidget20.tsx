import { useState } from "react"

type Props = {
  className: string
  description: string
  count: number
  total: number
  colors: string
}

const CardsWidget20 = ({className, description, count,total,colors}: Props) => {

  const countArray = Array.isArray(count) ? count : [count];
  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end  ${className}`}
      style={{
        backgroundColor: colors, 
      }}
    >
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
        {countArray.map((value, index) => (
           <div key={index}>
           <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>{value}</span>
           <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>{description}</span>
         </div>
       ))}
        </div>
      </div>

      <div className='card-body d-flex align-items-end pt-0'>
        <div className='d-flex align-items-center flex-column mt-3 w-100'>
          <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
            <span></span>
            <span>{Math.round((count/total)*100)}%</span>
          </div>

          <div className='h-8px mx-3 w-100 bg-white bg-opacity-50 rounded'>
            <div
              className='bg-white rounded h-8px'
              role='progressbar'
              style={{ width: `${(count/total)*100}%` }}
              aria-valuenow={parseFloat(countArray[0] as string)}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export {CardsWidget20}
