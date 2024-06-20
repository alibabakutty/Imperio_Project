import React, { useState, useRef, useEffect } from 'react';

const ConditionalRenderingP = () => {
    const [selectedPeriodicity, setSelectedPeriodicity] = useState("Yearly");
    const [showPeriodicityOptions, setShowPeriodicityOptions] = useState(false);
    const [otherInputValue, setOtherInputValue] = useState('');
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
            case 'Enter':
                e.preventDefault();
                setSelectedPeriodicity(options[currentIndex].textContent);
                setShowPeriodicityOptions(false);
                break;
            case 'Escape':
                setShowPeriodicityOptions(false);
                break;
            default:
                break;
        }
    };

    // Handle outside click to hide options
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

    const renderOptions = () => {
        const periodicities = ["Daily", "Monthly", "Never", "Weekly", "Yearly"];
        return periodicities.map((periodicity) => (
            <p
                key={periodicity}
                onClick={() => handlePeriodicityClick(periodicity)}
                className="w-[135px] h-5 pl-1 text-sm focus:bg-yellow-200 focus:outline-none"
                tabIndex="0"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handlePeriodicityClick(periodicity);
                    }
                }}
            >
                {periodicity}
            </p>
        ));
    };

    // Function to format date input
    const formatDateInput = (value) => {
        const datePattern = /(\d{1,2})[./-](\d{1,2})[./-](\d{2})/;
        const match = value.match(datePattern);
        if (match) {
            const day = match[1];
            const month = match[2];
            const year = match[3];

            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            const formattedMonth = months[parseInt(month, 10) - 1];

            if (formattedMonth) {
                return `${day}-${formattedMonth}-${year}`;
            }
        }
        return value;
    };

    // Handle date input change
    const handleOtherInputChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatDateInput(value);
        setOtherInputValue(formattedValue);
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
                    className="w-[10%] border text-sm text-center bg-[#CAF4FF] absolute top-[40px] left-[270px]"
                >
                    <div className="bg-[#003285] px-5 text-white">
                        <p>Periodicity</p>
                    </div>
                    {renderOptions()}
                </div>
            )}

            <div className="mt-4">
                <label htmlFor="otherInput">Others (in Date format)</label>
                <input
                    type="text"
                    id="otherInput"
                    value={otherInputValue}
                    onChange={handleOtherInputChange}
                    className="ml-2 h-5 pl-1 text-sm focus:bg-yellow-200 focus:border focus:border-blue-500 focus:outline-none"
                />
            </div>
        </div>
    );
};

export default ConditionalRenderingP;
