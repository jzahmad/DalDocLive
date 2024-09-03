import { useAuth } from "./context";
import { Button } from '@mui/material';

export default function Logout() {
    const auth = useAuth();
    return (
        <Button onClick={() => auth.logOut()} variant="contained" color="secondary" style={{ marginBottom: '20px' }}>
            Logout
        </Button>
    );
}