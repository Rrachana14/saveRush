"use client";

import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSpring, animated } from "@react-spring/web";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/20/solid";


export default function ScheduleOrder() {
  const [plan, setPlan] = useState("one-time");  //defualt 
  const [selectedDays, setSelectedDays] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(true);
  const [isTimeValid, setIsTimeValid] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const selectPreset = (preset) => {
    if (preset === "weekdays") {
      setSelectedDays(["Mo", "Tu", "We", "Th", "Fr"]);
    } else if (preset === "weekends") {
      setSelectedDays(["Sa", "Su"]);
    }
  };

  const getWeekdayShort = (date) => {
    return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()];
  };

  const isDeliveryDay = (date) => {
    if (date < startDate) return false;
    if (plan === "daily") return true;
    if (plan === "alternate") {
      const diffDays = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
      return diffDays % 2 === 0;
    }
    if (plan === "weekly") {
      const day = getWeekdayShort(date);
      return selectedDays.includes(day);
    }
    return false;
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  
  
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
  
    setDeliveryTime(selectedTime);
  
    const currentTime = new Date();
    const [hours, minutes] = selectedTime.split(":");
  
    const selectedTimeObj = new Date();
    selectedTimeObj.setHours(hours, minutes, 0, 0);
  
    const isSameDate = currentTime.toDateString() === startDate.toDateString();
  
    if (isSameDate && selectedTime) {
      const timeDifference = (selectedTimeObj - currentTime) / 1000 / 60;
  
  
      if (timeDifference < 15) {
        console.log("Invalid time: less than 15 minutes ahead.");
        setIsTimeValid(false);
        setShowPopup(true); 
      } else {
        setIsTimeValid(true);
        setShowPopup(false); 
      }
    } else {
      setIsTimeValid(true);
      setShowPopup(false);
    }
  };
  
  // COMMENT OUT LATER
  useEffect(() => {
    console.log("valid?", isTimeValid); 
  }, [isTimeValid]); 
  
  useEffect(() => {
    handleTimeChange({
      target: {
        value: deliveryTime
      }
    });
  }, [startDate, deliveryTime]);  //CALL THE handleTimeChange WHEN STARTDATE AND TIME GETS CHANGED

  
  useEffect(() => {
    if (!isTimeValid) {
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isTimeValid]);
  

  const renderCalendar = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const current = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      1
    );
    const days = [];

    const firstDay = new Date(current);
    const startOffset = firstDay.getDay();

    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }

    const monthLength = new Date(
      current.getFullYear(),
      current.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= monthLength; i++) {
      const thisDate = new Date(current.getFullYear(), current.getMonth(), i);
      days.push(thisDate);
    }

    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-white border-2 border-gray-300 rounded-md shadow-lg p-4">
        <div className="flex items-center gap-3 mb-1 font-bold text-xl">
          <button
            className=" hover:text-grey-700 font-semibold"
            onClick={() => setShowCalendar(false)}
          >
            <ChevronLeftIcon className="h-6 w-6 cursor-pointer" />
          </button>
          <h3 className="max-[350px]:text-sm">Select Start Date</h3>
        </div>
        <h6 className="text-xs font-semibold text-gray-800">
          Select the date from which you want to start delivery
        </h6>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() =>
                setCalendarDate(
                  new Date(
                    calendarDate.getFullYear(),
                    calendarDate.getMonth() - 1,
                    1
                  )
                )
              }
              className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              &#8592; Back
            </button>

            <h4 className="text-md font-semibold text-center">
              {calendarDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h4>

            <button
              onClick={() =>
                setCalendarDate(
                  new Date(
                    calendarDate.getFullYear(),
                    calendarDate.getMonth() + 1,
                    1
                  )
                )
              }
              className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Next &#8594;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 gap-y-0 text-gray-400 text-center w-full">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="font-semibold p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 gap text-center w-full border rounded-md shadow-md px-3 py-1 ">
            {days.map((date, idx) =>
              date ? (
                <div
                  key={idx}
                  className={`p-2 text-md rounded cursor-pointer aspect-square flex items-center justify-center transition-all 
            ${
              date.toDateString() === startDate.toDateString()
                ? "bg-[#b3ff53] text-white font-bold"
                : isDeliveryDay(date)
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
                  onClick={() => {
                    if (date >= today) {
                      setStartDate(date);
                    }
                  }}
                >
                  {date.getDate()}
                </div>
              ) : (
                <div key={idx} />
              )
            )}
          </div>
        </div>

        <div className="bg-white w-full flex justify-end gap-4 px-4 py-2.5 shadow-md rounded-b-xl z-10">
          <div className="flex items-center gap-2">
            <div className="bg-[#b3ff53] w-3 h-3 rounded-full flex items-center justify-center"></div>
            <p className="text-xs font-semibold">Start Date</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 w-3 h-3 rounded-full flex items-center justify-center"></div>
            <p className="text-xs font-semibold">Delivery Date</p>
          </div>
        </div>

        <div className="absolute bottom-0 w-[95%] flex items-center justify-between bg-white px-2 py-1 max-[350px]:text-xs">
          <div className="flex flex-col mr-4">
            <p className="text-sm font-medium text-gray-500">Delivery from</p>
            <p className="text-md font-semibold ">{formatDate(startDate)}</p>
          </div>
          <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md mr-3">
            Confirm Start Date
          </button>
        </div>
      </div>
    );
  };


  // Slide and fade-in animation for the calendar
  const slideIn = useSpring({
    opacity: showCalendar ? 1 : 0,
    transform: showCalendar ? "translateY(0)" : "translateY(-40px)",
    config: { tension: 250, friction: 20 },
  });

  const handleConfirmOrder = ()=>{
    console.log({
      plan: plan,
      quantity: quantity,
      startDate: startDate,
      deliveryTime: deliveryTime
    });
    
  }

  return (
    <div className="scheduleOrder min-h-screen bg-blue-900 flex justify-center items-center ">
      {isScheduleVisible ? (
        <div className="w-full max-w-md h-auto  bg-gradient-to-b from-[#ffeede] to-[#dad6d6] rounded-2xl shadow-xl px-1 pt-1 space-y-2 border border-black relative overflow-y">
          {/* HEADER */}
          <div className="flex  items-center justify-between mx-4 mt-2 mb-4">
            <button className="text-blue-700 hover:text-blue-700">
              <CalendarIcon className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-medium text-center max-[400px]:text-md">
              SCHEDULE ORDER
            </h2>
            <button onClick={() => setIsScheduleVisible(false)}>
              <XMarkIcon className="h-6 w-6 cursor-pointer" />
            </button>
          </div>

          <div className="relative w-full max-w-md px-4 pt-4 space-y-2">
            {/* PRODUCT CART */}
            <div className="bg-white  rounded-md shadow-sm">
              <div className="flex items-center gap-1.5 p-3">
                <img
                  src="/images/download.jpeg"
                  alt="Watermelon"
                  className="w-14 h-14 max-[350px]:h-10 max-[350px]:w-10 mr-1.5 object-cover rounded-lg"
                />

                <div className="flex flex-1 justify-between items-center">
                  <div>
                    <p className="font-semibold text-md max-[350px]:text-sm">
                      Watermelon Kiran (Kalingad)
                    </p>
                    <p className="text-xs max-[350px]:text-xxxs text-gray-600">
                      1 pc (2-3kg approx.)
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-sm">₹55</p>
                    <p className="text-xs line-through text-gray-400">₹80</p>
                  </div>
                </div>
              </div>
              <div className="text-gray-500 bg-gray-50 text-center text-xs font-semibold py-1 rounded-b-xl  ">
                Product price may vary based on the market changes
              </div>
            </div>

            {/* STEP - 1*/}
            <div className="bg-white p-3 rounded-md shadow-sm max-[400px]:px-1 ">
              <div className="flex gap-2.5 ">
                <div className="w-5 h-5 rounded-full bg-black text-sm text-white flex items-center justify-center ">
                  1
                </div>
                <p className="font-bold text-sm font-sans mb-2">
                  Selected Plan
                </p>
              </div>
              <div className="ml-3 text-xs mb-3.5 font-bold  text-gray-600 text-start ">
                {plan === "alternate" && (
                  <p>Items delivered on the gap of one day.(ex Mon,Wed,Fri)</p>
                )}
                {plan === "weekly" && (
                  <p> Get Items delivered on the selected date(s).</p>
                )}
                {!plan && (
                  <p className="text-gray-400">No plan selected yet.</p>
                )}
              </div>

              <div className="ml-3 w-full flex  justify-items-start gap-2.5 max-[400px]:text-xs max-[400px]:gap-1.5">
                <button
                  onClick={() => setPlan("one-time")}
                  className={
                    plan === "one-time"
                      ? "bg-blue-500 text-white px-2.5 py-1 rounded-sm"
                      : "bg-white text-slate-600 font-2 border-2 px-2.5 py-1 rounded-sm"
                  }
                >
                  one-time
                </button>
                <button
                  onClick={() => setPlan("daily")}
                  className={
                    plan === "daily"
                      ? "bg-blue-500 text-white px-2.5 py-1 rounded-sm"
                      : "bg-white text-slate-600 font-2 border-2 px-2.5 py-1 rounded-sm"
                  }
                >
                  Daily
                </button>
                <button
                  onClick={() => setPlan("weekly")}
                  className={
                    plan === "weekly"
                      ? "bg-blue-500 text-white px-2.5 py-1 rounded-sm"
                      : "bg-white text-slate-600 font-2 border-2 px-2.5 py-1 rounded-sm"
                  }
                >
                  Weekly
                </button>
                <button
                  onClick={() => setPlan("alternate")}
                  className={
                    plan === "alternate"
                      ? "bg-blue-500   text-white px-2.5 py-1 rounded-sm"
                      : "bg-white text-slate-600 font-2 border-2 px-2.5 py-1 rounded-sm"
                  }
                >
                  Alternate
                </button>
              </div>
            </div>

            {/* STEP -2 */}
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="flex mb-1.5 gap-2.5 items-center">
                <div className="w-5 h-5 rounded-full bg-black text-sm text-white flex items-center justify-center">
                  2
                </div>
                <p className="font-bold text-sm font-sans ">
                  {plan === "weekly"
                    ? "Select day(s) for Delivery"
                    : "Quantity"}
                </p>
              </div>

              {plan === "weekly" && (
                <div className="space-y-2">
                  <div className="flex w-full mt-3 gap-2 justify-center">
                    <button
                      onClick={() => selectPreset("weekdays")}
                      className="px-3 w-1/2 py-1 border rounded-md text-gray-600  border-gray-300 bg-white hover:bg-gray-200"
                    >
                      Weekdays
                    </button>
                    <button
                      onClick={() => selectPreset("weekends")}
                      className="px-3 w-1/2 py-1 border rounded-md text-gray-600  border-gray-300 bg-white hover:bg-gray-200"
                    >
                      Weekends
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center mb-4 max-[400px]:text-xs">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1 border rounded-sm text-gray-600 ${
                          selectedDays.includes(day)
                            ? "bg-blue-500 text-white"
                            : "bg-transparent"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 justify-between bg-gray-50 h-10 rounded-md mx-4 px-2 py-2">
                <span className="text-sm font-medium text-gray-700">
                  Quantity:
                </span>
                <div className="flex items-center h-3 gap-2 ">
                  {quantity === 0 ? (
                    <button className="p-2 bg-blue-100 rounded hover:bg-blue-200 text-blue-600 ">
                      <RiDeleteBin6Line size={24} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      className="px-3  flex items-center justify-center py-1 text-2xl text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      -
                    </button>
                  )}

                  <span className="text-sm font-semibold text-gray-700 px-2">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3  flex items-center justify-center py-1 text-2xl text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 "
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* STEP -3 */}
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full bg-black text-xs text-white flex items-center justify-center ">
                  3
                </div>
                <p className="font-bold text-sm font-sans mb-2">Start Date</p>
              </div>
              <div className="flex h-fit items-center justify-between">
                <p className="text-gray-600 capitalize font-semibold text-sm">
                  delivery starts from
                </p>
                <div className="flex gap-2">
                  <span className="bg-blue-400 px-2 py-2 rounded-md text-sm font-bold text-white max-[400px]:text-xs max-[400px]:rounded-sm">
                    {startDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                  <button
                    className="text-blue-600 font-bold text-md cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    {showCalendar ? "Back" : "Edit"}
                  </button>
                </div>
              </div>
            </div>

            {/* STEP-4 */}
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full bg-black text-xs text-white flex items-center justify-center ">
                  4
                </div>
                <p className="font-bold text-sm font-sans mb-2">
                  Select Delivery time
                </p>
              </div>
                <div className="mt-4">
                  <div className="flex items-center ">
                    <input
                      type="time"
                      value={deliveryTime}
                      onChange={handleTimeChange}
                      className={`p-3 rounded-lg border-2 max-[400px]:text-[13px]  max-[400px]:p-1.5${
                        isTimeValid
                          ? "border-gray-300 focus:border-[#2e00b2]"
                          : "border-red-400"
                      } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 bg-white transition-all duration-200`}
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        backgroundColor: !isTimeValid ? "#ffe6e6" : "#ffffff",
                        borderRadius: "10px", 
                        paddingLeft: "10px", 
                        paddingRight: "10px", 
                        boxShadow: isTimeValid ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "0px 4px 8px rgba(255, 0, 0, 0.2)", 
                        transition: "all 0.2s ease", 
                      }}
                    />

                   
                  </div>

                  {!isTimeValid && showPopup && (
                    <div className="popup  text-red-500 mt-2.5">
                      <div className="popup-content max-[350px]:text-xs">
                        <p>
                          Delivery time must be at least 15 minutes from the
                          current time!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              {/* )} */}
            </div>

            <button className="w-full bg-[#2e00b2] text-white font-bold py-2 rounded-md hover:bg-blue-700 mb-2.5 " disabled={!isTimeValid} onClick={()=>{
              console.log("click")
              handleConfirmOrder();
            }}>
              Confirm Order
            </button>
          </div>
          {/* RENDER CALENDER BY CALLING FUCNTION */}
          {showCalendar && (
            <animated.div
              style={slideIn}
              className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 z-50"
            >
              {renderCalendar()}
            </animated.div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsScheduleVisible(true)
          }
          
          className="bg-[#2e00b2] text-white py-2 px-4 rounded-md hover:bg-blue-700 "
        >
          Schedule Order
        </button>
      )}
    </div>
  );
}
