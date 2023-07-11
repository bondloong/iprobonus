import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bonusesReducer from '../components/Bonuses/bonusesSlice';
import speechSlice from '../components/SpeechToText/speechSlice';

export const store = configureStore({
  reducer: {
    bonuses: bonusesReducer,
    speech: speechSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
