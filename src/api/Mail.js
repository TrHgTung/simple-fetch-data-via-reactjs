import React, { Component } from 'react'
import config from "../config/config.json"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Mail.css';
import MailContent from '../mailContent/MailContent';
import AddData from '../addData/AddData';

const {SERVER_API} = config
const {API_ENDPOINT} = config
export class Mail extends Component {
    constructor(){
        super()
        
        this.state = {
            mail: [],
        }

        // this.mailApi = `http://localhost:5225/api/MailAPI`
    }

    getMailData = async() => {
        const res = await fetch(`${SERVER_API}${API_ENDPOINT}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accept": "/",
            },
        })

        if(res.ok){
            const mail = await res.json();
            // console.log(data)
            this.setState({
                mail : mail,
                showAll : false,
            });
        }
    }

    handleClickItem = (id) => {
        this.setState({
            mailId : id,
            showAll: false,
        })
    }

    componentDidMount = () => {
        document.body.style.backgroundColor = "white"
        this.getMailData()
    }

    handleComeBack = () => {
        this.setState({
            showAll:true,
        })
    }

    handleAddSuccess = (status) =>{
        if(status){
            this.getMailData()
        }
    }

    handleDelete = (id) => {
        if(window.confirm('Bạn có muốn xóa mục này khỏi lịch sử e-mail?')){
            this.deleteItemMailHistory(id)
            alert('Đã xóa thành công')
        }
    }

    deleteItemMailHistory = async (id) => {
        const fetchUrl = `${SERVER_API}${API_ENDPOINT}/${id}`
        const res = await fetch(fetchUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "accept": "/",
            },
        })

        console.log(fetchUrl)
        if(res.ok){
            this.getMailData()
        }
    }

    render() {
        // this.getMailData()
        const {mail, mailId, showAll} = this.state

        return (
            <>
                <div className='mt-4 mb-4 text-center font-weight-bold'>
                    <h4 className='font-weight-bold'>Lịch sử e-mail</h4>
                </div>
                            { 
                                mailId && !showAll ? (
                                    <div class="table-responsive small">
                                        <table class="table table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    
                                                    <th scope="col">Nội dung e-mail</th>
                                                    <th scope="col">Tên tệp đính kèm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <MailContent id={mailId} />
                                            </tbody>
                                        </table>
                                        <div className='text-center mt-4 mb-4'>
                                            <button onClick={this.handleComeBack} className='btn btn-outline-secondary'>
                                                Quay lại trước đó
                                            </button>
                                        </div>
                                </div>                                    
                                ) : (
                                    <div class="table-responsive small">
                                        <table class="table table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Địa chỉ e-mail</th>
                                                <th scope="col">Tên người nhận</th>
                                                <th scope="col">Tiêu đề e-mail</th>
                                                <th scope="col">Nội dung e-mail</th>
                                                <th scope="col">Tên tệp đính kèm</th>
                                                <th scope="col">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                mail.map((mail) => (
                                                    <tr role="button" onClick={() => {
                                                        this.handleClickItem(mail.id)
                                                    }}>
                                                        <td className='mail-item'>{mail.id}</td>
                                                        <td className='mail-item'>{mail.email}</td>
                                                        <td className='mail-item'>{mail.receiver}</td>
                                                        <td className='mail-item'>{mail.title}</td>
                                                        <td className='mail-item'>{mail.content}</td>
                                                        <td className='mail-item'>{mail.fileName}</td>
                                                        <td className='mail-item'>
                                                            <button className='btn btn-sm btn-danger' type='button' onClick={(e) => {
                                                                e.stopPropagation()
                                                                this.handleDelete(mail.id)
                                                            }}>Xóa</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                
                                )
                            }
                                               
                    <div className='text-center mt-4 mb-4'>
                        <div className='mt-2 mb-4'>
                            <h4><strong>Gửi e-mail nhanh</strong></h4>
                        </div>
                        <AddData onSuccess={this.handleAddSuccess} />
                    </div>
             </>
        );
    }
}

export default Mail