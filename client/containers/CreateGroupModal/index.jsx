import React, { memo, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import InputArea from '@/components/InputArea';
import ModalFrame from '@/components/ModalFrame';
import socket from '@/socket';
import { changeCGModalDisplay } from './store/actions';
import { addGroup } from '../MainPanel/store/actions';

const CreateGroupModal = (props) => {
    const { changeCGModalDisplay, addGroup } = props;
    const { userId } = props;
    const nameEl = useRef(null);

    const checkName = useCallback(val => {
        return val.length > 0 && val.length <= 25;
    }, []);

    const handleSubmit = useCallback(() => {
        const name = nameEl.current.value;
        if(!checkName(name)) {
            alert('请再次检查输入emm...');
            return;
        }

        socket.emit('createGroup', {
            name: name,
            userId
        }, res => {
            console.log(res)
            if(res.status !== 0) alert(res.message);
            else {
                alert('创建成功！');
                changeCGModalDisplay(false);
                const newGroup = {
                    ...res.data,
                    msgs: []
                };
                addGroup(newGroup);
            }
        });
    }, []);

    return (
        <ModalFrame 
            btnTxt='创建' 
            title='CREATE GROUP' 
            onClose={changeCGModalDisplay}
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
    userId: state.getIn(['mainPanel', 'userInfo', 'id'])
});

export default connect(mapStateToProps, {
    changeCGModalDisplay, addGroup
})(memo(CreateGroupModal));
