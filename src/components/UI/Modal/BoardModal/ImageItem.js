import React from 'react';

const ImageItem = (props) => {
    return (
        <div className={[
            "board-modal-add-image-item",
            props.current === props.name ? "board-modal-add-image-item-selected" : null
        ].join(' ')}
             onClick={() => props.change(props.name)}>
            <img src={"/images/" + props.name} alt={props.name}/>
        </div>
    );
};

export default ImageItem;