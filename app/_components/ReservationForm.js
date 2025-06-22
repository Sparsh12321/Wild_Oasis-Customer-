"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import CreateButton from "@/app/_components/CreateButton";
function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const CabinPrice =
    numNights && regularPrice != null && discount != null
      ? numNights * (regularPrice - discount)
      : 0;

  const isReady = startDate && endDate;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        // action={createBooking}
        action={async (formData) => {
          await createBooking(formData);
          resetRange();
        }}
      >
        {/* Hidden Inputs for Dates & Price */}
        {isReady && (
          <>
            <input
              type="hidden"
              name="startDate"
              value={startDate.toISOString()}
            />
            <input type="hidden" name="endDate" value={endDate.toISOString()} />
            <input type="hidden" name="numNights" value={numNights} />
            <input type="hidden" name="CabinPrice" value={CabinPrice} />
            <input type="hidden" name="cabinId" value={id} />
          </>
        )}

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!isReady && (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}

          {startDate && endDate && (
            <>
              <p className="text-primary-300 text-base">
                {numNights} night(s), ₹{CabinPrice}
              </p>
              <CreateButton />
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
