import { useEffect, useState } from "react";

export function useGroupData(criteria, data) {
  const [groupedData, setGroupedData] = useState(null);

  useEffect(() => {
    let updatedData = null;

    switch (criteria) {
      case "week":
        updatedData = groupDataByWeek(data);
        break;
      case "author":
        updatedData = groupDataByAuthor(data);
        break;
      case "location":
        updatedData = groupDataByLocation(data);
        break;
      default:
        // Invalid criteria
        break;
    }

    setGroupedData(updatedData);
  }, [criteria, data]);

  return groupedData;
}

function groupDataByWeek(data) {
  if (!data) return null;

  const convertedData = data.map((item) => ({
    ...item,
    time: new Date(item.time * 1000),
  }));

  const groupedData = {};

  convertedData.forEach((item) => {
    const weekNumber = getWeekNumber(item.time);
    if (groupedData[weekNumber]) {
      groupedData[weekNumber].push(item);
    } else {
      groupedData[weekNumber] = [item];
    }
  });

  function getWeekNumber(date) {
    const yearStart = new Date(date.getUTCFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date - yearStart) / 86400000 + yearStart.getUTCDay() + 1) / 7
    );
    return weekNumber;
  }

  return groupedData;
}

function groupDataByAuthor(data) {
  if (!data) return null;

  const groupedData = {};

  data.forEach((item) => {
    const author = item.author;
    if (groupedData[author]) {
      groupedData[author].push(item);
    } else {
      groupedData[author] = [item];
    }
  });

  return groupedData;
}

function groupDataByLocation(data) {
  if (!data) return null;

  const groupedData = {};

  data.forEach((item) => {
    const location = item.location;
    if (groupedData[location]) {
      groupedData[location].push(item);
    } else {
      groupedData[location] = [item];
    }
  });

  return groupedData;
}
