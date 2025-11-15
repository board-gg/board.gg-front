'use client'

import { color } from "@/app/packages/design-system/src/color";
import font from "@/app/packages/design-system/src/font";
import styled from "@emotion/styled";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        verificationCode: ''
    });
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSendVerificationCode = async () => {
        if (!formData.email) {
            alert('이메일을 입력해주세요.');
            return;
        }

  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        setIsLoading(true);

        try {
      
            const { data, error } = await supabase.auth.signInWithOtp({
                email: formData.email,
                options: {
                    shouldCreateUser: true, 
                    data: {
                        name: formData.name
                    }
                }
            });

            if (error) {
                console.error('OTP 발송 에러:', error);
                throw error;
            }

            console.log('OTP 발송 성공:', data);
            setIsCodeSent(true);
            alert('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
            
        } catch (error) {
            console.error('인증번호 발송 오류:', error);
         
        } finally {
            setIsLoading(false);
        }
    };


    const handleSignup = async () => {

        if (!formData.name || !formData.password || !formData.email || !formData.verificationCode) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (formData.password.length <= 5) {
            alert('비밀번호는 6자 이상이어야합니다');
            return;
        }

        if (!isCodeSent) {
            alert('이메일 인증을 진행해주세요.');
            return;
        }

        setIsLoading(true);

        try {

            const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
                email: formData.email,
                token: formData.verificationCode,
                type: 'email'
            });

            if (verifyError) {
                console.error('OTP 검증 에러:', verifyError);
                throw new Error('인증번호가 일치하지 않습니다.');
            }

            console.log('OTP 검증 성공:', verifyData);


            const { data: updateData, error: updateError } = await supabase.auth.updateUser({
                data: {
                    password: formData.password,
                    name: formData.name
                }
            });

            if (updateError) {
                console.error('사용자 정보 업데이트 에러:', updateError);
                throw updateError;
            }

            console.log('사용자 정보 업데이트 성공:', updateData);

            alert('회원가입이 완료되었습니다!');
            window.location.href = '/login';
            
        } catch (error) {
            console.error('회원가입 오류:', error);
            
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <SignupFormLayout>
            <TitleBox>
                <Text>회원가입</Text>
            </TitleBox>

            <InfomationBox>
                <InputBox>
                    <Input 
                        type="text" 
                        name="name"
                        placeholder="이름을 입력해주세요"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </InputBox>

                <InputBox>
                    <Input 
                        type="password" 
                        name="password"
                        placeholder="비밀번호를 입력해주세요(6자이상)"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </InputBox>

                <InputBox>
                    <Input 
                        type="email" 
                        name="email"
                        placeholder="이메일을 입력해주세요"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isCodeSent}
                    />
                    <SmallButton 
                        onClick={handleSendVerificationCode}
                        disabled={isLoading || isCodeSent}
                    >
                        <SmallButtonText>
                            {isCodeSent ? '발송완료' : '인증번호 발송'}
                        </SmallButtonText>
                    </SmallButton>
                </InputBox>

                <InputBox>
                    <Input 
                        type="text" 
                        name="verificationCode"
                        placeholder="인증번호를 입력해주세요"
                        value={formData.verificationCode}
                        onChange={handleInputChange}
                        disabled={!isCodeSent}
                    />
                </InputBox>
            </InfomationBox>

            <ButtonBox>
                <PrimaryButton 
                    onClick={handleSignup}
                    disabled={isLoading}
                >
                    <PrimaryText>
                        {isLoading ? '처리중...' : '회원가입'}
                    </PrimaryText>
                </PrimaryButton>
                <SecondaryButton onClick={() => window.history.back()}>
                    <SecondaryText>돌아가기</SecondaryText>
                </SecondaryButton>
            </ButtonBox>
        </SignupFormLayout>
    )
}

export default SignupForm;

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
    justify-content: start;
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

const SmallButton = styled.button`
    border: none;
    border-radius: 8px; 
    background-color: ${color.primary};
    padding: 8px 12px;
    height: 32px;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover:not(:disabled) {
        background-color: #4383ccff;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: #cccccc;
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
