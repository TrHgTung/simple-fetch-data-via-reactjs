import React, { Component } from 'react'
import config from "../config/config.json"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const {SERVER_API} = config
const {API_ENDPOINT} = config

export class MailContent extends Component {
    constructor(props){
        super(props)
        this.state = {
            mail : {},
        }
    }

    getMailContent = async(id) => {
        const res = await fetch(`${SERVER_API}${API_ENDPOINT}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(res.ok){
            const mail = await res.json();
            this.setState({
                mail : mail,
            });
        }
    }

    

    componentDidMount = () => {
        const {id} = this.props
        this.getMailContent(id)
    }

    render() {
        const {mail} = this.state
        return (
            <>
                {
                        <tr>
                            <td>{mail.content}</td>
                            <td>{mail.fileName}</td>
                        </tr>
                }
               
            </>
        )
    }
}

export default MailContent