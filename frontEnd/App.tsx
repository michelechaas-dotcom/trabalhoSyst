import './global.css';

import { useState } from "react";


import Inicio from "./telas/inicio";
import Sobre from "./telas/sobre";
import Produtos from "./telas/produto";
import Contato from "./telas/contato";

export default function App() {
const [tela, setTela] = useState("inicio");


const navegar = (pagina: string) => {
    setTela(pagina);
};

if (tela === "inicio") {
    return <Inicio navegar={navegar} />;
}

if (tela === "sobre") {
    return <Sobre navegar={navegar} />;
}

if (tela === "produtos") {
    return <Produtos navegar={navegar} />;
}

if (tela === "contato") {
    return <Contato navegar={navegar} />;
}

return <Inicio navegar={navegar} />;


}