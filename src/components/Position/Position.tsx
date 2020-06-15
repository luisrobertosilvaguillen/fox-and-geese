import React, { useState, useEffect, useCallback } from 'react';
import { Motion, spring } from 'react-motion';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Position.module.scss';
import positionStatus from '../../models/position/positionStatus';
import positionCorner from '../../models/position/positionCorner';
import PositionCoordinates from '../../models/position/positionCoordinates';

import * as actions from "../../store/actions/index";

interface Props {
    coordinates: PositionCoordinates,
    status: positionStatus,
    selected: boolean,
    selectable: boolean,
    isGoalPosition: boolean,
    corner: positionCorner
}



const Position = (props: Props) => {

  const {status, coordinates, corner, selected, isGoalPosition, selectable} = props;
  let classesDiv : string[] = [classes.PositionFree];

    if(isGoalPosition)
      classesDiv.push(classes.PositionGoalBg);

    if(status === positionStatus.AvailableToMove || status === positionStatus.AvailableToEat)
      classesDiv = [classes.PositionAvailableToMove];

    switch(corner){
      case positionCorner.TopLeft:
        classesDiv.push(classes.CornerTopLeft);
        break;
      case positionCorner.TopRight:
        classesDiv.push(classes.CornerTopRight);        
        break;
      case positionCorner.BottomLeft:
        classesDiv.push(classes.CornerBottomLeft);
        break;
      case positionCorner.BottomRight:
        classesDiv.push(classes.CornerBottomRight);        
        break;        
    }

    
    const turn: positionStatus = useSelector(state => state.board.turn);
    const dispatch = useDispatch();

    const onSelectPosition = useCallback(() => {
      if(turn === status && !selected && selectable)
        dispatch(actions.selectPosition(coordinates, status))
    }, [turn, dispatch, coordinates, status, selected, selectable]);
    
    const onSelectAvailablePosition = useCallback(() => {
      if([positionStatus.AvailableToMove, positionStatus.AvailableToEat].includes(status)) {
        dispatch(actions.moveToAvailabletPosition(coordinates, status))
      }
    }, [status, coordinates, dispatch]);



    let drawToken = () => {
      
      if([positionStatus.Free, positionStatus.AvailableToMove, positionStatus.AvailableToEat].includes(status)) 
        return null;

      const classesToken = [status === positionStatus.Fox ? classes.PositionFox: classes.PositionHen];
      if(selected)
        classesToken.push(classes.Selected)
      
        return (
        <div onClick={onSelectPosition}
          className={classesToken.join(' ')}>
        </div>
      );
    }

    return (
        <div onClick={onSelectAvailablePosition} className={classesDiv.join(' ')}>
          {drawToken()}
        </div>
    );
}
export default React.memo(Position);
