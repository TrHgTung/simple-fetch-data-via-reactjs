import React, { Component } from 'react'

export class AddData extends Component {
  constructor(){
    super()
    this.state = {
      form:{
        title: "",
        content: "",
        email: "",
        filename: "",
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {title, content, email, filename} = this.state.form
    console.log(title, content, email, filename)
  };

  handleChange = (e) => {
    const data = {...this.state.form};
    data[e.target.name] = e.target.value
    this.setState({
      form:data,
    })
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
            <label for="filename">Chọn tệp đính kèm: </label>
            <input type='file' id='filename' name='filename' className='btn btn-outline-secondary' onChange={this.handleChange}></input>
          </div>
         <button type='submit' className='btn btn-primary'>Gửi đi</button>
        </form>
      </>
    )
  }
}

export default AddData