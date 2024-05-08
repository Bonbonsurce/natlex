import React from 'react';
import MySelect from "./select/MySelect";

const ChartsFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sort"
                options={[
                    {value: 'newest', name: 'By date (to newest)'},
                    {value: 'oldest', name: 'By date (to oldest)'}
                ]}
            />
        </div>
    );
};

export default ChartsFilter;