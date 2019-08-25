import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
 class App extends Component {
     constructor(){
         super()
         this.state={
             userinput:'',
             userUrl:'',
             id:''
         }
         this.handleAddPost=this.handleAddPost.bind(this)
         this.handleIdChange=this.handleIdChange.bind(this)
         this.handleUrl=this.handleUrl.bind(this)
     }
     
componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(res=>{
            this.props.dataPush(res.data)
        })
        .catch(e=>{console.log(e)})
     }

handleAddPost(e){
      this.setState({
            userinput:e.target.value
      })
  }
  handleUrl(e){
      this.setState({
            userUrl:e.target.value
      })
  }
  handleIdChange(e){
      this.setState({
            id:e.target.value
      })
  }
render() {
        const res=this.props.post.map((item,index)=>{
            return (
                <div key={index}>
                    {
                        item.title?<p >Login-{item.title}</p>:''
                        
                    }
                    {
                        item.url?<p>URL- {item.url}
                        <br/> 
                         <button onClick={()=>this.props.handleDelete(index)}>DELETE</button>
                         <hr/> 
                        </p>:''
                    }
                    
                   
                </div>
            )
        })

        
    return (
            <div>
                {res}
                <input type="text" value={this.userinput} onChange={this.handleAddPost}/>
                <input type="text" value={this.userUrl} onChange={this.handleUrl}/>
                <button onClick={()=>this.props.handleAdd(this.state.userinput,this.state.userUrl)}>ADD</button>              
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        post:state.post,
        userInput:state.userInput,
        id:state.id
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        dataPush:(data)=>{
            const action={type:'DATAPUSH',payload:data}
            dispatch(action)
        },
        handleAdd:(login,url)=>{
            const action={type:'ADD_POST',payload:{login,url}}
            dispatch(action)
        },
        handleDelete:(data)=>{
            const action={type:'DELETE_POST',payload:data}
            dispatch(action)
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
