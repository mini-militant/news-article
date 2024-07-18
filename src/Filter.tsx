import React from 'react';

interface FilterProps {
    filterData: string[];
    handleFilterChange: (category: string) => void;
    title: string;
}

const Filter: React.FC<FilterProps> = ({ filterData, handleFilterChange, title }) => {
    return (
        <div className='pb-2 text-left'>
            <div className='bg-gray-100 font-semibold p-2 mb-2'>{title}</div>
            {filterData?.map((item) => (
                <div className='flex flex-col px-2 text-sm'>
                    <label key={item}>
                        <input
                            type="checkbox"
                            value={item}
                            onChange={() => handleFilterChange(item)}
                        />
                        <span className='pl-2'>{item}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Filter;
