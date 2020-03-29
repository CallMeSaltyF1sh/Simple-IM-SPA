import React, { memo, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';
import { changeLoginModalDisplay } from './store/actions';
import { changeRegisterModalDisplay } from '../RegisterModal/store/actions';
import { 
    changeLoginState, 
    setUserInfo, 
    setGroupList, 
    setFriendList, 
    setDialogList 
} from '../MainPanel/store/actions';
import { changeMsgList } from '../ChatPanel/store/actions';
import socket from '@/socket';

const LoginModal = (props) => {
    const { changeLoginModalDisplayDispatch, changeRegisterModalDisplayDispatch, changeLoginStateDispatch } = props;
    const { setUserInfoDispatch, setGroupListDispatch, setFriendListDispatch, setDialogListDispatch } = props;
    const { changeMsgListDispatch } = props;
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
                if(res.data) {
                    const { userInfo, token, groups, friends, defaultMsgs } = res.data;
                    window.localStorage.setItem('token', token);

                    let list = [...groups, ...friends];
                    list = list.map(item => {
                        let latestMsg, time, sender,
                            msgs = item.msgs;
                        if(msgs && msgs.length) {
                            latestMsg = msgs[msgs.length-1].content;
                            time = msgs[msgs.length-1].created_at;
                            if(item.owner) sender = msgs[msgs.length-1].nickname;
                        }

                        return {
                            ...item,
                            latestMsg,
                            time,
                            sender
                        }
                    });
                    list = list.filter(item => item.latestMsg);

                    setUserInfoDispatch(userInfo);
                    setGroupListDispatch(groups);
                    setFriendListDispatch(friends);
                    setDialogListDispatch(list);
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
        },
        setUserInfoDispatch(info) {
            dispatch(setUserInfo(info));
        },
        setGroupListDispatch(groups) {
            dispatch(setGroupList(groups));
        },
        setFriendListDispatch(friends) {
            dispatch(setFriendList(friends));
        },
		changeMsgListDispatch(list) {
			dispatch(changeMsgList(list));
		},
        setDialogListDispatch(list) {
            dispatch(setDialogList(list));
        }
	}
};

export default connect(null, mapDispatchToProps)(memo(LoginModal));