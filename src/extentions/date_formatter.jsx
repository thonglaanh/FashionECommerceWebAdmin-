class DateFormatter {
  constructor(dateString) {
    this.date = new Date(dateString);
  }

  getFormattedDate() {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    return this.date.toLocaleString("en-US", options);
  }
}
