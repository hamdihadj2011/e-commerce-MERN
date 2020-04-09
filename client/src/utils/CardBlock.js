import React from 'react'
import Card from './Card'
 function CardBlock(props) {

    const renderCards=()=>{
     return   props.list ?
        props.list.map((card,i)=>(
            
                <Card 
                {...card}
                key={i}
                />
            
        )):null
    }

    return (
        <div className='card_block'>
            <div className="container">
                {
                    props.title ?
                        <div className='title'>
                            {props.title}
                        </div>
                    :null
                }

                <div style={{
                    display:'flex',
                    flexWrap:'wrap'
                }}>
                        {renderCards(props.list)}
                </div>
            </div>
        </div>
    )
}

export default CardBlock