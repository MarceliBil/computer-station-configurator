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
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || [])
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

  //UPDATE THE STATE
  useEffect(() => {
    setCost(items.map(i => i.price).map(i => parseFloat(i)).reduce((partialSum, a) => partialSum + a, 0))
    setNumberOfPositions(items.length)
    saveToLocalStorage()
  }, [items])

  //SAVE DATA TO THE LOCALSTORAGE
  function saveToLocalStorage() {
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
          <option value="ascending">Cena: od najni??szej</option>
          <option value="descending">Cena: od najwy??szej</option>
        </select>

        <select name="" id="" className='edit' onChange={(event) => setCategory(event.target.value)}>
          <option value="">--Filtruj--</option>
          <option value="all">Wszystko</option>
          <option value="components">Cz????ci PC</option>
          <option value="peripherals">Urz??dzenia peryferyjne</option>
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