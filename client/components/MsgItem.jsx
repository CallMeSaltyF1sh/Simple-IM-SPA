import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from 'astroturf';
import { timeFormat } from '@/utils';

const styles = css`
    .msg-piece {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 3px;
        .msg-body {
            width: 80%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }
        .avatar {
            flex-shrink:0;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin: 10px;
            background-image: url('../assets/images/avators/1.png');
            background-size: 100% 100%;
        }
        .txt-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 5px;
            >p {
                margin: 0;
            }
            .name {
                height: 20px;
                line-height: 20px;
                font-size: 10px;
                color: #555;
            }
            .msg {
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                background: rgba(255,255,255,0.65);
                color: #888;
                white-space: wrap;
                word-break: break-all;
            }
            .time {
                margin-top: 4px;
                font-size: 10px;
                color: #999;
            }
        }
    }

    .msg-piece-right {
        justify-content: flex-end;
        .msg-body {
            flex-direction: row-reverse;
            .name {
                text-align: right;
            }
            .time {
                text-align: right;
            }
        }
    }
`

const MsgItem = (props) => {
    const { id, nickname, content, created_at, avatar, isMine, msg_type } = props;

    return (
        <div className={`msg-piece ${ isMine ? 'msg-piece-right' : '' }`}>
            <div className='msg-body'>
                <div className='avatar'></div>
                <div className='txt-wrapper'>
                    <p className='name'>{nickname}</p>
                    <p className='msg'>{content}</p>
                    <p className='time'>{timeFormat(created_at)}</p>
                </div>
            </div>
        </div>
    )
};

export default MsgItem;