import React, { useState } from 'react'

const TimePicker = () => {
    // menu state
    const [timeDropdown, setTimeDropdown] = useState(false)
    // time
    const minArr = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]
    // months
    const hourArr = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]

    const [isHour, setIsHour] = useState()
    const [isMin, setIsMin] = useState()
    const [hour,  setHour] = useState()
    const [min, setMin] = useState()
    
    const handleDropdown = (type) => {

        if(type === "hour"){
            console.log("hour")
            setIsHour(!isHour)
            setIsMin(false)
        }
        if(type === "min") {
            setIsHour(false)
            setIsMin(!isMin)
        }
    }

    return (
    <>
        <div className={`timePickerSelectContainer ${timeDropdown ? "isActiveSelectContainer" : "" } `}>           
            {/* input field */}
            <div className="timePickerSelectInput" onClick={() => setTimeDropdown(!timeDropdown)}>
                <span className="timePickerPlaceholderText">Select</span>
                <img src="../icons/clock-icon.svg" alt="" />
            </div>

            {/* menu */}
            { timeDropdown && 
                <div className="timePickerMenu">
                    <div className="timePickerRow">
                        <div className="timePickerCol">
                            <div className="timePickerSelectLabel">Hour</div>
                            <div className={`dataSelect ${isHour ? "isActiveSelectContainer" : "" }`} onClick={()=>handleDropdown("hour")}>
                                <div className="dataInputValue">{ hour ? hour : "--" }</div>
                                <div className="dataInputChevron"><img src={`${isHour ? "../icons/chevron-up.svg" : "../icons/chevron-down.svg"}`} alt="" /></div>
                            </div>
                            { isHour && 
                                <div className="dataInputDropdown">
                                    {hourArr.map((item, index) => (
                                        <span key={index} className="dataInputDropdownItem" onClick={() =>  { setHour(item); setIsHour(!isHour)} }>{item}</span>
                                    ))}
                                </div>                             
                            } 
    
                        </div>
                        
                        <div className="timePickerCol">:</div>
                        
                        <div className="timePickerCol">
                            <div className="timePickerSelectLabel">Minutes</div>
                            <div className={`dataSelect ${isMin ? "isActiveSelectContainer" : "" }`} onClick={()=>handleDropdown("min")}>
                                <div className="dataInputValue">{ min ? min : "--" }</div>
                                <div className="dataInputChevron"><img src={`${isMin ? "../icons/chevron-up.svg" : "../icons/chevron-down.svg"}`} alt="" /></div>
                            </div> 
                            { isMin && 
                                <div className="dataInputDropdown">
                                    {minArr.map((item, index) => (
                                        <span key={index} className="dataInputDropdownItem" onClick={ () => { setMin(item); setIsMin(!isMin)} } >{item}</span>
                                    ))}
                                </div>                             
                            }   
                        </div>

                    </div>
                </div>
            } 
        </div>
    </>        
    )
}

export default TimePicker
