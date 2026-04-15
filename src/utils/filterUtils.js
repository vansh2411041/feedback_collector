// filters entries by keyword (name, email, message) and/or date
export const filterFeedback = (entries, keyword, dateFilter) => {
  return entries.filter((entry) => {
    // keyword match against name, email, or message
    const lowerKeyword = keyword.toLowerCase();
    const matchesKeyword =
      !keyword ||
      entry.name.toLowerCase().includes(lowerKeyword) ||
      entry.email.toLowerCase().includes(lowerKeyword) ||
      entry.message.toLowerCase().includes(lowerKeyword);

    // date match: compare only the date portion of the ISO string
    const matchesDate =
      !dateFilter || entry.date.startsWith(dateFilter);

    return matchesKeyword && matchesDate;
  });
};
