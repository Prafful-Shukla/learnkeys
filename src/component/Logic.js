import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { generate } from 'random-words'
const NUMB_OF_WORDS = 100
const SECONDS = 10


function Logic() {
    const [words, setWords] = useState([])
    const [countDown, setCountDown] = useState(SECONDS)
    const [currInput, setCurrInput] = useState("")
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(-1)
    const [currChar, setCurrChar] = useState("")
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [status, setStatus] = useState("waiting")
    const textInput = useRef(null)

    useEffect(() => {
        setWords(generateWords())
    }, [])

    useEffect(() => {
        if (status === 'started') {
            textInput.current.focus()
        }
    }, [status])


    // const RandomWordsGenerator = () => {
    //     const generateRandomWords = () => {
    //       const words = randomWords({ exactly: 10, maxLength: 10 });
    //       const filteredWords = words.filter(word => {
    //         const letters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    //         return letters.some(letter => word.includes(letter));
    //       });
    //       return filteredWords;
    //     };
      
    //     const randomWordsList = generateRandomWords();


    //CALLING GENERATE from RANDOM-WORDS and converting words to array
    //then this function is called to setWords array use state
    function generateWords() {
        return new Array(NUMB_OF_WORDS).fill(null).map(() => generate())
    }




    function start() {

        if (status === 'finished') {
            setWords(generateWords())
            setCurrWordIndex(0)
            setCorrect(0)
            setIncorrect(0)
            setCurrCharIndex(-1)
            setCurrChar("")
        }

        if (status !== 'started') {
            setStatus('started')
            let interval = setInterval(() => {
                setCountDown((prevCountdown) => {
                    if (prevCountdown === 0) {
                        clearInterval(interval)
                        setStatus('finished')
                        setCurrInput("")
                        return SECONDS
                    } else {
                        return prevCountdown - 1
                    }
                })
            }, 1000)
        }

    }

    function handleKeyDown({ keyCode, key }) {
        // space bar 
        if (keyCode === 32) {
            checkMatch()
            setCurrInput("")
            setCurrWordIndex(currWordIndex + 1)
            setCurrCharIndex(-1)
            // backspace
        } else if (keyCode === 8) {
            setCurrCharIndex(currCharIndex - 1)
            setCurrChar("")
        } else {
            setCurrCharIndex(currCharIndex + 1)
            setCurrChar(key)
        }
    }

    function checkMatch() {
        const wordToCompare = words[currWordIndex]
        const doesItMatch = wordToCompare === currInput.trim()
        if (doesItMatch) {
            setCorrect(correct + 1)
        } else {
            setIncorrect(incorrect + 1)
        }
    }

    function getCharClass(wordIdx, charIdx, char) {
        if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
            if (char === currChar) {
                return 'bg-success'
            } else {
                return 'bg-danger'
            }
        } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
            return 'bg-danger'
        } else {
            return ''
        }
    }


    return (
        <div className="container">

            <div className="row">
                <div className="col-12 text-center text-primary display-1 ">
                    <h1>{countDown}</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="input-group mb-3">
                        <input
                            ref={textInput}
                            disabled={status !== "started"}
                            type="text"
                            className="form-control"
                            onKeyDown={handleKeyDown}
                            value={currInput}
                            onChange={(e) => setCurrInput(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <button className="btn btn-info btn-block" onClick={start}>
                        Start
                    </button>
                </div>
            </div>

            {status === 'started' && (
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-text">
                                    {words.map((word, i) => (
                                        <span key={i}>
                                            <span>
                                                {word.split("").map((char, idx) => (
                                                    <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                                                ))}
                                            </span>
                                            <span> </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {status === 'finished' && (
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            <div className="col text-center">
                                <p className="is-size-5">Words per minute:</p>
                                <p className="text-primary display-1">{correct}</p>
                            </div>
                            <div className="col text-center">
                                <p className="is-size-5">Accuracy:</p>
                                {correct !== 0 ? (
                                    <p className="text-info display-1">
                                        {Math.round((correct / (correct + incorrect)) * 100)}%
                                    </p>
                                ) : (
                                    <p className="text-info display-1">0%</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Logic;
