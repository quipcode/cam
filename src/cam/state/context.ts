import React from 'react';
import { CamState, initialCamState } from './state';
import { CamActions } from './actions';

export const CamContext = React.createContext<{
    state: CamState;
    dispatch: React.Dispatch<CamActions>;
}>({
    state: initialCamState,
    dispatch: () => undefined,
});
