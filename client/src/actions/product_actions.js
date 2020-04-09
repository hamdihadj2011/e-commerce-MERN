import {GET_PRODUCTS_BY_SELL,GET_PRODUCTS_BY_ARRIVAL,GET_BRANDS,GET_WOODS,GET_PRODUCT_TO_SHOP,ADD_PRODUCT,CLEAR_PRODUCT,ADD_BRAND,ADD_WOOD,GET_PRODUCT_DETAIL,CLEAR_PRODUCT_DETAIL} from './types'
import {PRODUCT_SERVER} from '../utils/misk'
import  axios from 'axios'

export function getProductsByArrival(){
    //sortBy=sold&order=desc&limit=100
const request=axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
.then(res=>res.data)

return {
type:GET_PRODUCTS_BY_ARRIVAL,
payload:request
}
}

export function getProductDetail(id){
const request=axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
.then(res=>{
    return res.data
},()=>console.log(request))


return {
    type:GET_PRODUCT_DETAIL,
    payload:request
}
}
export function clearProductDetail(){
    return {
        type:CLEAR_PRODUCT,
        payload:''
    }
}


export function getProductsBySell(){
//sortBy=sold&order=desc&limit=100
const request=axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                .then(res=>res.data)

        return {
            type:GET_PRODUCTS_BY_SELL,
            payload:request
        }
}

export function getBrands(){
const request=axios.get(`${PRODUCT_SERVER}/brands`)
    .then(res=>res.data)
    return{
        type:GET_BRANDS,
        payload:request
    }
}

export function addBrands (dataToSubmit,existingBrands){
const request=axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
        .then(res=>{
            let brands =[...existingBrands,res.data.brand]
            return {
                success:res.data.success,
                brands
            }
        })
        

        return {
            type:ADD_BRAND,
            payload:request
        }
}

export function getWoods(){
    const request=axios.get(`${PRODUCT_SERVER}/woods`)
    .then(res=>res.data)
    return{
        type:GET_WOODS,
        payload:request
    }
}

export function addWoods (dataToSubmit,existingWoods){
    const request=axios.post(`${PRODUCT_SERVER}/wood`,dataToSubmit)
            .then(res=>{
                let woods =[...existingWoods,res.data.wood]
                return {
                    success:res.data.success,
                    woods
                }
            })
            
    
            return {
                type:ADD_WOOD,
                payload:request
            }
    }
export function getProductToShop(skip,limit,filters=[],previousState=[]){
const data={
    limit,skip,filters
}

const request=axios.post(`${PRODUCT_SERVER}/shop`,data)
    .then(res=>{
        let newState=[
            ...previousState,
            ...res.data.articles
        ]
        return {
            size:res.data.size,
            articles:newState
        }
    })
    
  return {
      type:GET_PRODUCT_TO_SHOP,
      payload:request
  }  
}

export function addProduct(dataToSubmit){
    console.log(dataToSubmit)
    const request=axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
        .then(res=>res.data)
    return {
        type:ADD_PRODUCT,
        payload:request
    }
}

export function clearProduct (){
    return {
        type:CLEAR_PRODUCT,
        payload:''
    }
}