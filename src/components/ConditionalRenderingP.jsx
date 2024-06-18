import React, { useState, useRef, useEffect } from 'react';

const ConditionalRenderingP = () => {
    const [selectedPeriodicity, setSelectedPeriodicity] = useState("Yearly");
    const [showPeriodicityOptions, setShowPeriodicityOptions] = useState(false);
    const optionsRef = useRef(null); // Ref to store the periodicity options div

    // Function to handle arrow key navigation within options
    const handleKeyDown = (e) => {
        if (!showPeriodicityOptions) return;

        const options = optionsRef.current.querySelectorAll('p');
        const currentIndex = Array.from(options).findIndex(option => option.textContent === selectedPeriodicity);

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + options.length) % options.length;
                options[prevIndex].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % options.length;
                options[nextIndex].focus();
                break;
            case 'Escape':
                setShowPeriodicityOptions(false);
                break;
            default:
                break;
        }
    };

    // Focus the input when periodicity options are hidden
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target)) {
                setShowPeriodicityOptions(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        setSelectedPeriodicity(e.target.value);
        setShowPeriodicityOptions(true); // Show the periodicity options when input is changed
    };

    // Handle periodicity option click
    const handlePeriodicityClick = (periodicity) => {
        setSelectedPeriodicity(periodicity);
        setShowPeriodicityOptions(false); // Hide the periodicity options after selection
    };
    

    return (
        <div className="mt-20">
            <label htmlFor="numberingPeriodicity">Numbering Periodicity:</label>
            <input
                type="text"
                id="numberingPeriodicity"
                name="numberingPeriodicity"
                value={selectedPeriodicity}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Handle keyboard navigation
                onFocus={() => setShowPeriodicityOptions(true)} // Show options when input is focused
                className="w-[100px] ml-2 h-5 capitalize font-medium pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
            />

            {showPeriodicityOptions && (
                <div
                    ref={optionsRef}
                    className="w-[10%] border text-sm text-center bg-[#CAF4FF] absolute top-10 left-40"
                    style={{ position: 'absolute', left: '265px' }}
                >
                    <div className="bg-[#003285] px-5 text-white">
                        <p>Periodicity</p>
                    </div>

                    <p onClick={() => handlePeriodicityClick("Daily")} className="cursor-pointer hover:bg-gray-200 py-1">
                        Daily
                    </p>
                    <p onClick={() => handlePeriodicityClick("Monthly")} className="cursor-pointer hover:bg-gray-200 py-1">
                        Monthly
                    </p>
                    <p onClick={() => handlePeriodicityClick("Never")} className="cursor-pointer hover:bg-gray-200 py-1">
                        Never
                    </p>
                    <p onClick={() => handlePeriodicityClick("Weekly")} className="cursor-pointer hover:bg-gray-200 py-1">
                        Weekly
                    </p>
                    <p onClick={() => handlePeriodicityClick("Yearly")} className="cursor-pointer hover:bg-gray-200 py-1">
                        Yearly
                    </p>
                </div>
            )}

            <div>
                <label htmlFor="">Others</label>
                <input type="text" />
            </div>
        </div>
    );
};

export default ConditionalRenderingP;
