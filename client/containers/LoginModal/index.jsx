import React from 'react';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';

const LoginModal = ({}) => {
    return (
        <ModalFrame btnTxt='登录' title='LOGIN' switchTxt='注册'>
            <InputArea placeholder='请输入邮箱' unicode='&#xe635;' type='email'/>
            <InputArea placeholder='请输入密码' unicode='&#xe623;' type='password'/>      
        </ModalFrame>
    )
}

export default LoginModal;