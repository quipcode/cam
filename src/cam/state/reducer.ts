import { Cam, CamState, initialCamState, CamColor, initialCamColorState, CamColorState } from './state';
import {
    ActionType,
    AddCam,
    SetCamColor,
    CamActions,
    CamColorActions
} from './actions';

// export function camColorReducer(state: CamColorState, action: CamColorActions) : CamColorActions {
//     switch (action.type) {
//         case ActionType.SetColor:
//             return{...state, colors: [action.payload, ...state.colors]}
//         default:
//             return state;
//     }
// }

// export function camReducer(state: CamState, action: CamActions): CamActions {
//     switch (action.type) {
//         case ActionType.AddCam:
//             return { ...state, cams: [action.payload, ...state.cams] };
//         default:
//             return state;
//     }
// }



// const getWinner = (players: Player[]): Player | null => {
//     let winnerValue = 0;
//     let winner = null;
//     players.forEach((player) => {
//         if (player.value && player.value > winnerValue) {
//             winner = player;
//             winnerValue = player.value || 0;
//         }
//     });
//     return winner;
// };

// const getGameStatus = (state: GameState): Status => {
//     const totalPlayers = state.players.length;
//     let numberOfPlayersPlayed = 0;
//     state.players.forEach((player) => {
//         if (player.status === Status.Finished) {
//             numberOfPlayersPlayed++;
//         }
//     });
//     if (numberOfPlayersPlayed === 0) {
//         return Status.NotStarted;
//     }
//     if (totalPlayers === numberOfPlayersPlayed) {
//         return Status.Finished;
//     }
//     return Status.InProgress;
// };

// helper functions to simplify the caller
// export const addPlayer = (player: Player): AddPlayer => ({
//     type: ActionType.AddPlayer,
//     payload: player,
// });

// export const setPlayerValue = (id: number, value: number): SetPlayerValue => ({
//     type: ActionType.SetPlayerValue,
//     payload: { id, value },
// });

// export const resetGame = (): ResetGame => ({
//     type: ActionType.ResetGame,
// });
