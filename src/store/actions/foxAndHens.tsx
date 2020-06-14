import * as actionTypes from './actionTypes';
import PositionCoordinates from '../../models/position/positionCoordinates';
import positionStatus from '../../models/position/positionStatus';

export const selectPosition = (coordinates: PositionCoordinates, status: positionStatus) => {
    return {
        type: actionTypes.SELECT_POSITION,
        payload: {
            coordinates,
            status
        }
    };
};

export const moveToAvailabletPosition = (coordinates: PositionCoordinates, status: positionStatus) => {
    return {
        type: actionTypes.MOVE_TO_AVAILABLE_POSITION,
        payload: {
            coordinates,
            status
        }
    };
};