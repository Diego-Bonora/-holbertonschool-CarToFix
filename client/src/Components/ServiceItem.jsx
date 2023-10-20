import React from 'react'
import Button from './button'

export default function ServiceItem({ item, price }) {
	return (
		<>
			<div className='h-fit justify-between'>
				<div className='flex'>
					<div className='w-full'>
						<p> {item} </p>
					</div>
					<div className='flex w-full justify-end mr-4'>
						<p> {price} </p>
					</div>
					<div className='flex justify-end'>
						<Button children="ver" size="mini" color="blue" />
					</div>
				</div>
			</div>
		</>
	)
}
