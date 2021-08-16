import React, { useState, useRef, useEffect } from 'react'

const TimePicker = () => {
    // menu state
    const [showTimeMenu, setShowTimeMenu] = useState(false)
    // hours data
    const hoursDataSize = 25 // print 0, so 24 hours
    // minutes data
    const minutesDataSize = 60 // print 0 - 59 mins
    // states: show, hide menus
    const [showHoursMenu, setShowHoursMenu] = useState()
    const [showMinutesMenu, setShowMinutesMenu] = useState()
    // get values
    const [hoursValue,  setHoursValue] = useState()
    const [minutesValue, setMinutesValue] = useState()
    // timeMenu ref
    const timeMenuRef = useRef()
    
    // show, hide hours and minutes menus
    const handleDropdown = (type) => {

        if(type === "hour"){
            console.log("hour")
            setShowHoursMenu(!showHoursMenu)
            setShowMinutesMenu(false)
        }
        if(type === "min") {
            setShowHoursMenu(false)
            setShowMinutesMenu(!showMinutesMenu)
        }
    }

    // handle outside click
    const handleClickOutside = (e) => {
        if(timeMenuRef.current && timeMenuRef.current.contains(e.target)) {
            // inside click
            setShowTimeMenu(true)
            return false
        }
        setShowTimeMenu(false)
    }

    // Timepicker Menu Component
    const TimePickerMenu = () => {

        return(
            <div className="timePickerMenu" ref={timeMenuRef} >
                <div className="timePickerRow">
                    <div className="timePickerCol">
                        <div className="timePickerLabel">Hour</div>
                        <div className={`timePickerHoursMinutesSelect ${showHoursMenu ? "timePickerisActiveSelect" : "" }`} onClick={()=>handleDropdown("hour")}>
                            <div className="timePickerHoursMinutesSelectValue">
                                { hoursValue === undefined ? "--" 
                                : 
                                    hoursValue < 10 ? `0${hoursValue}` : hoursValue 
                                }
                            </div>
                            <div className="timePickerChevron"><img src={`${showHoursMenu ? "../icons/chevron-up.svg" : "../icons/chevron-down.svg"}`} alt="" /></div>
                        </div>
                        {/* minutes dropdown menu */} 
                        { showHoursMenu && 
                            <div className="timePickerOptionMenu">
                                {/* create a new array based on hoursDataSize */}
                                {[...Array(hoursDataSize).keys()].map((item) => (
                                    <span 
                                        className="timePickerOptionMenuItem" 
                                        key={item} 
                                        value={item} 
                                        onClick={() => {setHoursValue(item); setShowHoursMenu(!showHoursMenu)}}
                                    >
                                        { item < 10 ? `0${item}` : item }
                                    </span>
                                ))}     
                            </div>                             
                        } 
                    </div>
                    
                    <div className="timePickerCol">:</div>
                    
                    <div className="timePickerCol">
                        <div className="timePickerLabel">Minutes</div>
                        <div className={`timePickerHoursMinutesSelect ${showMinutesMenu ? "timePickerisActiveSelect" : "" }`} onClick={()=>handleDropdown("min")}>
                            <div className="timePickerHoursMinutesSelectValue">
                                { minutesValue === undefined ?  "--"
                                :
                                    minutesValue < 10 ? `0${minutesValue}` : minutesValue 
                                }
                            </div>
                            <div className="timePickerChevron"><img src={`${showMinutesMenu ? "../icons/chevron-up.svg" : "../icons/chevron-down.svg"}`} alt="" /></div>
                        </div>
                        {/* minutes dropdown menu */} 
                        { showMinutesMenu && 
                            <div className="timePickerOptionMenu">
                                {/* create a new array based on hoursDataSize */}
                                {[...Array(minutesDataSize).keys()].map((item) => (
                                    <span 
                                        className="timePickerOptionMenuItem" 
                                        key={item} 
                                        value={item} 
                                        onClick={(()=> { setMinutesValue(item); setShowMinutesMenu(!showMinutesMenu)})}
                                    >
                                        { item < 10 ? `0${item}` : item }
                                    </span>
                                ))}
                            </div>                             
                        }   
                    </div>

                </div>
            </div>            
        )
    }

    // useEffect listen for outside click
    useEffect(() => {
        if (showTimeMenu) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showTimeMenu]);

    useEffect(() => {
        console.log("hoursValue:", hoursValue)
        console.log("minutesValue:", minutesValue)
    },[hoursValue,minutesValue])



    return (
        <div className={`timePickerSelectContainer ${showTimeMenu ? "timePickerisActiveSelectContainer" : "" } `}>           
            {/* select input field */}
            <div className="timePickerSelect" onClick={() => setShowTimeMenu(!showTimeMenu)}>
                <span className="timePickerPlaceholderText">Select</span>
                <img src="../icons/clock-icon.svg" alt="" />  
            </div>

            {/* show or hide TimePickerMenu Component */}
            { showTimeMenu && 
                <TimePickerMenu />
            } 
        </div>       
    )
}

export default TimePicker
