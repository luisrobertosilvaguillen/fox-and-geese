import positionMovementOption from './positionMovementOption';
import positionStatus from './positionStatus';
import PositionCoordinates from './positionCoordinates';
import BoardConfig from '../board/boardConfig';
import PositionsHomologous from './positionsHomologous';
import BoardMovementConfig from '../board/boardMovementConfig';
import positionAlternativesToMove from './positionAlternativesToMove';

export default class Position {
    coordinates: PositionCoordinates;
    status: positionStatus;
    selected: boolean;
    selectable: boolean;
    isGoalPosition: boolean;

    constructor(coordinates: PositionCoordinates, 
        status: positionStatus = positionStatus.Free,
        selected: boolean = false, 
        selectable: boolean = true,
        isGoalPosition: boolean = false) {
           this.coordinates = coordinates;
           this.status = status; 
           this.selected = selected; 
           this.selectable = selectable;
           this.isGoalPosition = isGoalPosition; 
        }

    getPositions(boardConfig: BoardConfig, status?: positionStatus, coordinates?: PositionCoordinates): positionAlternativesToMove[] {
        status = status ? status : this.status;
        coordinates = coordinates ? coordinates : this.coordinates;

        const movementOptions = this.getMovementOptions(boardConfig, status, coordinates);
        let toMove = this.calcPositionCoordinates(boardConfig, coordinates, movementOptions);
        return toMove.map((coordinatesToMove) => {
            return {
                toMove: coordinatesToMove,
                toEat: status === positionStatus.Fox ? this.calcPositionAlternativesToEat(boardConfig, coordinates, coordinatesToMove) : null
            }
        });
    }


    calcPositionCoordinates(boardConfig: BoardConfig,  coordinates: PositionCoordinates,
        positionMovementOptions: positionMovementOption[]): PositionCoordinates[] {
        const positionsToMove: PositionCoordinates[] = [];
        positionMovementOptions.forEach(
            (option: positionMovementOption) => {
                let newCoordinate: PositionCoordinates;
                switch(option) {
                    case positionMovementOption.Left:
                        newCoordinate = {
                            row: coordinates.row, 
                            position: (coordinates.position - 1)
                        };
                        break;
                    case positionMovementOption.Right:
                        newCoordinate = {
                            row: coordinates.row, 
                            position: (coordinates.position + 1)
                        };
                        break;
                    case positionMovementOption.Up:                 
                        newCoordinate = {
                            row: (coordinates.row - 1), 
                            position: this.calcPositionHomologousUp(boardConfig.positionsHomologous, coordinates)
                        };
                        break;
                    case positionMovementOption.Down:
                        newCoordinate = {
                            row: (coordinates.row + 1), 
                            position: this.calcPositionHomologousDown(boardConfig.positionsHomologous, coordinates)
                        };
                        break;                        
                    case positionMovementOption.UpLeft:
                        newCoordinate = {
                            row: (coordinates.row - 1), 
                            position: (this.calcPositionHomologousUp(boardConfig.positionsHomologous, coordinates) - 1)
                        };
                        break;
                    case positionMovementOption.UpRight:
                        newCoordinate = {
                            row: (coordinates.row - 1), 
                            position: (this.calcPositionHomologousUp(boardConfig.positionsHomologous, coordinates) + 1)
                        };
                        break;
                    case positionMovementOption.DownLeft:
                        newCoordinate = {
                            row: (coordinates.row + 1), 
                            position: (this.calcPositionHomologousDown(boardConfig.positionsHomologous, coordinates) - 1)
                        };
                        break;
                    case positionMovementOption.DownRight:
                        newCoordinate = {
                            row: (coordinates.row + 1), 
                            position: (this.calcPositionHomologousDown(boardConfig.positionsHomologous, coordinates) + 1)
                        };
                        break;                        
                }
                if(this.checkIsValidPositions(boardConfig, newCoordinate))
                    positionsToMove.push(newCoordinate);
            }
        )        
        return positionsToMove;
    }
    checkIsValidPositions(boardConfig: BoardConfig, coordinates: PositionCoordinates): Boolean{
        return coordinates.position >= 0 && coordinates.row >= 0 
        && coordinates.row < boardConfig.rows.length
        && coordinates.position <= boardConfig.rows[coordinates.row].length;
    }
    calcPositionHomologousUp(positionsHomologous: PositionsHomologous[], coordinates: PositionCoordinates): number {
        const havePositionHomologous = positionsHomologous.find(pH => pH.down.row === coordinates.row &&
            pH.down.position === coordinates.position);
        if(havePositionHomologous)
            return havePositionHomologous.up.position;
            
        return coordinates.position;
    }

    calcPositionHomologousDown(positionsHomologous: PositionsHomologous[], coordinates: PositionCoordinates): number {
        const havePositionHomologous = positionsHomologous.find(pH => pH.up.row === coordinates.row &&
            pH.up.position === coordinates.position);
        if(havePositionHomologous)
            return havePositionHomologous.down.position;

        return coordinates.position;
    }

    getMovementOptions(boardConfig: BoardConfig, status: positionStatus, coordinates: PositionCoordinates): positionMovementOption[] {
        const movementConfig =  boardConfig.movementConfig.find((movementConfig) => (
            movementConfig.coordinates.row === coordinates.row && 
            movementConfig.coordinates.position === coordinates.position
        ));
        switch(status){
            case positionStatus.Fox:
                return movementConfig.movementOptions;
                // return this.getMovementOptionsForFox(boardConfig, coordinates);
            case positionStatus.Geese:
            case positionStatus.Hen:
                return this.getMovementOptionsForGeeseOrHens(boardConfig, movementConfig);
        }
    }
    getMovementOptionsForFox(boardConfig: BoardConfig, movementConfig: BoardMovementConfig): positionMovementOption[] {
        return movementConfig.movementOptions;
    }
    getMovementOptionsForGeeseOrHens(boardConfig: BoardConfig, movementConfig: BoardMovementConfig): positionMovementOption[] {
        return movementConfig.movementOptions.filter((movementOption: positionMovementOption) => {
            if(this.coordinates.row > 1)
                return movementOption !== positionMovementOption.Down &&
                        movementOption !== positionMovementOption.DownLeft &&
                        movementOption !== positionMovementOption.DownRight;
            else 
                return true;
        });
    }
    calcPositionAlternativesToEat(boardConfig: BoardConfig, coordinates: PositionCoordinates,
        coordinatesToMove: PositionCoordinates): PositionCoordinates {

        const movementOptions= [this.calcPositionPerspective(boardConfig, coordinates, coordinatesToMove)];
        const coordinatesToEat: PositionCoordinates[] = this.calcPositionCoordinates(boardConfig, 
            coordinatesToMove, movementOptions);

        if(coordinatesToEat.length > 0)
           return coordinatesToEat[0];

        return null;
    }

    calcPositionToBeEated(boardConfig: BoardConfig, coordinatesFrom: PositionCoordinates, 
        coordinatesTo: PositionCoordinates): PositionCoordinates {
        const movementOptions= [this.calcPositionPerspective(boardConfig, coordinatesFrom, coordinatesTo)];
        const coordinatesToBeEated = this.calcPositionCoordinates(boardConfig, coordinatesFrom, movementOptions);

        return coordinatesToBeEated[0];
    }


    calcPositionPerspective(boardConfig: BoardConfig, coordinatesFrom: PositionCoordinates, 
        coordinatesTo: PositionCoordinates): positionMovementOption {
            if(coordinatesTo.row < coordinatesFrom.row){
                const position = this.calcPositionHomologousUp(boardConfig.positionsHomologous, coordinatesFrom);
                if(coordinatesTo.position > position)
                    return positionMovementOption.UpRight;
                else if(coordinatesTo.position < position) 
                    return positionMovementOption.UpLeft;
                else
                    return positionMovementOption.Up;
            }
            else if(coordinatesTo.row > coordinatesFrom.row){
                const position = this.calcPositionHomologousDown(boardConfig.positionsHomologous, coordinatesFrom);
                if(coordinatesTo.position > position)
                    return positionMovementOption.DownRight;
                else if(coordinatesTo.position < position) 
                    return positionMovementOption.DownLeft;
                else
                    return positionMovementOption.Down;
            }
            else{
                if(coordinatesTo.position > coordinatesFrom.position)
                    return positionMovementOption.Right;
                else
                    return positionMovementOption.Left;
            }
    }
    itsSamePosition(coordinates: PositionCoordinates): boolean {
        return this.coordinates.row === coordinates.row && this.coordinates.position === coordinates.position;
    }
}