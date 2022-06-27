/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const [notificationType, setNotificationType] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			setUser(user);
			window.localStorage.setItem(
				'loggedBloglistAppUser',
				JSON.stringify(user),
			);
			blogService.setToken(user.token);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setNotification('Wrong credentials');
			setNotificationType('error');
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	if (user === null) {
		return (
			<form onSubmit={handleLogin}>
				<div>
					<h1>Login</h1>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		);
	}

	const handleLogout = (e) => {
		e.preventDefault();
		setUser(null);
		window.localStorage.removeItem('loggedBloglistAppUser');
	};

	return (
		<div>
			<Notification message={notification} type={notificationType} />
			<h2>blogs</h2>
			<p>{user.name} has logged in</p>
			<button onClick={handleLogout}>logout</button>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
