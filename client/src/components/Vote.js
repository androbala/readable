import React from 'react';
import IoIosArrowUp from 'react-icons/lib/io/ios-arrow-up';
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';

const Vote = (props) => {
    const { score, onVote, itemId } = props
    return (
        <div>
            <div className="vote-label">
                <span>Votes:</span>
            </div>
            <div className="vote-buttons">
                <button className="vote-button vote-button-up unstyled" onClick={() => onVote('upVote', itemId)}><IoIosArrowUp/></button>
                <div className="vote-score">{score}</div>
                <button className="vote-button vote-button-down unstyled" onClick={() => onVote('downVote', itemId)}><IoIosArrowDown/></button>
            </div>
        </div>
    )
}

export default Vote;
