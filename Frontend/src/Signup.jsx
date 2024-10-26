import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
function SignUp() {
    let [i,setI] = useState(0);
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [mail, setMail] = useState("");
    let [err, seterr] = useState(false);
    let [errMessage, setErrMessage] = useState("");
    const {handleRegister , handleLogin}  = useContext(AuthContext);
    let Authenticate = async  (event)=>{
        event.preventDefault();
        seterr(false);
        setErrMessage("");
        try{
            if(i==0){
                let result = await handleRegister(mail, username, password);
                console.log(result);
                setPassword("");
                setI(1);
                seterr(true);
                setErrMessage(result);
            }else if(i==1){
                let result = await handleLogin(username, password);
                setUsername("");
                setPassword("");
                seterr(false);
                setErrMessage("");
                window.location.href = "http://localhost:5173/Home";
            }
        }catch(err){
            let message = err.response.data.message;
            setErrMessage(message);
            seterr(true);
        }
    }
    return ( 
        <div className='signupPageContainer'>
            <div className='signupHolder'>
            {err?   

                <h1 style={{textAlign:'center',color:'red'}}>
                    {errMessage}
                </h1>

                :<></>

                }
            {
                i==0? 
                <div>
                    <form className='RegisterForm' onSubmit={Authenticate}>
                        <h2>SignUp Page</h2>
                        <input id='mail' name='mail' type='mail' placeholder='Mail' value={mail} onChange={(e) =>{setMail(e.target.value)}}/>
                        <input name='name' id='name' type='text' placeholder="UserName" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        <input id='password' type='password' placeholder="Password" name={password} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <button className='rbtn'>Register</button>
                        <div className='login'>
                            <button onClick={()=>{setI(1)}}><h3>Login</h3></button>
                        </div>
                    </form>
                </div>: <></>

            }
            {
                i == 1?
                <div>
                    <form className='RegisterForm' onSubmit={Authenticate}>
                    <h2>Login Page</h2>
                    <input name='name' id='name' type='text' placeholder="UserName" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input id='password' type='password' placeholder="Password" name={password} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    <button className='rbtn'>login</button>
                    <div className='login'>
                        <button onClick={()=>setI(0)}><h3>Register</h3></button>
                    </div>
                    </form>
                    
                </div>:<></>
            }
            </div>
        </div>
     );
}

export default SignUp;