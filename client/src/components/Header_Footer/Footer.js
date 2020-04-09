import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'



export default function Footer({data}) {
    console.log(data.siteData && data.siteData[0].adress)
    return (
        data.siteData ?
        <footer className='bck_b_dark'>
            <div className="container">
                <div className='logo'>
                    Guitars
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact Information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                icon={faCompass}
                                className='icon'
                                />
                                <div className="nfo">
                                    <div>Adress</div>
                                    <div>{data.siteData[0].adress}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                icon={faPhone}
                                className='icon'
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>{data.siteData[0].phone}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                icon={faClock}
                                className='icon'
                                />
                                <div className="nfo">
                                    <div>Working Hours</div>
                                    <div>{data.siteData[0].hours}</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                icon={faEnvelope}
                                className='icon'
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>{data.siteData[0].email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
            <h2>Be the First to Know</h2>
            <div>text us to be the First to know</div>
                    </div>
                </div>
            </div>    
        </footer>
        :null
    )
}
