import React, { useState, useRef, memo } from 'react';
import { css } from 'astroturf';
import SearchBox from '@/components/SearchBox';
import ListItem from '@/components/ListItem';

const styles = css`
    .list-panel {
        position: relative;
        width: 270px;
        min-width: 255px;
        max-width: 270px;
        height: 100%;
        background: rgba(255,255,255,0.3);
        .list-panel-top {
            display: flex;
            flex-direction: row;
            position: relative;
            width: 100%;
            height: 50px;
            background-color: rgba(252,210,118,0.7);
            box-shadow: 0 6px 12px -10px #888;
            .add {
                margin: 14px 0 0 11px;
                color: #ceb5a3;
                font-size: 23px;
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    color: #ad876e;
                }
            }
        }
        .chat-list-wrapper {

        }
    }
`;

//mock
const msgList = [
    {
        id: 0,
        type: 'multi',
        avatarUrl: '/assets/images/avators/1.png',
        name: 'test群',
        latestMsg: '啦啦啦emmmmmmmmmmm',
        msgTime: new Date(),
        unreadCnt: 20,
        focus: true
    },
    {
        id: 1,
        type: 'single',
        avatarUrl: '/assets/images/avators/2.jpg',
        name: '咸大猪',
        latestMsg: '咸猪冲鸭！',
        msgTime: new Date(),
        unreadCnt: 100
    }
];

function ListPanel() {
    return (
        <div className='list-panel'>
            <div className='list-panel-top'>
                <SearchBox />
                <i className='iconfont add'>&#xe60b;</i>
            </div>
            <div className='chat-list-wrapper'>
                {
                    msgList.map(item => (
                        <div key={item.type + item.id}>
                            <ListItem {...item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default memo(ListPanel);
