import PositionCoordinates from "../position/positionCoordinates";
import positionMovementOption from "../position/positionMovementOption";

export default interface BoardMovementConfig {
   coordinates: PositionCoordinates,
   movementOptions: positionMovementOption[]
}