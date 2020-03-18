import React from 'react';
import { css } from 'astroturf';

const styles = css`
    .styled-button {
        width: 100%;
        height: 32px;
        border-radius: 20px;
        border: 0;
        outline: none;
        color: #efefef;
        cursor: pointer;
        transition: all .3s;
        &:hover {
            background: #a3857d !important;
        }
    }
`

const Button = ({ style, btnTxt }) => {
    return (
        <button className='styled-button' style={{...style}}>
            {btnTxt}
        </button>
    )
};

export default Button;