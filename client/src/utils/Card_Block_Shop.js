import React from 'react'
import Card from '../utils/Card'
export default function CardBlockShop(props) {
    const renderCards=()=>{
      return  props.list ?
        props.list.map(card=>(
            <Card 
            key={card._id}
            {...card}
            grid={props.grid}
            />
        ))
        :null
    }
    return (
        <div className='card_block_shop'>
            <div>
                <div>
                    {props.list ? 
                    props.list.length===0 ? <div className='no_result'>
                            Sorry No Result
                    </div> :null
                    :null}
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    )
}
