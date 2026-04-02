const { PDFParse } = require('pdf-parse')

const extractResumeText = async (buffer) => {
    try {
        const parser = new PDFParse(Uint8Array.from(buffer))
        const data = await parser.getText()
        return data.text
    } catch (error) {
        console.error('Error extracting resume text:', error)
        return ""
    }
}

module.exports = extractResumeText