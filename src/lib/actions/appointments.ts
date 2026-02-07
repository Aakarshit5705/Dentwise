"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { AppointmentStatus, Prisma } from "@prisma/client";
import { use } from "react";


function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
}


export async function getAppointments(){
    try {
            const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });
        
return appointments.map(transformAppointment);

    } catch (error) {
        console.log("error in getAppointments", error);
    }
};

export async function getUserAppointments(){
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to view appointments");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found. Please ensure your account is properly set up.");

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to fetch user appointments");
  }
}


export async function getUserAppointmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error("User not found");
    
    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.error("Error fetching user appointment stats:", error);
    return { totalAppointments: 0, completedAppointments: 0 };
  }
}


export async function getBookedTimeSlots(doctorId:string,date:string){
  try {
    const appointments=await prisma.appointment.findMany({
      where:{
        doctorId,
        date:new Date(date),
        status:{
          in:["COMPLETED","CONFIRMED"]
        }
      },
      select:{time:true}
    });
    return appointments.map((appointment)=>appointment.time)
  } catch (error) {
    console.log("Error in getBookedTimeSlots: ",error);
    return[];
  }
}

interface bookAppointmentInput{
  doctorId:string;
  date:string;
  time:string;
  reason?:string;
}

export async function bookAppointment(input:bookAppointmentInput){
  try {
    const {userId}=await auth();
    if(!userId)throw new Error("You must be logged in to book an appointment...");

    if(!input.date||!input.doctorId||!input.time)throw new Error("Doctor,Date and Time are required");

    const user=await prisma.user.findUnique({where:{clerkId:userId}});
    if(!user)throw new Error("Kindly set uo your account properly!!");


    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: input.doctorId,
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General consultation",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    return transformAppointment(appointment);

  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment. Please try again later.");
  }
}
export async function updateAppointmentStatus(input: { id: string; status: AppointmentStatus }) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
}