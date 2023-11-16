import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Confirmation({ info, columns, titles, ids }) {
	const navigate = useNavigate();

	const handleBudgetButton = (id) => {
		console.log(`button from a budget: ${id}`);
		navigate(`/specificbudget/${id}`);
	};

	return (
		<>
			<div className='col-span-1 flex-col space-y-8 bg-[#FFF] rounded-b-lg overflow-y-scroll overflow-x-hidden md:h-[280px]'>
				<table className='text-black w-full bg-white ml-8 mt-3 '>
					<thead>
						<tr className='w-screen bg-gris-footer'>
							{titles.map((title, index) => (
								<th
									key={index}
									className={`p-1 align-middle flex-row justify-around md:text-lg text-base ${index === 0 ? 'rounded-tl-2xl rounded-bl-2xl border-r-2' : index === columns.length - 1 ? 'rounded-tr-2xl rounded-br-2xl border-l-2' : ''
										}`}
								>
									{title}
								</th>
							))}
						</tr>
						<div className='mb-3'></div>
					</thead>
					<tbody>
						{info.map((data, index) => (
							<tr key={index} className=''>
								{columns.map((column, indexcol) => (
									<td

										key={indexcol}
										className={`p-2 sm:px-3 md:px-4 align-middle  md:text-base text-sm gap-8
									${indexcol === 0 ? ' rounded-tl-2xl rounded-bl-2xl bg-gris-footer border-r-2' : indexcol === columns.length - 1 ? ' rounded-tr-2xl rounded-br-2xl bg-gris-footer border-l-2' : ''} 
									${indexcol === Math.floor(columns.length / 2) ? 'bg-gris-footer' : ''}`}
									>
										{data[column]}

									</td>
								))}
								<td className='p-2 sm:px-8 px-5 align-middle md:text-md text-sm'>
									<button
										type='button'
										className='bg-orange-claro hover:bg-orange-oscuro text-white p-px md:w-14 w-10 items-center'
										onClick={() => handleBudgetButton(ids[index])}
									>
										Ver
									</button>
								</td>

							</tr>
						))}

					</tbody>
				</table>
			</div>
		</>
	);
}
