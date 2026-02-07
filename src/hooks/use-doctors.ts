"use client"

import { createDoctors, getAvailableDoctors, getDoctors, updateDoctors } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export  function useGetDoctors(){
    const result =useQuery({
        queryKey:['getdoctors'],
         queryFn:getDoctors,
    });
    return result;
}

export function useCreateDoctors(){
    const queryClient=useQueryClient();
    const result=useMutation({
        mutationFn:createDoctors,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['getdoctors']})
        },
        onError:(error)=>console.log("Doctor Not Created: ",error)
    })
    return result;
}

export function useUpdateDoctors(){
    const queryClient=useQueryClient();
    const result=useMutation({
        mutationFn:updateDoctors,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['getdoctors']})
            queryClient.invalidateQueries({queryKey:['getAvailableDoctors']})
        },
        onError:(error)=>console.log("Doctor Not Updated: ",error)
    })
    return result;
}


export function useAvailableDoctors(){
    const result=useQuery({
        queryKey:["getAvailableDoctors"],
        queryFn:getAvailableDoctors
    });
    return result;
}

