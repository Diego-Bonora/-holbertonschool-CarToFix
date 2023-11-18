{/*import React, { useState } from "react";
import DetailsModal from "../Components/DetailsModal";
import SpecificBudget from "../Components/SpecificBudget";
import { useParams } from "react-router-dom";

const modalState = (displayModal) => {
    console.log('hjedhes', modalState);
		if (displayModal === 'active') {
			setmodalDisplayMode('active')
		}
		if (displayModal === 'none') {
			setmodalDisplayMode('none')
		}
	}

    export default function SpecifyBudgetPages() {
        const { serviceId } = useParams();
        
        const [modalDisplayMode , setmodalDisplayMode] = useState('none')
    
    return (
        <>
        <DetailsModal serviceId={serviceId} display={modalDisplayMode} modalState={(displayModal) => modalState(displayModal, () => { })}/>

        <SpecificBudget modalState={() => modalState()}/>
    </>
        )
} */}