import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
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
            #fetch-history {
                width: 100%;
                height: 25px;
                line-height: 25px;
                text-align: center;
                font-size: 13px;
                color: #aa8f7c;
                transition: all 0.3s;
                cursor: pointer;
                &:hover {
                    color: #8c6851;
                }
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

    const [list, setList] = useState([]);
    const [splitTime, setSplitTime] = useState(null);

    useEffect(() => {
        document.querySelector('#msglist_bottom').scrollIntoView();   
    }, [targetInfo]);

    useEffect(() => {
        let res;
        if(targetType === 'group') {
            const groupsJS = groups ? groups.toJS() : [];
            res = groupsJS.find(curr => curr.id === targetId);
        } else {
            const friendsJS = friends ? friends.toJS() : [];
            res = friendsJS.find(curr => curr.id === targetId);
        }
        setList((res && res.msgs) ? res.msgs : []);
        setSplitTime((res && res.msgs && res.msgs.length) ? res.msgs[0].created_at : null);
    }, [targetId, targetType, groups, friends]);

    const getMoreMsg = useCallback(() => {
        let data = targetType === 'group' ? { id_group: targetId } : { id_usr: userId, id_friend: targetId };
        socket.emit('getMoreMsg', {
            ...data,
            time: splitTime
        }, res => {
            console.log(res);
            if(res.status === 0) {
                if(res.data.length) {
                    setList(res.data.concat(list));
                    setSplitTime(res.data[0].created_at);
                    document.querySelector('#fetch-history').scrollIntoView(); 
                } else {
                    setSplitTime(null);
                }
            }
        });
    }, [splitTime, targetType, targetId, userId]);

    console.log(list)
    return (
        <div className='chat-panel'>
            <ChatPanelHeader name={name} isLogin={isLogin} />
            <div className='scroll-area'>
                { splitTime && <div id='fetch-history' onClick={getMoreMsg}>-- 点此加载更多历史消息 --</div> }
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
