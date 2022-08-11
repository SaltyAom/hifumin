// https://stackoverflow.com/questions/18749591/encode-html-entities-in-javascript/39243641#39243641
const htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
}

const regex = /&([^;]+);/g
const re1 = /^#x([\da-fA-F]+)$/
const re2 = /^#(\d+)$/

const unescapeHTML = (str: string) =>
    str.replace(regex, (entity, entityCode) => {
        let match

        if (entityCode in htmlEntities) return htmlEntities[entityCode]
        else if ((match = entityCode.match(re1)))
            return String.fromCharCode(parseInt(match[1], 16))
        else if ((match = entityCode.match(re2)))
            return String.fromCharCode(~~match[1])
        else return entity
    })

export default unescapeHTML
