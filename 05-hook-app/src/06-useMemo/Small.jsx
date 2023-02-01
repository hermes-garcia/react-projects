import {memo} from 'react';

export const Small = memo(({value}) => {
    console.log("I was re render");
    return (
        <small>{ value }</small>
    );
});