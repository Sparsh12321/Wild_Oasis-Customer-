"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };
export function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ resetRange, range, setRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error("Context Used Outside");
  return context;
}
