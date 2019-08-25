import { createStore } from 'redux';
import axios from 'axios'

const initialState={
    post:[],
    displayPost:[],
    userInput:'',
    id:''
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'DATAPUSH':
            return Object.assign({},state,{post:action.payload})
        case 'ADD_POST':
            const AddedPost={title: action.payload.login,url:action.payload.url}
              axios.post('https://jsonplaceholder.typicode.com/photos',{AddedPost})
            .then(res=>console.log(res))
            return Object.assign({},state,{post:[...state.post,AddedPost]})
        case 'DELETE_POST':
            const delInx=action.payload
             axios.delete(`https://jsonplaceholder.typicode.com/photos/${action.payload}`)
            .then(res=>console.log(res))
            return Object.assign({},state,{
                post: state.post.filter((i,index)=>{
                    return index!==delInx
                })
            })
        default:
            return state
    }
}

const store=createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store
