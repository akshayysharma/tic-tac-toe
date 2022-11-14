import React,{useState, useEffect} from 'react'

const TicTacTow = () => {
    const [turn, setTurn] = useState('x')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState()
    const [gameCount, setGameCount] = useState({
        p1: 0,
        tie: 0,
        p2: 0
    })

    let myGameCount = JSON.parse(localStorage.getItem('score'))

    console.log({myGameCount})

    const checkForWinner = (squares) => {
        
        let count = 0
        let combos = {
            across:[
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down:[
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diagnol:[
                [0,4,8],
                [2,4,6]
            ]
        }

        for(let combo in combos){
            combos[combo].forEach(pattern => {
                if(squares[pattern[0]] === '' ||
                squares[pattern[1]] === '' ||
                squares[pattern[2]] === ''){
                    //do nothing
                    
                }else if(
                    squares[pattern[0]] === squares[pattern[1]] && 
                    squares[pattern[1]] === squares[pattern[2]]
                ){
                    setWinner(squares[pattern[0]])
                }
            })
        }

        for(let i=0;i<squares.length;i++){
            if(squares[i] !== ''){
                count +=1
            }
        }

        if(count === 9){
            
            setGameCount({
                ...gameCount, tie: gameCount.tie + 1
            })
            
            myGameCount.tie += 1
            setCells(Array(9).fill(''))
        }
        localStorage.setItem("score", JSON.stringify(myGameCount))
    }

    console.log(myGameCount)

    const handleClick = (num) => {
        if(cells[num]!== ''){
            alert('already clicked')
            return;
        }

        let squares = [...cells]

        if(turn === 'x'){
            squares[num] = 'x'
            setTurn('0')
        }else{
            squares[num] = '0'
            setTurn('x')
        }

        checkForWinner(squares)
        setCells(squares)
        
    }

    const Cell = ({num}) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    }

    useEffect(()=>{
        if(winner){
            setCells(Array(9).fill(''))
            if(winner === 'x'){
                setGameCount({...gameCount, p1: gameCount.p1 + 1})
                myGameCount.p1 += 1
                localStorage.setItem("score", JSON.stringify(myGameCount))
            } 
            else if(winner === '0'){
                setGameCount({...gameCount, p2: gameCount.p2 + 1})
                myGameCount.p2 += 1
                localStorage.setItem("score", JSON.stringify(myGameCount))
            } 
            setWinner()
        }
        
    },[winner])

    useEffect(() => {
        setCells(Array(9).fill(''))
    },[gameCount])


  return (
    <div className="container">
        <table>
            Turn: {turn}
            <tbody>
                <tr>
                    <Cell num={0}/>
                    <Cell num={1}/>
                    <Cell num={2}/>
                </tr>
                <tr>
                    <Cell num={3}/>
                    <Cell num={4}/>
                    <Cell num={5}/>
                </tr>
                <tr>
                    <Cell num={6}/>
                    <Cell num={7}/>
                    <Cell num={8}/>
                </tr>
            </tbody>
        </table>
        {/* {winner && (<>
        <p>{winner} is the winner</p>
        </>)} */}

        <div className="score">
            <span >Player 1(x): {myGameCount.p1}</span>
            <span >Tie: {myGameCount.tie}</span>
            <span >Player 2(0): {myGameCount.p2}</span>
        </div>
    </div>
  )
}

export default TicTacTow