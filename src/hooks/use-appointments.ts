"use client"


import { bookAppointment, getAppointments, getBookedTimeSlots, getUserAppointments, updateAppointmentStatus } from "@/lib/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export  function useGetAppointments(){
    const result =useQuery({
        queryKey:['getappointments'],
         queryFn:getAppointments,
    });
    return result;
};

export  function useBookedTimeSlots(doctorId:string,date:string){
    return useQuery({
        queryKey:["getBookedTimeSlots"],
        queryFn:()=>getBookedTimeSlots(doctorId!,date),
        enabled:!!doctorId&&!!date
    });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
    },
    onError: (error) => console.error("Failed to book appointment:", error),
  });
}

export function useUserAppointments() {
  return useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });
}   

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getappointments"] });
    },
    onError: (error) => console.error("Failed to update appointment:", error),
  });
}