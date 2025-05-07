import { Type } from "@google/genai";

// Define a function that the model can call to check calendar events
export const getCalendarEventsFunctionDeclaration = {
  name: "getCalendarEvents",
  description: "Checks the calendar for events for a given date range.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      startDate: {
        type: Type.STRING,
        description:
          "Start date of the date range to check for events. Format: YYYY-MM-DD",
      },
      endDate: {
        type: Type.STRING,
        description:
          "End date of the date range to check for events. Format: YYYY-MM-DD",
      },
    },
    required: ["startDate", "endDate"],
  },
};

/**
 * Get the calendar events for a given date range. (mock API)
 * @param {string} startDate - Start date of the date range to check for events. Format: YYYY-MM-DD
 * @param {string} endDate - End date of the date range to check for events. Format: YYYY-MM-DD
 * @return {Object} A dictionary containing the events.
 */
export function getCalendarEvents(startDate, endDate) {
  // In a real implementation, events would be fetched from a database
  const events = [];

  const matchingEvents = events.filter(
    (event) => event.startDate >= startDate && event.endDate <= endDate,
  );

  return {
    events: matchingEvents,
  };
}
