import React, { memo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import ChatPanelHeader from '@/components/ChatPanelHeader';
import ScrollArea from '@/components/ScrollArea';
import MsgItem from '@/components/MsgItem';
import EditArea from '../EditArea/index';
import socket from '@/socket';

const styles = css`
    .chat-panel {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        .scroll-area {
            position: relative;
            flex: 1;
            overflow-y: auto;
            padding: 12px 8px 18px 8px;
            &::-webkit-scrollbar {
                width: 8px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                box-shadow: inset 0 0 3px rgba(0,0,0,0.2);
                background: rgba(153, 115, 91, 0.4);
            }
            &::-webkit-scrollbar-track {
                border-radius: 10px;
                background: transparent;
            }
        }
    }
`
/*
const msgList = [
    {
        time: '20:00',
        nickname: 'Nancy',
        msg: 'hahaha',
        avatarUrl: ''
    },
    {
        time: '20:00',
        nickname: 'Nancy',
        msg: 'hahaha',
        avatarUrl: ''
    },
    {
        time: '20:00',
        nickname: 'Nancy',
        msg: 'hahaha',
        avatarUrl: ''
    },
    {
        time: '20:00',
        nickname: 'Nancy',
        msg: 'hahahahahahahahhahahhahha',
        avatarUrl: '',
        isMine: true
    },
    {
        time: '20:00',
        nickname: 'Nancy',
        msg: 'hahahahahahahhahahahahahhahahahahhahahahhahahahhahahahahahahh',
        avatarUrl: ''
    }
]
*/

const ChatPanel = (props) => {
    const { targetInfo, userInfo, friends, groups, isLogin } = props;

    const target = targetInfo ? targetInfo.toJS() : {};
    const user = userInfo ? userInfo.toJS() : {};
    const targetType = target.owner ? 'group' : 'user';

    const targetId = target.id;
    const userId = user.id;
    const name = target.name ? target.name : target.nickname;

    const groupsJS = groups ? groups.toJS() : [];
    const friendsJS = friends ? friends.toJS() : [];

    let list, res;
    if(targetType === 'group') {
        res = groupsJS.find(curr => curr.id === targetId);
    } else {
        res = friendsJS.find(curr => curr.id === targetId);
    }
    list = (res && res.msgs) ? res.msgs : [];

    useEffect(() => {
        document.querySelector('#msglist_bottom').scrollIntoView();   
    });

    console.log(list)
    return (
        <div className='chat-panel'>
            <ChatPanelHeader name={name} isLogin={isLogin} />
            <div className='scroll-area'>
                {
                    list.map((item,index) => {
                        let isMine = item.id === userId;
                        return (
                            <MsgItem key={item.id+item.created_at} {...item} isMine={isMine} />
                        )
                    })
                }
                <div id='msglist_bottom'></div>
            </div>
            <EditArea />
        </div>
    )
}

const mapStateToProps = state => ({
    targetInfo: state.getIn(['chatPanel', 'targetInfo']),
    userInfo: state.getIn(['mainPanel', 'userInfo']),
    isLogin: state.getIn(['mainPanel', 'isLogin']),
    groups: state.getIn(['mainPanel', 'groups']),
    friends: state.getIn(['mainPanel', 'friends'])
});

export default connect(mapStateToProps, null)(memo(ChatPanel));
