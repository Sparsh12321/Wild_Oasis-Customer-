"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function createBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const formEntries = Object.fromEntries(formData.entries());

  let {
    startDate,
    endDate,
    numNights,
    CabinPrice,
    cabinId,
    numGuests,
    observations,
  } = formEntries;
  CabinPrice = Number(CabinPrice);
  cabinId = Number(cabinId);
  numGuests = Number(numGuests);
  numNights = Number(numNights);
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const boookingData = {
    startDate,
    endDate,
    numNights,
    numGuests,
    observations,
    cabinPrice: CabinPrice,
    extrasPrice: 0,
    totalPrice: CabinPrice,
    hasBreakfast: false,
    isPaid: false,
    guestId: session.user.guestId,
    status: "unconfirmed",
    cabinId,
  };

  const { error } = await supabase.from("Bookings").insert([boookingData]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid National ID");
  const updateData = { nationality, nationalID, countryFlag };
  console.log(updateData);

  const { error } = await supabase
    .from("Guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  const { error } = await supabase
    .from("Bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");
  const bookingId = Number(formData.get("bookingId"));
  const updateData = { numGuests, observations };
  console.log(updateData);
  const { error } = await supabase
    .from("Bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be Updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
