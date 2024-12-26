import { useState } from "react"

function Card() {
    const [cards, setCards] = useState([{ name: "Example", isChecked: false }])
    const [inptValue, setInptValue] = useState("")
    const [editInd, setEditInd] = useState(null)

    function valueInput(event) {
        const inputValue = event.target.value;
        setInptValue(inputValue)
    }

    function addCard() {
        if(editInd !== null){
            const updateData = cards.map((val, ind) => ind === editInd ? {...val, name: inptValue} : val);
            setCards(updateData)
            setEditInd(null)
            setInptValue("")
            return
        }


        const validation = cards.some((ele) => ele.name === inptValue);
        if(validation){
            alert("same name can not be added")
            return;
        }
        if(inptValue){
            setCards([...cards, { name: inptValue }])
        }else{
            alert("enter task first")
        }
    }

    function checkTask(index){
        const checkBtn = cards.map((isObj, ind) => 
        {
            if(ind === index){
                return {...isObj, isChecked: true}
            }
            return isObj;
        })
       setCards(checkBtn)
    }

    function editTask(index){
        const editBtn = cards.find((val, ind) => ind === index)
        setInptValue(editBtn.name)
        setEditInd(index)
    }

    function closeTask(index){
        const closeBtn = cards.filter((val, ind) => ind !== index)
        setCards(closeBtn)
    }

    return (
        <div className="text-center">
            <input type="text" value={inptValue} className="border p-1 m-5" placeholder="Enter your task name" onChange={valueInput} />
            <button className="bg-green-700 text-white rounded-md p-2 px-3" onClick={addCard}>addTask</button>
            {
                cards.map((ele, index) => {
                    return (
                        <div key={ele.name} className={`${ele.isChecked ? 'bg-green-800 text-white' : 'bg-gray-200'} rounded-md w-[500px] text-start my-1 p-2 mx-auto flex justify-between items-center`}>
                            {ele.isChecked == true ? "Checked" : ele.name}
                            <div className="text-white">
                                <button className="bg-green-700 p-1  w-14 rounded-md" onClick={() => checkTask(index)}>Check</button>
                                <button className="bg-blue-700 p-1  mx-2 w-14 rounded-md" onClick={() => editTask(index)}>Edit</button>
                                <button className="bg-red-700 p-1 px-2 w-14 rounded-md" onClick={() => closeTask(index)}>Close</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Card