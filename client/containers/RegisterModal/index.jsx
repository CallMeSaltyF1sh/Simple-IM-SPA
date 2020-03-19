import React, { memo, useRef } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';
import { changeLoginModalDisplay } from '../LoginModal/store/actions';
import { changeRegisterModalDisplay } from './store/actions';

const RegisterModal = (props) => {
    const { changeLoginModalDisplayDispatch, changeRegisterModalDisplayDispatch } = props;
    const emailEl = useRef(null);
    const nicknameEl = useRef(null);
    const pswdEl = useRef(null);
    const repeatPswdEl = useRef(null);

    const handleSubmit = () => {
        
    };

    return (
        <ModalFrame 
            btnTxt='注册' 
            title='REGISTER' 
            switchTxt='登录'
            onClose={changeRegisterModalDisplayDispatch}
            onSwitch={changeLoginModalDisplayDispatch}
            onSubmit={handleSubmit}
        >
            <InputArea placeholder='请输入邮箱' unicode='&#xe635;' type='email' ref={emailEl}/>
            <InputArea placeholder='请输入昵称' unicode='&#xe651;' type='text' ref={nicknameEl}/>
            <InputArea placeholder='请输入密码' unicode='&#xe623;' type='password' ref={pswdEl}/>
            <InputArea placeholder='请确认密码' unicode='&#xe7ba;' type='password' ref={repeatPswdEl}/>
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