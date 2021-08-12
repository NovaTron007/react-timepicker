import React, { useState } from 'react'

const TimePicker = () => {
    // menu state
    const [timeDropDown, setTimeDropDown] = useState(false)
    // time
    const timeArr = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]
    // months
    const monthArr = ["1","2","3","4","5","6","7","8","9","10","11","12"]

    const [isHour, setIsHour] = useState()
    const [isMin, setIsMin] = useState()
    
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
        <div className="timePickerContainer">           
            {/* input field */}
            <div className="timePickerSelectInput" onClick={() => setTimeDropDown(!timeDropDown)}>
                <span className="timePickerPlaceholderText">Select</span>
                <img src="../icon/clock-icon.svg" alt="" />
            </div>

            {/* menu */}
            { timeDropDown && 
                <div className="timePickerMenu">
                    <div className="timePickerRow">
                        <div className="timePickerCol">
                            <div className="timePickerSelectLabel">Hour</div>
                            <div className={`dataSelect ${isHour ? "border-orange" : "" }`} onClick={()=>handleDropdown("hour")}>
                                <div className="dataInputValue">10</div>
                                <div className="dataInputChevron"><img src="../icon/chevron-down.svg" alt="" /></div>
                            </div>
                            { isHour && 
                                <div className="dataInputDropdown">
                                    {timeArr.map((item, index) => (
                                        <span className="dataInputDropdownItem">{item}</span>
                                    ))}
                                </div>                             
                            } 
    
                        </div>
                        
                        <div className="timePickerCol">:</div>
                        
                        <div className="timePickerCol">
                            <div className="timePickerSelectLabel">Minutes</div>
                            <div className={`dataSelect ${isMin ? "border-orange" : "" }`} onClick={()=>handleDropdown("min")}>
                                <div className="dataInputValue">10</div>
                                <div className="dataInputChevron"><img src="../icon/chevron-down.svg" alt="" /></div>
                            </div> 
                            { isMin && 
                                <div className="dataInputDropdown">
                                    {timeArr.map((item, index) => (
                                        <span className="dataInputDropdownItem">{item}</span>
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
