import Run from "./types/Run";

export const padTo2Digits = (num: number): string => {
    return num.toString().padStart(2, '0');
}

export const stringTimeToMS = (timeString: string): number => {
    let milliseconds = 0
    if (timeString.split(":").length > 2) {
        milliseconds =
            Number(timeString.split(":")[0]) * 3600000 +
            Number(timeString.split(":")[1]) * 60000 +
            Number(timeString.split(":")[2]) * 1000;
    } else {
        milliseconds =
            Number(timeString.split(":")[0]) * 60000 +
            Number(timeString.split(":")[1]) * 1000;
    }
    return milliseconds
}

export const MStoStringTime = (time: number): string => {
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / 60000) % 60)
    const hours = Math.floor((time / 3600000) % 24)

    const result = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result
}

export const getRunnerString = (item: Run) => {
    const runnerArr = item.teams.map((team: any) => {
        let teamString = team.players.map((player: any) => { return player.name })
        teamString = teamString.join(', ')
        return teamString
    })
    return runnerArr.join(', ')
}

export const currencyFormat = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    return formatter.format(amount)
}