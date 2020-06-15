import * as actionTypes from '../actions/actionTypes';
import initialState from './initialStates/foxAndHens'
import Position from '../../models/position/position';
import positionStatus from '../../models/position/positionStatus';
import BoardState from '../../models/board/boardState';

const selectPosition = (state: any, action: any) => {

    const {row, position: pos } = action.payload.coordinates;
    const positionSelected: Position = state.positions.find(
        (position: Position) => (position.coordinates.row === row && position.coordinates.position === pos)
    );
    let { boardState: boardStateUpdated } = state;
    const foxes = [];
    boardStateUpdated.positionSelected = positionSelected;
    boardStateUpdated.positionsToEat = [];

    const positionAlternatives= positionSelected.getPositions(state.boardConfig, action.payload.status);

    const updatedPositions = state.positions.map((position: Position) => {
        
        const {row: mapRow, position: mapPos } = position.coordinates;
        let { status, isGoalPosition, selectable } = position;
        let selected: boolean= false;

        //Checking if the current position is the selected position
        if(mapRow === row && mapPos === pos)
            selected = true;


        // Checking if the current position in an alternative to move
        const isAnAlternativeToMove = positionAlternatives.find(
            (posAltToMove) => (posAltToMove.toMove.row === mapRow && posAltToMove.toMove.position === mapPos)
        );

        if(position.status === positionStatus.AvailableToMove || position.status === positionStatus.AvailableToEat)
            status = positionStatus.Free;

        if(isAnAlternativeToMove && status === positionStatus.Free) 
            status = positionStatus.AvailableToMove;

        // Checking if the current position in an alternative to move for Eat (Just if it's a Fox and meets the requirements)
        const isAnAlternativeToEat = positionAlternatives.find(
            (posAltToMove) => (posAltToMove.toEat && posAltToMove.toEat.row === mapRow && 
                posAltToMove.toEat.position === mapPos)
        );

        if(isAnAlternativeToEat) {
            const positionToBeEated: Position = state.positions.find(
                (pos: Position) => (pos.itsSamePosition(isAnAlternativeToEat.toMove))
            );

            if(status === positionStatus.Free && positionToBeEated.status === positionStatus.Hen) {
                status = positionStatus.AvailableToEat;                
                boardStateUpdated.positionsToEat.push(position);
                boardStateUpdated.positionFoxToLock = positionSelected;
            }
        }

        ///Collecting other fox positions to analyze
        if(position.status === positionStatus.Fox && 
            !position.itsSamePosition(positionSelected.coordinates))
            foxes.push(position);

        return new Position({row: mapRow, position: mapPos}, status, selected, selectable, isGoalPosition);
    });

    
    if(positionSelected.status === positionStatus.Fox && boardStateUpdated.positionsToEat.length === 0)
        boardStateUpdated = checkOtherFoxes(boardStateUpdated, foxes, state);


        

    return {...state, positions: updatedPositions, boardState: boardStateUpdated};
}
const checkOtherFoxes = (boardState: BoardState, foxes: Position[], state: any): BoardState => {
    const boardStateUpdated = {...boardState};
    let positionFoxToLock = null;
    let positionsToEat = [];
    foxes.forEach((foxPosition) => {
        const anotherAlternativesToEat = getAlternativesToEat(foxPosition, state);
        if(anotherAlternativesToEat.length > 0) {
            positionFoxToLock = foxPosition;
            positionsToEat = anotherAlternativesToEat;
            return;
        }
    });
    boardStateUpdated.positionFoxToLock = positionFoxToLock;
    boardStateUpdated.positionsToEat = positionsToEat;
    return boardStateUpdated;
}
const canFoxesMove = (updatedPositions: Position[], state: any): Boolean => {
    const foxes = updatedPositions.filter((position: Position) => position.status === positionStatus.Fox);
    let totalPositionsAvailableToMove = 0;
    foxes.forEach((foxPosition) => {
        const positionAlternatives= foxPosition.getPositions(state.boardConfig, positionStatus.Fox);
        const positionsAvailableToMove = updatedPositions.filter((position: Position) => {
            const {row: mapRow, position: mapPos } = position.coordinates;
            const isAnAlternativeToMove = positionAlternatives.find(
                (posAltToMove) => (posAltToMove.toMove.row === mapRow && posAltToMove.toMove.position === mapPos)
            );
            if(isAnAlternativeToMove && position.status !== positionStatus.Hen && position.status !== positionStatus.Fox) 
                return true;

            const isAnAlternativeToEat = positionAlternatives.find(
                (posAltToMove) => (posAltToMove.toEat && posAltToMove.toEat.row === mapRow && 
                    posAltToMove.toEat.position === mapPos)
            );
    
            if(isAnAlternativeToEat) {
                const positionToBeEated: Position = updatedPositions.find(
                    (pos: Position) => (pos.itsSamePosition(isAnAlternativeToEat.toMove))
                );
    
                if(position.status === positionStatus.Free && positionToBeEated.status === positionStatus.Hen)
                    return true;
            }
            return false;
        });
        totalPositionsAvailableToMove += positionsAvailableToMove.length;
    });

    return totalPositionsAvailableToMove > 0;
}
const getAlternativesToEat = (position: Position, state: any): Position[] => {
    const positionAlternatives= position.getPositions(state.boardConfig, positionStatus.Fox);
    return state.positions.filter(position => {
        const {row: mapRow, position: mapPos } = position.coordinates;
        let { status } = position;

        const isAnAlternativeToEat = positionAlternatives.find(
            (posAltToMove) => (posAltToMove.toEat && posAltToMove.toEat.row === mapRow && posAltToMove.toEat.position === mapPos)
        );

        if(isAnAlternativeToEat) {
            const positionToBeEated: Position = state.positions.find(
                (pos: Position) => (pos.itsSamePosition(isAnAlternativeToEat.toMove))
            );

            if([positionStatus.Free, positionStatus.AvailableToMove, positionStatus.AvailableToEat].includes(status) && 
                positionToBeEated.status === positionStatus.Hen)
                return true;
        }
        return false;
    });

}
const moveToAvailabletPosition = (state: any, action: any) => {
    let { winner, opponents: opponentsUpdated, boardState: boardStateUpdated } = state;
    const {row, position: pos } = action.payload.coordinates;

    const positionDestination: Position = state.positions.find((position: Position) => (position.coordinates.row === row && position.coordinates.position === pos));
    let nextTurn = state.turn === positionStatus.Fox ? positionStatus.Hen : positionStatus.Fox;
    let positionEated: Position = null;
    let hensInHouse = 0;
    let lockFox = false;

    if(positionDestination.status === positionStatus.AvailableToEat){
        nextTurn = positionStatus.Fox;
        const positionAlternatives = boardStateUpdated.positionSelected.getPositions(state.boardConfig, nextTurn);
        
        const alternativesToEat = positionAlternatives.find(
            (positionAlternativesToMove) => (positionAlternativesToMove.toEat && 
                positionAlternativesToMove.toEat.row === positionDestination.coordinates.row && 
                positionAlternativesToMove.toEat.position === positionDestination.coordinates.position)
        );

        positionEated = state.positions.find(
            (position: Position) => (position.coordinates.row === alternativesToEat.toMove.row && 
            position.coordinates.position === alternativesToEat.toMove.position)
        );

        if(opponentsUpdated.foxes.quantity === 1) {
            opponentsUpdated.foxes.quantity += 1;
            console.log(1, "DAR MENSAJE QUE SE DEBE RE-COLOCAR AL ZORRO");
        }

        opponentsUpdated.hens.quantity -= 1;
        
        if(opponentsUpdated.hens.quantity < 9){
            winner = nextTurn;
            console.log(2, "DAR MENSAJE QUE GANARON LOS ZORROS - SE COMIERON A LAS SUFICIENTES GALLINAS");
        }
    }
    else {
        if(state.turn === positionStatus.Fox && boardStateUpdated.positionsToEat.length > 0) {
            opponentsUpdated.foxes.quantity -= 1;
            if(opponentsUpdated.foxes.quantity === 0){
                winner = nextTurn;
                console.log(3, "DAR MENSAJE QUE GANARON LAS GALLINAS - YA NO QUEAN ZORROS");
            } else {
                lockFox = true;
                console.log(4, "DAR MENSAJE QUE FUE PENALIZADO UN ZORRO");
            }
        }
    }
    const updatedPositions =  state.positions.map((position: Position) => {
        const {row: mapRow, position: mapPos } = position.coordinates;
        let { status, isGoalPosition, selectable } = position;
        
        const wasAvailableToMove = (position.status === positionStatus.AvailableToMove);
        const wasAvailableToEat = (position.status === positionStatus.AvailableToEat);
        const wasTheSelectedPosition =  boardStateUpdated.positionSelected.itsSamePosition({row: mapRow, position: mapPos});
        const wasThePositionEated = (positionEated && positionEated.itsSamePosition({row: mapRow, position: mapPos}));
        const isFoxLocked = lockFox && 
            (
                position.itsSamePosition(state.boardState.positionFoxToLock.coordinates) ||
                (
                    position.itsSamePosition(positionDestination.coordinates) && 
                    state.boardState.positionFoxToLock.itsSamePosition(state.boardState.positionSelected.coordinates)
                )
            );

        if(wasAvailableToMove || wasAvailableToEat || wasTheSelectedPosition || wasThePositionEated || isFoxLocked)
            status = positionStatus.Free;

        if(mapRow === row && mapPos === pos && !isFoxLocked)
            status = boardStateUpdated.positionSelected.status;

        const isHenInHouse = status === positionStatus.Hen && opponentsUpdated.hens.henHouseCoordinates.find(
            coordinates => (mapRow === coordinates.row && mapPos === coordinates.position)
        )

        if(isHenInHouse)
            hensInHouse += 1;

        selectable = true;
        if(positionEated && status === positionStatus.Fox && !positionDestination.itsSamePosition({row: mapRow, position: mapPos}))
            selectable = false;

        return new Position({row: mapRow, position: mapPos}, status, false, selectable, isGoalPosition);
    });
    
    if(hensInHouse === 9) {
        console.log(5, "DAR MENSAJE QUE GANARON LAS GALLINAS - LLEGARON AL GALLINERO");
    }

    if(state.turn === positionStatus.Hen && !canFoxesMove(updatedPositions, state))
        console.log(6, "DAR MENSAJE QUE GANARON LAS GALLINAS - LOS ZORROZ NO SE PUEDEN MOVER");

    boardStateUpdated.positionFoxToLock = null;
    boardStateUpdated.positionSelected = null;
    boardStateUpdated.positionsToEat = [];
    return {...state, opponents: opponentsUpdated, turn: nextTurn, positions: updatedPositions, boardState: boardStateUpdated};
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_POSITION:
            return selectPosition(state, action);
        case actionTypes.MOVE_TO_AVAILABLE_POSITION:
            return moveToAvailabletPosition(state, action);
        default:
            return state;
    }
};

export default reducer;