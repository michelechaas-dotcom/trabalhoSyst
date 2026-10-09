import './global.css';

import { useState } from "react";


import Teste from "./telas/teste";

export default function App() {
const [tela, setTela] = useState("teste");


const navegar = (pagina: string) => {
    setTela(pagina);
};

if (tela === "teste") {
    return <Teste navegar={navegar} />;
}

return <Teste navegar={navegar} />;


}