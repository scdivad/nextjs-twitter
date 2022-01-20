import { useState } from 'react'
import Link from 'next/link'

function LoginPage() {
    const [username, setUsername] = useState('')
    
    const submitUsername = async () => {
        await fetch('http://localhost:3000/api/db', {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (<>
        <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
        />
        <Link href="/">
            <button onClick={submitUsername}>Log in</button>
        </Link>
    </>)
}

export default LoginPage