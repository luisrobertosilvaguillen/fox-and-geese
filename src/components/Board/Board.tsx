//Libraries Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
//Css
import classes from './Board.module.scss';
//Project Dependencies
import Square from '../Square/Square';
import MiniSquare from '../MiniSquare/MiniSquare';
import border from '../../models/square/border';


const Board = props => {

    const baseClasses = [classes.Base, 'd-flex', 'align-items-center', 'justify-content-center'];
    const rowClasses = [classes.Row, 'd-flex', 'justify-content-center']; 

    const boardState = useSelector(state => state.board);
    return <div className={baseClasses.join(' ')}>
                <div className={classes.Board}> 
                    {/* ROW 1 */}
                    <div className={rowClasses.join(' ')}>
                        <Square>
                            <MiniSquare 
                                diagonalLeft
                                borders= {[border.Left, border.Bottom, border.Right, border.Top]}
                                positionTopLeft={boardState.positions[0]}
                                positionTopRight={boardState.positions[1]}
                            />
                            <MiniSquare 
                                borders= {[border.Right, border.Top, border.Bottom]}
                                positionTopRight={boardState.positions[2]}
                            />
                        </Square>
                    </div>
                    {/* ROW 2 */}
                    <div className={rowClasses.join(' ')}>
                        <Square>
                            <MiniSquare 
                                borders= {[border.Left, border.Right]}
                                positionTopLeft={boardState.positions[3]}
                                positionTopRight={boardState.positions[4]}
                            />
                            <MiniSquare 
                                diagonalLeft
                                borders= {[border.Right]}
                                positionTopRight={boardState.positions[5]}
                            />
                        </Square>
                    </div>
                    {/* ROW 3 */}
                    <div className={rowClasses.join(' ')}>
                        <Square>
                            <MiniSquare 
                                diagonalLeft
                                borders= {[border.Left, border.Right, border.Top]}
                                positionTopLeft={boardState.positions[6]}
                                positionTopRight={boardState.positions[7]}
                            />
                            <MiniSquare 
                                borders= {[border.Right, border.Top]}
                                positionTopRight={boardState.positions[8]}
                            />
                        </Square>

                        <Square>
                            <MiniSquare 
                                diagonalLeft
                                borders= {[border.Right, border.Top]}
                                positionTopRight={boardState.positions[9]}
                            />
                            <MiniSquare 
                                borders= {[border.Right, border.Top]}
                                positionTopRight={boardState.positions[10]}
                            />
                        </Square>

                        <Square>
                            <MiniSquare 
                                diagonalLeft
                                borders= {[border.Right, border.Top]}
                                positionTopRight={boardState.positions[11]}
                            />
                            <MiniSquare 
                                borders= {[border.Right, border.Top]}
                                positionTopRight={boardState.positions[12]}
                            />
                        </Square>
                    </div>
                    {/* ROW 4 */}
                    <div className={rowClasses.join(' ')}>
                        <Square>
                            <MiniSquare
                                borders= {[border.Left, border.Bottom, border.Right, border.Top]}
                                positionTopLeft={boardState.positions[13]}
                                positionBottomLeft={boardState.positions[20]}
                                positionTopRight={boardState.positions[14]}
                                positionBottomRight={boardState.positions[21]}
                            />
                            <MiniSquare
                                diagonalLeft
                                borders= {[border.Bottom, border.Right, border.Top]}
                                positionTopRight={boardState.positions[15]}
                            />
                        </Square>

                        <Square>
                            <MiniSquare 
                                borders= {[border.Bottom, border.Right, border.Top]}
                                positionTopRight={boardState.positions[16]}
                            />
                            <MiniSquare 
                                diagonalLeft
                                borders= {[border.Bottom, border.Right, border.Top]}
                                positionTopRight={boardState.positions[17]}
                            />
                        </Square>

                        <Square>
                            <MiniSquare
                                borders= {[border.Bottom, border.Right, border.Top]}
                                positionTopRight={boardState.positions[18]}
                            />
                            <MiniSquare
                                diagonalLeft
                                borders= {[border.Bottom, border.Right, border.Top]}
                                positionBottomLeft={boardState.positions[25]}
                                positionTopRight={boardState.positions[19]}
                                positionBottomRight={boardState.positions[26]}
                            />
                        </Square>
                    </div>
                    {/* ROW 5 */}
                    <div className={rowClasses.join(' ')}>
                        <Square>
                            <MiniSquare 
                                diagonalLeft
                                borders= {[border.Left, border.Right]}
                                positionTopLeft={boardState.positions[22]}
                                positionTopRight={boardState.positions[23]}
                            />
                            <MiniSquare
                                borders= {[border.Right]}
                                positionTopRight={boardState.positions[24]}
                            />
                        </Square>
                    </div>
                    {/* ROW 6 */}
                    <div className={rowClasses.join(' ')}>
                        <Square>
                            <MiniSquare
                                borders= {[border.Left, border.Bottom, border.Right, border.Top]}
                                positionTopLeft={boardState.positions[27]}
                                positionBottomLeft={boardState.positions[30]}
                                positionTopRight={boardState.positions[28]}
                                positionBottomRight={boardState.positions[31]}
                            />
                            <MiniSquare
                                diagonalLeft
                                borders= {[border.Bottom, border.Right, border.Top]}
                                positionTopRight={boardState.positions[29]}
                                positionBottomRight={boardState.positions[32]} 
                            />
                        </Square>
                    </div>
                </div>
           </div>
}


export default React.memo(Board);