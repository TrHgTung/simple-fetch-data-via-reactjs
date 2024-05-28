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
                // Authorization: `Bearer: ${token}`,
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
        console.log(mail);
        return (
            <div>
                {mail.map((mail) => (
                    <p key={mail.id}>{mail.email}</p>
                ))}
            </div>
        )
    }
}

export default Mail