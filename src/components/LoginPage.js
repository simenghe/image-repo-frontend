import { useContext } from 'react';
import GoogleButton from 'react-google-button';
import { UserContext } from '../context/UserProvider';
import { auth, googleProvider } from '../utils/firebase.config';

function LoginPage() {
    const { handleLogin } = useContext(UserContext);

    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    return (
        <div className="App">
            <header className="App-header">
                <GoogleButton
                    label="Login"
                    onClick={handleLogin}
                />
            </header>
        </div>
    );
}
export default LoginPage;