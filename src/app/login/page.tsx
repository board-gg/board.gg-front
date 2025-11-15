'use client'

import styled from "@emotion/styled";
import { color } from "../packages/design-system/src/color";
import font from "../packages/design-system/src/font";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    return(
        <LoginLayout>
            <Img src="/svg/logo.svg" />
            <TextArea>
            <LoginBotton><Text>로그인</Text></LoginBotton>
            <SignupText onClick={() => {router.push("/signup")}}>계정이 없다면? 여기를 눌러 회원가입을 진행해요!</SignupText>
            </TextArea>
        </LoginLayout>
    )

}

export default Login;

const LoginLayout = styled.div`
    max-width : 600px;
    width : 100%;
    background-color : white;
    height : 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
` 

const Img = styled.img`
    width : 20%;
    height : 20%;
`

const LoginBotton = styled.button`
    border: 2px solid ${color.primary};
    border-image-slice: 1;
    width : 24%;
    height : 4vh; 
    background-color : white;
    border-radius : 15px;
`

const Text = styled.p`
    ${font.D5};
    font-size : 16px;
    background: ${color.gradient.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
`
const SignupText = styled.p`
    ${font.D2};
    font-size : 12px;
    color : ${color.text.secondary};
    cursor : pointer;
`

const TextArea = styled.div`
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    gap : 12px;
` 