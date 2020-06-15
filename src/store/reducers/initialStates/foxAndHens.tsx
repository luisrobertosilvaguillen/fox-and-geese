import PMO  from '../../../models/position/positionMovementOption';
import Position from '../../../models/position/position';
import positionStatus from '../../../models/position/positionStatus';
import BoardConfig from '../../../models/board/boardConfig';
import PositionCoordinates from '../../../models/position/positionCoordinates';
import BoardState from '../../../models/board/boardState';

/*
            -------------    --------------> ROW 0
            | \   |   / |
            |   \ | /   |
            -------------    --------------> ROW 1
            |   / | \   |
            | /   |   \ |
-------------------------------------   ---> ROW 2
| \   |   / | \   |   / | \   |   / |
|   \ | /   |   \ | /   |   \ | /   |
-------------------------------------   ---> ROW 3
|   / | \   |   / | \   |   / | \   |
| /   |   \ | /   |   \ | /   |   \ |
-------------------------------------   ---> ROW 4
            | \   |   / |
            |   \ | /   |
            -------------    --------------> ROW 5
            |   / | \   |
            | /   |   \ |       
            -------------    --------------> ROW 6
*/
const coordinates: PositionCoordinates[] = [
    {row: 0, position: 0},
    {row: 0, position: 1},
    {row: 0, position: 2},
    {row: 1, position: 0},
    {row: 1, position: 1},
    {row: 1, position: 2},
    {row: 2, position: 0},
    {row: 2, position: 1},
    {row: 2, position: 2},
    {row: 2, position: 3},
    {row: 2, position: 4},
    {row: 2, position: 5},
    {row: 2, position: 6},
    {row: 3, position: 0},
    {row: 3, position: 1},
    {row: 3, position: 2},
    {row: 3, position: 3},
    {row: 3, position: 4},
    {row: 3, position: 5},
    {row: 3, position: 6},
    {row: 4, position: 0},
    {row: 4, position: 1},
    {row: 4, position: 2},
    {row: 4, position: 3},
    {row: 4, position: 4},
    {row: 4, position: 5},
    {row: 4, position: 6},
    {row: 5, position: 0},
    {row: 5, position: 1},
    {row: 5, position: 2},
    {row: 6, position: 0},
    {row: 6, position: 1},
    {row: 6, position: 2},
];

const boardConfig: BoardConfig = {
    rows: [
        { row: 0, length: 3 },
        { row: 1, length: 3 },
        { row: 2, length: 6 },
        { row: 3, length: 6 },
        { row: 4, length: 6 },
        { row: 5, length: 3 },
        { row: 6, length: 3 },
    
    ],
    positionsHomologous: [
        {
            up: coordinates[3],
            down: coordinates[8]
        },        
        {
            up: coordinates[4],
            down: coordinates[9]
        },        
        {
            up: coordinates[5],
            down: coordinates[10]
        },
        {
            up: coordinates[22],
            down: coordinates[27]
        },
        {
            up: coordinates[23],
            down: coordinates[28]
        },
        {
            up: coordinates[24],
            down: coordinates[29]
        }
    ],
    movementConfig: [
        {
            coordinates: coordinates[0],
            movementOptions: [PMO.Right, PMO.Down, PMO.DownRight]
        },
        {
            coordinates: coordinates[1],
            movementOptions: [PMO.Left, PMO.Right, PMO.Down]
        },        
        {
            coordinates: coordinates[2],
            movementOptions: [PMO.Left, PMO.Down, PMO.DownLeft]
        },        
        {
            coordinates: coordinates[3],
            movementOptions: [PMO.Up, PMO.Down, PMO.Right]
        },        
        {
            coordinates: coordinates[4],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.DownLeft, PMO.UpLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[5],
            movementOptions: [PMO.Down, PMO.Up, PMO.Left]
        },        
        {
            coordinates: coordinates[6],
            movementOptions: [PMO.Right, PMO.Down]
        },        
        {
            coordinates: coordinates[7],
            movementOptions: [PMO.Left, PMO.Down, PMO.Right]
        },        
        {
            coordinates: coordinates[8],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.DownLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[9],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right]
        },        
        {
            coordinates: coordinates[10],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.DownLeft, PMO.UpLeft]
        },        
        {
            coordinates: coordinates[11],
            movementOptions: [PMO.Left, PMO.Down, PMO.Right]
        },        
        {
            coordinates: coordinates[12],
            movementOptions: [PMO.Left, PMO.Down, PMO.DownLeft]
        },        
        {
            coordinates: coordinates[13],
            movementOptions: [PMO.Right, PMO.Down, PMO.Up]
        },       
        {
            coordinates: coordinates[14],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.DownLeft, PMO.UpLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[15],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right]
        },        
        {
            coordinates: coordinates[16],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.DownLeft, PMO.UpLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[17],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right]
        },        
        {
            coordinates: coordinates[18],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.DownLeft, PMO.UpLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[19],
            movementOptions: [PMO.Left, PMO.Down, PMO.Up]
        },        
        {
            coordinates: coordinates[20],
            movementOptions: [PMO.Right, PMO.UpRight, PMO.Up]
        },        
        {
            coordinates: coordinates[21],
            movementOptions: [PMO.Right, PMO.Left, PMO.Up]
        },        
        {
            coordinates: coordinates[22],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.UpLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[23],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right]
        },        
        {
            coordinates: coordinates[24],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownLeft, PMO.UpLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[25],
            movementOptions: [PMO.Right, PMO.Left, PMO.Up]
        },        
        {
            coordinates: coordinates[26],
            movementOptions: [PMO.UpLeft, PMO.Left, PMO.Up]
        },        
        {
            coordinates: coordinates[27],
            movementOptions: [PMO.Right, PMO.Down, PMO.Up]
        },        
        {
            coordinates: coordinates[28],
            movementOptions: [PMO.Up, PMO.Down, PMO.Left, PMO.Right, PMO.DownRight, PMO.DownLeft, PMO.UpLeft, PMO.UpRight]
        },        
        {
            coordinates: coordinates[29],
            movementOptions: [PMO.Left, PMO.Down, PMO.Up]
        },        
        {
            coordinates: coordinates[30],
            movementOptions: [PMO.Right, PMO.UpRight, PMO.Up]
        },        
        {
            coordinates: coordinates[31],
            movementOptions: [PMO.Right, PMO.Left, PMO.Up]
        },        
        {
            coordinates: coordinates[32],
            movementOptions: [PMO.Left, PMO.UpLeft, PMO.Up]
        }
    ]
};

const positions: Position[] = [
    //ROW 0
    new Position(coordinates[0], positionStatus.Free, false, true, true),
    new Position(coordinates[1], positionStatus.Free, false, true, true),
    new Position(coordinates[2], positionStatus.Free, false, true, true),
    //ROW 1
    new Position(coordinates[3], positionStatus.Free, false, true, true),
    new Position(coordinates[4], positionStatus.Free, false, true, true),
    new Position(coordinates[5], positionStatus.Free, false, true, true),
    //ROW 2
    new Position(coordinates[6]),
    new Position(coordinates[7]),
    new Position(coordinates[8], positionStatus.Fox, false, true, true),
    new Position(coordinates[9], positionStatus.Free, false, true, true),
    new Position(coordinates[10], positionStatus.Fox, false, true, true),
    new Position(coordinates[11]),
    new Position(coordinates[12]),
    //ROW 3
    new Position(coordinates[13], positionStatus.Hen),
    new Position(coordinates[14], positionStatus.Hen),
    new Position(coordinates[15], positionStatus.Hen),
    new Position(coordinates[16], positionStatus.Hen),
    new Position(coordinates[17], positionStatus.Hen),
    new Position(coordinates[18], positionStatus.Hen),
    new Position(coordinates[19], positionStatus.Hen),    
    //ROW 4
    new Position(coordinates[20], positionStatus.Hen),
    new Position(coordinates[21], positionStatus.Hen),
    new Position(coordinates[22], positionStatus.Hen),
    new Position(coordinates[23], positionStatus.Hen),
    new Position(coordinates[24], positionStatus.Hen),
    new Position(coordinates[25], positionStatus.Hen),
    new Position(coordinates[26], positionStatus.Hen),     
    //ROW 5
    new Position(coordinates[27], positionStatus.Hen),
    new Position(coordinates[28], positionStatus.Hen),
    new Position(coordinates[29], positionStatus.Hen),
    //ROW 6
    new Position(coordinates[30], positionStatus.Hen),
    new Position(coordinates[31], positionStatus.Hen),
    new Position(coordinates[32], positionStatus.Hen),       
];


const opponents = {
    hens: {
        status: positionStatus.Hen,
        quantity: 20,
        henHouseCoordinates: [
            coordinates[0],
            coordinates[1],
            coordinates[2],
            coordinates[3],
            coordinates[4],
            coordinates[5],
            coordinates[8],
            coordinates[9],
            coordinates[10]
        ]
    },
    foxes: {
        status: positionStatus.Fox,
        quantity: 2
    }
};
const winner: positionStatus = null;

const boardState: BoardState = {
    positionSelected: null,
    positionFoxToLock: null,
    positionsToEat: []
}

const initialState = {
    turn: opponents.hens.status,
    positions,
    opponents,
    winner,
    boardConfig,
    boardState
};

export default initialState;