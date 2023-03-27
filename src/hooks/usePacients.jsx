import { useContext } from "react";
import { PacientsContext } from "../context/PacientsProvider";

export default function usePacients(){
    return useContext(PacientsContext);
}