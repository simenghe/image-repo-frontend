import { useContext } from 'react';
import GoogleButton from 'react-google-button';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function LoginPage() {
    const { handleLogin, curUser } = useContext(UserContext);
    if (curUser) {
        return <Redirect to="/" />
    }
    return (
        <div className="App">
            <header className="App-header">
                <GoogleButton
                    label="Login"
                    onClick={handleLogin}
                />
            </header>
        </div>
    )
}
export default LoginPage;