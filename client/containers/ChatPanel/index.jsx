import React, { memo, useEffect } from 'react';
import { css } from 'astroturf';
import ChatPanelHeader from '@/components/ChatPanelHeader';
import ScrollArea from '@/components/ScrollArea';
import EditArea from '@/components/EditArea';
import MsgItem from '@/components/MsgItem';

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

function ChatPanel() {
    useEffect(() => {
        document.querySelector('#msglist_bottom').scrollIntoView();   
    });

    return (
        <div className='chat-panel'>
            <ChatPanelHeader />
            <div className='scroll-area'>
                {
                    msgList.map((item,index) => (
                        <MsgItem key={index} {...item} />
                    ))
                }
                <div id='msglist_bottom'></div>
            </div>
            <EditArea />
        </div>
    )
}


export default memo(ChatPanel);
