import React from 'react';
import { PropTypes } from 'prop-types';
import { css } from 'astroturf';

const styles = css`
    .scroll-area {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
    }
`

const ScrollArea = ({ children }) => {
    return (
        <div className='scroll-area'>
            {children}
        </div>
    )
};

export default ScrollArea;