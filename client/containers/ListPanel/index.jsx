import React, { useState, useRef, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import SearchBox from '@/components/SearchBox';
import DialogItem from '@/components/DialogItem';
import LinkmanItem from '@/components/LinkmanItem';
import { changeCGModalDisplay } from '../CreateGroupModal/store/actions';
import { setTargetType, setTargetInfo } from '../ChatPanel/store/actions';

const styles = css`
    .list-panel {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 270px;
        min-width: 255px;
        max-width: 270px;
        height: 100%;
        background: rgba(245,245,245,0.3);
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
            .placeholder {
                margin: 16px 18px;
                color: #ad876e;
                font-size: 18px;
            }
        }
        .chat-list-wrapper {
            flex: 1;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 0;
            }
        }
    }
`;

/*
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
    },
    
];
*/

const ListPanel = (props) => {
    const { itemType, friends, groups, dialogs, isLogin } = props;
    const { changeCGModalDisplay, changeItemType } = props;
    const { setTargetInfo } = props;
    
    const friendsJS = friends ? friends.toJS() : [];
    const groupsJS = groups ? groups.toJS() : [];
    const dialogsJS = dialogs ? dialogs.toJS() : [];

    const [list, setList] = useState([]);
    
    const Item = itemType === 'dialog' ? DialogItem : LinkmanItem;

    const handleAdd = () => {
        changeCGModalDisplay(true);
    };

    const handleClick = (item,e) => {
        console.log(item);
        setTargetInfo(item);
    }

    useEffect(() => {
        switch(itemType) {
            case 'friend': 
                setList(friendsJS);
                break;
            case 'group':
                setList(groupsJS);
                break;
            case 'dialog':
            default: 
                setList(dialogsJS.sort((a,b) => 
                    new Date(b.time) - new Date(a.time)
                ));
        }
    }, [groups, friends, dialogs, itemType]);

    //console.log(list)

    return (
        <div className='list-panel'>
            <div className='list-panel-top'>
                { isLogin && <SearchBox /> }
                { isLogin && <i className='iconfont add' onClick={handleAdd}>&#xe60b;</i> }
                { !isLogin && <div className='placeholder'>Dialog List</div> }
            </div>
            <div className='chat-list-wrapper'>
                {
                    list.map(item => {
                        let name = item.name ? item.name : item.nickname;
                        return (
                            <div key={item.type + item.id} onClick={handleClick.bind(this, item)}>
                                <Item {...item} name={name} />
                            </div>
                        ) 
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    itemType: state.getIn(['listPanel', 'itemType']),
    friends: state.getIn(['mainPanel', 'friends']),
    groups: state.getIn(['mainPanel', 'groups']),
    dialogs: state.getIn(['mainPanel', 'dialogs']),
    isLogin: state.getIn(['mainPanel', 'isLogin'])
});

export default connect(mapStateToProps, {
    changeCGModalDisplay,
    setTargetInfo
})(memo(ListPanel));
