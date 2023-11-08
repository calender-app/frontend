export const getIsoFormattedDate = (dateString: Date) => {
  const formattedDate = dateString.toJSON().replace("Z", "") as any;

  console.log({ formattedDate });
  return formattedDate;
};
