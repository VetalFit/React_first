import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPannel from '../search-pannel/search-pannel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'John C.', salary: 800, increase: false, id: 1 },
				{ name: 'Memnak E.', salary: 3000, increase: true, id: 2 },
				{ name: 'Boris G.', salary: 500, increase: false, id: 3 },
			]
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		this.setState(({ data }) => ({
			data: data.filter(item => item.id !== id)
		}))
	}

	render() {
		return (
			<div className="app">
				<AppInfo />

				<div className="search-pannel">
					<SearchPannel />
					<AppFilter />
				</div>

				<EmployeesList data={this.state.data}
					onDelete={this.deleteItem} />
				<EmployeesAddForm />
			</div>
		);
	}
}

export default App;