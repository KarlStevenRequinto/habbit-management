export const toLocalISO = (d: Date) => {
    // shift so toISOString() reflects local date, not UTC
    const offsetMs = d.getTimezoneOffset() * 60_000;
    return new Date(d.getTime() - offsetMs).toISOString().slice(0, 10);
};
