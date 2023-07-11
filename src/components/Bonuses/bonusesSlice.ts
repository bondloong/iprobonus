import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getBonusesInfo } from '../../utils/gettingData';
import { BonusesInfo } from '../../types';

export interface BonusesState {
	bonusesInfo: BonusesInfo | null;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: BonusesState = {
	status: 'loading',
	bonusesInfo: null
};

export const getBonusesInfoAsync = createAsyncThunk(
	'bonuses/fetchBonuses',
	async () => {
		const response = await getBonusesInfo();
		return response;
	}
);

export const bonusesSlice = createSlice({
	name: 'bonuses',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBonusesInfoAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getBonusesInfoAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.bonusesInfo = action.payload;
			})
			.addCase(getBonusesInfoAsync.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const selectBonusesInfo = (state: RootState) => state.bonuses.bonusesInfo;
export const selectBonusesStatus = (state: RootState) => state.bonuses.status;

export default bonusesSlice.reducer;
