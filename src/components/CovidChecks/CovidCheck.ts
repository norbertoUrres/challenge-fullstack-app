interface CovidCheck {
    _id?: string,
    name: string,
    country: string,
    dna: string[] | string,
    result?: string,
    createdAt?: string | Date,
    updatedAt?: string
}

export default CovidCheck;