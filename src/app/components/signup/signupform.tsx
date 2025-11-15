'use client'

import { color } from "@/app/packages/design-system/src/color";
import font from "@/app/packages/design-system/src/font";
import styled from "@emotion/styled";

const SignupForm = () => {
    return(
        <SignupFormLayout>
            dnd
        </SignupFormLayout>
    )

}

export default SignupForm;

const SignupFormLayout = styled.div`
    width : 80%;
    height : 90%;
    border : 1px solid ${color.text.secondary};
    border-radius : 12px;
    padding : 12px;
`