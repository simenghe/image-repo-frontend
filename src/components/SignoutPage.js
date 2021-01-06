
import { useContext } from 'react';
import GoogleButton from 'react-google-button';
import { UserContext } from '../context/UserProvider';

function SignOutPage() {
    const { handleLogout } = useContext(UserContext);

    return (
        <div className="App">
            <header className="App-header">
                <GoogleButton
                    label="Sign out"
                    onClick={handleLogout}
                />
            </header>
        </div>
    );
}
export default SignOutPage;