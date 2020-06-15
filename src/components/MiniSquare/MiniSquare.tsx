import React from 'react';
import classes from './MiniSquare.module.scss';
import Position from '../Position/Position';
import border from '../../models/square/border';
import PotitionModel from '../../models/position/position';
import positionCorner from '../../models/position/positionCorner';

interface Props {
    diagonalLeft?: boolean,
    diagonalRight?: boolean,
    borders: border[],
    positionTopLeft?: PotitionModel,
    positionBottomLeft?: PotitionModel,
    positionTopRight?: PotitionModel,
    positionBottomRight?: PotitionModel
}

const MiniSquare = (props:Props) => {
    const classesDiv: string[] = [];

    if(props.diagonalLeft)
        classesDiv.push(classes.DiagonalLeft);
    else
        classesDiv.push(classes.DiagonalRight);

    let checkBorder = (border: border): boolean =>  props.borders.includes(border);

    if(checkBorder(border.Top))
        classesDiv.push(classes.BorderTop);

    if(checkBorder(border.Right))
        classesDiv.push(classes.BorderRight);        
   
    if(checkBorder(border.Bottom))
        classesDiv.push(classes.BorderBottom);

    if(checkBorder(border.Left))
        classesDiv.push(classes.BorderLeft);        


    return (
        <div className={classesDiv.join(' ')}>
            {props.positionTopLeft ? <Position {...props.positionTopLeft} corner={positionCorner.TopLeft} />  : null }
            {props.positionBottomLeft ? <Position {...props.positionBottomLeft } corner={positionCorner.BottomLeft}/>  : null }
            {props.positionTopRight ? <Position {...props.positionTopRight} corner={positionCorner.TopRight}/>  : null }
            {props.positionBottomRight ? <Position {...props.positionBottomRight} corner={positionCorner.BottomRight}/>  : null }
        </div>
    )
}

export default React.memo(MiniSquare);