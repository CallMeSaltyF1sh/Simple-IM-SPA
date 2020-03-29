import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from 'astroturf';

const chatPanelHeaderBgColor = 'rgba(252,210,118,0.65)';
const chatPanelHeaderTxtColor = '#aa8f7c';
const chatPanelHeaderIconColor = '#b59682';

const styles = css`
    .chat-panel-header {
        position: relative;
        height: 50px;
        background-color: ${chatPanelHeaderBgColor};
        border-top-right-radius: 30px;
        box-shadow: 0 6px 12px -10px #888;
        .chatter-name {
            position: absolute;
            margin: 16px 0 0 20px;
            width: 75%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 17px;
            color: ${chatPanelHeaderTxtColor};
            letter-spacing: 2px;
        }
        .more {
            position: absolute;
            top: 16px;
            right: 20px;
            color: ${chatPanelHeaderIconColor};
            cursor: pointer;
            font-size: 20px;
            transition: all .3s;
            &:hover {
                color: #8c6851;
            }
        }
    }
`

const ChatPanelHeader = (props) => {
    const { name, isLogin } = props;

    return (
        <div className='chat-panel-header'>
            <div className='chatter-name'>{name}</div>
            { isLogin && <i className='iconfont more'>&#xe618;</i> }
        </div>
    )
};

export default ChatPanelHeader;