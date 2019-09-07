export default interface WordCard {
    id? : number,
    word: string,
    translation: string,
    createDate: Date,
    lastMemolizedDate?: Date,
    numberOfRemindTimes: number
}