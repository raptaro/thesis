"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

// PatientQueueItem interface
export interface PatientQueueItem {
  patient_id: string;
  first_name: string;
  last_name: string;
  age: number;
  complaint: string;
  phone_number?: string;
  queue_number: number;
}

export default function Page() {
  const [priorityQueue, setPriorityQueue] = useState({
    current: null as PatientQueueItem | null,
    next1: null as PatientQueueItem | null,
    next2: null as PatientQueueItem | null,
  });

  const [regularQueue, setRegularQueue] = useState({
    current: null as PatientQueueItem | null,
    next1: null as PatientQueueItem | null,
    next2: null as PatientQueueItem | null,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/queueing/registration_queueing/")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        // Extract priority patients and sort by timestamp
        const priorityPatients = [
          data.priority_current,
          data.priority_next1,
          data.priority_next2,
        ].filter((p) => p !== null); // Remove null values

        // Extract regular patients and sort by timestamp
        const regularPatients = [
          data.regular_current,
          data.regular_next1,
          data.regular_next2,
        ].filter((p) => p !== null); // Remove null values

        // Update priority queue state
        setPriorityQueue({
          current: priorityPatients[0] || null,
          next1: priorityPatients[1] || null,
          next2: priorityPatients[2] || null,
        });

        // Update regular queue state
        setRegularQueue({
          current: regularPatients[0] || null,
          next1: regularPatients[1] || null,
          next2: regularPatients[2] || null,
        });

        console.log("Priority Queue:", priorityQueue);
        console.log("Regular Queue:", regularQueue);
      })
      .catch((error) => console.error("Error fetching queue:", error));
  }, []);

  const router = useRouter();
  const renderPatientInfo = (queueItem: PatientQueueItem | null) => {
    if (!queueItem) return null;
    return (
      <div className="flex justify-center pt-8">
        <div className="card flex w-96 max-w-sm flex-col rounded-lg">
          <p className="mb-2 text-lg font-semibold tracking-tight">Patient Information</p>
          <div className="flex">
            <p>
              <span>Name: </span>{queueItem.first_name} {queueItem.last_name}
            </p>
            <p className="pl-8">
              <span>Age: </span>{queueItem.age}
            </p>
          </div>
          <hr className="mt-2" />
          <p className="my-2 text-lg font-semibold tracking-tight">Additional Information</p>
          <p>
            <span>Phone number: </span>{queueItem.phone_number || "N/A"}
          </p>
          <p>
            <span>Reason: </span>{queueItem.complaint || "N/A"}
          </p>
          <div className="flex flex-col pt-6">
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (!queueItem?.patient_id || !queueItem?.queue_number) {
                    console.error("Missing patient_id or queue_number");
                    return;
                  }
                  router.push(`/admin/patient-preliminary-assessment/${queueItem.patient_id}/${queueItem.queue_number}/`);
                }}
                className={buttonVariants({ variant: "outline" })}
              >
                Accept
              </button>

              <button className={buttonVariants({ variant: "outline" })} onClick={() => router.push("/payments")}>
                Edit
              </button>
            </div>
            <button className={buttonVariants({ variant: "outline" })} onClick={() => router.push("/payments")}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 px-8 py-8">
      <h1>Priority Queue</h1>
      <div className="flex flex-row justify-center gap-4">
        {/* Priority Queue Cards */}
        <div className="card flex h-96 w-80 max-w-sm flex-col items-center justify-center">
          <p className="text-6xl font-bold">{priorityQueue.current ? `#${priorityQueue.current.queue_number}` : "N/A"}</p>
          <span>Queuing Number</span>
          <span>Current</span>
        </div>

        <div className="card flex h-96 w-80 max-w-sm flex-col items-center justify-center">
          <p className="text-6xl font-bold">{priorityQueue.next1 ? `#${priorityQueue.next1.queue_number}` : "N/A"}</p>
          <span>Queuing Number</span>
          <span>Next</span>
        </div>

        <div className="card flex h-96 w-80 max-w-sm flex-col items-center justify-center">
          <p className="text-6xl font-bold">{priorityQueue.next2 ? `#${priorityQueue.next2.queue_number}` : "N/A"}</p>
          <span>Queuing Number</span>
          <span>Next</span>
        </div>

        {renderPatientInfo(priorityQueue.current)}
      </div>

      <h1>Regular Queue</h1>
      <div className="flex flex-row justify-center gap-4">
        {/* Regular Queue Cards */}
        <div className="card flex h-96 w-80 max-w-sm flex-col items-center justify-center">
          <p className="text-6xl font-bold">{regularQueue.current ? `#${regularQueue.current.queue_number}` : "N/A"}</p>
          <span>Queuing Number</span>
          <span>Current</span>
        </div>

        <div className="card flex h-96 w-80 max-w-sm flex-col items-center justify-center">
          <p className="text-6xl font-bold"> {regularQueue.next1 ? `#${regularQueue.next1.queue_number}` : "N/A"}</p>
          <span>Queuing Number</span>
          <span>Next</span>
        </div>

        <div className="card flex h-96 w-80 max-w-sm flex-col items-center justify-center">
          <p className="text-6xl font-bold"> {regularQueue.next2 ? `#${regularQueue.next2.queue_number}` : "N/A"}</p>
          <span>Queuing Number</span>
          <span>Next</span>
        </div>

        {renderPatientInfo(regularQueue.current)}
      </div>
    </div>
  );
}
