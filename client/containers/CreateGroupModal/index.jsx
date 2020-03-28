import React, { memo, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';
import socket from '@/socket';
import { changeCGModalDisplay } from './store/actions';
import { addGroup } from '../MainPanel/store/actions';

const CreateGroupModal = (props) => {
    const { changeCGModalDisplayDispatch, addGroupDispatch } = props;
    const { userInfo, groups } = props;
    const nameEl = useRef(null);

    const info = userInfo ? userInfo.toJS() : {};
    const groupList = groups ? groups.toJS() : [];

    const checkName = useCallback(val => {
        return val.length > 0 && val.length <= 25;
    }, []);

    const handleSubmit = useCallback(() => {
        console.log('click')
        const name = nameEl.current.value;
        if(!checkName(name)) {
            alert('请再次检查输入emm...');
            return;
        }

        const { id } = info;
        socket.emit('createGroup', {
            name: name,
            userId: id
        }, res => {
            console.log(res)
            if(res.status !== 0) alert(res.message);
            else {
                alert('创建成功！');
                changeCGModalDisplayDispatch(false);
                //const newGroupInfo = res.data;
                //groupList.unshift(newGroupInfo);
                //setGroupListDispatch(groupList);
                const newGroup = {
                    ...res.data,
                    msgs: []
                };
                addGroupDispatch(newGroup);
            }
        });
    }, []);

    return (
        <ModalFrame 
            btnTxt='创建' 
            title='CREATE GROUP' 
            onClose={changeCGModalDisplayDispatch}
            onSubmit={handleSubmit}
        >
            <InputArea 
                placeholder='请输入群名称' 
                unicode='&#xe644;' 
                type='text'
                ref={nameEl}
                passedTips='名称不为空且长度不大于25'
                checkValidity={checkName}
            />    
        </ModalFrame>
    )
};

const mapStateToProps = state => ({
    userInfo: state.getIn(['mainPanel', 'userInfo']),
    groups: state.getIn(['mainPanel', 'groups'])
});

const mapDispatchToProps = dispatch => {
	return {
		changeCGModalDisplayDispatch(bool) {
			dispatch(changeCGModalDisplay(bool));
		},
        /*
        setGroupListDispatch(groups) {
            dispatch(setGroupList(groups));
        },
        */
        addGroupDispatch(newGroup) {
            dispatch(addGroup(newGroup));
        }
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateGroupModal));
