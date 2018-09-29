function format(date) {
  if (date === undefined || date === "") {
    return "";
  }
  return new Date(date).toLocaleString();
}

export { format };
