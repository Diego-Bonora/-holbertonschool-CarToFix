import React from 'react'

import CreatableSelect from 'react-select/creatable';

const options = [
	{ value: 'Option 1', label: 'Option 1' },
	{ value: 'Option 2', label: 'Option 2' },
	{ value: 'Option 3', label: 'Option 3' }
]



export default () => <CreatableSelect className='bg-[#B4D1D3] p-1 my-4' name="Services" id="title" isClearable options={options} />;



// import React from 'react';

// import AsyncSelect from 'react-select/async';
// import { ColourOption, colourOptions } from '../data';

// const filterColors = (inputValue: string) => {
// 	return colourOptions.filter((i) =>
// 		i.label.toLowerCase().includes(inputValue.toLowerCase())
// 	);
// };

// const loadOptions = (
// 	inputValue: string,
// 	callback: (options: ColourOption[]) => void
// ) => {
// 	setTimeout(() => {
// 		callback(filterColors(inputValue));
// 	}, 1000);
// };

// export default () => (
// 	<AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />
// );
