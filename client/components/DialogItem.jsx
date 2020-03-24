import React, { memo } from 'react';
import { css } from 'astroturf';
import { PropTypes } from 'prop-types';

const styles = css`
    .chat-list-item {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
        height: 68px;
        box-sizing: border-box;
        padding: 0 15px;
        transition: all .3s;
        &:hover {
            background-color: rgb(225,225,225,0.55);
            cursor: pointer;
        }
        &.focus {
            background-color: rgb(225,225,225,0.55);
        }
        .avatar {
            width: 44px;
            height: 44px;
            margin: 12px 10px 0 0;
            border-radius: 50%;
            background-image: url('../assets/images/avators/a.jpg');
            background-size: 100% 100%;
        }
        .info {
            position: relative;
            flex: 1;
            .name {
                position: absolute;
                top: 15px;
                left: 0;
                color: #888;
                font-size: 14px;
            }
            .msg {
                position: absolute;
                width: 82%;
                left: 0;
                bottom: 16px;
                font-size: 11px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                color: #aaa;
            }
            .time {
                position: absolute;
                right: 0;
                top: 16px;
                font-size: 11px;
                color: #bbb;
            }
            .unread {
                position: absolute;
                display: inline-block;
                right: 0;
                bottom: 14px;
                width: 17px;
                height: 17px;
                line-height: 18px;
                border-radius: 50%;
                background-color: rgba(201, 58, 58, .35);
                text-align: center;
                color: #fff;
                font-size: 10px;
                font-family: "Times New Roman";
                &.longer {
                    width: 18px !important;
                }
            }
        }
    }
`

const timeFormat = time => {
    let month = time.getMonth() + 1,
        day = time.getDate(),
        year = time.getFullYear(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds(),
        timeStamp = time.getTime(),
        currTime = +new Date();
    if(currTime - timeStamp < 86400000) {
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        return `${hour}:${minute}`;
    } else {
        return `${year}/${month}/${day}`;
    }
};

const ListItem = ({ name, msgTime, avatarUrl, latestMsg, unreadCnt, focus, onClick=function(){} }) => {
    return (
        <div className={`chat-list-item ${ focus ? 'focus' : ''}`} onClick={onClick}>
            <div className='avatar'></div>
            <div className='info'>
                <div className='name'>{name}</div>
                <div className='msg'>{latestMsg}</div>
                <div className='time'>{timeFormat(msgTime)}</div>
                {
                    unreadCnt > 0 ? 
                        <div className={`unread ${unreadCnt > 99 ? 'longer' : ''}`}>
                            {unreadCnt > 99 ? '99+' : unreadCnt}
                        </div> 
                    : null
                }
            </div>
        </div>
    )
};

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    msgTime: PropTypes.object,
    avatarUrl: PropTypes.string,
    latestMsg: PropTypes.string,
    unreadCnt: PropTypes.number,
    focus: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(ListItem);