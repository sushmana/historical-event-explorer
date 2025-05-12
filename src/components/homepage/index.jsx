import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { getEvent, getBirth } from "/src/redux/slice/historicalSlice";
import Modal from '../common/modal';
import DatePicker from 'react-date-picker';
import { current } from "@reduxjs/toolkit";

const Homepage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.historicalReducer.events).flat();
  const births = useSelector((state) => state.historicalReducer.births).flat();

  console.log("events", events);
  console.log("births", births);

  const [bookmarkedItem, setBookmarkedItem] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate);
  const [generateTitle, setGenerateTitle] = useState();
  const month = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showBirths, setShowBirths] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDDMM, setSelectedDDMM] = useState({ DD:"" , MM:"",});
  const [eventDetail, setEventDetail] = useState();  
  const [birthDetail, setBirthDetail] = useState();
  const handleBookmark = () => {
    // setBookmarkedItem()
    localStorage.setItem("bookmarked", bookmarkedItem);
  };

  const handleTheme = () => {};
   
  const handleDate = () => {
    setShowDatePicker(true);
    setShowBirths(false);
    setShowEvents(false);
    setOpenModal(true);
  }
  useEffect(() => {
    if (currentDate) {
    const day = String(currentDate.getDate());
    const mm = String(currentDate.getMonth());

    setGenerateTitle(`Today is ${day} ${month[mm]}`);
    setSelectedDDMM({ DD: day, MM: mm });
    }
  }, [currentDate]);

  useEffect(()=>{
    if(selectedDDMM.DD === "" || selectedDDMM.MM === "") return;
    dispatch(getEvent(selectedDDMM));
    dispatch(getBirth(selectedDDMM));
  },[selectedDDMM])

  const getEventDetail = (index) =>{
    const detail = events.find((_, i)=> i===index)
    setEventDetail(detail)
    
  }

  const handleEventDetail = async(index) =>{
    getEventDetail(index);
    setOpenModal(true); 
    setShowEvents(true); 
    setShowBirths(false); 
    setShowDatePicker(false); 
  }

  const getBirthDetail = (index) =>{
    const detail = births.find((_, i)=> i===index)
    setBirthDetail(detail)
    
  }

  const handleBirthDetail = async(index) =>{
    getBirthDetail(index);
    setOpenModal(true); 
    setShowEvents(false); 
    setShowBirths(true); 
    setShowDatePicker(false); 
  }
  return (
    <>
      <div className="text-center lg:text-2xl  h-screen w-100% lg:w-2xl ">
        <header>Historical Events Explorer</header>
        <div className="flex justify-end flex-row gap-[4px] lg:gap-[20px] m-[10px]">
          <FaRegBookmark onClick={handleBookmark} />
          <MdDarkMode onClick={handleTheme} />
        </div>

        <h1 onClick={handleDate}> {generateTitle}</h1>
        {
          (showDatePicker || showEvents || showBirths) && 
          <Modal openModal={openModal} closeModal={()=> setOpenModal(false)} showEvents={showEvents} showBirths={showBirths} showDatePicker={showDatePicker}>
            <div className="mt-[100px]">
            {/* {showDatePicker && <DatePicker value={currentDate}  onClick={setSelectedDDMM}/>} */}
            {showEvents && (
              <>
              <div className="grid grid-cols-2 gap-4 text-black">
                <label className="font-semibold font-mono">Year:</label> 
                <h2>{eventDetail.year}</h2>
                
                <label className="font-semibold font-mono">Description:</label>
                <h2>{eventDetail.description}</h2>

                <label className="font-semibold col-span-2 underline font-mono"> Wikipedia </label>
                {
                  eventDetail.wikipedia.map((wik, index)=>{
                    return(
                      <>
                      <label>{wik.title}:</label>
                      <a
                        href={wik.wikipedia}
                        className="text-blue-600 underline hover:cursor-grab hover:scale-120"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {wik.wikipedia}
                      </a>
                      </>
                    )
                  })
                }
              </div>
              </>
            )}
            {showBirths && (
              <>
              <div className="grid grip-cols-2 gap-4 text-black">
                <label className="font-semibold">Year:</label>
                <h2>{birthDetail.year}</h2>

                <label className="font-semibold">Description:</label>
                <h2>{birthDetail.description}</h2>

                <label className=" col-span-2 font-semibold underline"> Wikipedia </label>
                {
                  birthDetail.wikipedia.map((wik, index)=>{
                    return(
                      <>
                      <label>{wik.title}:</label>
                      <a
                      href={wik.wikipedia}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{wik.wikipedia}</a>
                      </>
                    )
                  })
                }
              </div>
              </>
            )}
            </div>
          </Modal>
        }
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="mt-2.5">
            <label
              className="block w-full rounded-md bg-pink-200 px-3.5 py-2 text-base text-gray-900 font-extrabold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
            Today's Highlight
            </label>
          </div>
          <div className="grid grid-cols-1 gap-x-8 lg:gap-x-[300px] lg:ml-[-250px] gap-y-6 sm:grid-cols-2 mt-3 basis-1/2">
            <div>
              <label className="block font-semibold text-gray-900 text-xl ml-[225px]">
                Events
              </label>
              <div className="mt-2.5">
                <p
                  className="block w-full lg:w-[500px] lg:h-auto rounded-md bg-pink-200 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  {events.map((eve, index)=>{
                    return(
                    <div key={index} 
                    className="text-black text-[8px] m-[30px] p-[10px] border border-[beige] shadow-[3px_3px_whitesmoke]"
                    onClick={()=>{handleEventDetail(index)}} 
                    >
                      <h1>{eve.description}</h1>
                    </div>
                    )
                  })}
                </p>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-900 text-xl ml-[225px]">
                Births
              </label>
              <div className="mt-2.5">
                <p
                 className="block w-full lg:w-[500px] lg:h-auto rounded-md bg-pink-200 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  {births.map((bir, index)=>{
                    return(
                    <div key={index} 
                    className="text-black text-[8px] m-[30px] p-[10px] border border-[beige] shadow-[3px_3px_whitesmoke]"
                    onClick={()=>handleBirthDetail(index)}
                    >
                      <h1>{bir.description}</h1>
                    </div>
                    )
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
