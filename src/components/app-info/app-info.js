import './app-info.css';

const AppInfo = ({ countEmployees, countBonus }) => {
	return (
		<div className="app-info">
			<h1>Учет сотрудников в компании Vetal_Production</h1>
			<h2>Общее число сотрудников: {countEmployees}</h2>
			<h2>Премию получат: {countBonus}</h2>
		</div>
	)
}

export default AppInfo;