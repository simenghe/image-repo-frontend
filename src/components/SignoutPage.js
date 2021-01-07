import { useContext } from 'react';
import GoogleButton from 'react-google-button';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function SignOutPage() {
    const { handleLogout, curUser } = useContext(UserContext);
    if (curUser) {
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
    return <Redirect to="/" />
}
export default SignOutPage;