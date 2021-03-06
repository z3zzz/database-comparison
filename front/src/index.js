import { createRoot } from 'react-dom/client';
import App from "./App";
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
