import React from 'react'
import MyButton from '../../utils/Button'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'


export default function ProdInfo(props) {
    const {detail}=props
    
    const showProdTags=(detail)=>(
        <div className="product_tags">
{
    detail[0].shipping ? <div className='tag'>
            <div>
                <FontAwesomeIcon 
                icon={faTruck}
                />
                <div className="tag_text">
                    <div>Free Shipping</div>
                    <div>And Return </div>
                </div>
            </div>
    </div>: null
}
{
    detail[0].available ?
    <div className='tag'>
            <div>
                <FontAwesomeIcon 
                icon={faCheck}
                />
                <div className="tag_text">
                    <div>Available </div>
                    <div>in Store </div>
                </div>
            </div>
    </div>
    :<div className='tag'>
    <div>
        <FontAwesomeIcon 
        icon={faTimes}
        />
        <div className="tag_text">
            <div>Not Available </div>
            <div>Preorder only </div>
        </div>
    </div>
</div>
}
        </div>
    )

    const showProdAction =(detail)=>(
        <div className='product_actions'>
            <div className="price">$ {detail[0].price} </div>
            <div className="cart">
                <MyButton 
                type='add_to_cart_link'
                runAction={()=>{
                    props.addToCart(detail[0]._id)
                }}
                />
            </div>
        </div>
    )

    const showProdSpecification=(detail)=>(
        <div className='product_specification'>
            <h2>Specs:</h2>
            <div>
                <div className="item">
                    <strong>Frets:</strong>{detail[0].frets}
                </div>
                <div className="item">
                    <strong>Wood:</strong>{detail[0].woods ? detail[0].woods.name :"no Wood"}
                </div>
            </div>
        </div>

    )
    return (
        <div>
            <h1>{detail[0].brand.name} {detail.name}</h1>
            <p>{
                detail[0 ].description
                }</p>
            {
                showProdTags(detail)
            }
            {
                showProdAction (detail)
            }
            {
                showProdSpecification(detail)
            }
        </div>
    )
}
