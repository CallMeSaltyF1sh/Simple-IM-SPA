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
            .desc {
                position: absolute;
                width: 85%;
                left: 0;
                bottom: 16px;
                font-size: 11px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                color: #aaa;
            }
        }
    }
`

const ListItem = ({ name, avatarUrl, description='', onClick=function(){} }) => {
    return (
        <div className={`chat-list-item ${ focus ? 'focus' : ''}`} onClick={onClick}>
            <div className='avatar'></div>
            <div className='info'>
                <div className='name'>{name}</div>
                <div className='desc'>{description}</div>
            </div>
        </div>
    )
};

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func
};

export default memo(ListItem);