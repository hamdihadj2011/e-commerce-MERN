import React from 'react'
import FontAwesome from '@fortawesome/react-fontawesome'
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle'


const NotFound=()=>{
    return (
        <div className='container'>
            <div className='not_found_container'>
                <FontAwesome icon={faExclamationCircle}/>
                <div>
                    Oops !!  Page Not Found

                    
                    
                </div>
            </div>

        </div>
    )
}

export default NotFound