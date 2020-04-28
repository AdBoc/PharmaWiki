import React from 'react'

export default function Login() {
    return (
        <div>
            <form className="login">
                <label className="login__element">Email<input required /></label>
                <label className="login__element">Password<input required /></label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

