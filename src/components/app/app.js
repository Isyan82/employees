import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Ivan', salary: 10000, increase: false, rise: false, id: 1 },
        { name: 'Maria', salary: 8000, increase: false, rise: false, id: 2 },
        { name: 'Vasilisa', salary: 500, increase: false, rise: false, id: 3 }
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    if (name.length > 3 && salary.length > 1) {
      this.setState(({ data }) => {
        return {
          data: [...data, newItem]
        }
      })
    }
  }

  onToggleIncrease = (id) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, increase: !item.increase }
        }
        return item;
      })
    }))
  }

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({ term });
  }
  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({ filter })
  }


  onSalaryChange = (evt, id) => {
    this.setState(({ data }) => {
      const index = data.findIndex(item => item.id === id);
      const newArr = data.map((item, i) => {
        if (i === index) {
          item.salary = parseInt(evt.target.value)
          return item
        }
        return item
      })

      return {
        data: newArr
      }
    })
  }

  render() {
    const { data, term, filter } = this.state
    const employees = data.length;
    const increased = data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter)

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onSalaryChange={this.onSalaryChange}
        />
        <EmployeesAddForm
          onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
