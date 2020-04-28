export type Build = {
    id: string,
    configurationId: string,
    buildNumber: number,
    commitMessage: string,
    commitHash: string,
    branchName: string,
    authorName: string,
    status: string,
    start: string,
    duration: number
}

export type TicketConfig = {
    ticketName: string,
    buildNumber: number,
    commitHash: string,
    authorName: string,
    branchName: string,
    startTime: string,
    status: string,
}
