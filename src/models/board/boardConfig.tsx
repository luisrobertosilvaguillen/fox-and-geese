import PositionRows from "../position/positionRows";
import PositionsHomologous from "../position/positionsHomologous";
import BoardMovementConfig from "./boardMovementConfig";

export default interface BoardConfig {
    rows: PositionRows[],
    positionsHomologous: PositionsHomologous[],
    movementConfig: BoardMovementConfig[]
}