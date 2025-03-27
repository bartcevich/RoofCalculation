"use client";
import { IIngredients } from "@/types/common";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useEffect,
  Children,
} from "react";
//type TypeSetState<T> = Dispatch<SetStateAction<T>>;
interface IContext {
  userChoice: {};
  setUserChoice: Dispatch<SetStateAction<{}>>;
}
export const IngredientsContext = createContext<IContext>({
  userChoice: {},
  setUserChoice: () => {},
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [userChoice, setUserChoice] = useState({});
  const value = useMemo(
    () => ({ userChoice, setUserChoice }),
    [userChoice, setUserChoice]
  );
  useEffect(() => {
    const savedIngredientHistory7: string | null =
      localStorage.getItem("ingredientHistory7");
    if (savedIngredientHistory7) {
      const parsedIngredientHistory = JSON.parse(savedIngredientHistory7);
      setUserChoice(parsedIngredientHistory);
    }
  }, []);
  useEffect(() => {
    if (
      typeof userChoice === "object" &&
      userChoice !== null &&
      Object.keys(userChoice).length > 0
    ) {
      localStorage.setItem("ingredientHistory7", JSON.stringify(userChoice));
    }
  }, [userChoice]);
  console.log("userChoice=", userChoice);

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};
