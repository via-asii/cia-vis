import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {BarChart, Donut} from './index';

const App = () => {
	return (
		<div>
			<Donut
				isPercent={true}
				width="300"
				height="300"
				thickness="30"
				data={[
				  {label: "USA", value: 40},
				  {label: "UK", value: 20},
				  {label: "Canada", value: 30},
				  {label: "Mexico", value: 10},
				]}
				customClass="donut-1"
			/>
			<BarChart
				isPercent={true}
				width="200"
				height="600"
				padding="30"
				data={[
				  {label: "USA", value: 40},
				  {label: "UK", value: 20},
				  {label: "Canada", value: 30},
				  {label: "Mexico", value: 10},
				]}
				customClass="donut-1"
			/>
		</div>
	)
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
