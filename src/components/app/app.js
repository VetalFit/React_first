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
				{ name: 'John C.', salary: 800, increase: false, like: false, id: 1 },
				{ name: 'Memnak E.', salary: 3000, increase: false, like: false, id: 2 },
				{ name: 'Boris G.', salary: 500, increase: false, like: false, id: 3 },
			],
			term: '',
			filter: 'all'
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		this.setState(({ data }) => ({
			data: data.filter(item => item.id !== id)
		}))
	}

	addItem = (name, salary) => {
		if (name.length >= 3 && salary) {
			const newItem = {
				name,
				salary,
				increase: false,
				like: false,
				id: this.maxId++
			}
			this.setState(({ data }) => {
				const newArr = [...data, newItem];
				return {
					data: newArr
				}
			});
		} else {
			return
		}
	}

	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] }
				}
				return item;
			})
		}))
	}

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}

	onUpdateSearch = (term) => {
		this.setState({ term })
	}

	searchFilter = (items, filter) => {
		switch (filter) {
			case 'like':
				return items.filter(item => item.like)
			case 'more1000':
				return items.filter(item => item.salary > 1000)
			default:
				return items
		}
	}

	onFilterSelect = (filter) => {
		this.setState({ filter });
	}

	onSalaryChange = (newSalary, name) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.name === name) {
					return { ...item, salary: newSalary.replace(/\D/g, '') }
				}
				return item
			})
		}))
	}

	render() {
		const { data, term, filter } = this.state
		const bonus = data.filter(item => item.increase).length
		const visibleData = this.searchFilter(this.searchEmp(data, term), filter)

		return (
			<div className="app">
				<AppInfo
					countEmployees={data.length}
					countBonus={bonus} />

				<div className="search-pannel">
					<SearchPannel
						onUpdateSearch={this.onUpdateSearch} />

					<AppFilter
						filter={filter}
						onFilterSelect={this.onFilterSelect} />
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
					onSalaryChange={this.onSalaryChange} />

				<EmployeesAddForm
					onAdd={this.addItem} />
			</div>
		);
	}
}

export default App;