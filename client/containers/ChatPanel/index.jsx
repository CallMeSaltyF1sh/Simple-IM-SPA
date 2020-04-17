import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import ChatPanelHeader from '@/components/ChatPanelHeader';
import ScrollArea from '@/components/ScrollArea';
import MsgItem from '@/components/MsgItem';
import EditArea from '../EditArea/index';
import socket from '@/socket';
import { changeMsgList } from '../MainPanel/store/actions';
import usePrevious from '@/hooks/usePrevious';

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
            padding: 0 8px 18px 8px;
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
            .split-time {
                width: 100%;
                height: 25px;
                padding-top: 12px;
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
    const { targetInfo, userId, isLogin, msgList } = props;
    const { changeMsgList } = props;

    const target = targetInfo ? targetInfo.toJS() : {};
    const targetType = target.owner ? 'group' : 'user';
    const list = msgList ? msgList.toJS() : [];

    const targetId = target.id;
    const name = target.name ? target.name : target.nickname;

    const [ splitTime, setSplitTime ] = useState(null);
    const [ loadAll, setLoadAll ] = useState(false);

    const prevSplitTime = usePrevious(splitTime);
    
    useEffect(() => {
        document.querySelector('#msglist_bottom').scrollIntoView();
        setLoadAll(false);
    }, [targetInfo]);

    useEffect(() => {
        const time = list.length ? list[0].created_at : null;
        setSplitTime(time);
        if(splitTime === prevSplitTime) {
            document.querySelector('#msglist_bottom').scrollIntoView();
        }
    }, [list]);

    const getMoreMsg = () => {
        let data = targetType === 'group' ? { id_group: targetId } : { id_friend: targetId };
        socket.emit('getMoreMsg', {
            ...data,
            time: splitTime
        }, res => {
            console.log(res);
            if(res.status === 0) {
                if(res.data.length) {
                    let temp = res.data.reverse();
                    changeMsgList(temp.concat(list));
                    if(temp.length >= 20) {
                        setSplitTime(temp[0].created_at);
                    } else {
                        setSplitTime(null);
                        setLoadAll(true);
                    } 
                    document.querySelector('#fetch-history').scrollIntoView(); 
                } else {
                    setSplitTime(null);
                    setLoadAll(true);
                }
            }
        });
    };

    return (
        <div className='chat-panel'>
            <ChatPanelHeader name={name} isLogin={isLogin} />
            <div className='scroll-area'>
                {   targetId && (
                        loadAll ? <div className='split-time'>-- 已加载全部记录 --</div> :
                        <div id='fetch-history' className='split-time' onClick={getMoreMsg}>-- 点此加载更多历史消息 --</div>
                    )
                }
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
    targetInfo: state.getIn(['mainPanel', 'targetInfo']),
    userId: state.getIn(['mainPanel', 'userInfo', 'id']),
    isLogin: state.getIn(['mainPanel', 'isLogin']),
    msgList: state.getIn(['mainPanel', 'msgList'])
});

export default connect(mapStateToProps, {
    changeMsgList
})(memo(ChatPanel));
