import { signInWithGoogle } from '../utils/firebase.config';
import GoogleButton from 'react-google-button';

function LoginPage() {
    async function handleLogin(e) {
        await signInWithGoogle();
    }

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