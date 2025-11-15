'use client'

import styled from "@emotion/styled";
import  SignupForm  from "../components/signup/signupform";
const Signup = () => {

    return(
        <SignupLayout>
            <SignupForm />
        </SignupLayout>
    )

}

export default Signup;

const SignupLayout = styled.div`
    max-width : 600px;
    width : 100%;
    background-color : white;
    height : 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
` 