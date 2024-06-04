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
        //console.log('Added Successfully')
        alert('Đã gửi e-mail thành công')
        this.setState({
          form : {
            title: "", 
            content: "", 
            email: "", 
            receiver: "", 
            filename: "",
          },
        })
    }else{
      alert('Đã có lỗi xảy ra, hãy kiểm tra kết nối với API')
    }
  }

  render() {
    const {title, content, email, receiver, filename} = this.state.form
    return (
      <>
        <form className='form-signin' onSubmit={this.handleSubmit}>
          <div className="form-label-group">
            <label for="title">Tiêu đề e-mail: </label>
            <input type='text' id='title' name='title' placeholder='Type something...' value={title} onChange={this.handleChange} required></input>
          </div>
          <div className="form-label-group">
            <label for="content">Nội dung e-mail: </label>
            <textarea id='content' name='content' placeholder='Type something...' value={content} onChange={this.handleChange} required></textarea>
          </div>
          <div className="form-label-group">
            <label for="email">Gửi tới địa chỉ: </label>
            <input type='email' id='email' name='email' placeholder='Type something...' value={email} onChange={this.handleChange} required></input>
          </div>
          <div className="form-label-group">
            <label for="receiver">Người nhận: </label>
            <input type='text' id='receiver' name='receiver' placeholder='A name' value={receiver} onChange={this.handleChange} required></input>
          </div>
          <div className="form-label-group">
            <label for="filename">Test tên file</label>
            <input type='text' id='filename' name='filename' className='btn btn-outline-secondary' value={filename} onChange={this.handleChange}></input>
          </div>
          <button type='submit' className='btn btn-primary'>Gửi đi</button>
        </form>
      </>
    )
  }
}

export default AddData