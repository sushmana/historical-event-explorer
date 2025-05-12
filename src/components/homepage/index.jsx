import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { MdLightMode, MdDarkMode, MdOutlineConstruction } from "react-icons/md";
import { getEvent, getBirth, clearEvent, clearBirth } from "/src/redux/slice/historicalSlice";
import Modal from '../common/modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setUseStrictShallowCopy } from "immer";

const Homepage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.historicalReducer.events).flat();
  const births = useSelector((state) => state.historicalReducer.births).flat();

  console.log("events", events);
  console.log("births", births);

  const [bookmarkedItem, setBookmarkedItem] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [generateTitle, setGenerateTitle] = useState();
  const month = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showBirths, setShowBirths] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDDMM, setSelectedDDMM] = useState({ DD:currentDate.getDate() , MM:currentDate.getMonth(),});
  const [eventDetail, setEventDetail] = useState();  
  const [birthDetail, setBirthDetail] = useState();
  const [isAlreadyBookmarked,setIsAlreadyBookmarked] = useState(false);
const handleBookmark = () => {
  const storedBookmarks = JSON.parse(localStorage.getItem("bookmarked")) || [];

  setIsAlreadyBookmarked(storedBookmarks.some(
    (b) => new Date(b.date).toDateString() === new Date(currentDate).toDateString()
  ));

  if (!isAlreadyBookmarked) {
    const newBookmark = {
      date: currentDate,
      event: events,
      birth: births,
    };

    const updatedBookmarks = [...storedBookmarks, newBookmark];

    setBookmarkedItem(updatedBookmarks); // update local state
    localStorage.setItem("bookmarked", JSON.stringify(updatedBookmarks)); // update storage
  } else {
    console.log("This date is already bookmarked.");
  }
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
    const mm = String(currentDate.getMonth()+1);

    setGenerateTitle(`Today is ${day} ${month[mm]}`);
    setSelectedDDMM({ DD: day, MM: mm });
    }
    dispatch(clearEvent());
    dispatch(clearBirth());
    dispatch(getEvent(selectedDDMM));
    dispatch(getBirth(selectedDDMM));
  }, [currentDate]);

  useEffect(()=>{
    if(selectedDDMM.DD === "" || selectedDDMM.MM === "") return;
    dispatch(clearEvent());
    dispatch(clearBirth());
    dispatch(getEvent(selectedDDMM));
    dispatch(getBirth(selectedDDMM));
  },[])

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

  const handleDateSelect = (date) =>{
  // Optionally close the date picker modal after selection
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
            {showDatePicker &&
             <DatePicker inline className= "text-black" selected={currentDate} onChange={(date)=>setCurrentDate(date)} onSelect={(date)=>handleDateSelect(date)}/>}
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
                <div
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
                </div>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-900 text-xl ml-[225px]">
                Births
              </label>
              <div className="mt-2.5">
                <div
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
