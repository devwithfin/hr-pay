export interface AttendanceAttributes {
   attendance_id: number;
   attendance_date: Date;
   check_in_time: string;
   check_out_time?: string | null;
   status?: "Present" | "Sick" | "Leave" | "Absent" ;
   notes?: string | null;
}

export type AttendanceDTO = Omit<AttendanceAttributes, "attendance_id">;