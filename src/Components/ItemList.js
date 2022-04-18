import React, { useRef } from 'react'

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Item from "./Item"

const ItemList = ({
    inputs,
    setInputs,
    items,
    setItems,
    cost,
    filteredItems,
    numberOfPositions,
    setForm,
    setOption,
    edit,
    setEdit,
    itemEditId,
    setItemEditId
}) => {
    //DOWNLOAD AS PDF
    const printRef = useRef();

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('zestaw.pdf');
    };

    return (
        <div className="ItemList">
            <table cellSpacing="0" ref={printRef}>
                <thead>
                    <tr>
                        <th>Nr pozycji</th> <th>Nazwa</th> <th>Sczegóły</th> <th>Kategoria</th> <th>Cena (PLN)</th> <th>Opcje</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredItems.map(i => {
                        return <Item
                            key={i.id}
                            index={items.indexOf(i) + 1}
                            item={i}
                            items={items}
                            setItems={setItems}
                            setForm={setForm}
                            setInputs={setInputs}
                            setOption={setOption}
                            edit={edit}
                            setEdit={setEdit}
                            inputs={inputs}
                            setItemEditId={setItemEditId}
                            itemEditId={itemEditId}

                        />
                    })}
                </tbody>

                <tfoot className='summary'>
                    <tr><td colSpan={6}>
                        <div>
                            <h3>Suma zamówienia:</h3>
                            <h3 className='order__cost'>{(cost) === null ? '0' : cost} PLN</h3>
                        </div>
                        <div style={{ 'marginTop': '30px' }}>
                            <h3>Liczba pozycji:</h3>
                            <h3>{(numberOfPositions) === null ? '0' : numberOfPositions} szt.</h3>
                        </div>
                    </td></tr>
                </tfoot>
            </table >
            <div className="table__options">
                <button className='option' onClick={handleDownloadPdf}>Pobierz jako PDF</button>
            </div>
        </div>
    )
}
export default ItemList