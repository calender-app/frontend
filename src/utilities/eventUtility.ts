import { HttpClient } from "../http/client";
import { getIsoFormattedDate } from "./commonUtility";
class EventUtility {
  async getEvents(selectedDate?: Date) {
    const selectedDateFormatted = selectedDate
      ? getIsoFormattedDate(selectedDate)
      : getIsoFormattedDate(new Date());
    const response = await new HttpClient().get(
      `${process.env.REACT_APP_API_BASE_URL}/events/?currentDate=${selectedDateFormatted}&api_token=${process.env.REACT_APP_API_TOKEN}`
    );
    const parsedEvents = response?.data?.data?.map((response: any) => ({
      ...response,
      start: new Date(response.start),
      end: new Date(response.end),
      allDay: response.is_full_day,
    }));
    return parsedEvents;
  }
  async createEvent(data: any) {
    const response = await new HttpClient().post(
      `${process.env.REACT_APP_API_BASE_URL}/events/?api_token=${process.env.REACT_APP_API_TOKEN}`,
      data
    );
    return response.data?.data;
  }
  async updateEvent(data: any) {
    console.log({ data });
    const response = await new HttpClient().put(
      `${process.env.REACT_APP_API_BASE_URL}/events/${data.event_id}?api_token=${process.env.REACT_APP_API_TOKEN}`,
      data
    );
    return response.data?.data;
  }
  async deleteEvent(event_id: number) {
    return new HttpClient().delete(
      `${process.env.REACT_APP_API_BASE_URL}/events/${event_id}?api_token=${process.env.REACT_APP_API_TOKEN}`
    );
  }
}

export const eventUtility = new EventUtility();
