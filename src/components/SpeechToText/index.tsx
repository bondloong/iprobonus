import React, { useEffect, useState } from 'react';
import { addSpeech } from './speechSlice';
import { useAppDispatch } from '../../app/hooks';
import './styles.scss';

type SpeechToTextProps = {
	lang?: string,
};


const SpeechToText: React.FC<SpeechToTextProps> = ({ lang = 'ru-RU' }) => {
	const dispatch = useAppDispatch();
	const [speech, setSpeech] = useState("");
	const [listening, setListening] = useState(false);
	const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

	useEffect(() => {
		const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

		if (SpeechRecognition) {
			const recognitionInstance = new SpeechRecognition();
			recognitionInstance.lang = lang;
			recognitionInstance.interimResults = false;
			recognitionInstance.continuous = true;

			recognitionInstance.onresult = (event: any) => {
				let current = event.resultIndex;
				let transcript = event.results[current][0].transcript;

				let words: string[] = transcript.split(' ');
				words = words.map(word => `${word} ${Math.floor(Math.random() * 9)}`);
				const sentence = words.join(' ');

				setSpeech((prevSpeech) => `${prevSpeech} ${sentence}`);
				dispatch(addSpeech(sentence));
			};

			recognitionInstance.onstart = () => {
				setListening(true);
			};

			recognitionInstance.onend = () => {
				setListening(false);
			};

			setRecognition(recognitionInstance);
		} else {
			console.error('Speech Recognition API не поддерживается вашим браузером.');
		}
	}, [lang, dispatch]);

	const toggleListening = () => {
		if (listening) {
			recognition?.stop();
		} else {
			recognition?.start();
		}
	}

	const clearSpeech = () => {
		setSpeech('')
	}
	return (
		<div className="speech-to-text">
			<p className="speech-to-text__content">{speech || (listening && <span className='speech-to-text__status'>Записываю...</span>) || 'Ожидаю ваш красивый голос'}</p>
			<div className='speech-to-text__btn-wrapper'>
				<button className="speech-to-text__btn speech-to-text__btn--toggle" onClick={toggleListening}>
					{listening ? 'Стоп' : 'Старт'}
				</button>
				{speech && !listening && (
					<button className="speech-to-text__btn speech-to-text__btn--clear" onClick={clearSpeech}>Очистить</button>
				)}
			</div>
		</div>

	);
};

export default SpeechToText;
