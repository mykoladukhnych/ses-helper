import { Provider } from 'react-redux';
import store from './app/store';
import Main from './app/Main';

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}