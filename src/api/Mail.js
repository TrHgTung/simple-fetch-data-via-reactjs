import React, { Component } from 'react'

export class Mail extends Component {
    constructor(){
        super()
        

        this.mailApi = `http://localhost:5225/api/MailAPI`
    }

    getMailData = async()=>{
        const res = await fetch(this.mailApi, {
            method: "GET",
            headers: {
                // Authorization: `Bearer: ${token}`,
                "Content-Type": "application/json",
            },
        })

        if(res.ok){
            const data = await res.json()
            console.log(data)
        }
    }
  render() {
    this.getMailData()
    return (
      <div>Mail</div>
    )
  }
}

export default Mail