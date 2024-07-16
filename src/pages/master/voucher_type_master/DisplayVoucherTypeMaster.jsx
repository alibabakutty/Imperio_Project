import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

const DisplayVoucherTypeMaster = () => {
  const { voucherTypeName, voucherType } = useParams();

  const [voucher, setVoucher] = useState({
    voucherTypeName: "",
    voucherType: "",
    methodOfVoucherNumbering: "",
    alterAdditionalNumberingDetails: "",
    printingVoucherAfterSaving: "",
    nameOfClass: "",
  });

  const inputRefs = useRef({
    voucherTypeName: null,
    voucherType: null,
    methodOfVoucherNumbering: null,
    alterAdditionalNumberingDetails: null,
    startingNumber: null,
    widthOfNumericalPart: null,
    prefillWithZero: null,
    restartNumberingApplicationForm: null,
    restartNumberingStartingNumber: null,
    restartNumberingPeriodicity: null,
    prefixDetailsApplicationForm: null,
    prefixDetailsParticulars: null,
    suffixDetailsApplicationForm: null,
    suffixDetailsParticulars: null,
    printingVoucherAfterSaving: null,
    nameOfClass: null,
    backButton: null,
  });

  const backButtonRef = useRef(null);
  const yesQuitButtonRef = useRef(null);
  const cancelModalConfirmRef = useRef(null);
  const subFormSaveButtonRef = useRef(null);
  const subFormCancelButtonRef = useRef(null);
  const startingNumberRef = useRef(null);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSubFormModal, setShowSubFormModal] = useState(false);

  const pulseCursor = (input) => {
    const value = input.value;
    if (value) {
      input.value = "";
      setTimeout(() => {
        input.value = value.charAt(0).toUpperCase() + value.slice(1);
        input.setSelectionRange(0, 0);
      }, 0);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setVoucher({ ...voucher, [name]: capitalizedValue });
  };

  const handleNavigation = () => {
    navigate("/display/voucherTypeFilter");
  };

  useEffect(() => {
    if (inputRefs.current.voucherTypeName) {
      inputRefs.current.voucherTypeName.focus();
      pulseCursor(inputRefs.current.voucherTypeName);
    }

    if (showSubFormModal) {
      startingNumberRef.current.focus();
    }

    if (voucherTypeName) {
      loadVoucherTypeName();
    }

    if (voucherType) {
      loadVoucherType();
    }

    const handleKeyDown = (event) => {
      const { ctrlKey, key } = event;
      if ((ctrlKey && key === "q") || key === "Escape") {
        event.preventDefault();
        setShowModal(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [voucherTypeName, voucherType, showSubFormModal]);

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
      // Enter key
      event.preventDefault();

      if (target.id === "nameOfClass") {
        if (backButtonRef.current && backButtonRef.current.focus) {
          backButtonRef.current.focus();
        }
      } else if (target.id === "alterAdditionalNumberingDetails") {
        if (
          inputRefs.current.printingVoucherAfterSaving &&
          inputRefs.current.printingVoucherAfterSaving.focus
        ) {
          inputRefs.current.printingVoucherAfterSaving.focus();
          pulseCursor(inputRefs.current.printingVoucherAfterSaving);
        }
      } else if (target.id === "suffixDetailsParticulars") {
        if (
          subFormSaveButtonRef.current &&
          subFormSaveButtonRef.current.focus
        ) {
          subFormSaveButtonRef.current.focus();
        }
      } else if (target.id === "subFormSaveButton") {
        handleSubFormSave();
        if (
          inputRefs.current.printingVoucherAfterSaving &&
          inputRefs.current.printingVoucherAfterSaving.focus
        ) {
          inputRefs.current.printingVoucherAfterSaving.focus();
        }
      } else {
        const currentInputIndex = Object.keys(inputRefs.current).findIndex(
          (key) => key === target.id
        );
        const nextInputIndex =
          (currentInputIndex + 1) % Object.keys(inputRefs.current).length;
        const nextInputRef = Object.values(inputRefs.current)[nextInputIndex];

        if (nextInputRef && nextInputRef.focus) {
          nextInputRef.focus();
          pulseCursor(nextInputRef);
        }
      }
    } else if (keyCode === 27) {
      // Escape key
      setShowModal(true);
    } else if (keyCode === 8 && target.id !== "voucherTypeName") {
      // Backspace key
      if (target.selectionStart === 0 && target.selectionEnd === 0) {
        event.preventDefault();

        if (target.id === "printingVoucherAfterSaving") {
          if (
            inputRefs.current.alterAdditionalNumberingDetails &&
            inputRefs.current.alterAdditionalNumberingDetails.focus
          ) {
            inputRefs.current.alterAdditionalNumberingDetails.focus();
            pulseCursor(inputRefs.current.alterAdditionalNumberingDetails);
          }
        } else if (target.id === "acceptButton") {
          if (
            inputRefs.current.nameOfClass &&
            inputRefs.current.nameOfClass.focus
          ) {
            inputRefs.current.nameOfClass.focus();
            pulseCursor(inputRefs.current.nameOfClass);
          }
        } else {
          const currentInputIndex = Object.keys(inputRefs.current).findIndex(
            (key) => key === target.id
          );
          const prevInputIndex =
            (currentInputIndex - 1 + Object.keys(inputRefs.current).length) %
            Object.keys(inputRefs.current).length;
          const prevInputRef = Object.values(inputRefs.current)[prevInputIndex];

          if (prevInputRef && prevInputRef.focus) {
            prevInputRef.focus();
            pulseCursor(prevInputRef);
          }
        }
      }
    } else if (target.id === "alterAdditionalNumberingDetails") {
      // Specific handling for alterAdditionalNumberingDetails input
      if (keyCode === 89 || keyCode === 121) {
        // 'Y' or 'y' key
        event.preventDefault();

        setVoucher({ ...voucher, alterAdditionalNumberingDetails: "no" });
        setShowSubFormModal(true);
      } else if (keyCode === 78 || keyCode === 110) {
        // 'N' or 'n' key
        event.preventDefault();

        setVoucher({ ...voucher, alterAdditionalNumberingDetails: "no" });
        const nextInputRef = inputRefs.current.printingVoucherAfterSaving;
        if (nextInputRef && nextInputRef.focus) {
          nextInputRef.focus();
          pulseCursor(nextInputRef);
        }
      }
    } else if (target.id === "printingVoucherAfterSaving") {
      // Specific handling for printingVoucherAfterSaving input
      if (keyCode === 89 || keyCode === 121) {
        // 'Y' or 'y' key
        event.preventDefault();

        setVoucher({ ...voucher, printingVoucherAfterSaving: "yes" });
      } else if (keyCode === 78 || keyCode === 110) {
        // 'N' or 'n' key
        event.preventDefault();

        setVoucher({ ...voucher, printingVoucherAfterSaving: "no" });
      }
    }
  };

  const loadVoucherTypeName = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9080/voucherTypeMasterApi/displayVoucher/${voucherTypeName}`
      );
      console.log(result.data);
      setVoucher(result.data);
    } catch (error) {
      console.error("Error fetching voucher type name data:", error);
    }
  };

  const loadVoucherType = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9080/voucherTypeApi/displayVoucherType/${voucherType}`
      );
      console.log(result.data);
      setVoucher(result.data);
    } catch (error) {
      console.error("Error fetching voucher type data:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);

    if (inputRefs.current.voucherTypeName) {
      inputRefs.current.voucherTypeName.focus();
      pulseCursor(inputRefs.current.voucherTypeName);
    }
  };

  const handleModalConfirm = () => {
    navigate("/display/voucherTypeFilter");
  };

  const handleSubFormSave = () => {
    setVoucher({
      ...voucher,
      alterAdditionalNumberingDetails: "saved",
    });
    setShowSubFormModal(false);
  };

  const handleSubFormCancel = () => {
    setVoucher({
      ...voucher,
      alterAdditionalNumberingDetails: "cancelled",
    });
    setShowSubFormModal(false);
  };

  return (
    <div>
      <div className="#FFF5E1 w-[90%] h-[95vh]">
        <div className="text-[12px] flex justify-between bg-[#80C4E9]">
          <p className="ml-1 mt-[1px]">Voucher Type Display</p>
          <span>
            <Link to={"/display/voucherTypeFilter"}>
              <IoClose />
            </Link>
          </span>
        </div>

        <div className="text-sm border border-slate-500">
          <form action="">
            <div className="w-[100%] h-[10vh] border border-b-slate-500">
              <label htmlFor="voucherTypeName" className="mr-5 mt-3 ml-1">
                Name
              </label>
              :{" "}
              <input
                type="text"
                id="voucherTypeName"
                name="voucherTypeName"
                value={voucher.voucherTypeName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={(input) => {
                  inputRefs.current.voucherTypeName = input;
                }}
                className="w-[300px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                autoComplete="off"
              />
            </div>

            <div className="flex text-sm h-[75vh]">
              <div className="general w-[45%] border border-r-slate-500">
                <p className="underline text-center">General</p>

                <div>
                  <label htmlFor="voucherType" className="mr-[130px] ml-1">
                    Select type of voucher
                  </label>
                  :{" "}
                  <input
                    type="text"
                    id="voucherType"
                    name="voucherType"
                    value={voucher.voucherType}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    ref={(input) => (inputRefs.current.voucherType = input)}
                    className="w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="methodOfVoucherNumbering"
                    className="mr-[77.5px] ml-1"
                  >
                    Method of Voucher Numbering
                  </label>
                  :{" "}
                  <input
                    type="text"
                    id="methodOfVoucherNumbering"
                    name="methodOfVoucherNumbering"
                    value={voucher.methodOfVoucherNumbering}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    ref={(input) =>
                      (inputRefs.current.methodOfVoucherNumbering = input)
                    }
                    className="w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="alterAdditionalNumberingDetails"
                    className="mr-[36px] ml-1"
                  >
                    Set/Alter additional numbering details
                  </label>
                  :{" "}
                  <input
                    type="text"
                    id="alterAdditionalNumberingDetails"
                    name="alterAdditionalNumberingDetails"
                    value={voucher.alterAdditionalNumberingDetails}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    ref={(input) =>
                      (inputRefs.current.alterAdditionalNumberingDetails =
                        input)
                    }
                    className="w-[100px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                    autoComplete="off"
                  />
                  {showSubFormModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-end justify-center">
                        <div
                          className="fixed inset-0 transition-opacity"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                          className="hidden sm:inline-block"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>

                        <form action="">
                          <div className="inline-block bg-white transform">
                            <div className="mt-2 w-[1100px] h-[93vh] ">
                              <div className="ml-2">
                                <label
                                  htmlFor="startingNumber"
                                  className="mr-14"
                                >
                                  Starting Number
                                </label>
                                :{" "}
                                <input
                                  type="text"
                                  id="startingNumber"
                                  name="startingNumber"
                                  value={voucher.startingNumber}
                                  onChange={handleChange}
                                  onKeyDown={handleKeyDown}
                                  ref={(input) => {
                                    inputRefs.current.startingNumber = input;
                                    startingNumberRef.current = input;
                                  }}
                                  className="w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                  autoComplete="off"
                                />
                              </div>

                              <div className="ml-2">
                                <label
                                  htmlFor="widthOfNumericalPart"
                                  className="mr-[11px]"
                                >
                                  Width of Numerical Part
                                </label>
                                :{" "}
                                <input
                                  type="text"
                                  id="widthOfNumericalPart"
                                  name="widthOfNumericalPart"
                                  value={voucher.widthOfNumericalPart}
                                  onChange={handleChange}
                                  onKeyDown={handleKeyDown}
                                  ref={(input) => {
                                    inputRefs.current.widthOfNumericalPart =
                                      input;
                                  }}
                                  className="w-[80px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                  autoComplete="off"
                                />
                              </div>

                              <div className="ml-2">
                                <label
                                  htmlFor="prefillWithZero"
                                  className="mr-[64.5px]"
                                >
                                  Prefil with Zero
                                </label>
                                :{" "}
                                <input
                                  type="text"
                                  id="prefillWithZero"
                                  name="prefillWithZero"
                                  value={voucher.prefillWithZero}
                                  onChange={handleChange}
                                  onKeyDown={handleKeyDown}
                                  ref={(input) => {
                                    inputRefs.current.prefillWithZero = input;
                                  }}
                                  className="w-[80px] ml-2 mb-1 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                  autoComplete="off"
                                />
                              </div>

                              <div className="flex justify-evenly text-center border border-gray-400 w-[99%] h-[83vh] ml-[5px]">
                                <div className="w-[360px] border border-r-slate-400">
                                  <div className="border border-b-slate-400">
                                    <p>Restart Numbering</p>
                                  </div>

                                  <div className="flex justify-evenly border border-b-gray-400">
                                    <p>
                                      Applicable <br />
                                      Form
                                    </p>
                                    <p>
                                      Starting <br />
                                      Number
                                    </p>
                                    <p>Periodicity</p>
                                  </div>

                                  <div className="flex justify-evenly">
                                    <div>
                                      <label htmlFor="restartNumberingApplicationForm"></label>
                                      <input
                                        type="text"
                                        id="restartNumberingApplicationForm"
                                        name="restartNumberingApplicationForm"
                                        onKeyDown={handleKeyDown}
                                        value={
                                          voucher.restartNumberingApplicationForm
                                        }
                                        onChange={handleChange}
                                        ref={(input) => {
                                          inputRefs.current.restartNumberingApplicationForm =
                                            input;
                                        }}
                                        className="w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="restartNumberingStartingNumber"></label>
                                      <input
                                        type="text"
                                        id="restartNumberingStartingNumber"
                                        name="restartNumberingStartingNumber"
                                        onKeyDown={handleKeyDown}
                                        value={
                                          voucher.restartNumberingStartingNumber
                                        }
                                        onChange={handleChange}
                                        ref={(input) => {
                                          inputRefs.current.restartNumberingStartingNumber =
                                            input;
                                        }}
                                        className="w-[70px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="restartNumberingPeriodicity"></label>
                                      <input
                                        type="text"
                                        id="restartNumberingPeriodicity"
                                        name="restartNumberingPeriodicity"
                                        onKeyDown={handleKeyDown}
                                        value={
                                          voucher.restartNumberingPeriodicity
                                        }
                                        onChange={handleChange}
                                        ref={(input) => {
                                          inputRefs.current.restartNumberingPeriodicity =
                                            input;
                                        }}
                                        className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="w-[360px] border border-r-slate-400">
                                  <div className="border border-b-slate-400">
                                    <p>Prefix Details</p>
                                  </div>

                                  <div className="flex justify-evenly border border-b-gray-400">
                                    <p>
                                      Application <br />
                                      Form
                                    </p>
                                    <p>Particulars</p>
                                  </div>

                                  <div className="flex justify-evenly">
                                    <div>
                                      <label htmlFor="prefixDetailsApplicationForm"></label>
                                      <input
                                        type="text"
                                        id="prefixDetailsApplicationForm"
                                        name="prefixDetailsApplicationForm"
                                        value={
                                          voucher.prefixDetailsApplicationForm
                                        }
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        ref={(input) => {
                                          inputRefs.current.prefixDetailsApplicationForm =
                                            input;
                                        }}
                                        className="w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="prefixDetailsParticulars"></label>
                                      <input
                                        type="text"
                                        id="prefixDetailsParticulars"
                                        name="prefixDetailsParticulars"
                                        value={voucher.prefixDetailsParticulars}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        ref={(input) => {
                                          inputRefs.current.prefixDetailsParticulars =
                                            input;
                                        }}
                                        className="w-[100px] ml-2 h-5 text-left capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <div className="w-[360px] border border-b-slate-400">
                                    <p>Suffix Details</p>
                                  </div>

                                  <div className="flex justify-evenly border border-b-gray-400">
                                    <p>
                                      Application <br />
                                      Form
                                    </p>
                                    <p>Particulars</p>
                                  </div>

                                  <div className="flex justify-evenly">
                                    <div>
                                      <label htmlFor="suffixDetailsApplicationForm"></label>
                                      <input
                                        type="text"
                                        id="suffixDetailsApplicationForm"
                                        name="suffixDetailsApplicationForm"
                                        value={
                                          voucher.suffixDetailsApplicationForm
                                        }
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        ref={(input) => {
                                          inputRefs.current.suffixDetailsApplicationForm =
                                            input;
                                        }}
                                        className="w-[100px] ml-2 h-5 text-right capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                      />
                                    </div>

                                    <div>
                                      <label htmlFor="suffixDetailsParticulars"></label>
                                      <input
                                        type="text"
                                        id="suffixDetailsParticulars"
                                        name="suffixDetailsParticulars"
                                        value={voucher.suffixDetailsParticulars}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        ref={(input) => {
                                          inputRefs.current.suffixDetailsParticulars =
                                            input;
                                        }}
                                        className="w-[100px] ml-2 h-5 text-left capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <button
                                type="submit"
                                onClick={handleSubFormSave}
                                ref={subFormSaveButtonRef}
                                className="text-sm px-8 py-1 border bg-slate-600 hover:bg-slate-800 ml-[315px]"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={handleSubFormCancel}
                                ref={subFormCancelButtonRef}
                                className="text-sm px-8 py-1 border bg-slate-600 hover:bg-slate-800 ml-[260px]"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="printing w-[30%] border border-r-slate-500">
                <p className="underline text-center">Printing</p>

                <div>
                  <label
                    htmlFor="printingVoucherAfterSaving"
                    className="mr-2 ml-2"
                  >
                    Printing voucher after saving
                  </label>
                  :{" "}
                  <input
                    type="text"
                    id="printingVoucherAfterSaving"
                    name="printingVoucherAfterSaving"
                    value={voucher.printingVoucherAfterSaving}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    ref={(input) =>
                      (inputRefs.current.printingVoucherAfterSaving = input)
                    }
                    className="w-[100px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="nameOfClass w-[20%]">
                <p className="underline text-center">Name of Class</p>

                <div className="text-center">
                  <input
                    type="text"
                    id="nameOfClass"
                    name="nameOfClass"
                    value={voucher.nameOfClass}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    ref={(input) => (inputRefs.current.nameOfClass = input)}
                    className="w-[200px] ml-2 mt-3 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          {/* <Link to={"/voucherTypeFilter"} id='backButton' ref={(button) => {backButtonRef.current = button; inputRefs.current.backButton = button; }} className='border px-11 py-[5px] text-sm bg-slate-600 hover:bg-slate-800  ml-[600px]' >Q: Quit</Link> */}
          <input
            type="button"
            id="backButton"
            className="text-sm px-8 py-1 mt-3 border bg-slate-600 hover:bg-slate-800"
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault();
                if (
                  inputRefs.current.nameOfClass &&
                  inputRefs.current.nameOfClass.focus
                ) {
                  inputRefs.current.nameOfClass.focus();
                }
              }
            }}
            value={"Q: Quit"}
            ref={(button) => {
              backButtonRef.current = button;
            }}
            onClick={handleNavigation}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
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
                        Are you sure you want to quit without saving changes?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  ref={yesQuitButtonRef}
                  onClick={handleModalConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes, Quit
                </button>
                <button
                  type="button"
                  ref={cancelModalConfirmRef}
                  onClick={handleModalClose}
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
  );
};

export default DisplayVoucherTypeMaster;
