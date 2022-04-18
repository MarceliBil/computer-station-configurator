import React, { useEffect } from 'react'

const Item = ({
    index,
    item,
    items,
    setItems,
    setForm,
    inputs,
    setInputs,
    setOption,
    edit,
    setEdit,
    itemEditId,
    setItemEditId
}) => {

    const { productName, productDetails, productCategory, productPrice } = inputs

    useEffect(() => {
        if (edit) handleEdit()
    }, [edit])


    const { name, details, category, price } = item

    function handleDelete() {
        setItems(items.filter(i => i.id !== item.id))
    }

    function openEditForm() {
        setItemEditId(item.id)
        setOption('edit')
        setInputs({
            productName: name,
            productDetails: details,
            productCategory: category,
            productPrice: price
        })
        setForm(true)
    }

    function handleEdit() {
        setItems(items.map(i => {
            if (i.id === itemEditId) {
                return (
                    {
                        id: i.id,
                        name: productName,
                        details: productDetails,
                        category: productCategory,
                        price: productPrice
                    }
                )
            }
            else {
                return i
            }
        }))
        setEdit(false)
    }

    return (
        <tr>
            <td>{index}.</td>
            <td>{name}</td>
            <td>{details}</td>
            <td>{category}</td>
            <td>{price}</td>
            <td>
                <button onClick={openEditForm} className='edit'>Edytuj</button>
                <button onClick={handleDelete} className='delete'>Usuń</button>
            </td>
        </tr>
    )
}

export default Item