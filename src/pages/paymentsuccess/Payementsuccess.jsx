import React, { useEffect } from 'react'
import './payementsuccess.css'
import { Link, useParams } from 'react-router-dom'


const Payementsuccess = ({user}) => {
    const params = useParams();
   

  return (
      <div className='payment-success-page'>
           
          {user && (
              <div className='success-message'>
                  <h2>Payement Successful</h2>
                  <p>Your course subscription has been activated</p>
                  <p>Reference no:{params.id}</p>
                  <Link to={`/${user._id}/dashboard`} className='common-btn'>Go to Dasboard</Link>
            </div>
        )}
     </div>
      
  )
}

export default Payementsuccess