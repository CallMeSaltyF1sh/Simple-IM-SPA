import React, { memo, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';
import { changeLoginModalDisplay } from './store/actions';
import { changeRegisterModalDisplay } from '@/containers/RegisterModal/store/actions';
import { changeLoginState } from '@/containers/MainPanel/store/actions';
import socket from '@/socket';

const LoginModal = (props) => {
    const { changeLoginModalDisplayDispatch, changeRegisterModalDisplayDispatch, changeLoginStateDispatch } = props;
    const emailEl = useRef(null);
    const pswdEl = useRef(null);

    const handleSubmit = useCallback(() => {
        const email = emailEl.current.value;
        const pswd = pswdEl.current.value;

        socket.emit('login', {
            email: email,
            password: pswd
        }, res => {
            console.log(res)
            if(res.status !== 0) alert(res.message);
            else {
                alert('登录成功！');
                changeLoginModalDisplayDispatch(false);
                changeLoginStateDispatch(true);
                if(res.data && res.data.token) {
                    window.localStorage.setItem('token', res.data.token);
                }
            }
        });
    }, []);

    return (
        <ModalFrame 
            btnTxt='登录' 
            title='LOGIN' 
            switchTxt='注册' 
            onClose={changeLoginModalDisplayDispatch}
            onSwitch={changeRegisterModalDisplayDispatch}
            onSubmit={handleSubmit}
        >
            <InputArea 
                placeholder='请输入邮箱' 
                unicode='&#xe635;' 
                type='email'
                ref={emailEl}
                passedTips='邮箱不存在'
                //checkValidity={checkEmail}
            />
            <InputArea 
                placeholder='请输入密码' 
                unicode='&#xe623;' 
                type='password'
                ref={pswdEl}
                passedTips='密码不正确'
                //checkValidity={checkPassword}
            />      
        </ModalFrame>
    )
};

const mapDispatchToProps = dispatch => {
	return {
		changeLoginModalDisplayDispatch(bool) {
			dispatch(changeLoginModalDisplay(bool));
		},
        changeRegisterModalDisplayDispatch(bool) {
            dispatch(changeRegisterModalDisplay(bool));
        },
        changeLoginStateDispatch(bool) {
            dispatch(changeLoginState(bool));
        }
	}
};

export default connect(null, mapDispatchToProps)(memo(LoginModal));