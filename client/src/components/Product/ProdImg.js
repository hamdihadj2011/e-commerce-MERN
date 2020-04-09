import React, { Component } from 'react'

class ProdImg extends Component {
    state={
        lightbox:false,
        imagePos:0,
        lightboxImages:[]
    }
    componentDidMount(){
        if(this.props.detail[0].images.length>0){
        let lightboxImages=[]
        console.log(this.props.detail[0].images)
        this.props.detail[0].images.forEach(item => {
           lightboxImages.push(item.url) 
        });
        this.setState({
            lightboxImages
        })
        }
    }

    renderCardImage=(images)=>{
        console.log(images[0])
        if(images.length>0){
            return images[0]
        }
        else {
            return `/images/image_not_availble.png`
        }
    }
    showThumbs=()=>{
        
    }
    render() {
        
        const {detail}=this.props
        return (
            <div className='product_image_container'>
                <div className='main_pic'>
                    <div
                    style={{background:`url(${this.renderCardImage(detail[0].images)}) no-repeat`}}
                    // onClick={()=>this.handlelLightBox()}
                    >

                    </div>
                </div>
                <div className='main_thumbs'>
                    {
                        this.showThumbs(detail)
                    }
                </div>
            </div>
        )
    }
}


export default ProdImg