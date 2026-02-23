export class DateFormat {
  static formatTodoDate(date: Date) {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }
}
