import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface SpeechState {
	value: string;
}

const initialState: SpeechState = {
	value: '',
};

export const speechSlice = createSlice({
	name: 'speech',
	initialState,
	reducers: {
		addSpeech: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const { addSpeech } = speechSlice.actions;

export const selectSpeech = (state: RootState) => state.speech.value;

export default speechSlice.reducer;
