'use client'
import Login from "./login/page";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <MainLayout>
        <Login />
    </MainLayout>
  );
}

const MainLayout = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 100%;
`