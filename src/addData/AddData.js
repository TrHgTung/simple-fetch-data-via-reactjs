import React, { Component } from 'react'
import config from "../config/config.json"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const {SERVER_API} = config
const {API_ENDPOINT} = config

export class AddData extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        title: "",
        content: "",
        email: "",
        receiver: "",
        filename: "",
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {title, content, email, receiver, filename} = this.state.form
   
    this.postMail({title, content, email, receiver, filename})
  };

  handleChange = (e) => {
    const data = {...this.state.form};
    data[e.target.name] = e.target.value
    this.setState({
      form : data,
    })
  }

  postMail = async (data) => {
    const res = await fetch(`${SERVER_API}${API_ENDPOINT}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  })

  
  if(res.ok){
      console.log('Added Successfully')
  }
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className='mb-4 '>
            <label for="title">Tiêu đề e-mail: </label>
            <input type='text' id='title' name='title' placeholder='Type something...' onChange={this.handleChange} required></input>
          </div>
          <div className='mb-4'>
            <label for="content">Nội dung e-mail: </label>
            <textarea id='content' name='content' placeholder='Type something...' onChange={this.handleChange} required></textarea>
          </div>
          <div className='mb-4'>
            <label for="email">Gửi tới địa chỉ: </label>
            <input type='email' id='email' name='email' placeholder='Type something...' onChange={this.handleChange} required></input>
          </div>
          <div className='mb-4'>
            <label for="receiver">Người nhận: </label>
            <input type='text' id='receiver' name='receiver' placeholder='A name' onChange={this.handleChange} required></input>
          </div>
          <div className='mb-4'>
            <label for="filename">Test tên file</label>
            <input type='text' id='filename' name='filename' className='btn btn-outline-secondary' onChange={this.handleChange}></input>
          </div>
         <button type='submit' className='btn btn-primary'>Gửi đi</button>
        </form>
      </>
    )
  }
}

export default AddData