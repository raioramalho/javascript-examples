console.clear()

const questions = [
    "O que aprendi hoje?",
    "O que me deixou aborrecido?",
    "O que eu podeira fazer para melhorar?",
    "O que me deixou feliz hoje?",
    "Quantas pessoas ajudei hoje?",
]

const ask = (index = 0) => {
    console.log(questions[index])
}


ask()

const answers = []

process.stdin.on("data", data => {
    answers.push(data.toString().trim())
    if (answers.length < questions.length) {
        ask(answers.length)
    } else {
        process.exit()
    }
})

process.on('exit', () => {
    console.log(`
    Muito Bom!!

    O que aprendi hoje?
    ${answers[0]}

    O que me deixou aborrecido?
    ${answers[1]}

    O que eu podeira fazer para melhorar?
    ${answers[2]}

    O que me deixou feliz hoje?
    ${answers[3]}

    Quantas pessoas ajudei hoje?
    ${answers[4]}
    `)
})
