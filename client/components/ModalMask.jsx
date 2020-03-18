import React from 'react';
import { css } from 'astroturf';

const styles = css`
    .modal-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-width: 850px;
        background: rgba(245, 245, 245, 0.5);
        z-index: 10;
    }
`

const ModalMask = ( { children }) => {
    return (
        <div className='modal-mask'>
            { children }
        </div>
    )
}

export default ModalMask;