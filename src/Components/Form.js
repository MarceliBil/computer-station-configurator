import React from 'react'

const Form = ({
    inputs,
    setInputs,
    items,
    setItems,
    form,
    setForm,
    alertText,
    setAlertText,
    alert,
    setAlert,
    option,
    setEdit,
}) => {

    const { productName, productDetails, productCategory, productPrice } = inputs;

    function handleInput(event) {
        const value = event.target.value;
        setInputs({
            ...inputs,
            [event.target.name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (Object.values(inputs).some(i => !i || /^\s*$/.test(productName))) {
            setAlertText("Uzupełnij wszystkie pola")
            setAlert(true)
        }
        else if (/^\d+([\,\.]\d\d?)?$/.test(productPrice) === false) {
            setAlertText("Wpisz poprawną cenę")
            setAlert(true)
        }
        else {
            setAlert(false)

            if (option === 'add') {
                setItems([
                    ...items, {
                        id: Math.floor(Math.random() * (10000 - 1)) + 1,
                        name: productName,
                        details: productDetails,
                        category: productCategory,
                        price: productPrice
                    }
                ])
            }
            else {
                setEdit(true)
            }
            setForm(false)
        }
    }

    function handleCancel(event) {
        event.preventDefault()
        setForm(false)
        setAlert(false)
        handleClear()
    }

    function handleClear() {
        setInputs({
            productName: "",
            productDetails: "",
            productCategory: "",
            productPrice: ""
        })
    }

    return (
        <div className={`formWrapper flex__center ${form ? 'show' : 'hide'}`}>
            <form>
                <h2>{(option === 'add') ? "Dodaj element" : "Edytuj element"}</h2>
                <label htmlFor="productName">
                    Nazwa
                    <input type="text" name="productName" id='productName' onChange={handleInput} value={productName} />
                </label>
                <label htmlFor="productDetails">
                    Dane szczegółowe
                    <input type="text" name="productDetails" id='productDetails' value={productDetails} onChange={handleInput} />
                </label>

                <label htmlFor="productCategory">
                    Kategoria

                    <select name="productCategory" id="productCategory" onChange={handleInput} value={productCategory}>
                        <option value="">--Kategoria--</option>
                        <option value="components">Części PC</option>
                        <option value="peripherals">Urządzenia peryferyjne</option>
                        <option value="software">Oprogramowanie</option>
                        <option value="other">Inne</option>
                    </select>
                </label>

                <label htmlFor="productPrice">
                    Cena (PLN)
                    <input type="number" name="productPrice" id='productPrice' value={productPrice} min={1} onChange={handleInput} />
                </label>

                <div className="options flex__center">
                    <button className='delete' onClick={handleCancel}>Anuluj</button>
                    <button className='accept' onClick={handleSubmit}>{(option === 'add') ? "Dodaj" : "Zapisz"}</button>
                </div>
            </form>
            <div className={`alert ${alert ? 'show' : 'hide'}`}>
                <p>{alertText}</p>
            </div>
        </div>
    )
}
export default Form