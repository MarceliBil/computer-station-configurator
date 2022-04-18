import React, { useEffect, useState } from 'react'
import Form from './Components/Form';
import ItemList from './Components/ItemList';

import "./App.scss"

const App = () => {

  const [inputs, setInputs] = useState({
    productName: "",
    productDetails: "",
    productCategory: "",
    productPrice: ""
  })
  const [items, setItems] = useState([])
  const [sort, setSort] = useState('all')
  const [category, setCategory] = useState('all')
  const [filteredItems, setFilteredItems] = useState([])
  const [cost, setCost] = useState(0)
  const [numberOfPositions, setNumberOfPositions] = useState(0)

  const [form, setForm] = useState(false)
  const [option, setOption] = useState('add')
  const [edit, setEdit] = useState(false)
  const [itemEditId, setItemEditId] = useState()

  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('')


  //GET DATA FROM LOCALSTORAGE
  useEffect(() => {
    if (localStorage.getItem('items') === null) {
      updateLocalStorage()
    }
    else {
      setItems(JSON.parse(localStorage.getItem('items')))
      setCost(localStorage.getItem('cost'))
      setNumberOfPositions(localStorage.getItem('numberOfPositions'))
    }
  }, [])

  //UPDATE THE STATE
  useEffect(() => {
    setItems(items)
    setCost(items.map(i => i.price).map(i => parseFloat(i)).reduce((partialSum, a) => partialSum + a, 0))
    setNumberOfPositions(items.length)
    updateLocalStorage()
  }, [items])


  //UPDATE THE LOCALSTORAGE
  function updateLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items))
    localStorage.setItem('cost', (items.map(i => i.price).map(i => parseFloat(i)).reduce((partialSum, a) => partialSum + a, 0)))
    localStorage.setItem('numberOfPositions', items.length)
  }

  useEffect(() => {
    handleSort()
  }, [items, sort])

  useEffect(() => {
    handleFilter()
  }, [items, category])

  //FILTER
  function handleFilter() {
    switch (category) {
      case 'components':
        setFilteredItems(items.filter(i => i.category === 'components'))
        break;
      case 'peripherals':
        setFilteredItems(items.filter(i => i.category === 'peripherals'))
        break;
      case 'software':
        setFilteredItems(items.filter(i => i.category === 'software'))
        break;
      case 'other':
        setFilteredItems(items.filter(i => i.category === 'other'))
        break;
      default:
        setFilteredItems(items)
        break;
    }
  }

  //SORT
  function handleSort() {
    switch (sort) {
      case 'alphabetically':
        setFilteredItems([...items.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))])
        break;
      case 'ascending':
        setFilteredItems([...items.sort((a, b) => a.price - b.price)])
        break;
      case 'descending':
        setFilteredItems([...items.sort((a, b) => b.price - a.price)])
        break;
      default:
        break;
    }
  }

  function showForm() {
    setOption('add')
    setInputs({
      productName: "",
      productDetails: "",
      productCategory: "",
      productPrice: ""
    })
    setForm(true)
  }

  return (
    <div className="App">
      <header className="header">
        <button className='option' onClick={showForm}>Dodaj element</button>

        <select name="" id="" className='edit' onChange={(event) => setSort(event.target.value)}>
          <option value="">--Sortuj--</option>
          <option value="all">Wszystko</option>
          <option value="alphabetically">Nazwa: alfabetycznie</option>
          <option value="ascending">Cena: od najniższej</option>
          <option value="descending">Cena: od najwyższej</option>
        </select>

        <select name="" id="" className='edit' onChange={(event) => setCategory(event.target.value)}>
          <option value="">--Filtruj--</option>
          <option value="all">Wszystko</option>
          <option value="components">Części PC</option>
          <option value="peripherals">Urządzenia peryferyjne</option>
          <option value="software">Oprogramowanie</option>
          <option value="other">Inne</option>
        </select>
      </header>
      <Form
        inputs={inputs}
        setInputs={setInputs}
        items={items}
        setItems={setItems}
        form={form}
        setForm={setForm}
        alertText={alertText}
        setAlertText={setAlertText}
        alert={alert}
        setAlert={setAlert}
        option={option}
        setEdit={setEdit} />

      <ItemList
        inputs={inputs}
        setInputs={setInputs}
        items={items}
        setItems={setItems}
        cost={cost}
        filteredItems={filteredItems}
        numberOfPositions={numberOfPositions}
        setForm={setForm}
        setOption={setOption}
        edit={edit}
        setEdit={setEdit}
        itemEditId={itemEditId}
        setItemEditId={setItemEditId}
      />

    </div >
  )
}
export default App