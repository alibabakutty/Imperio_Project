import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { createNewExecutiveMaster } from "../../../services/MasterService";

const ExecutiveMaster = () => {
  const [executiveCode, setExecutiveCode] = useState("");
  const [executiveMaster, setExecutiveMaster] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const inputRefs = useRef({
    executiveCode: null,
    executiveMaster: null,
    dateOfJoin: null,
    mobileNo: null,
    emailId: null,
    status: null,
    acceptButton: null,
  });

  const acceptButtonRef = useRef(null);
  const yesQuitButtonRef = useRef(null);
  const cancelModalConfirmRef = useRef(null);

  const navigator = useNavigate();

  const pulseCursor = (input) => {
    const value = input.value;
    if (value) {
      input.value = "";
      setTimeout(() => {
        input.value = value.charAt(0).toUpperCase() + value.slice(1);
        setSelectionRange(0, 0);
      }, 0);
    }
  };

  useEffect(() => {
    // Focus on the first input element after the component mounts
    if (inputRefs.current.executiveCode) {
      inputRefs.current.executiveCode.focus();
      pulseCursor(inputRefs.current.executiveCode);
    }

    // Add event listener for Ctrl + B to go back
    const handleCtrlB = (event) => {
      const {ctrlKey, key} = event;
      if((ctrlKey && key === 'q') || key === 'Escape'){
        event.preventDefault();
        setShowModal(true);
      }
    };

    const handleCtrlA = (event) => {
        if(event.ctrlKey && event.key === 'a'){
            event.preventDefault();
            acceptButtonRef.current.click();
            saveExecutiveMaster(event);
        }
    };

    document.addEventListener("keydown", handleCtrlB);
    document.addEventListener("keydown", handleCtrlA);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleCtrlB);
      document.removeEventListener('keydown',handleCtrlA);
    };
  }, [navigator]);

  useEffect(() => {
    if (showModal) {
      yesQuitButtonRef.current.focus();
      const handleModalKeyDown = (event) => {
        if (event.key.toLowerCase() === "y") {
          handleModalConfirm();
        } else if (event.key === "n") {
          handleModalClose();
        } else if (event.key === "ArrowLeft") {
          cancelModalConfirmRef.current.focus();
        } else if (event.key === "ArrowRight") {
          yesQuitButtonRef.current.focus();
        }
      };

      document.addEventListener("keydown", handleModalKeyDown);

      return () => {
        document.removeEventListener("keydown", handleModalKeyDown);
      };
    }
  }, [showModal]);

  const handleKeyDown = (event) => {
    const { keyCode, target } = event;

    if (keyCode === 13) {
      event.preventDefault();
      if (target.id === 'executiveCode' && !executiveCode.trim()){
        // executivecode is empty, do not proceed to the next input
        return;
      }
      const currentInputIndex = Object.keys(inputRefs.current).findIndex(
        (key) => key === target.id
      );
      if (currentInputIndex === Object.keys(inputRefs.current).length - 2) {
        acceptButtonRef.current.focus();
      } else {
        const nextInputRef = Object.values(inputRefs.current)[
          currentInputIndex + 1
        ];
        nextInputRef.focus();
        pulseCursor(nextInputRef);
      }
    } else if (keyCode === 27) {
      setShowModal(true);
    } else if (keyCode === 8 && target.id !== "executiveCode") {
      if (target.selectionStart === 0 && target.selectionEnd === 0) {
        event.preventDefault();
        const currentInputIndex = Object.keys(inputRefs.current).findIndex(
          (key) => key === target.id
        );
        const prevInputIndex =
          (currentInputIndex - 1 + Object.keys(inputRefs.current).length) %
          Object.keys(inputRefs.current).length;
        const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];
        prevInputRef.focus();
        pulseCursor(prevInputRef);
      }
    }
  };

  function saveExecutiveMaster(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const executive = {
      executiveCode,
      executiveMaster,
      dateOfJoin,
      mobileNo,
      emailId,
      status,
    };

    console.log(executive);

    createNewExecutiveMaster(executive)
      .then((response) => {
        console.log(response.data);
        navigator('/create')
      })
      .catch((error) => {
        console.error("Error creating executive master:", error);
      });
  }

  const handleModalClose = () => {
    setShowModal(false);

    if (inputRefs.current.executiveCode) {
      inputRefs.current.executiveCode.focus();
      pulseCursor(inputRefs.current.executiveCode);
    }
  };

  const handleModalConfirm = () => {
    navigator("/create");
  };

  //Function to format date input
  const formatDateInput = (value) => {
    const datePattern = /(\d{1,2})[./-](\d{1,2})[./-](\d{2})/;
    const match = value.match(datePattern);

    if (match) {
      const day = match[1];
      const month = match[2];
      const year = match[3];

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const formattedMonth = months[parseInt(month, 10) - 1];

      if (formattedMonth) {
        return `${day}-${formattedMonth}-20${year}`;
      }
    }
    return value;
  };

  //Handle date input change
  const handleDateInputChange = (e) => {
    const value = e.target.value;

    //Format the input value using formatDateInput function
    const formattedValue = formatDateInput(value);
    setDateOfJoin(formattedValue);
  };

  return (
    <>
      <div className="w-1/2 border h-[100vh]" onClick={() => inputRefs.current.executiveCode.focus()}>
        <div className="w-[550px] h-[30px] flex justify-between text-[20px] bg-[#F1E5D1] ml-[750px] mt-10 border border-gray-500 border-b-0">
          <h2 className="ml-[200px]">Executive Master</h2>
          <span className="cursor-pointer mt-[5px] mr-2">
            <Link to={"/create"}>
              <IoClose />
            </Link>
          </span>
        </div>

        <div className="w-[550px] h-[30vh] border border-gray-500 ml-[750px] ">
          <form>
            <div className="input-ldgr  mr-4 mt-3 ">
              <label htmlFor="executiveCode" className="text-sm mr-[30px] ml-2">
                Executive Code
              </label>
              :{" "}
              <input
                type="text"
                id="executiveCode"
                name="executiveCode"
                value={executiveCode}
                onChange={(e) => setExecutiveCode(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => {
                  inputRefs.current.executiveCode = input;
                }}
                className="w-[300px] ml-[6px] h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none "
                autoComplete="off"
              />{" "}
              <br />
            </div>

            <div className="input-ldgr  mr-4 mt-1 ">
              <label
                htmlFor="executiveMaster"
                className="text-sm mr-[21px] ml-2"
              >
                Executive Master
              </label>
              :{" "}
              <input
                type="text"
                id="executiveMaster"
                name="executiveMaster"
                value={executiveMaster}
                onChange={(e) => setExecutiveMaster(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => (inputRefs.current.executiveMaster = input)}
                className="w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                autoComplete="off"
              />
            </div>

            <div className="input-ldgr    ">
              <label htmlFor="dateOfJoin" className="text-sm mr-[54px] ml-2">
                Date of Join
              </label>
              :{" "}
              <input
                type="text"
                id="dateOfJoin"
                name="dateOfJoin"
                value={dateOfJoin}
                onChange={(e) => {
                  setDateOfJoin(e.target.value);
                  handleDateInputChange(e);
                }}
                onKeyDown={handleKeyDown}
                ref={(input) => (inputRefs.current.dateOfJoin = input)}
                className="w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                autoComplete="off"
              />
            </div>

            <div className="input-ldgr    ">
              <label htmlFor="mobileNo" className="text-sm mr-[64px] ml-2">
                Mobile No
              </label>
              :{" "}
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => (inputRefs.current.mobileNo = input)}
                className="w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                autoComplete="off"
              />
            </div>

            <div className="input-ldgr    ">
              <label htmlFor="emailId" className="text-sm mr-[77px] ml-2">
                Email ID
              </label>
              :{" "}
              <input
                type="text"
                id="emailId"
                name="emailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => (inputRefs.current.emailId = input)}
                className="w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                autoComplete="off"
              />
            </div>

            <div className="input-ldgr    ">
              <label htmlFor="status" className="text-sm mr-[89px] ml-2">
                Status
              </label>
              :{" "}
              <input
                type="text"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={(input) => (inputRefs.current.status = input)}
                className="w-[300px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200  focus:border focus:border-blue-500 focus:outline-none"
                autoComplete="off"
              />
            </div>

            
          </form>
        </div>

        <div className="mt-[323px] ml-[805px]">
              <input
                type="button"
                id="acceptButton"
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    e.preventDefault();
                    if (
                      inputRefs.current.status &&
                      inputRefs.current.status.focus
                    ) {
                      inputRefs.current.status.focus();
                    }
                  }
                }}
                value={": Accept"}
                ref={(button) => {
                  acceptButtonRef.current = button;
                }}
                onClick={(e) => {
                  saveExecutiveMaster(e);
                }}
                className="text-sm px-8 py-1 border bg-slate-600 hover:bg-slate-800 relative"
              />
              <span className="text-sm absolute top-[590px] left-[828px] underline decoration-black" style={{textDecorationThickness: '2px'}}>A</span>
            </div>

        <div className="absolute left-[350px] top-[590px]">
          <Link
            to={"/create"}
            className="px-10 py-1 text-sm bg-slate-600 hover:bg-slate-800 ml-[100px]"
          >
            <span className="border-b-2 border-black">Q</span> : Quit
          </Link>
        </div>

        {/* Modal */}

        {showModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Quit Confirmation
                      </h3>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure want to quit without saving changes?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleModalConfirm}
                    ref={yesQuitButtonRef}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring- ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Yes, Quit
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    ref={cancelModalConfirmRef}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExecutiveMaster;
