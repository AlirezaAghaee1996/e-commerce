const smsHandler=async(message,...mobileNumber)=>{
    try{
        const res=await fetch('https://api.sms.ir/v1/send/bulk', {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "X-API-KEY":"vFzwKMVRDsGsjjAfflJNszbwLId4kPvbSpQterxambuXaOuUvOB8yenYOxEmc0lR"
        },body:JSON.stringify({
            
            "lineNumber": 30007732010875,
            "messageText": message,
            "mobiles": mobileNumber
      
    })    
    })
    const data=await res.json()
    return data
    }catch(err){
        console.log(err)
    }
}
export const otpSmsHandler=async(mobileNumber,code)=>{
    try{
        const res=await fetch('https://api.sms.ir/v1/send/verify', {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "X-API-KEY":"vFzwKMVRDsGsjjAfflJNszbwLId4kPvbSpQterxambuXaOuUvOB8yenYOxEmc0lR"
        },body:JSON.stringify({
            "mobile": mobileNumber,
            "templateId": 774967,
            "parameters": [
              {
                "name": "CODE",
                "value": code
              }
            ]
        })    
    })
    const data=await res.json()
    return data
    }catch(err){
        console.log(err)
    }
}
export default smsHandler