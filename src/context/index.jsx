import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [stage, setStage] = useState(1);
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState("");
  const addPlayerHandler = (name) => {
    console.log(players);
    setPlayers((prevstate) => [...prevstate, name]);
  };

  const removePlayerHandler = (idx) => {
    let newArray = [...players];
    newArray.splice(idx, 1);
    setPlayers(newArray);
  };

  const nextHandler = () => {
    if (players.length < 2) {
      toast.error("sorry you need to add at least 2 players", {
        position: "top-left",
        autoClose: 2000,
      });
    } else {
      setStage(2);
      setTimeout(() => {
        generateLoser()
        
      }, 2000);
    }
  };
  const generateLoser = () => {
    let result = players[Math.floor(Math.random() * players.length)];
    setResult(result);
  };
  const resetGameHandler = () => {
    setStage(1);
    setPlayers([]);
    setResult("");
  }

  return (
    <>
      <MyContext.Provider
        value={{
          stage,
          setStage,
          players,
          setPlayers,
          result,
          setResult,
          addPlayer: addPlayerHandler,
          removePlayer: removePlayerHandler,
          next: nextHandler,
          generateNewLoser: generateLoser,
          resetGame: resetGameHandler
        }}
      >
        {children}
      </MyContext.Provider>
      <ToastContainer />
    </>
  );
};
