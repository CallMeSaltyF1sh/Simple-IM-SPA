import React from 'react';
import { css } from 'astroturf';

const styles = css`
    .chat-list-item {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
        height: 67px;
        transition: all .3s;
        &:hover {
            background-color: rgb(225,225,225,0.45);
            cursor: pointer;
        }
        .avator {
            width: 46px;
            height: 46px;
            margin: 10px 10px 0 10px;
            border-radius: 50%;
            background-image: url('../assets/images/avators/3.jpg');
            background-size: 100% 100%;
        }
        .info {
            position: relative;
            flex: 1;
            .name {
                position: absolute;
                top: 13px;
                left: 0;
                color: #888;
                font-size: 15px;
            }
            .msg {
                position: absolute;
                width: 80%;
                left: 0;
                bottom: 15px;
                font-size: 12px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                color: #aaa;
            }
            .time {
                position: absolute;
                right: 12px;
                top: 12px;
                font-size: 12px;
                color: #bbb;
            }
        }
    }
`

const ListItem = ({ name, time, imgUrl, latestMsg, unreadCnt, type, id }) => {
    return (
        <div className='chat-list-item'>
            <div className='avator'></div>
            <div className='info'>
                <div className='name'>{name}</div>
                <div className='msg'>{latestMsg}</div>
                <div className='time'>{time}</div>
                <div className='unread'></div>
            </div>
        </div>
    )
}

export default ListItem;