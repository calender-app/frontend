import { Scheduler } from "@aldabil/react-scheduler";
import { EventActions, ProcessedEvent } from "@aldabil/react-scheduler/types";
import { useEffect, useState } from "react";
import { CALENDER_FIELDS } from "./constants";
import { eventUtility } from "./utilities/eventUtility";
import { View } from "@aldabil/react-scheduler/components/nav/Navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const notify = (message: string, type: "error" | "success") =>
    toast(message, { type });

  const fetchData = async (date?: Date) => {
    try {
      const fetchedEvents = await eventUtility.getEvents(date);
      setEvents(fetchedEvents);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirm = (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    const tzStartTime = event.start;
    tzStartTime.setHours(event.start.getHours() + 6);

    const tzEndTIme = event.end;

    tzEndTIme.setHours(event.end.getHours() + 6);

    event.start = tzStartTime.toJSON().replace("Z", "") as any;
    event.end = event.end.toJSON().replace("Z", "") as any;
    return new Promise(async (resolve, reject) => {
      const apiCall =
        action === "create"
          ? eventUtility.createEvent
          : eventUtility.updateEvent;

      apiCall(event)
        .then(() => {
          resolve(event);
          window.location.reload();
        })
        .catch((error) => {
          const message =
            error.message ??
            `Could not ${action === "create" ? "create" : "update"} the event`;
          notify(message, "error");
          reject();
        });
    });
  };

  const handleDelete = (deletedId: number): Promise<void> => {
    return eventUtility
      .deleteEvent(deletedId)
      .then(async () => {
        window.location.reload();
      })
      .catch((error) => {
        const message = error.message ?? `Could not delete the event!`;
        notify(message, "error");
      });
  };

  const handleDateChange = async (date: Date) => {
    await fetchData(date);
    // window.location.reload();
  };
  const handleViewChange = (view: View) => {
    console.log({ view });
  };

  return (
    <div>
      <ToastContainer />
      {!isLoading && (
        <Scheduler
          selectedDate={new Date()}
          onConfirm={handleConfirm}
          onDelete={handleDelete}
          onSelectedDateChange={handleDateChange}
          onViewChange={handleViewChange}
          events={events}
          fields={CALENDER_FIELDS}
          view={"week"}
          hourFormat={"24"}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 0,
            startHour: 0,
            endHour: 24,
            step: 60,
          }}
          draggable={false}
        />
      )}
    </div>
  );
}
