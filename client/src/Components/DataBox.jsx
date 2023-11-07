import React from 'react'

import Button from './button';

export default function DataBox({ title, info }) {


	console.log(info[0]);
	return (
		<div className="principal p-2 mt-10 w-96 flex flex-col  bg-[#09B6C2] rounded-lg">
			<div className="title h-10">
				<h3 className='text-lg text-center'>{title}</h3>
			</div>
			<div className="data col-span-1  w-92 flex flex-col justify-center align-top items-center bg-[#FFF] rounded-b-lg">
				<table className='text-black w-92 my-5'>
					<thead>
						<tr>
							<th className='px-3'>Matricula</th>
							<th className='px-3'>Detalle</th>
						</tr>
					</thead>
					<tbody>
						{
							info.map((i, index) => {
								return (
									<>
										<tr className='text-black'>
											<td className='px-3'>{i.matricula}</td>
											<td className='px-3'>{i.detalle}</td>
											<td className='px-3'> <Button children="ver" color="orange" size="mini" /> </td>
										</tr>


									</>
								)
							}
							)
						}

					</tbody>
				</table>

			</div>
		</div >
	)
}
