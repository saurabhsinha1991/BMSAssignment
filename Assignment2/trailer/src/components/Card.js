import React from 'react';

const Card = ({ details, iframeClick }) => {
    return (
        <div className='movie-wrapper' onClick={() => iframeClick(details.EventCode)}>
            <img src={`https://in.bmscdn.com/iedb/movies/images/mobile/listing/large/${details.EventImageCode}.jpg`} />
            <span className='rating'>{ details.wtsPerc } %</span>
        </div>
    );
};

export default Card;