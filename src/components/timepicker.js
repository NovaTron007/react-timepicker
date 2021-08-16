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
    const [timeValue, setTimeValue] = useState()
    // timeMenu ref
    const timeMenuRef = useRef()
    
    // show, hide hours and minutes menus
    const handleDropdown = (type) => {
        if(type === "hour"){
            setShowHoursMenu(!showHoursMenu)
            // close option menu
            setShowMinutesMenu(false)
        }
        if(type === "min") {
            setShowHoursMenu(false)
            // close option menu
            setShowMinutesMenu(!showMinutesMenu)
        }
    }

    // handle hours and minutes select 
    const handleHoursMinutesSelect = (type, item) => {
        switch (type) {
            // set hours
            case "hours":
                // close hours options menu
                setShowHoursMenu(!showHoursMenu)
                if(item < 10) {
                    // minutes < 10 prepend 0 ie: "00"
                    let tempHours = `0${item}`
                    setHoursValue(tempHours)
                } else {
                    setHoursValue(item)
                }
                // if minutes empty set default val
                if(minutesValue === undefined) {
                    setMinutesValue("00")
                }
                break;
           
            // set minutes
            case "minutes":
                setShowMinutesMenu(!showMinutesMenu)
                if(item < 10) {
                    // minutes < 10 prepend 0 ie: "00"
                    let tempMinutes = `0${item}`
                    setMinutesValue(tempMinutes)
                } else {
                    setMinutesValue(item)
                }
                if(hoursValue === undefined) {
                    setHoursValue("00")
                }
                break
            default:
                break;
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
                                    // prepend with 0 for display purpose "00" if less than 10
                                    hoursValue
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
                                        value={item < 10 ? `0${item}` : item} 
                                        onClick={() => handleHoursMinutesSelect("hours", item)}
                                    >
                                        {/* prepend with 0 for display purpose "00" if less than 10 */}
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
                                    // prepend with 0 for display purpose "00" if less than 10
                                    minutesValue
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
                                        value={item < 10 ? `0${item}` : item} 
                                        onClick={() => handleHoursMinutesSelect("minutes", item)} 
                                    >
                                        {/* prepend with 0 for display purpose "00" if less than 10 if less than 10 */}
                                        { item < 10 ? `0${item}` : item }
                                    </span>
                                ))}
                            </div>                             
                        }   
                    </div>

                    {timeValue && console.log("time is:", timeValue)}

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

    // useEffect: listen for hourValue, minutesValue and update timeValue
    useEffect(() => {
        // if have values setTimeValue
        if(hoursValue && minutesValue){
            setTimeValue(`${hoursValue}:${minutesValue}`)
        }
    },[hoursValue, minutesValue]) // dependencies, if either changes updata timeValue



    return (
        <div className={`timePickerSelectContainer ${showTimeMenu ? "timePickerisActiveSelectContainer" : "" } `}>           
            {/* select input field */}
            <div className="timePickerSelect" onClick={() => setShowTimeMenu(!showTimeMenu)}>
                {
                   timeValue === undefined ?
                   <span className="timePickerPlaceholderText">Select</span>
                    :
                    <span>{timeValue}</span>
                }
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
