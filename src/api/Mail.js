import React, { Component } from 'react'
import config from "../config/config.json"

const {SERVER_API} = config;
const {API_ENDPOINT} = config;
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
            },
        })

        if(res.ok){
            const mail = await res.json();
            // console.log(data)
            this.setState({
                mail : mail,
            });
        }
    }

    componentDidMount = () => {
        this.getMailData()
    }


    render() {
        // this.getMailData()
        const {mail} = this.state
        // console.log(mail);
        return (
            <div>
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
                        </tr>
                    </thead>
                    <tbody>
                        
                            {mail.map((mail) => (
                                <tr>
                                    <td className='text-danger'>{mail.id}</td>
                                    <td>{mail.email}</td>
                                    <td>{mail.receiver}</td>
                                    <td>{mail.title}</td>
                                    <td>{mail.content}</td>
                                    <td>{mail.fileName}</td>
                                </tr>
                            ))}
                    </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
}

export default Mail