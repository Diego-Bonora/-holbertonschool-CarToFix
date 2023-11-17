import React from "react";
import { PiVanFill } from "react-icons/pi";
import { FaCarSide } from "react-icons/fa";
import { PiMotorcycleFill } from "react-icons/pi"

export default function TypeVehicleIcons({ TypeVehicle }) {
  switch (TypeVehicle) {
    case 'auto':
      return <FaCarSide />;
    case 'camioneta':
      return <PiVanFill />;
    case 'moto':
      return <PiMotorcycleFill />
    default:
      return null;
  }
}