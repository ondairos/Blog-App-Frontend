import propTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            username
            <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
            />
        </div>
        <div>
            password
            <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button id='login-button' type="submit">login</button>
    </form>
)

// prop types(warnings) for the loginForm component
LoginForm.propTypes = {
    handleSubmit: propTypes.func.isRequired,
    handleUsernameChange: propTypes.func.isRequired,
    handlePasswordChange: propTypes.func.isRequired,
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired
}

export default LoginForm