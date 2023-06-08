import React, { useState, useEffect,Fragment } from 'react';

const LoginComponent = (props) => {
    return(
        <div className="position-relative w-100 vh-100 d-flex justify-content-center align-items-center " style={
            {
                height:"100vh",
                backgroundImage:"linear-gradient(to bottom right,blue,purple)"
            }
            }>

                {/* popup message */}
                {
                    props.serveresponse &&
                        <div className='position-absolute d-flex flex-row justify-content-center align-items-center vw-100 h-30 top-0 card' style={
                            {
                                top:"0",
                                height:"16vh",
                                minWidth:"30vw",
                                borderLeft:`10px solid ${props.serveresponse == "Email atau password salah" ? "red" : "lime"}`
                            }
                        }>
                            {
                                props.serveresponse == "Email atau password salah" ?
                                <i className="fa-solid fa-xmark text-danger display-4 mr-3"></i>
                                :
                                <i className="fa-regular fa-circle-check text-success display-4 mr-3"></i>
                                
                            }
                            <h3> {props.serveresponse}</h3>
                        </div>

                }
                {/* end popup message */}

            {/* side box */}
            <div className='w-50 h-100 bg-primary d-flex flex-column justify-content-center'>
                <h2 className='text-center text-white '>Buku Tahunan</h2>
                <img src="img/pic1.png" />
            </div>


            {/* end side box */}

            {/* Main Box */}
            <div className="w-50 h-100 bg-white rounded p-3 d-flex flex-column justify-content-center">
                <div className='flex justify-center h-14 w-full items-center'>
                    <h2 className='text-center'>{props.page}</h2>
                </div>
                <div>
                    <ul className='list-unstyled'>
                        <form onSubmit={props.submit}>
                            <li className='mb-2 flex flex-col'>
                                <label>{
                                    props.page == "Register" ?
                                    "Username"
                                    :
                                    "Email"    
                                }</label>
                                <input type="text" className='form-control' name={props.page=="Register"?"username":"email"} value={props.page == "Register"? props.dataform.username : props.dataform.email} onChange={props.handleform} />
                                {props.errormsg.email && <span className='text-danger'>{props.errormsg.email}</span>}
                            </li>

                            <li className='w-20 mb-2'>
                                <label>Password</label>
                                <input type="password" className='form-control' name="password" value={props.dataform.password} onChange={props.handleform} />   
                                {props.errormsg.password && <div><span className='text-danger'>{props.errormsg.password}</span></div>} 
                                {
                                    props.page == "Login" ? 
                                        <span>Belum Punya Akun? <a onClick={props.linkHandle} href="">Klik Disini</a></span>
                                        :
                                        ""
                                }                        
                            </li>
                            {
                                props.page == "Register" ?
                                <Fragment>

                                <li className='mb-2 w-20'>
                                        <label>Konfirmasi Password</label>
                                        <input type="password" className={`form-control ${props.passwordmatch ? "" : "alert-danger"}`} name="confirmPass" value={props.dataform.confirmPass} onChange={props.handleform} />
                                        {props.errormsg.confirmPass && <div><span className='text-danger'>{props.errormsg.confirmPass}</span></div>}                                    
                                </li>
                                 <li className='mb-4 w-20'>
                                    <label>Email</label>
                                    <input type="text" className={`form-control`} name="email" value={props.dataform.email} onChange={props.handleform} />
                                    {props.errormsg.email && <div><span className='text-danger'>{props.errormsg.email}</span></div>}                                    
                                    <span>Sudah Punya Akun? <a onClick={props.linkHandle} href="">Klik Disini</a></span>
                                 </li>
                                </Fragment>
                                :
                                ""
                            }
                            <li className='w-100 d-flex justify-content-center'>
                                <button className='btn btn-primary w-100' type="submit">{props.page}</button>
                            </li>
                        </form>
                    </ul>
                </div>
            </div>

            {/* End Main Box */}
        </div>
    )
}

export default LoginComponent;