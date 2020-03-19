import React, { memo, useRef } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';
import { changeLoginModalDisplay } from './store/actions';
import { changeRegisterModalDisplay } from '../RegisterModal/store/actions';

const LoginModal = (props) => {
    const { changeLoginModalDisplayDispatch, changeRegisterModalDisplayDispatch } = props;
    const emailEl = useRef(null);
    const pswdEl = useRef(null);

    const handleSubmit = () => {
        console.log(emailEl.current);
        console.log(pswdEl.current);
    };

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
            />
            <InputArea 
                placeholder='请输入密码' 
                unicode='&#xe623;' 
                type='password'
                ref={pswdEl}
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
        }
	}
};

export default connect(null, mapDispatchToProps)(memo(LoginModal));