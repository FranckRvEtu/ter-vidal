import React from "react";
import { useRef, useEffect } from "react";
import { Tooltip } from "bootstrap"; // Assurez-vous d'avoir installé bootstrap
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/locales-all";

export default function Calendar({ listRDV }) {
  console.log("Dans la page", listRDV);
  let tooltip = null;

  const handleMouseEnter = (info) => {
    const calendarBoundingRect = document
      .querySelector(".calendar")
      .getBoundingClientRect();
    const eventBoundingRect = info.el.getBoundingClientRect();

    const placement =
      eventBoundingRect.top < calendarBoundingRect.top + 150 ? "left" : "top";

    tooltip = new Tooltip(info.el, {
      title:
        "Lieu: " +
        info.event.extendedProps.department +
        " - " +
        info.event.description,
      placement: placement,
      trigger: "hover",
      container: "body",
    });
  };

  const handleMouseLeave = () => {
    if (tooltip) {
      tooltip.dispose();
      tooltip = null;
    }
  };

  return (
    <div className="calendar">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "prev,next", // will normally be on the left. if RTL, will be on the right
          center: "Liste rdv",
          end: "timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        firstDay={1} // Lundi premier jour de la semaine
        slotMinTime={"08:00:00"} // Début de la plage horaire à 8h
        slotMaxTime={"23:00:00"} // Fin de la plage horaire à 20h
        height={"auto"}
        locale="fr" // Langue et timezone française
        allDaySlot={false} // Enlève la ligne "all day"
        events={listRDV}
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
/*
[
  {
    title: 'RDV Francky',
    start: '2024-03-28T10:30:00',
    end: '2024-03-28T11:30:00',
    extendedProps: {
      department: 'ça code',
    },
    description: 'Description de l"événement'
  },

  {
    title: 'RDV Etienne',
    start: '2024-03-27T08:30:00',
    end: '2024-03-27T10:30:00',
    extendedProps: {
      department: 'ça code',
    },
    description: 'Description de l"événement'
  }
  // more events ...
]*/
