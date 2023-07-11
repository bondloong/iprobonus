import { FC, useEffect } from 'react';
import './styles.scss';
import { ReactComponent as FireIcon } from '../../assets/fire.svg';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getBonusesInfoAsync, selectBonusesInfo, selectBonusesStatus } from './bonusesSlice';

const Bonuses: FC = () => {
	const bonusesInfo = useAppSelector(selectBonusesInfo);
	const bonusesStatus = useAppSelector(selectBonusesStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getBonusesInfoAsync())
	}, [dispatch]);

	return (
		<>
			{
				bonusesInfo && bonusesStatus === 'idle' && (
					<div className="bonuses">
						<div className="bonuses__info">
							<div className="bonuses__info-quantity">{bonusesInfo.currentQuantity} бонусов</div>
							<div className="bonuses__info-burning">
								<span className="bonuses__burning-date">{bonusesInfo.dateBurning} сгорит</span>
								<FireIcon />
								<span className="bonuses__burning-quantity">{bonusesInfo.forBurningQuantity} бонусов</span>
							</div>
						</div>
						<button className='bonuses__next-btn'><ArrowIcon /></button>
					</div>
				)
			}
		</>
	);
}

export default Bonuses;