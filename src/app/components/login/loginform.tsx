'use client'

import { color } from "@/app/packages/design-system/src/color";
import font from "@/app/packages/design-system/src/font";
import styled from "@emotion/styled";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleLogin = async () => {

        if (!formData.email || !formData.password ) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (formData.password.length <= 5) {
            alert('비밀번호는 6자 이상이어야합니다');
            return;
        }

        setIsLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email : formData.email,
            password : formData.password
        });

        if (!data.user || !data.session) {
            alert('로그인에 실패했습니다.');
            setIsLoading(false);
            return;
        }
        if(data){
        localStorage.setItem('token', data.session.access_token);
        localStorage.setItem('name', data.user.user_metadata.name);
        router.push("/main");
        
        }
        
        if (error) {
            alert('로그인 실패: ' + error.message);
            console.log('에러:', error);
            return null;
        }
        
        return data.user;

    };

    return(
        <SignupFormLayout>
            <TitleBox>
                <Text>로그인</Text>
            </TitleBox>

            <InfomationBox>
                <InputBox>
                     <Input 
                        type="email" 
                        name="email"
                        placeholder="이메일을 입력해주세요"
                        value={formData.email}
                        onChange={handleInputChange}

                    />
                </InputBox>

                <InputBox>
                    <Input 
                        type="password" 
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </InputBox>
            </InfomationBox>

            <ButtonBox>
                <PrimaryButton 
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                   <PrimaryText>
                        {isLoading ? '처리중...' : '로그인'}
                    </PrimaryText>
                </PrimaryButton>
                <SecondaryButton onClick={() => window.history.back()}>
                    <SecondaryText>돌아가기</SecondaryText>
                </SecondaryButton> 
            </ButtonBox>
        </SignupFormLayout>
    )
}

export default LoginForm;

const SignupFormLayout = styled.div`
    width: 80%;
    height: 90%;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10%;
`

const Text = styled.p`
    ${font.D5};
    font-size: 20px;
    background: ${color.gradient.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
`

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InfomationBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 34px;
`

const InputBox = styled.div`
    border: none;
    border-bottom: 1px solid ${color.text.secondary};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 8px;
`

const Input = styled.input`
    flex: 1;
    background-color: white;
    border: none;
    outline: none;
    ${font.D5};
    font-size: 16px;
    padding: 12px 0px;
    width : 70%;
    color: ${color.text.primary};

    &::placeholder {
        color: ${color.text.disabled};
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
        -webkit-text-fill-color: ${color.text.primary} !important;
        transition: background-color 5000s ease-in-out 0s;
    }
    
`

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 24px;
`

const PrimaryButton = styled.button`
    border: none;
    border-radius: 12px; 
    background-color: ${color.primary};
    width: 100px;
    height: 28px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover:not(:disabled) {
        background-color: #4383ccff;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`

const SecondaryButton = styled.button`
    border: 1px solid ${color.primary};
    border-radius: 12px; 
    background-color: white;
    width: 100px;
    height: 28px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #f7f7f7ff;
    }
`


const PrimaryText = styled.p`
    color: white;
    ${font.D4};
    font-size: 14px;
`

const SecondaryText = styled.p`
    color: ${color.primary};
    ${font.D4};
    font-size: 14px;
`

const SmallButtonText = styled.p`
    color: white;
    ${font.D4};
    font-size: 12px;
`
