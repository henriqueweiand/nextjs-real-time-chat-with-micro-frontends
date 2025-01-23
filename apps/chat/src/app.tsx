import { Provider } from "@/components/Provider";
import Chat from "./components/Chat";
import { Header } from "./components/Header";

const App: React.FC<any> = () => {
    return (
        <Provider>
            <Chat />
        </Provider>
    );
};

export default App;
