

export const stringTimeToMS = (timeString: string): number => {
    const ms = timeString.split(':').reduce(function (seconds, v) {
        return +v + seconds * 60;
    }, 0) / 60;
    return ms * 1000
}