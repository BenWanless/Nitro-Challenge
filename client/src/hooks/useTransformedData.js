function useTransformGroupedData(data, criteria) {
  if (!data) return null;

  let transformedData = null;

  switch (criteria) {
    case "author":
      transformedData = Object.keys(data).map((key) => ({
        label: key,
        children: data[key].map((item) => ({
          id: item.id,
          label: `${formatDate(new Date(item.time * 1000))}`,
          children: [],
        })),
      }));
      break;
    case "week":
      transformedData = Object.keys(data).map((key) => ({
        label: `Week ${key}`,
        children: data[key].map((item) => ({
          id: item.id,
          label: getLabel(item),
          children: [],
        })),
      }));
      break;
    case "location":
      transformedData = Object.keys(data).map((key) => ({
        label: key,
        children: data[key].map((item) => ({
          id: item.id,
          label: getLabel(item),
          children: [],
        })),
      }));
      break;
    default:
      // Invalid criteria
      throw new Error(`Invalid criteria: ${criteria}`);
  }

  return transformedData;
}

function getLabel(item) {
  const formattedDate = formatDate(new Date(item.time * 1000));
  return `${item.author} · ${formattedDate}`;
}

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default useTransformGroupedData;
