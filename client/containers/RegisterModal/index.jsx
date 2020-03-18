import React from 'react';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';

const RegisterModal = () => {
    return (
        <ModalFrame btnTxt='注册' title='REGISTER' switchTxt='登录'>
            <InputArea placeholder='请输入邮箱' unicode='&#xe635;' type='email'/>
            <InputArea placeholder='请输入昵称' unicode='&#xe651;' type='text'/>
            <InputArea placeholder='请输入密码' unicode='&#xe623;' type='password'/>
            <InputArea placeholder='请确认密码' unicode='&#xe7ba;' type='password'/>
        </ModalFrame>
    )
}

export default RegisterModal;