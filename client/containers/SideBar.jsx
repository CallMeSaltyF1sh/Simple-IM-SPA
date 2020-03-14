import React from 'react';
import { css } from 'astroturf';

const styles = css`
    .side-bar {
        position: relative;
        width: 96px;
        height: 100%;
        background-color: rgba(252,210,118,0.35);
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        box-shadow: 5px 0px 10px -5px #888;
        .avator {
            position: absolute;
            width: 62px;
            height: 62px;
            margin: 30px 0 0 17px;
            background-image: url('../assets/images/avators/lei.jpg');
            background-size: 100% 100%;
            box-sizing: border-box;
            border-radius: 50%;
            cursor: pointer;
        }
    }
`;

function SideBar() {
    return (
        <div className='side-bar'>
            <div className='avator'></div>
        </div>
    )
}

export default SideBar;
