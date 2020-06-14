import React from 'react';

import classes from './GameRoom.module.scss';
import Board from '../Board/Board';



const GameRoom = props => {
    return <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <Board />
                    </div>
                </div>
           </div>
}

export default GameRoom;