import React, { memo, useRef, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';
import { changeLoginModalDisplay } from '../LoginModal/store/actions';
import { changeRegisterModalDisplay } from './store/actions';
import socket from '@/socket';

const RegisterModal = (props) => {
    const { changeLoginModalDisplayDispatch, changeRegisterModalDisplayDispatch } = props;
    const emailEl = useRef(null);
    const nicknameEl = useRef(null);
    const pswdEl = useRef(null);
    const repeatPswdEl = useRef(null);

    const handleSubmit = useCallback(() => {
        const email = emailEl.current.value;
        const nickname = nicknameEl.current.value;
        const pswd = pswdEl.current.value;
        const repeatPswd = repeatPswdEl.current.value;
        if(!checkEmail(email) || !checkNickname(nickname) || !checkPassword(pswd)) {
            alert('请再次检查输入emm...');
            return;
        }
        if(pswd !== repeatPswd) alert('确认密码输入不一致');
        else {
            socket.emit('register', {
                email: email,
                nickname: nickname,
                password: pswd
            }, res => {
                console.log(res);
                if(res.status !== 0) alert(res.message);
                else {
                    alert('注册成功');
                    changeRegisterModalDisplayDispatch(false);
                    changeLoginModalDisplayDispatch(true);
                }
            });
        }
    }, []);

    const checkNickname = useCallback(val => {
        return val.length > 0 && val.length <= 25;
    }, []);
    const checkPassword = useCallback(val => {
        return val.length >= 6 && val.length <= 25;
    }, []);
    const checkEmail = useCallback(val => {
        return /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val);
    }, []);

    return (
        <ModalFrame 
            btnTxt='注册' 
            title='REGISTER' 
            switchTxt='登录'
            onClose={changeRegisterModalDisplayDispatch}
            onSwitch={changeLoginModalDisplayDispatch}
            onSubmit={handleSubmit}
        >
            <InputArea 
                placeholder='请输入邮箱' 
                unicode='&#xe635;' 
                type='email' 
                ref={emailEl} 
                passedTips='邮箱格式不正确'
                checkValidity={checkEmail}
            />
            <InputArea 
                placeholder='请输入昵称' 
                unicode='&#xe651;' 
                type='text' 
                ref={nicknameEl} 
                passedTips='昵称不为空且不得超过25位'
                checkValidity={checkNickname}
            />
            <InputArea 
                placeholder='请输入密码' 
                unicode='&#xe623;' 
                type='password' 
                ref={pswdEl} 
                passedTips='密码合法位数为6~25'
                checkValidity={checkPassword}
            />
            <InputArea 
                placeholder='请确认密码' 
                unicode='&#xe7ba;' 
                type='password' 
                ref={repeatPswdEl} 
                passedTips='密码输入不一致'
                //checkValidity={checkRepeatedPassword}
            />
        </ModalFrame>
    )
}

const mapDispatchToProps = dispatch => {
	return {
		changeLoginModalDisplayDispatch(bool) {
			dispatch(changeLoginModalDisplay(bool));
		},
        changeRegisterModalDisplayDispatch(bool) {
            dispatch(changeRegisterModalDisplay(bool));
        }
	}
};

export default connect(null, mapDispatchToProps)(memo(RegisterModal));