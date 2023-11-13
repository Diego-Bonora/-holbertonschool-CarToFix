import React from "react";

export default function FilterService({ typeservice, filterByType, selectedType, classname }) {
	return (
		<div className="lg:mr-10">
			<select
				className={`bg-tabla_service pl-2.5 pr-3 rounded-xl flex border border-gris-background h-8 ${classname}`}
				onChange={(e) => filterByType(e.target.value)}
				value={selectedType}>
				{typeservice.map((type, index) => (
					<option key={index} value={type}>
						{type}
					</option>
				))}
			</select>
		</div>
	);
}